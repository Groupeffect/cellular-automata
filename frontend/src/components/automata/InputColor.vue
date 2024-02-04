<template>
    <input :id="label"  v-model="instance" ref="instanceInput" class="ie" type="color" :title="label" >
</template>
<script>
import Configuration from "@/models/automata/Configuration.js"
export default {
    name: 'InputColor',
    props: {
        label: String,
        configuration: Object,
        name: String,
        emit: Function,
        min: Number,
        max: Number,
        steps: Number,
    },
    data: ()=>({
        instance: "#ffffff"
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
