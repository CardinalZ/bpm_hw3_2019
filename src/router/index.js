import Vue from 'vue'
import Router from 'vue-router'
import Query from '@/components/Query'
import QueryDetail from '@/components/QueryDetail'
import Upload from '@/components/Upload'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/query',
      name: 'Query',
      component: Query
    }, {
      path: '/upload',
      name: 'Upload',
      component: Upload
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
    }
  ]
})
