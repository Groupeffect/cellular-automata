
<template>
  <div>
    <div :style="canvasStyle" class="container">
      <div id="pixi" ref="pixi" class="pixi-canvas"></div>
    </div>
    <button v-if="$route.name === 'Home'" 
      class="ie menuBtn"
      @click="$router.push({name:'Editor'})">
      EDIT
    </button>
    <button v-else-if="$route.name === 'Editor'" class="ie menuBtn" @click="$router.push({name:'Home'})">HOME</button>
    <RouterView />
  </div>
</template>

<script>
import Configuration from "@/models/automata/Configuration.js"
import PixiMixin from "@/mixins/automata/PixiMixin.js"
export default {
  name: 'HomeView',
  mixins: [PixiMixin],
  data: ()=>({}),
  computed: {
    canvasStyle(){
      const c = Configuration.find("default")
      return {
        width: c && c.canvasWidth ? String(c.canvasWidth) + 'px' : "100px",
        height: c && c.canvasHeight ? String(c.canvasHeight) + 'px' : "100px",
        backgroundColor: c && c.pixiDivBackgroundColor ? c.pixiDivBackgroundColor : "#000000",
      }
    }
  },
  methods: {},
  mounted() {
    this.stage()

  },
  created(){
    Configuration.loadConfig(window)
  }
}
</script>
<style>

.pixi-canvas {
  height: 100%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

}

canvas {
  width: 100%;
  height:100%;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

</style>