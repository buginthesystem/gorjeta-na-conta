<template>
  <form @submit.prevent="submitForm" novalidate>
    <label>
      Restaurant Name:
      <input v-model="restaurantName" type="text" @input="clearError" required />
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
    
    <button type="submit">Submit</button>
    <div class="error">{{ errorMessage }}</div>
  </form>
</template>

<script>
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
          this.$router.push('/success'); 
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

        return valid;
      },
      detectMaliciousPattern(input) {
        const pattern = /['"();<>&]/;
        return pattern.test(input);
      },
      clearError() {
        this.errorMessage = '';
      }
    },
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
