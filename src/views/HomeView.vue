<template>
  <HeroBanner />
  <div class="container">
    <div class="row">
      <h1 class="col-12">Homepage</h1>
      <div class="col-6">
        <h2>Submit a Restaurant</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed euismod, diam id aliquam ultrices, nunc ipsum rutrum 
          nunc, nec vestibulum velit nisl vitae eros. 
        </p>
        <router-link to="/submit" class="button">Submit</router-link>
      </div>
      <div class="col-6">
        <h2>Search for a Restaurant</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed euismod, diam id aliquam ultrices, nunc ipsum rutrum 
          nunc, nec vestibulum velit nisl vitae eros. 
        </p>
        <LatestRestaurants />
      </div>
    </div>
  </div>
</template>
  
<script>
  import LatestRestaurants from '@/components/LatestRestaurants.vue';
  import HeroBanner from '@/components/HeroBanner.vue';

  export default {
    components: {
      LatestRestaurants,
      HeroBanner
    },
    name: 'HomeView',
  };
</script>
  
<style scoped>
</style>
  