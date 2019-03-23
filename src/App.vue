<template>
  <div id="app">
    <Navbar class="mb-4" />  
    <router-view class=" container-fluid"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
body,html {
  background: #f2f4f7;
}

.container-fluid {
  height: 100vh;
  color: #888;
  font-family: Arial, Helvetica, sans-serif;
}
form {
    color: #f7f7f7;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    min-width: 900px;
}

</style>
