import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import home from '@/view/home'
import other from '@/view/other'
import person from '@/view/person'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home,
      meta: { isBlock: true , isHeaderBlock: false}
    },
    {
      path: '/other',
      component: other,
      meta: { isBlock: false, isHeaderBlock: true}
    },
    {
      path: '/person',
      component: person,
      meta: { isBlock: false ,isHeaderBlock: true}
    }
  ]
})
