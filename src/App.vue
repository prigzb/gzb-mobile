<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
body {
    background-color: #EAEFF3;
    height: 100%;
    margin: 0px;
}
html {
    height: 100%;
}
a {
    text-decoration: none;
}
ul{
  margin: 0;
  padding: 0;
}
li{
  list-style-type:none;
}
input,button,select,textarea{outline:none;resize: none;}
input{
  border: 0;
}
</style>
