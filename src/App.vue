<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Poppins, Roboto, sans-serif;
  min-height: $min-height;
  max-width: $max-width;
  margin: auto;
  background: $bg-main;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $dark;
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: $darker;
      &.router-link-exact-active {
        color: $blue;
      }
    }
  }

}
</style>
