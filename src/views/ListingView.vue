<template>
  <div class="container">
    <div class="row">
      <SearchBar @update-search="updateSearch" ref="searchBarRef"/>
      <label class="col-12">
        Sort By: 
        <select v-model="sortBy">
          <option value="name">Name</option>
          <option value="district">District</option>
          <option value="city">City</option>
          <option value="createdAt">Most Recently Added</option>
          <option value="votes">Votes</option>
        </select>
      </label>
      <div class="filter-counter col-12" v-if="displayedResultsMessage">{{ displayedResultsMessage }}</div>
      <RestaurantList v-if="currentPageRestaurants.length > 0" :restaurants="currentPageRestaurants" />
      <div v-else>Sem resultados</div>
      <!-- Pagination -->
      <div class="pagination col-12" v-if="filteredRestaurants.length > itemsPerPage">
        <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Próximo</button>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchBar from '@/components/SearchBar.vue';
  import RestaurantList from '@/components/RestaurantList.vue';
  import _ from 'lodash';
  import axios from 'axios';

  export default {
    name: 'ListingView',
    components: {
      SearchBar,
      RestaurantList,
    },
    data() {
      return {
        restaurants: [],
        filteredRestaurants: [],
        sortBy: 'name',
        currentPageRestaurants: [],
        currentPage: 1,
        itemsPerPage: 5,
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.filteredRestaurants.length / this.itemsPerPage);
      },
      displayedResultsMessage() {
        const count = this.filteredRestaurants.length;
        if (count === 1) {
          return 'Found 1 result';
        } else if (count > 1) {
          return `Found ${count} results`;
        }
        return '';
      },
    },
    mounted() {
      this.fetchRestaurants();
    },
    methods: {
      async fetchRestaurants() {
        try {
          const response = await axios.get('http://localhost:3002/restaurants');
          this.restaurants = response.data;
          this.filteredRestaurants = this.restaurants;
          this.sortRestaurants();
        } catch (error) {
          console.error("Error fetching restaurants:", error);
        }
      },
      sortRestaurants() {
        switch (this.sortBy) {
          case 'createdAt':
            this.filteredRestaurants = _.orderBy(this.filteredRestaurants, [this.sortBy], ['desc']);
            break;
          case 'votes':
            this.filteredRestaurants = _.orderBy(this.filteredRestaurants, ['confirmations'], ['desc']);
            break;
          default:
            this.filteredRestaurants = _.orderBy(this.filteredRestaurants, [this.sortBy]);
            break;
        }
        this.currentPage = 1;
        this.updatePageRestaurants();
      },
      updatePageRestaurants() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        this.currentPageRestaurants = this.filteredRestaurants.slice(start, end);
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.updatePageRestaurants();
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.updatePageRestaurants();
        }
      },
      updateSearch(searchCriteria) {
        this.filteredRestaurants = this.restaurants.filter(restaurant => {
          let matches = true;
          
          if (searchCriteria.name) {
            matches = matches && (
              restaurant.name.toLowerCase().includes(searchCriteria.name.toLowerCase()) ||
              restaurant.district.toLowerCase().includes(searchCriteria.name.toLowerCase()) ||
              restaurant.city.toLowerCase().includes(searchCriteria.name.toLowerCase())
            );
          }
          if (searchCriteria.selectedCategories && searchCriteria.selectedCategories.length > 0) {
            matches = matches && searchCriteria.selectedCategories.some(category => restaurant.tags.includes(category));
          }

          return matches;
        });

        this.sortRestaurants();
        
        this.currentPage = 1;
        this.updatePageRestaurants();
      },
    },
    watch: {
      sortBy() {
        this.sortRestaurants();
        this.updatePageRestaurants();
      },
    },
  };
</script>

<style lang="scss" scoped>
.filter-counter {
  margin: 1rem 0;
  color: red;
}
</style>
