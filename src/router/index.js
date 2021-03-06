import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views_new/layout/Layout'

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
      meta: { title: '首页', icon: 'shouye', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // 系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/permission',
    meta: {
      title: '系统管理',
      icon: 'navicon-xtgl'
    },
    children: [
      { path: 'permission', component: _import('system/permission'), name: 'system_permission', meta: { title: '系统权限' }},
      { path: 'roles', component: _import('system/roles'), name: 'system_roles', meta: { title: '系统角色' }},
      { path: 'user', component: _import('system/user'), name: 'system_user', meta: { title: '系统用户' }},
      { path: 'param', component: _import('system/param'), name: 'system_param', meta: { title: '系统参数' }}
    ]
  },
  // 单位管理
  {
    path: '/department',
    component: Layout,
    redirect: '/department/index',
    meta: {
      title: '单位管理',
      icon: 'commpany'
    },
    children: [
      { path: 'index', component: _import('department/index'), name: 'department_index', meta: { title: '部门管理' }},
      { path: 'personnel', component: _import('department/personnel'), name: 'department_personnel', meta: { title: '员工管理' }}
    ]
  },
  // 会议管理
  {
    path: '/meeting',
    component: Layout,
    redirect: '/meeting/list',
    meta: {
      title: '会议管理',
      icon: 'huiyishi'
    },
    children: [
      { path: 'list', component: _import('meeting/list'), name: 'meeting_list', meta: { title: '会议列表' }},
      { path: 'order', component: _import('meeting/order'), name: 'meeting_order', meta: { title: '会议订单' }},
      { path: 'reason', component: _import('meeting/reason'), name: 'meeting_reason', meta: { title: '预约事由' }}
    ]
  },
  // 访客管理
  {
    path: '/visitor',
    component: Layout,
    redirect: '/visitor/index',
    meta: {
      title: '访客管理',
      icon: 'fangkeshuxing'
    },
    children: [
      { path: 'list', component: _import('visitor/list'), name: 'visitor_list', meta: { title: '访客列表' }},
      { path: 'reason', component: _import('visitor/reason'), name: 'visitor_reason', meta: { title: '访客事由' }}
    ]
  },
  // 报修管理
  {
    path: '/repair',
    component: Layout,
    redirect: '/repair/workerList',
    meta: {
      title: '报修管理',
      icon: 'baoxiu'
    },
    children: [
      { path: 'workerList', component: _import('repair/workerList'), name: 'repair_workerList', meta: { title: '维修工列表' }},
      { path: 'orderList', component: _import('repair/orderList'), name: 'repair_orderList', meta: { title: '维修单列表' }},
      { path: 'reason', component: _import('repair/reason'), name: 'repair_reason', meta: { title: '维修事由' }}
    ]
  },
  // 车辆管理
  {
    path: '/car',
    component: Layout,
    redirect: '/car/brandList',
    meta: {
      title: '车辆管理',
      icon: 'cheliang'
    },
    children: [
      { path: 'brandList', component: _import('car/brandList'), name: 'car_brandList', meta: { title: '品牌列表' }},
      { path: 'seriesList', component: _import('car/seriesList'), name: 'car_seriesList', meta: { title: '车系列表' }},
      { path: 'yearList', component: _import('car/yearList'), name: 'car_yearList', meta: { title: '年代列表' }},
      { path: 'carList', component: _import('car/carList'), name: 'car_carList', meta: { title: '车辆列表' }},
      { path: 'useCarList', component: _import('car/useCarList'), name: 'car_useCarList', meta: { title: '用车订单' }},
      { path: 'useCarReason', component: _import('car/useCarReason'), name: 'car_useCarReason', meta: { title: '用车事由' }}
    ]
  },
  // 智慧餐厅
  {
    path: '/restaurant',
    component: Layout,
    redirect: '/restaurant/foodList',
    meta: {
      title: '智慧餐厅',
      icon: 'cantingxinxi'
    },
    children: [
      { path: 'foodList', component: _import('restaurant/foodList'), name: 'restaurant_foodList', meta: { title: '菜品列表' }},
      { path: 'dayFood', component: _import('restaurant/dayFood'), name: 'restaurant_dayFood', meta: { title: '每日菜单' }}
    ]
  },
  // 内容管理
  {
    path: '/content',
    component: Layout,
    redirect: '/content/index',
    alwaysShow: true,
    meta: {
      title: '内容管理',
      icon: 'neirongwendang'
    },
    children: [
      { path: 'index', component: _import('content/index'), name: 'content_index', meta: { title: '内容管理' }}
    ]
  },
  // 消息管理
  {
    path: '/message',
    component: Layout,
    redirect: '/message/list',
    meta: {
      title: '消息管理',
      icon: 'xiaoxi'
    },
    children: [
      { path: 'list', component: _import('message/list'), name: 'message_list', meta: { title: '消息列表' }},
      { path: 'publish', component: _import('message/publish'), name: 'message_publish', meta: { title: '发布管理' }}
    ]
  },
  // 运营管理
  {
    path: '/operate',
    component: Layout,
    redirect: '/operate/startPage',
    meta: {
      title: '运营管理',
      icon: 'yunying'
    },
    children: [
      { path: 'startPage', component: _import('operate/startPage'), name: 'operate_startPage', meta: { title: '启动页管理' }},
      { path: 'feedback', component: _import('operate/feedback'), name: 'operate_feedback', meta: { title: '意见反馈' }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
