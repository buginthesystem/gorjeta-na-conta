<template>
    <div>
      <h1>Homepage</h1>
      <LatestRestaurants />
    </div>
</template>
  
<script>
  import LatestRestaurants from '@/components/LatestRestaurants.vue';

  export default {
    components: {
      LatestRestaurants,
    },
    name: 'HomeView',
  };
</script>
  
<style scoped>
</style>
  