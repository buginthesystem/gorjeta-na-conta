<template>
  <form @submit.prevent="submitForm" novalidate>
    <label>
      Restaurant Name:
      <input id="placesInput" v-model="restaurantName" type="text" @input="clearError" required />
    </label>
    
    <label>
      District: 
      <select v-model="selectedDistrict" @change="loadCities" required>
        <option v-for="district in districts" :key="district.id" :value="district.id">
          {{ district.name }}
        </option>
      </select>
    </label>

    <label>
      City: 
      <select v-model="selectedCity" @change="loadParishes" required>
        <option v-for="city in cities" :key="city.id" :value="city.id">
          {{ city.name }}
        </option>
      </select>
    </label>
    
    <label>
      Parish: 
      <select v-model="selectedParish" required>
        <option v-for="parish in parishes" :key="parish.id" :value="parish.id">
          {{ parish.name }}
        </option>
      </select>
    </label>

    <div class="tags">
      <h4>Select Tags</h4>
      <div v-for="tag in availableTags" :key="tag">
        <input type="checkbox" :value="tag" v-model="selectedTags" />
        <label>{{ tag }}</label>
      </div>
    </div>
    
    <button type="submit">Submit</button>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </form>
</template>

<script>
  import axios from 'axios';
  import locationsData from "@/locationsData.js";

  export default {
    name: 'SubmitForm',
    data() {
      return {
        restaurantName: '',
        selectedDistrict: null,
        selectedCity: null,
        selectedParish: null,
        districts: locationsData.districts,
        cities: [],
        parishes: [],
        availableTags: ["Gorjeta na conta", "Só fala inglês", "Atende turistas primeiro"],
        selectedTags: [],
        errorMessage: '',
      };
    },
    methods: {
      loadCities() {
        this.cities = locationsData.cities.filter(city => city.districtId === this.selectedDistrict);
        this.selectedCity = null;
        this.selectedParish = null;
        this.parishes = [];
      },
      loadParishes() {
        this.parishes = locationsData.parishes.filter(parish => parish.cityId === this.selectedCity);
        this.selectedParish = null;
      },
      submitForm() {
        if (this.isValidForm()) {
          const formData = {
            restaurantName: this.restaurantName,
            district: this.selectedDistrict,
            city: this.selectedCity,
            parish: this.selectedParish,
            tags: this.selectedTags,
          };
          
          axios.post('http://localhost:3002/restaurants', formData)
            .then(response => {
              if (response.status >= 200 && response.status < 300) {
                this.$router.push('/success');
              } else {
                this.errorMessage = "There was an unexpected response. Please try again later.";
              }
            })
            .catch(error => {
              this.errorMessage = 'There was an error submitting the form. Please try again later.';
            });
        }
      },
      isValidForm() {
        let valid = true;

        if (!this.restaurantName) {
          this.errorMessage = 'Os campos são de preenchimento obrigatório.';
          valid = false;
        } else if (this.detectMaliciousPattern(this.restaurantName)) {
          this.errorMessage = 'Caracteres inválidos.';
          valid = false;
        } else {
          this.errorMessage = '';
        }

        if (!this.selectedDistrict) {
          this.errorMessage = 'Os campos são de preenchimento obrigatório.';
          valid = false;
        }

        if (!this.selectedCity) {
          this.errorMessage = 'Os campos são de preenchimento obrigatório.';
          valid = false;
        }

        if (!this.selectedParish) {
          this.errorMessage = 'Os campos são de preenchimento obrigatório.';
          valid = false;
        }

        if (!this.isValidTags()) {
          this.errorMessage = 'Please select at least one category tag.';
          valid = false;
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
        const placesInput = document.getElementById('placesInput');
        
        const autocomplete = new google.maps.places.Autocomplete(placesInput, {
            types: ['establishment'],
            componentRestrictions: { country: 'PT' }
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          console.log(place);  
          if (place.geometry) {
              const lat = place.geometry.location.lat();
              const lng = place.geometry.location.lng();
              console.log(`Selected place coordinates: ${lat}, ${lng}`);
          }
        });
      },
    },
    mounted() {
      if (!document.querySelector("#googlePlacesScript")) {
        window.googleMapsApiLoaded = this.googleMapsApiLoaded;

        const googleScript = document.createElement('script');
        googleScript.id = "googlePlacesScript";
        googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&libraries=places&callback=googleMapsApiLoaded`;
        googleScript.async = true;
        document.head.appendChild(googleScript);
      }
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
