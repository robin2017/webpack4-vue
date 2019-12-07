//vue文件
import Vue from 'vue'
import router from './router'
import App from './App.vue'
import './jqPlugin/jqGreen'

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

