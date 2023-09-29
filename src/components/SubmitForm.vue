<template>
  <form @submit.prevent="submitForm">
    <label>
      Restaurant Name:
      <input v-model="restaurantName" type="text" required />
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
          // TBD: Submit form
        } else {
          alert('Please fill in all fields correctly.');
        }
      },
      isValidForm() {
        // Validate form fields
        return this.restaurantName && this.selectedDistrict && this.selectedCity && this.selectedParish;
      },
    },
  };
</script>

<style scoped>
</style>
