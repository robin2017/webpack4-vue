<template>
    <div class="App">
        <h1>{{msg}}</h1>
        <el-button type="primary">ElementUI Button</el-button>
        <img src="static/images/people.jpeg" alt="">
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
    html, body {
        height: 100%;
    }

    * {
        padding: 0;
        margin: 0;
    }

    .App {
        color: red;
        background-color: lightgray;
        padding:20px;
    }

    img {
        display: block;
    }
</style>

