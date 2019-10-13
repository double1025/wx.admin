import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/
export const constantRouterMap = [
  ////////登陆页
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  ////////首页
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: '/dashboard',
      component: () => import('@/views/dashboard/index'),
    }]
  },
  ////////
  {
    path: '/pwd',
    component: Layout,
    name: 'pwd',
    hidden: true,
    meta: {
      title: '修改密码',
      icon: 'form'
    },
    children: [{
      path: '/pwd',
      component: () => import('@/views/app_system/pwd/edit'),
    }]
  },
  ////////
  ////////
  //////// test page
  {
    path: '/test',
    component: Layout,
    // name: 'test',
    meta: {
      title: '测试',
      icon: 'form'
    },
    children: [
      {
        path: '/test_app',
        component: () => import('@/views/common'),
        name: '测试应用',
        meta: {
          title: '测试应用'
        },
        children: [
          {
            path: 'list',
            component: () => import('@/views/test/list'),
            meta: {
              title: '列表'
            }
          },
          {
            path: 'edit',
            component: () => import('@/views/test/edit'),
            meta: {
              title: '编辑'
            }
          }
        ]
      },
      ////////
    ]
  },
  ////////
  ////////
  //////// error page
  {
    path: '/500',
    component: () => import('@/views/err/500'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/err/404'),
    hidden: true
  },
  //要放最后面
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // },
]

//由后端控制路由
export const asyncRouterMap = [
  ////////
  {
    path: '/x_app_system',
    component: Layout,
    // name: '基础应用',
    meta: {
      title: '基础应用',
      icon: 'form'
    },
    children: [
      {
        path: '/account',
        component: () => import('@/views/common'),
        name: 'account',
        meta: {
          title: '账号管理'
        },
        children: [
          {
            path: 'list',
            component: () => import('@/views/app_system/account/list'),
            meta: {
              title: '账号管理'
            }
          },
          {
            path: 'test',
            component: () => import('@/views/app_system/account/list'),
            meta: {
              title: '账号测试'
            }
          }
        ]
      },
      ////////
    ]
  },
];


export default new Router({
  mode: 'history', //后端支持可开
  // scrollBehavior: () => ({
  //   y: 0
  // }),
  routes: constantRouterMap
})
