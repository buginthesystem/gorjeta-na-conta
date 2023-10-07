<template>
  <div>
    <div>
      <label>
        Name: 
        <input v-model="searchName" type="text" placeholder="Search by name" />
      </label>
    </div>
    <div>
      <div v-for="category in allCategories" :key="category">
        <input type="checkbox" :id="category" :value="category" v-model="selectedCategories" />
        <label :for="category">{{ category }}</label>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'SearchBar',
    data() {
      return {
        searchName: '',
        selectedCategories: [],
        allCategories: [],
      };
    },
    methods: {
      search() {
        this.$emit('update-search', {
          name: this.searchName,
          cityOrDistrict: this.searchName,
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
        if (newVal.length >= 2 || newVal.length === 0) {
          this.search();
        }
      },
      selectedCategories() {
        this.search();
      }
    },
    mounted() {
      this.fetchCategories();
    }
  };
</script>

<style scoped>
</style>
