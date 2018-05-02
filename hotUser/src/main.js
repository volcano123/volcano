// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
/* import 'element-ui/lib/theme-chalk/index.css'; */
/* 重置写入element样式 */
import './element-variables.scss'
/* 调用vue-echarts */
import ECharts from 'vue-echarts/components/ECharts'
import App from './App'
import router from './router'
import 'echarts/lib/chart/line'

Vue.component('chart', ECharts)


Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
