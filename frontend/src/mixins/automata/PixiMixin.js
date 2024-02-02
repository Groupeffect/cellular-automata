import { Application } from 'pixi.js'
import Configuration from "@/models/automata/Configuration.js"
export default {
    name: 'PixiMixin',
    data: ()=>({
        pixi: null,
    }),
    computed: {
        ruleSet(){
            const c = Configuration.find("default")
            return c && c.rule ? {
                neighborIndexes: ["000","001","010","011","100","101","110","111"],
                mapping: this.$numberTo8BitArray(c.rule),
            } : null
        }
    },
    methods: {
        stage(){
            
            const pixiDiv = document.getElementById("pixi")
            const c = Configuration.find("default")

            const pixiAppConfig = {
                "antialias": true,
                "transparent": false,
                "resolution": 1,
                "background": c.canvasColor,
                "eventMode": "static",
                "eventFeatures": {
                    "move": false,
                    "globalMove": false,
                    "click": false,
                    "wheel": false
                },
                resizeTo: pixiDiv,
                autoResize: true,
            }
            const pixi = new Application(pixiAppConfig)
            pixiDiv.appendChild(pixi.view)
            this.pixi = pixi
        },
        createAutomataData() {
            let c = Configuration.find("default")
            if(c.elementSpacing < c.canvasWidth) {

                const cols = Array.from(Array(Math.round(Number(c.canvasWidth / c.elementSpacing))).keys())
                Configuration.save({id:"default", cols:cols})

                
            }
            if(c.elementSpacing < c.canvasHeight) {
                const rows = Array.from(Array(Math.round(Number(c.canvasHeight / c.elementSpacing))).keys())
                Configuration.save({id:"default", rows:rows})
            }
            if(this.pixi){
                const canvas = document.getElementsByTagName('canvas')
                let c = Configuration.find("default")
                canvas.style.width = c.canvasWidth
                this.pixi.renderer.resize(c.canvasWidth, c.canvasHeight)
            }
        },



    },
}