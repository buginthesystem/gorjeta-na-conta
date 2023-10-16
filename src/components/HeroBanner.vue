<template>
    <!-- hero banner -->
    <div class="row hero-banner">
        <div class="col-12 hero-banner__content">
            <div class="row w-100 hero-banner__container">
                <h1 class="col-12">Gorjeta na conta</h1>
                <h2 class="col-12">Descobre os piores restaurantes</h2>
                
                <div class="col-4 p-0 mx-auto hero-banner__search">
                    <input class="w-100 hero-banner__search-input" v-model="searchInput" @input="onInputSearch" type="text" placeholder="Pesquisa por nome ou localidade" ref="searchInput"/>
                    <ul class="w-100 mt-2 hero-banner__search-results" v-if="autocompleteResults.length" ref="searchResults">
                        <li v-for="result in autocompleteResults" :key="result.id" @click="onSelectResult(result)">
                            <span v-html="highlightMatch(result.name)"></span>
                        </li>
                    </ul>
                    <ul v-if="noResults" class="w-100 mt-2 hero-banner__search-results no-results">
                        <li>{{ noResultsMessage }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'HeroBanner',
        data() {
            return {
                searchInput: '',
                autocompleteResults: [],
                noResults: false,
                noResultsMessage: "Entry doesn't exist yet, search something else",
            };
        },
        mounted() {
            document.addEventListener('click', this.handleClickOutside);
        },
        beforeDestroy() {
            document.removeEventListener('click', this.handleClickOutside);
        },
        methods: {
            async onInputSearch() {
                if (this.searchInput.length >= 2) {
                    try {
                        const response = await axios.get(`http://localhost:3002/restaurants?name_like=${this.searchInput}`);
                        // Client-side filtering
                        this.autocompleteResults = response.data.filter(restaurant => 
                            restaurant.name.toLowerCase().includes(this.searchInput.toLowerCase())
                        ).slice(0, 5); // Limiting to 5 results

                        this.noResults = this.autocompleteResults.length === 0;

                    } catch (error) {
                        console.error("Error fetching restaurants:", error);
                    }
                } else {
                    this.autocompleteResults = [];
                    this.noResults = false;
                }
            },
            highlightMatch(restaurantName) {
                const regex = new RegExp(`(${this.searchInput})`, 'gi');
                return restaurantName.replace(regex, '<span class="highlight">$1</span>');
            },
            handleClickOutside(event) {
                if (this.$refs.searchResults && this.$refs.searchInput &&
                    !this.$refs.searchResults.contains(event.target) && 
                    !this.$refs.searchInput.contains(event.target)) {
                        this.autocompleteResults = [];
                        this.noResults = false;
                }
            }
        }
    }
</script>
  
<style lang="scss">
.hero-banner {
    height: 400px;
    background-image: url("../assets/Restaurant-Placeholder-001.jpg");
    background-size: cover;
    background-position: center;
    position: relative;

    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: inherit;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 0;
    }

    &__content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        position: relative;
        z-index: 1;
    }

    &__container {
        text-align: center;
        color: white;

        .hero-banner__search {
            position: relative;

            &-input {
                padding: 10px;
                border: 2px solid transparent;
                border-radius: 4px;
                background-color: #fff;
                font-size: 16px;
                transition: border-color 0.3s ease;

                &:focus, 
                &:hover {
                    border: 2px solid #ff5733;
                    box-shadow: rgba(255, 87, 51, 0.5) 0px 8px 24px;
                }

                &:focus-visible {
                    outline: none;
                }

                &::placeholder {
                    color: #aaa;
                }
            }

            &-results {
                position: absolute;
                list-style-type: none;
                margin: 0;
                padding: 0;
                background-color: white;
                color: black;
                border: 1px solid #ff5733;
                border-radius: 4px;

                li {
                    margin: 0;
                    padding: 12px 0;
                    border-bottom: 1px solid #ff5733;

                    &:last-child {
                        border-bottom: none;
                    }

                    &:hover {
                        background-color: #ff5733;
                        color: white;
                        cursor: pointer;

                        .highlight {
                            font-weight: bold;
                            color: white;
                        }
                    }
                }

                .highlight {
                    font-weight: bold;
                    color: #ff5733;
                }
            }

            
        }
        
    }
}
</style>