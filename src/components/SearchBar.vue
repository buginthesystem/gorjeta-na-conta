<template>
  <div>
    <div>
      <!-- Search: name input -->
      <label>
        Name: 
        <input v-model="searchName" type="text" placeholder="Search by name" />
      </label>
    </div>
    
    <!-- Search: location dropdowns-->
    <div>
      <label>
        District: 
        <select v-model="selectedDistrict">
          <option v-for="district in districts" :key="district.id" :value="district.id">
            {{ district.name }}
          </option>
        </select>
      </label>

      <label>
        City: 
        <select v-model="selectedCity">
          <option v-for="city in cities" :key="city.id" :value="city.id">
            {{ city.name }}
          </option>
        </select>
      </label>
      
      <label>
        Parish: 
        <select v-model="selectedParish">
          <option v-for="parish in parishes" :key="parish.id" :value="parish.id">
            {{ parish.name }}
          </option>
        </select>
      </label>
      
      <button @click="search">Search</button>
      <button @click="resetSearch">Reset</button>
    </div>

    <div>
      <!-- Search: categories checkboxes -->
      <div v-for="category in allCategories" :key="category">
        <input type="checkbox" :id="category" :value="category" v-model="selectedCategories" />
        <label :for="category">{{ category }}</label>
      </div>
    </div>
  </div>
</template>

<script>
  import locationsData from "@/locationsData.js";
  import axios from 'axios';

  export default {
    name: 'SearchBar',
    data() {
      return {
        searchName: '',
        selectedDistrict: null,
        selectedCity: null,
        selectedParish: null,
        districts: locationsData.districts,
        cities: [],
        parishes: [],
        showReset: false,
        selectedCategories: [],
        allCategories: [],
      };
    },
    methods: {
      loadCities() {
        if (this.selectedDistrict) {
          this.cities = locationsData.cities.filter(city => city.districtId === this.selectedDistrict);
          this.selectedCity = null; // Reset the selected city
          this.selectedParish = null; // Reset the selected parish
          this.parishes = []; // Reset the parishes array
        }
      },
      loadParishes() {
        if (this.selectedCity) {
          this.parishes = locationsData.parishes.filter(parish => parish.cityId === this.selectedCity);
          this.selectedParish = null; // Reset the selected parish
        }
      },
      resetSearch() {
        this.searchName = '';
        this.selectedDistrict = null;
        this.selectedCity = null;
        this.selectedParish = null;
        this.selectedCategories = [];
        this.$emit('update-search', {});
      },
      search() {
        this.showReset = true;
        this.$emit('update-search', {
          name: this.searchName,
          district: this.selectedDistrict,
          city: this.selectedCity,
          parish: this.selectedParish,
          selectedCategories: this.selectedCategories,
        });
      },
      async fetchCategories() {
        try {
          const response = await axios.get('http://localhost:3002/restaurants');
          const restaurants = response.data;
          const allTags = restaurants.flatMap(restaurant => restaurant.tags);
          this.allCategories = [...new Set(allTags)];
        } catch (error) {
          console.error("Error fetching restaurants for categories:", error);
        }
      },
    },
    watch: {
      searchName(newVal) {
        if (newVal.length >= 3 || newVal.length === 0) {
          this.search();
        }
      },
      selectedDistrict(newVal) {
        this.selectedCity = null;
        this.cities = locationsData.cities.filter(city => city.districtId === newVal);
      },
      selectedCity(newVal) {
        this.selectedParish = null;
        this.parishes = locationsData.parishes.filter(parish => parish.cityId === newVal);
      },
      selectedCategories() {
        this.search();
      }
    },
    mounted() {
      this.loadCities(); // Load cities initially based on the selected district
      this.loadParishes(); // Load parishes initially based on the selected city
       // Fetch and set categories
      this.fetchCategories();
    }
  };
</script>

<style scoped>
</style>
