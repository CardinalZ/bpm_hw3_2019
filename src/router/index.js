import Vue from 'vue'
import Router from 'vue-router'
import Query from '@/components/Query'
import QueryDetail from '@/components/QueryDetail'
import Upload from '@/components/Upload'
import Login from '@/components/Login'
import PlatformManager from '../components/platform/PlatformManager'
import Merchant from '../components/merchant/Merchant'
import CommodityList from '../components/merchant/CommodityList'
import OrderList from '../components/platform/OrderList'
import AddCommodity from '../components/merchant/AddCommodity'
import CommodityDetail from '../components/commodity/CommodityDetail'
import OrderDetail from '../components/platform/OrderDetail'
import QueryAndSort from '../components/platform/QueryAndSort'
import CommodityReviewList from '../components/platform/CommodityReviewList'
import CommodityDetailReview from '../components/commodity/CommodityDetailReview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/platformManager',
      name: 'PlatformManager',
      component: PlatformManager
    }, {
      path: '/merchant',
      name: 'Merchant',
      component: Merchant
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/detail/:projectName?',
      name: 'QueryDetail',
      component: QueryDetail
    },
    {
      path: '/commodityList',
      name: 'CommodityList',
      component: CommodityList
    },
    {
      path: '/orderlist',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/addCommodity',
      name: 'AddCommodity',
      component: AddCommodity
    },
    {
      path: '/commodityDetail',
      name: 'CommodityDetail',
      component: CommodityDetail
    },
    {
      path: '/orderDetail/:id?',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/queryAndSort',
      name: 'QueryAndSort',
      component: QueryAndSort
    },
    {
      path: '/commodityReviewList',
      name: 'CommodityReviewList',
      component: CommodityReviewList
    }
  ]
})
