import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/Goods/Goods'
import Comments from '@/components/Comments/Comments'
import Detail from '@/components/Detail/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    /*{
      path: '/',
      redirect:'/goods'
    },*/
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/comments',
      component: Comments
    },
    {
      path: '/detail',
      component: Detail
    }
  ]
})

