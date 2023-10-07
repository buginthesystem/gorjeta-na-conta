<template>
  <form @submit.prevent="submitForm" novalidate>
    <label>
      Restaurant Name:
      <input id="placesInput" v-model="restaurantName" type="text" @input="clearError" required />
    </label>

    <div v-if="selectedPlace">
      <p><strong>Name:</strong> {{ selectedPlace.name }}</p>
      <p><strong>Address:</strong> {{ selectedPlace.vicinity }}, {{ selectedPlace.district }}</p>
    </div>
    
    <div class="tags">
      <h4>Select Tags</h4>
      <div v-for="tag in availableTags" :key="tag">
        <input type="checkbox" :value="tag" v-model="selectedTags" />
        <label>{{ tag }}</label>
      </div>
    </div>
    
    <button type="submit">Submit</button>
    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
      <div v-if="showConfirmOption">
        <button @click="confirmRestaurant">Yes, Confirm</button>
        <button @click="resetForm">No</button>
      </div>
      <div v-if="showOptions">
        <a href="/listing">Browse our current list</a> or 
        <button @click="resetForm">Submit a new entry</button>
      </div>
    </div>
  </form>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'SubmitForm',
    data() {
      return {
        restaurantName: '',
        selectedPlace: null,
        availableTags: ["Gorjeta na conta", "Só fala inglês", "Atende turistas primeiro"],
        selectedTags: [],
        errorMessage: '',
        showConfirmOption: false,
        showOptions: false
      };
    },
    methods: {
      submitForm() {
        if (this.isValidForm()) {

          console.log('Form is valid! GET /restaurants/:place_id');

          axios.get(`http://localhost:3002/restaurants/${this.selectedPlace.place_id}`)
          .then(response => {
            if (response.data.notFound) {
              console.log('Form is valid! POST /restaurants');
              this.saveRestaurant();
            } else {
              this.errorMessage = "This restaurant already exists in our database.";
              this.showConfirmOption = true;
            }
          })
          .catch(error => {
            this.errorMessage = 'There was an error verifying the restaurant. Please try again later.';
          });
        }
      },
      saveRestaurant() {
        console.log('Saving restaurant...');
        const formData = {
          name: this.selectedPlace.name,
          address: this.selectedPlace.vicinity,
          city: this.selectedPlace.city,
          district: this.selectedPlace.district,
          place_id: this.selectedPlace.place_id,
          tags: this.selectedTags,
          url: this.selectedPlace.url,
        };

        console.log('Form data:', formData);

        axios.post(`http://localhost:3002/restaurants`, formData)
        .then(response => {
          if (response.data.action === 'confirm') {
            console.log('Restaurant already exists! But it needs to be confirmed.');
            this.errorMessage = "This restaurant already exists in our database.";
            this.showConfirmOption = true;
          } else if (response.data.action === 'alreadyConfirmed') {
            this.errorMessage = "You have already confirmed this restaurant. We suggest browsing our current list or submitting a new entry.";
            this.showOptions = true;
          } else {
            this.$router.push('/success');
            console.log('Restaurant saved successfully!');
          }
        })
        .catch(error => {
          this.errorMessage = 'There was an error submitting the form. Please try again later.';
        });
      },
      confirmRestaurant() {
        this.showConfirmOption = false;
        axios.put(`http://localhost:3002/restaurants/${this.selectedPlace.place_id}/confirm`)
        .then(response => {
          this.$router.push('/success');
          console.log('Restaurant confirmed successfully!');
        })
        .catch(error => {
          if (error.response && error.response.status === 400 && error.response.data.message === 'You have already confirmed this restaurant.') {
            this.errorMessage = error.response.data.message;
            this.showOptions = true;  // Displaying the options (Browse list or Reset form)
          } else {
            this.errorMessage = 'There was an error confirming the restaurant. Please try again later.';
          }
        });
      },
      isValidForm() {
        let valid = true;

        if (!this.restaurantName || !this.selectedPlace) {
          this.errorMessage = 'Os campos são de preenchimento obrigatório.';
          valid = false;
        } else if (this.detectMaliciousPattern(this.restaurantName)) {
          this.errorMessage = 'Caracteres inválidos.';
          valid = false;
        } else if (!this.isValidTags()) {
          this.errorMessage = 'Please select at least one category tag.';
          valid = false;
        } else {
          this.errorMessage = '';
        }

        return valid;
      },
      isValidTags() {
        return this.selectedTags && this.selectedTags.length > 0;
      },
      detectMaliciousPattern(input) {
        const pattern = /['"();<>&]/;
        return pattern.test(input);
      },
      clearError() {
        this.errorMessage = '';
      },
      googleMapsApiLoaded() {
        console.log('Google Maps API has been loaded!');
        this.setupAutocomplete();
      },
      initializeGooglePlacesAPI() {
        console.log('Trying to initialize Google Places API...');
        if (!document.querySelector("#googlePlacesScript")) {
          window.googleMapsApiLoaded = this.googleMapsApiLoaded;

          const googleScript = document.createElement('script');
          googleScript.id = "googlePlacesScript";
          googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&libraries=places&callback=googleMapsApiLoaded`;
          googleScript.async = true;
          document.head.appendChild(googleScript);
        } else {
          // Script is already loaded. So, just initialize the autocomplete.
          this.setupAutocomplete();
        }
      },
      setupAutocomplete() {
        const placesInput = document.getElementById('placesInput');
        const autocomplete = new google.maps.places.Autocomplete(placesInput, {
          types: ['establishment'],
          componentRestrictions: { country: 'PT' }
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          console.log(place);
          this.selectedPlace = {
            name: place.name,
            vicinity: place.vicinity,
            city: place.address_components.find(component => component.types.includes('locality'))?.long_name || 'Unknown',
            district: place.address_components.find(component => component.types.includes('administrative_area_level_1'))?.long_name || 'Unknown',
            place_id: place.place_id,
            url: place.url,
          };
        });
      },
      resetForm() {
        this.restaurantName = '';
        this.selectedPlace = null;
        this.selectedTags = [];
        this.errorMessage = '';
        this.showConfirmOption = false;
        this.showOptions = false;
      }
    },
    mounted() {
      this.initializeGooglePlacesAPI();
    }
  };
</script>

<style scoped>
.error {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
  display: block;
}
</style>
