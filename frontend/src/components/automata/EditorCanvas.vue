
<template>
  <div>
    <div :style="canvasStyle" class="container">
      <div id="pixi" ref="pixi" class="pixi-canvas"></div>
    </div>

    <div v-if="!editing">
      <button
        title="Edit"
        id="edit"
        class="large-font container"
        style="background-color: rgba(238, 93, 10, 0.733); color:white; border: 0cap; height: 45px; margin-bottom: 24px;"
        @click=" editing = !editing">
        Edit
      </button>
  
      <button
        title="run"
        id="run"
        class="large-font container"
        style="background-color: rgba(46, 118, 52, 0.4); color:white; border: 0cap; height: 45px;"
        @click="run()">
        Run
      </button>
    </div>


    
    
    
    <div v-if="editing && configuration">  
      <div id="editor-canvas" class="container">

          <!-- <div v-for='(e,k) in configuration' :key='k' class="small-font">
          {{ k }}<span> -> </span> <b>{{ e }}</b>
          </div> -->
          
        <div id="Element" v-if="menu.includes('element')">
          <div title="neighborhood mapping">
            Rule {{configuration.rule}} = {{ ruleSet.mapping }}
          </div>
          <InputNumber
            label="Rule"
            name="rule"
            :emit="createAutomataData"
            :configuration="configuration"
            :steps="1"
            :min="1"
            :max="254"  > 
            <button hidden id="placeholder-empty-0" class="ie" disabled style="background-color: rgba(255, 255, 255, 0); border: 0;"></button>
          </InputNumber>
        
          <InputNumber
            label="Columns"
            name="cols"
            :emit="createAutomataData"
            :configuration="configuration"
            :steps="1"
            :min="1"
            :max="80"  > 
            
            <InputColor :emit="createAutomataData" label="Element Color" :configuration="configuration" name="elementColor" />
          </InputNumber>

          <InputNumber
            label="Rows"
            name="rows"
            :emit="createAutomataData"
            :configuration="configuration"
            :steps="1"
            :min="1"
            :max="60"  > 
            
          <InputBoolean
              :emit="createAutomataData"
              label="Random Start"
              name="randomStartRow"
              :configuration="configuration" />

          </InputNumber>
        </div>

        <div id="Spacing" v-if="menu.includes('spacing')">

              
              <InputNumber
                label="Spacing"
                name="elementSpacing"
                :emit="createAutomataData"
                :configuration="configuration"
                :steps="1"
                :min="1"
                :max="100" />
                
                <InputNumber
                label="Width"
                name="elementWidth"
                :emit="createAutomataData"
                :configuration="configuration"
                :steps="1"
                :min="1"
                :max="100" />
                
                <InputNumber
                label="Height"
                name="elementHeight"
                :emit="createAutomataData"
                :configuration="configuration"
                :steps="1"
                :min="1"
                :max="100" /> 
              </div>
              
              
              
              <div id="Canvas" v-if="menu.includes('canvas')">
                <div class="container"  :style="{width:$app.w}">
                  <div class="inline-controls">
                    <InputSlider
                      label="Canvas Width"
                      name="canvasWidth"
                      id="width-slider"
                      class="canvas-slider"
                      :configuration="configuration"
                      :steps="10"
                      :max="$app.w"
                      :min="20"/>
                  </div>
  
                  <div class="inline-controls">
                  <InputSlider
                      label="Canvas Height"
                      name="canvasHeight"
                      id="height-slider"
                      class="canvas-slider"
                      :configuration="configuration"
                      :steps="10"
                      :max="$app.h - $app.h/4 " :min="20"/>
                    <br>
                  <InputColor :emit="changeBackgroundColor" label="Background Color" :configuration="configuration" name="canvasColor" />
                    </div>
                  </div>
                </div>
              </div>
            
              </div>

    <footer v-if="editing" class="menuBottom container">
      <button
      id="hide-menu"
      title="Hide Menu"
      class="ie large-font"
      style="background-color: rgba(238, 93, 10, 0.733); border:0; color:white;"
      @click=" editing = !editing">
      Hide
      </button>

      <button 
      id="spacing-menu"
      title="Spacing Menu"
      class="ie"
      @click="menu = 'spacing'">
      Spacing
      </button>

      <button
      id="element-menu"
      title="Element Menu"
      class="ie"
      @click="menu = 'element'">
      Element
      </button>
      <button 
      id="canvas-menu"
      title="Canvas Menu"
      class="ie"
      @click="menu = 'canvas'">
      Canvas
      </button>
      <button
      id="run-automata"
      title="Run Automata"
      class="large-font ie"
      style="background-color: rgba(46, 118, 52, 0.4); color:white; border: 0cap;"
      @click="run()">
      Run
      </button>
    </footer>
  </div>
</template>

<script>
import PixiMixin from "@/mixins/automata/PixiMixin.js"
import InputNumber from "@/components/automata/InputNumber.vue"
import InputColor from "@/components/automata/InputColor.vue"
import InputBoolean from "@/components/automata/InputBoolean.vue"
import InputSlider from "@/components/automata/InputSlider.vue"
export default {
  name: 'HomeView',
  mixins: [PixiMixin],
  components:{
    InputNumber,
    InputColor,
    InputBoolean,
    InputSlider
  },
  data:()=>({
    editing:true,
    menu: "element"
  }),
  mounted() {
    this.stage()
  },
  created() {
    // load automata
    this.startApp()

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

.canvas-slider {
    width: 60%;
    vertical-align: middle;
}
.inline-controls {
    margin-top: 16px;
}

#editor-canvas {
    position: fixed;
    bottom: 112px;
    width: 100%;
}

</style>