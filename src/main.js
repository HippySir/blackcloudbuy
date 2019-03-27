import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 导入文件的样式
import './assets/statics/site/css/style.css'
// 导入路由
import VueRouter from 'vue-router';
// 导入主页组件
import index from './components/index.vue'
// 导出购物车页面
import cart from './components/cart.vue'
Vue.use(VueRouter);
// 设置路由规则
const routes = [
  {path:'/',component:index },
  {path:'/index',component:index},
  {path:'/cart',component:cart},
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
