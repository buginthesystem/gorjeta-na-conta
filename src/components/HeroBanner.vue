<template>
    <!-- hero banner -->
    <div class="row hero-banner">
        <div class="col-12 hero-banner__content">
            <div class="hero-banner__container">
                <h1>Gorjeta na conta</h1>
                <h2>Descobre os piores restaurantes</h2>
                <router-link to="/listing" class="btn btn-primary">Pesquisar</router-link>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'HeroBanner'
  }
</script>
  
<style lang="scss" scoped>
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
    }
}
</style>