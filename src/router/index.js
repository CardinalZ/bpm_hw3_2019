import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import(`../views/Login`)
    },
    {
      path: '/frame',
      component: () => import(`../views/frame`),
      children: [
        {
          path: '/platformManager',
          name: 'PlatformManager',
          component: () => import('../components/platform/PlatformManager')
        },
        {
          path: '/merchant',
          name: 'Merchant',
          component: () => import('../components/merchant/Merchant')
        },

        {
          path: '/detail/:projectName?',
          name: 'QueryDetail',
          component: () => import(`../components/QueryDetail`)
        },
        {
          path: '/commodityList',
          name: 'CommodityList',
          component: () => import('../components/merchant/CommodityList')
        },
        {
          path: '/orderlist/',
          name: 'OrderList',
          component: () => import('../components/merchant/OrderList')
        },
        {
          path: '/addCommodity',
          name: 'AddCommodity',
          component: () => import('../components/merchant/AddCommodity')
        },
        {
          path: '/commodityDetail/:id?',
          name: 'CommodityDetail',
          component: () => import('../components/commodity/CommodityDetail')
        },
        {
          path: '/orderDetail/:id?',
          name: 'OrderDetail',
          component: () => import('../components/merchant/OrderDetail')
        },
        {
          path: '/queryAndSort',
          name: 'QueryAndSort',
          component: () => import('../components/platform/QueryAndSort')
        },
        {
          path: '/commodityReviewList',
          name: 'CommodityReviewList',
          component: () => import('../components/platform/CommodityReviewList')
        }
      ]
    },
  ]
})
