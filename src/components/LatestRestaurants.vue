<template>
  <section class="latest-restaurants">
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
          this.latestRestaurants = response.data.slice(-3).reverse();
        })
        .catch(error => {
          console.error("Error fetching latest restaurants:", error);
          this.error = "Failed to load the latest restaurants.";
        });
    },
  };
</script>
  
<style lang="scss">
  .latest-restaurants {
    .restaurant-list {
      .restaurant-item {
        border: 1px solid red;
        border-radius: 8px;
        padding: 0.5rem;

        h3 {
          font-size: 1.25rem;
        }
      }
    }
  }
  
  .error {
    color: red;
    margin-bottom: 1rem;
  }
</style>
  