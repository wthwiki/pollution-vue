import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
const app = createApp(App)
installElementPlus(app)
import VueParticles from 'vue-particles'
import directives from '@/directive'
// import * as echarts from 'echarts'
// import dataV from '@jiaminghi/data-view'
// import Vue from 'vue'
// Vue.use(dataV)

app
    .use(store)
    .use(router)
    // .use(dataV)
    .use(ElementPlus)
    .use(VueParticles);
    
// app.config.globalProperties.$echarts = echarts;
// this.$echarts.init(document.getElementById('chart-id'))
//安装所有的自定义指令
for(let key in directives){
    app.directive(key,directives[key]);
}


app.mount('#app')