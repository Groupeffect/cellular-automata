import { Application, Graphics} from 'pixi.js'
import Configuration from "@/models/automata/Configuration.js"
export default {
    name: 'PixiMixin',
    data: ()=>({
        pixi: null,
        config: null,
        grid: null,
        rowCells: null,
        graphicsMap: []
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
        }
    },
    methods: {
        changeBackgroundColor() {
            this.pixi.renderer.background.color = this.configuration.canvasColor
        },
        startApp() {
            console.log('START')
            this.config = Configuration.loadConfig(window)
            this.createAutomataData()

        },
        generateCell(col, cells) {

            
            const ruleCheck = `${cells[col-1]}${cells[col]}${cells[col+1]}`

            const ruleIndex = this.ruleSet.neighborIndexes.indexOf(ruleCheck)
            return this.ruleSet.mapping[ruleIndex]
        },
        createAutomataData() {
            console.table("create new table")
            const c = this.configuration
            const grid = []
            let cells 
            // set start array
            if(c.randomStartRow ){
                cells = this.arrayFromNumber(c.cols).map(()=>Math.random() < 0.5 ? 0 : 1)
            }

            else {
                cells = this.arrayFromNumber(c.cols).map(()=>0)
                cells[cells.length/2] = 1
            }

            const box = cells.length * c.elementSpacing
            const margin = (c.canvasWidth - box) / 2


            this.arrayFromNumber(c.rows).map(row=>{
                this.arrayFromNumber(c.cols).map(col=>{
                    let data = {
                        col: col,
                        row: row,
                        x: col * c.elementSpacing + margin,
                        y: row * c.elementSpacing ,
                        w: c.elementWidth,
                        h: c.elementHeight,
                        c: c.elementColor,
                        state: 0
                    }

                    // cell element visible
                    if( cells[col] == 1) {
                        data.state = 1
                    }

                    if(col > 0 && col < c.cols - 1){
                        cells[col] = this.generateCell(col, cells)
                    }
                    grid.push(data)
                })
            })

            this.grid = grid
            return this.grid
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
        arrayFromNumber(n) {
            return Array.from(Array(Math.round(Number(n))).keys())
        },

        element(x=0,y=0,w=10,h=10, color='rgba(255,255,255,1)', id) {            
            const rect = new Graphics()
            rect.beginFill(color)
            rect.drawRect(x,y,w,h)
            rect.endFill()
            this.graphicsMap.push({id:id, shape: rect})
            return rect
        },

        generate(element,id){
            if( this.pixi && this.pixi.stage){

                this.pixi.stage.addChild(
                    this.element(
                        element.x,
                        element.y,
                        element.w,
                        element.h,
                        element.c,
                        id
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
                            e.destroy()
                        }
                    })
                }
                this.graphicsMap = []
            }
        },


        appendShapes() {
            this.configuration.randomStartRow && this.createAutomataData()

            this.grid.map((e)=>{
                // // cell is 0 or 1
                if(e.state==1){
                    this.generate(e,`${e.row+1}${e.col}`)
                }                
            })
            console.log(this.pixi.screen)
            console.log(this.pixi.screen.height)

        },

        addShapes() {
            this.removeShapes()
            this.appendShapes()

        },
        run() {
            this.addShapes()
        }

    }
}