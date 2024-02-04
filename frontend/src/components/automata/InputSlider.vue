<template>
    <input
    v-model="instance"
    ref="instanceInput"
    class="ie"
    type="range"
    :title="label"
    :max="max"
    :min="min"
    :steps="steps" >
</template>
<script>
import Configuration from "@/models/automata/Configuration.js"
export default {
    name: 'InputSlider',
    props: {
        label: String,
        configuration: Object,
        name: String,
        emit: Function,
        min: Number,
        max: Number,
        steps: Number
    },
    data: ()=>({
        instance: true
    }),
    watch: {
        instance(){
            const data = {id: this.configuration.id}
            data[this.name] = this.instance
            Configuration.update(data)
            this.emit && this.emit()
        }
    },
    mounted(){
        const value = this.configuration[this.name]
        this.$refs.instanceInput.value = value
        this.instance = value
    }
}
</script>
<style scoped>
  .inline-controls {
      margin-top: 16px;
  }
 
</style>