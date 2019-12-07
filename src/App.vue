<template>
    <div class="App">
        <h1>{{msg}}</h1>
        <el-button type="primary">ElementUI Button</el-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: 'Hello Vue'
            };
        }
    };
</script>
<style>
    .App {
        color: red;
    }
</style>

