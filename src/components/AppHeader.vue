<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">Gorjeta na Conta</router-link>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/listing">Listing</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/submit">Submit</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
  
<script>
  export default {
    name: 'AppHeader'
  }
</script>
  
<style scoped>
</style>
  