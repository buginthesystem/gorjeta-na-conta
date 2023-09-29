import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    restaurants: [],
  }),
  actions: {
    async fetchRestaurants() {
      // Fetch restaurant data and update the state
      const response = await fetch('/data/restaurants.json');
      const data = await response.json();
      this.restaurants = data;
    },
  },
});
