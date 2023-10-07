<template>
  <div class="restaurant-list">
    <div v-for="restaurant in restaurants" :key="restaurant._id" class="restaurant-item">
      <div class="d-flex align-items-center justify-content-between">
        <h3><a :href="restaurant.url" target="_blank">{{ restaurant.name }}</a></h3>
        <span><strong>Votos:</strong> {{ restaurant.confirmations }}</span>
      </div>
      <p><strong>Morada:</strong> {{ restaurant.address }}, {{ restaurant.district }}</p>
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
    }
  }
};
</script>

<style lang="scss" scoped>
  .restaurant-item {
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 1rem;

    .tags {
      margin-top: 0.5rem;

      .tag {
        background-color: #F0F0F0;
        padding: 0.125rem 0.5rem;
        margin: 0 0.5rem;
        border-radius: 0.25rem;
        display: inline-block;
        font-size: 0.8rem;
      }
    }
  }
</style>
