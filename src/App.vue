<template>
  <transition name="fade" mode="out-in">
    <router-view/>
  </transition>
</template>

<style lang="scss">
// #app {

// }

* {
  margin: 0;
  padding: 0;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
