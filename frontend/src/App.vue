<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  <div>
    <header >
      <button id="about" class="navBtn aboutBtn" v-if="$route && $route.name && $route.name.includes('Home')" @click="$router.push({name:'About'})" title="About">About</button>
      <button id="home" class="navBtn homeBtn" v-if=" $route && $route.name && $route.name.includes('About')" @click="$router.push({name:'Home'})" title="Home">Home</button>
    </header>
    <main >
      <RouterView />
    </main>
  </div>
</template>

<style>
html, body {
  min-width: 375px;
  max-width: 1980px;
  font-family: 'Courier New', Courier, monospace;

}

header {
  position: fixed;
  top: 0px;
  right: 0px;
}

.navBtn {
  background-color: rgba(0, 0, 0, 0.3);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: 0px;
  font-size: large;
  min-height: 40px;
  position: fixed;
}

.homeBtn {
  top: 0px;
  right: 0px;
}

.aboutBtn {
  transform: rotate(270deg);
  top: 10px;
  right: -11px;
}
</style>
