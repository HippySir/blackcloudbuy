//导入Vue
import Vue from 'vue';
// 设置路由规则
// 导入路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// 导入主页组件
import index from './components/index.vue';
// 导出购物车页面
import cart from './components/cart.vue';
// 导入详情页面
import detail from './components/detail.vue';
// 导入会员中心页面
import membercenter from './components/membercenter.vue';
// 导入个人中心页面
import people from './components/people.vue';
// 导入订单列表页面
import orderlist from './components/orderlist.vue';
// 导入订单详情页面
import orderdetial from './components/orderdetial.vue';


const routes = [
  {path:'/',component:index },
  {path:'/index',component:index},
  {path:'/cart',component:cart},
  {path:'/detail/:id',component:detail},
  {
    path:'/membercenter',
    component:membercenter,
    children:[
      {
        path:'people',
        component:people,
      },
      {
        path:'orderlist',
        component:orderlist,
      },
      {
        path:'/',
        component:orderdetial,
      },
     
    ]

},
]
// 实例化一个路由对象
const router = new VueRouter({
  routes
})

//导出路由
export default router;