import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

//後台
import Login from '@/components/admin/pages/Login'
import Dashboard from '@/components/admin/Dashboard'
import Products from '@/components/admin/pages/Products'
import CustomerOrder from '@/components/admin/pages/CustomerOrders';
import CustomerCheckOut from '@/components/admin/pages/CustomerCheckOut';

//前台
import Home from '@/components/frontend/pages/Home'
import FDashboard from '@/components/frontend/Dashboard'
import Cart from '@/components/frontend/pages/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'*',
      redirect:'home',
    },
    /*
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta:{requiresAuth:true}
    },
    */
    {
      path: '/',
      name: 'FDashboard',
      components:{
          default:FDashboard,
         // Sidebar,
      },
      children:[
        {
          path: 'home',
          name: 'Home',
          component: Home,
        },
        {
          path:'cart',
          name: 'Cart',
          component: Cart,
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      meta:{requiresAuth:true},
      children:[
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta:{requiresAuth:true}
        }
      ]
    },

    /*
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children:[
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckOut',
          component: CustomerCheckOut,
        },
      ]
    }
    */
  ]
})
