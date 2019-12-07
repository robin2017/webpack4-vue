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
        },
        mounted() {
            console.log('业务中区分环境:准确');
            if ('development' === process.env.NODE_ENV) {
                // 开发环境下的逻辑
                console.log('开发环境')
            } else {
                // 生产环境下
                console.log('生产环境')
            }
        }
    };
</script>
<style lang="less">
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
        padding: 20px;
        img {
            display: block;
        }
    }


</style>

