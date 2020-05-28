<template>
<v-alert type="error" class="container" width="550" dismissible @input="onClose" :value="true">
    {{text}}
</v-alert>
</template>

<script>
export default {
    props:['text'],
    methods:{
        onClose () {
            this.$emit('dismissed')
        }
    }
}
</script>

<style scoped>
    .container {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
</style>