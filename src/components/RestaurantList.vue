<template>
  <div>
    <div v-for="restaurant in filteredRestaurants" :key="restaurant._id" class="restaurant-item">
      <h3>{{ restaurant.restaurantName }}</h3>
      <p>{{ getParishName(restaurant.parish) }}, {{ getCityName(restaurant.city) }}, {{ getDistrictName(restaurant.district) }}</p>
      <div v-if="restaurant.tags && restaurant.tags.length > 0" class="tags">
        <strong>Categorias:</strong>
        <span v-for="tag in restaurant.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import locationsData from '../locationsData.js';
export default {
  name: 'RestaurantList',
  props: {
    restaurants: {
      type: Array,
      required: true,
    },
    searchCriteria: { 
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    filteredRestaurants() {
      return this.restaurants.filter(restaurant => {
        const nameMatch = !this.searchCriteria.name || restaurant.restaurantName.includes(this.searchCriteria.name);
        const districtMatch = !this.searchCriteria.district || restaurant.district === this.searchCriteria.district;
        const cityMatch = !this.searchCriteria.city || restaurant.city === this.searchCriteria.city;
        const parishMatch = !this.searchCriteria.parish || restaurant.parish === this.searchCriteria.parish;
        const categoryMatch = !this.searchCriteria.selectedCategories || this.searchCriteria.selectedCategories.every(cat => restaurant.tags.includes(cat));
        
        return nameMatch && districtMatch && cityMatch && parishMatch && categoryMatch;
      });
    }
  },
  methods: {
    getDistrictName(id) {
      return locationsData.getDistrictNameById(id);
    },
    getCityName(id) {
      return locationsData.getCityNameById(id);
    },
    getParishName(id) {
      return locationsData.getParishNameById(id);
    }
  },
};
</script>

<style scoped>
  .restaurant-item {
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  .tags {
    margin-top: 0.5rem;
  }
  .tag {
    background-color: #e0e0e0;
    padding: 0.2rem 0.5rem;
    margin-right: 0.5rem;
    border-radius: 0.2rem;
    display: inline-block;
  }
</style>
