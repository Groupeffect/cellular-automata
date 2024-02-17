<template>
  <section class="container">
    <h1>About</h1>
    <br>
    <p>Author: Amir Yousefi</p>
    <p>Organization: Groupeffect</p>
    <p>Project: Cellular Automata from S. Wolfram as PWA</p>
    <br>
    <p>{{ Date(Date.now()) }}</p>
  </section>
</template>
<script>
export default {
  name: 'AboutView',
  props: {},
  data: ()=>({}),
  computed: {},
  methods: {},
  created(){}
}
</script>
<style scoped>
p {
  font-size: large;
}
.container {
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  padding: 32px;
}
</style>