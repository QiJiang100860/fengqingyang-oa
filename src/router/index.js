import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // 账号管理-权限分配
  {
    path: '/permission_management',
    component: Layout,
    redirect: '/permission_management/index',
    alwaysShow: true,
    meta: {
      title: '权限管理',
      icon: 'chart'
    },
    children: [{
      path: 'index',
      component: _import('permission_management/index'),
      name: 'permission_management',
      meta: {
        title: '权限分配',
        icon: 'lock'
      }
    }]
  },
  // 内容管理
  {
    path: '/page_management',
    component: Layout,
    redirect: '/page_management/index',
    meta: {
      title: '内容管理',
      icon: 'chart'
    },
    children: [
      { path: 'page_column', component: _import('page_management/page_column'), name: 'page_column', meta: { title: '栏目管理' }},
      { path: 'page_add', component: _import('page_management/page_add'), name: 'page_add', meta: { title: '内容添加' }},
      { path: 'index', component: _import('page_management/index'), name: 'page_management', meta: { title: '内容管理' }},
      { path: 'page_custom', component: _import('page_management/page_custom'), name: 'page_custom', meta: { title: '分类管理自定义' }}
    ]
  },
  // 通知消息模块
  {
    path: '/message',
    component: Layout,
    redirect: '/message/index',
    meta: {
      title: '通知消息',
      icon: 'chart'
    },
    children: [
      { path: 'index', component: _import('message/index'), name: 'message', meta: { title: '发布通知' }},
      { path: 'message_operation', component: _import('message/message_operation'), name: 'message_operation', meta: { title: '操作' }},
      { path: 'message_infro', component: _import('message/message_infro'), name: 'message_infro', meta: { title: '消息', roles: ['admin'] }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]