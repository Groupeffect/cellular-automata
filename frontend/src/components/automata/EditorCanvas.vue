<template>
    <div id="editor-canvas">

        <div v-for='(e,k) in configuration' :key='k' class="small-font">
        {{ k }}<span> -> </span> <b>{{ e }}</b>
        </div>

            
        <div class="container"  :style="{width:$app.w}">
            <div>
                Rule {{rule}} = {{ ruleSet.mapping }} neighborhood mapping
            </div>
            <div class="inline-controls">
                <div class="label">Rule</div>
                <button ref="ruleMinus" class="ie large-font">-</button>
                <input ref="ruleInput" class="ie" type="number" max="255" min="1" v-model="rule" title="automata rule" >
                <button ref="rulePlus" class="ie large-font">+</button>
                <button @click="run()" class="ie success">Run</button>
            </div>
            <div class="inline-controls">
                <div class="label">Spacing</div>
                <button ref="spacingMinus" class="ie large-font">-</button>
                <input ref="spacingInput" class="ie" type="number" max="64" min="1" v-model="elementSpacing" title="automata rule" >
                <button ref="spacingPlus" class="ie large-font">+</button>
                <input  v-model="canvasColor" class="ie" type="color" >
            </div>
        </div>
        <div class="container"  :style="{width:$app.w}">
            <div class="inline-controls">
                <input id="width-slider" type="range" steps="10" v-model="canvasWidth" :max="$app.w" min="20">
            </div>
            <div class="inline-controls">
                <input id="width-slider" type="range" steps="10" v-model="canvasHeight" :max="$app.h - $app.h/4 " min="20">
            </div>
        </div>
        

    </div>
</template>
<script>
import { useRepo } from "pinia-orm"
import Configuration from "@/models/automata/Configuration.js"
import PixiMixin from "@/mixins/automata/PixiMixin.js"
export default {
    name: 'EditorCanvas',
    mixins: [PixiMixin],
    data: ()=>({
        canvasWidth: null,
        canvasHeight: null,
        canvasColor: '#000000',
        rule: 57,
        elementColor: '#000000',
        elementSpacing: 10
    }),
    computed: {
        configuration() {
            return useRepo(Configuration).find("default")
        }
    },
    watch:{
        canvasWidth() {
            this.update({id:"default", canvasWidth: this.canvasWidth})
            this.createAutomataData()
        },
        canvasHeight() {
            this.update({id:"default", canvasHeight: this.canvasHeight})
            this.createAutomataData()
        },
        rule() {
            this.update({id:"default", rule: this.rule})
        },
        elementColor() {
            this.update({id:"default", elementColor: this.elementColor})
        },
        canvasColor() {
            this.update({id:"default", canvasColor: this.canvasColor})
        },
        elementSpacing() {
            this.update({id:"default", elementSpacing: this.elementSpacing})
            this.createAutomataData()
        },
        
    },
    methods: {
        update(data) {
            useRepo(Configuration).save(data)
        },
        run() {

        }
    },
    mounted(){
        this.canvasWidth = this.configuration.canvasWidth
        this.canvasHeight = this.configuration.canvasHeight
        this.$refs.ruleInput.value = this.configuration.rule
        this.rule = this.configuration.rule
        this.$refs.rulePlus.addEventListener('click',()=>{
            if(this.rule <= 254) {
                this.$refs.ruleInput.stepUp()
                this.rule += 1
            }
            
        })
        
        this.$refs.ruleMinus.addEventListener('click',()=>{
            if(this.rule > 0) {
                this.$refs.ruleInput.stepDown()
                this.rule -= 1
            }
            
        })
        
        this.$refs.spacingInput.value = this.configuration.elementSpacing
        this.elementSpacing = this.configuration.elementSpacing
        this.$refs.spacingPlus.addEventListener('click',()=>{
            if(this.rule <= 254) {
                this.$refs.spacingInput.stepUp()
                this.elementSpacing += 1
            }
            
        })

        this.$refs.spacingMinus.addEventListener('click',()=>{
            if(this.elementSpacing >= 1) {
                this.$refs.spacingInput.stepDown()
                this.elementSpacing -= 1
            }
            
        })
    }
}
</script>
<style>
#width-slider {
    width: 60%;
    vertical-align: middle;
}
.inline-controls {
    margin-top: 16px;
}
#editor-canvas {
    position: absolute;
    bottom: 25px;
    width: 100%;
}
</style>