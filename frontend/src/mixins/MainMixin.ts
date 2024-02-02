export default {
    name: 'MainMixin',
    data:()=>({
        appSize: {
            w: 0,
            h: 0
        }
    }),
    computed: {
        $app(): Object {
            //@ts-ignore
            return this.appSize
        }
    },
    methods: {
        $rN(c: number=10): number {
            // random number times c
            return Math.round(c*Math.random())
        },
        $rC(): string {
            // random color
            const letters = '0123456789ABCDEF'
            let color = '#'
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)]
            }
            return color
        },
        $resizedWindow(){
            return {
                w: window.innerWidth,
                h: window.innerHeight
            }
        },
        $numberTo8BitArray(integer: number) {
            const bits = new Array(8).fill(0) // Initialize an array of 8 elements
            
            for (let i = 0; i < 8; i++) {
                bits[7 - i] = (integer & 1) ? 1 : 0 // Extract the rightmost bit and assign
                integer >>= 1 // Shift right by one position
            }
            
            return bits // Return the array
        },
        $numberTo3BitArray(integer: number) {
            const bits = new Array(3).fill(0) // Initialize an array of 3 elements
            
            for (let i = 0; i < 3; i++) {
                bits[2 - i] = (integer & 1) ? 1 : 0 // Extract the rightmost bit and assign
                integer >>= 1 // Shift right by one position
            }
            
            return bits // Return the array
        },
    },
    created() {
        //@ts-ignore
        this.appSize = this.$resizedWindow()
        addEventListener("resize", ()=>{
            //@ts-ignore
            this.appSize = this.$resizedWindow()
        })
    },
    destroyed() {
        removeEventListener("resize", ()=>{
            //@ts-ignore
            this.appSize = this.$resizedWindow()
        })
    }
}