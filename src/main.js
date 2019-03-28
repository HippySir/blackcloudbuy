import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 导入文件的样式
import './assets/statics/site/css/style.css';
// 导入路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// 导入主页组件
import index from './components/index.vue';
// 导出购物车页面
import cart from './components/cart.vue';
// 导入详情页面
import detail from './components/detail.vue';
// 设置全局的axios

import axios from 'axios';
Vue.prototype.$axios = axios;
// 设置基地址
axios.defaults.baseURL = 'http://111.230.232.110:8899';
// 引入commit文件
 import moment from 'moment';
// 设置全局的过滤器
Vue.filter('globalFilters',function(value,fltemplate){
  if(fltemplate){
    return moment(value).format(fltemplate);
  }else{
    return moment(value).format('YYYY-MM-DD');
  }
})
// 安装饿了吗MIUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 设置路由规则
const routes = [
  {path:'/',component:index },
  {path:'/index',component:index},
  {path:'/cart',component:cart},
  {path:'/detail/:id',component:detail}
]
// 实例化一个路由对象
const router = new VueRouter({
  routes
})
new Vue({
  el:'#app',
  render: h => h(App),
  router,
});

