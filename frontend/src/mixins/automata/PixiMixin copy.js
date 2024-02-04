import { Application, Graphics} from 'pixi.js'
import Configuration from "@/models/automata/Configuration.js"
export default {
    name: 'PixiMixin',
    data: ()=>({
        pixi: null,
        config: null,
        // canvasWidth: null,
        // canvasHeight: null,
        // canvasColor: '#000000',
        // rule: 57,
        // elementColor: '#000000',
        // elementSpacing: 10
    }),
    computed: {
        ruleSet(){
            const c = Configuration.find("default")
            return c && c.rule ? {
                neighborIndexes: ["000","001","010","011","100","101","110","111"],
                mapping: this.$numberTo8BitArray(c.rule),
            } : null
        },
        updated() {
            return this.configuration && this.configuration.updated
        },
        configuration() {
            return Configuration.find("default")
        },
        canvasStyle(){
            const c = this.configuration
            return {
              width: c && c.canvasWidth ? String(c.canvasWidth) + 'px' : "100px",
              height: c && c.canvasHeight ? String(c.canvasHeight) + 'px' : "100px",
              backgroundColor: c && c.pixiDivBackgroundColor ? c.pixiDivBackgroundColor : "#000000",
            }
          }
    },
    watch:{
        updated() {
            console.log("updated")
            Configuration.update(this.config)
        },

        // canvasWidth() {
        //     this.update({id:"default", canvasWidth: this.canvasWidth})
        //     this.createAutomataData()
        // },
        // canvasHeight() {
        //     this.update({id:"default", canvasHeight: this.canvasHeight})
        //     this.createAutomataData()
        // },
        // rule() {
        //     this.update({id:"default", rule: this.rule})
        // },
        // elementColor() {
        //     this.update({id:"default", elementColor: this.elementColor})
        // },
        // canvasColor() {
        //     this.update({id:"default", canvasColor: this.canvasColor})
        // },
        // elementSpacing() {
        //     this.update({id:"default", elementSpacing: this.elementSpacing})
        //     this.createAutomataData()
        // },
        
    },
    methods: {
        startApp() {
            console.log('START')
            this.config = Configuration.loadConfig(window)
            this.createAutomataData()
        },

        stage(){
            
            const pixiDiv = document.getElementById("pixi")
            const c = Configuration.find("default")

            const pixiAppConfig = {
                "antialias": true,
                "transparent": true,
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
            this.pixi = new Application(pixiAppConfig)
            pixiDiv.appendChild(this.pixi.view)
            return this.pixi
        },
        createAutomataData(id="default") {
            let c = Configuration.find(id)
            if(c.elementSpacing < c.canvasWidth) {

                const cols = Array.from(Array(Math.round(Number(c.canvasWidth / c.elementSpacing))).keys())
                Configuration.save({id:id, cols:cols})

                
            }
            if(c.elementSpacing < c.canvasHeight) {
                const rows = Array.from(Array(Math.round(Number(c.canvasHeight / c.elementSpacing))).keys())
                Configuration.save({id:id, rows:rows})
            }
        },
        element(x=0,y=0,w=10,h=10, color='rgba(255,255,255,1)') {            
            const rect = new Graphics()
            rect.beginFill(color)
            rect.drawRect(x,y,w,h)
            rect.endFill()
            
            return rect
        },

        generate(config, col, row){
            if( this.pixi && this.pixi.stage){

                this.pixi.stage.addChild(
                    this.element(
                        col * config.elementSpacing,
                        row * config.elementSpacing,
                        config.elementWidth,
                        config.elementHeight,
                        Math.random() <= 0.5 ? this.$rC() : config.elementColor,
                    )
                )
            }
        },

        removeShapes() {
            if(this.pixi && this.pixi.stage && this.pixi.stage.children){

                const graphics = [...this.pixi.stage.children]
                if(graphics.length){
                    graphics.map(e=>{
                        if( e instanceof Graphics) {
                            // app.removeChild(e)
                            e.destroy()
                        }
                    })
                }
            }

        },

        addShapes() {
            const c = this.configuration
            const cells = c.cols.map(()=>Math.random() < 0.5 ? 0 : 1)
            this.removeShapes()

            c.rows.map(row=>{
                c.cols.map(col=>{
                    
                    if( cells[col] == 1 ) {
                        this.generate(c,col,row)
                    }
                    
                    if(col > 0 && col < c.cols.length - 1){

                        const ruleCheck = `${cells[col-1]}${cells[col]}${cells[col+1]}`
                        const ruleIndex = this.ruleSet.neighborIndexes.indexOf(ruleCheck)
                        cells[col] = this.ruleSet.mapping[ruleIndex]
                    }

                })
            })

        },
        run() {
            Configuration.update(this.configuration)
            setTimeout(() => {
                this.addShapes()
             }, 1000);
        }

    },

//     mounted() {
//         this.stage()

//         // this.canvasWidth = this.configuration.canvasWidth
//         // this.canvasHeight = this.configuration.canvasHeight
//         // this.rule = this.configuration.rule
//         this.$refs.ruleInput.value = this.configuration.rule
//         this.$refs.rulePlus.addEventListener('click',()=>{
//             if(this.config.rule <= 254) {
//                 this.$refs.ruleInput.stepUp()
//                 this.config.rule += 1
//                 this.update(this.config)
//             }
            
//         })
        
//         this.$refs.ruleMinus.addEventListener('click',()=>{
//             if(this.config.rule > 0) {
//                 this.$refs.ruleInput.stepDown()
//                 this.config.rule -= 1
//             }
            
//         })
        
//         // this.elementSpacing = this.configuration.elementSpacing
//         this.$refs.spacingInput.value = this.configuration.elementSpacing
//         this.$refs.spacingPlus.addEventListener('click',()=>{
//             if(this.config.elementSpacing <= 254) {
//                 this.$refs.spacingInput.stepUp()
//                 this.config.elementSpacing += 1
//             }
            
//         })

//         this.$refs.spacingMinus.addEventListener('click',()=>{
//             if(this.config.elementSpacing >= 35) {
//                 this.$refs.spacingInput.stepDown()
//                 this.config.elementSpacing -= 1
//             }
            
//         })
        
//         this.run()
//   },
}