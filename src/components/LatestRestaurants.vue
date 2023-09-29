<template>
  <section>
    <h2 class="mb-4">Latest Restaurants</h2>
    <RestaurantList :restaurants="latestRestaurants" />
    <router-link to="/listing" class="btn btn-primary">View More</router-link>
  </section>
</template>
  
<script>
  import { useRestaurantsStore } from '@/stores/restaurants';
  import RestaurantList from '@/components/RestaurantList.vue';
  
  export default {
    name: 'LatestRestaurants',
    components: {
      RestaurantList,
    },
    data() {
      return {
        latestRestaurants: [],
      };
    },
    async mounted() {
    const store = useRestaurantsStore();
    if (store.restaurants.length === 0) {
      // Fetch the restaurants if they haven't been fetched yet
      await store.fetchRestaurants();
    }
    this.latestRestaurants = store.restaurants.slice(-5).reverse();
  },
  };
</script>
  
<style scoped>
  .restaurant-card {}
</style>
  