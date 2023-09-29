<template>
    <div>
      <h1>Homepage</h1>
      <LatestRestaurants />
    </div>
</template>
  
<script>
import { useRestaurantsStore } from '@/stores/restaurants';
import LatestRestaurants from '@/components/LatestRestaurants.vue';

export default {
  components: {
    LatestRestaurants,
  },
  name: 'HomeView',
  mounted() {
    const store = useRestaurantsStore();
    store.fetchRestaurants();
  },
};
</script>
  
<style scoped>
</style>
  