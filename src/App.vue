<template>
  <div id="app">
    <Game></Game>  
  </div>
</template>

<script>
import Game from './components/Game'
export default {
  name: 'app',
  components: {
    Game
  }
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #000;
}
</style>
