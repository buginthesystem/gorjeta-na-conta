<template>
  <div class="restaurant-list">
    <!-- restaurant card -->
    <div v-for="restaurant in restaurants" :key="restaurant._id" class="restaurant-item">
      <img :src="imageSource(restaurant)" :alt="restaurant.name" @error="handleImageError" class="restaurant-img">
      <div class="restaurant-content">
        <div class="d-flex align-items-center justify-content-between">
          <h3><a :href="restaurant.url" target="_blank">{{ restaurant.name }}</a></h3>
          <span><strong>Votos:</strong> {{ restaurant.confirmations }}</span>
        </div>
        <p><strong>Morada:</strong> {{ restaurant.address }}, {{ restaurant.district }}</p>
        <div v-if="restaurant.tags && restaurant.tags.length > 0" class="tags">
          <strong>Categorias:</strong>
          <span v-for="tag in restaurant.tags" :key="tag._id" class="tag">
            {{ tag.name }} ({{ tag.count }})
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fallbackImage from '@/assets/logo.svg';

export default {
  name: 'RestaurantList',
  props: {
    restaurants: {
      type: Array,
      required: true,
    }
  },
  computed: {
    imageSource() {
      return restaurant => {
        if (!restaurant.image_url) {
          return fallbackImage;
        }
        return restaurant.image_url;
      };
    }
  },
  methods: {
    handleImageError(event) {
      event.target.src = fallbackImage;
    }
  }
};
</script>

<style lang="scss" scoped>
  .restaurant-item {
    display: flex;
    border: 1px solid #ccc;
    // padding: 1rem;
    margin-bottom: 1rem;
    overflow: hidden;

    .restaurant-img {
      width: 200px;
      max-height: 200px;
      object-fit: cover;
    }

    .restaurant-content {
      padding: 1rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .tags {
        //margin-top: 0.5rem;
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
    
  }
</style>
