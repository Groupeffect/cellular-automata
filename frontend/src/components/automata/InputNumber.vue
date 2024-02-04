<template>
    <div>
        <div class="inline-controls">
                  <div class="label">{{ label }}</div>
                  <button ref="instanceMinus" class="ie large-font" :title="`${label} minus`">-</button>
                  <input
                    v-model="instance"
                    ref="instanceInput"
                    class="ie" type="number"
                    :max="max"
                    :min="min"
                    :steps="steps"
                    :title="label" >
                  <button ref="instancePlus" class="ie large-font" :title="`${label} plus`">+</button>
                  <slot></slot>
        </div>
    </div>
</template>
<script>
import Configuration from "@/models/automata/Configuration.js"
export default {
    name: 'InputNumber',
    props: {
        label: String,
        min: Number,
        max: Number,
        steps: Number,
        configuration: Object,
        name: String,
        emit: Function
    },
    data: ()=>({
        instance: 1
    }),
    watch: {
        instance(){
            if(this.instance) {
                const data = {id: this.configuration.id}
                data[this.name] = this.instance
                Configuration.update(data)
                this.emit && this.emit()
            }
        }
    },
    mounted(){
        const value = this.configuration[this.name]
        this.$refs.instanceInput.value = value
        this.instance = value
        this.$refs.instancePlus.addEventListener('click',()=>{
            if(this.instance <= this.max) {
                this.$refs.instanceInput.stepUp()
                this.instance += 1
            }
        })
        this.$refs.instanceMinus.addEventListener('click',()=>{
            if(this.instance > this.min) {
                this.$refs.instanceInput.stepDown()
                this.instance -= 1
            }
            
        })
    }
}
</script>
<style scoped>
  .inline-controls {
      margin-top: 16px;
  }
 
</style>