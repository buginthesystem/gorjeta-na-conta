<template>
  <!-- header -->
  <div class="container-fluid">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <header class="header">
            <nav class="navbar navbar-expand-lg navbar-light">
              <router-link class="navbar-brand" to="/">Gorjeta na Conta</router-link>
              <div class="navbar-collapse">
                <ul class="navbar-ul mr-auto">
                  <li class="navbar-item">
                    <router-link class="navbar-link" to="/listing" exact>Listing</router-link>
                  </li>
                  <li class="navbar-item">
                    <router-link class="navbar-link" to="/submit" exact>Submit</router-link>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: 'AppHeader'
  }
</script>
  
<style lang="scss" scoped>
.navbar {
  &-ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  &-link {
    text-decoration: none;
    color: black;
    margin-right: 10px;
  }
}
.router-link-exact-active {
    font-weight: bold;
    text-decoration: underline;
    color: black;
}
</style>
  