<template>
    <div>
        {{ label }}
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'ElementMenu',
    props: {
        label: String
    },
    components: {},
    data: ()=>({}),
    computed: {},
    methods: {},
    created(){}
}
</script>
<style>
</style>