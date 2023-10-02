<template>
  <section>
    <h2 class="mb-4">Latest Restaurants</h2>
    <div v-if="error" class="error">{{ error }}</div>
    <RestaurantList :restaurants="latestRestaurants" />
    <router-link to="/listing" class="btn btn-primary">View More</router-link>
  </section>
</template>
  
<script>
  import axios from 'axios';
  import RestaurantList from '@/components/RestaurantList.vue';
  
  export default {
    name: 'LatestRestaurants',
    components: {
      RestaurantList,
    },
    data() {
      return {
        latestRestaurants: [],
        error: null,
      };
    },
    mounted() {
      axios.get('http://localhost:3002/restaurants')
        .then(response => {
          this.latestRestaurants = response.data.slice(-5).reverse();
        })
        .catch(error => {
          console.error("Error fetching latest restaurants:", error);
          this.error = "Failed to load the latest restaurants.";
        });
    },
  };
</script>
  
<style scoped>
  .error {
    color: red;
    margin-bottom: 1rem;
  }
</style>
  