<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<template>
  <div id="app">
    <Navbar /> <!-- This is where we place the Navbar.vue -->
    <router-view/>  
  </div>
</template>

<script>
import Navbar from './components/Navbar' // get the navbar component
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>

</style>
