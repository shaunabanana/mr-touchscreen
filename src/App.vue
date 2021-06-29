<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <Test/>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test.vue'

export default {
  name: 'App',
  components: {
    Test
  }
}



</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  /* margin-top: 60px; */
}

html {
  display:inline;
}

* {
    margin: 0;
    padding: 0;
}
</style>
