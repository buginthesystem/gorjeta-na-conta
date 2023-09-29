<template>
  <div>
    <div v-for="restaurant in restaurants" :key="restaurant.id" class="restaurant-item">
      <h3>{{ restaurant.name }}</h3>
      <p>{{ restaurant.parish }}, {{ restaurant.city }}, {{ restaurant.district }}</p>
      <div v-if="restaurant.tags && restaurant.tags.length > 0" class="tags">
        <strong>Categorias:</strong>
        <span v-for="tag in restaurant.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RestaurantList',
    props: {
      restaurants: {
        type: Array,
        required: true,
      },
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
