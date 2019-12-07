<template>
    <div class="hello">
        <h1>{{msg}}</h1>
        <img src="static/images/people.jpeg">
        <p id="green">green</p>
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
            $('#green').green();
        }
    }
</script>

<style lang="less">
    @import '../less/app.less';

    .hello {
        color: red;
        background-color: @background-color;
        padding: 20px;
        img {
            display: block;
        }
    }
</style>