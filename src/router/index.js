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
    hidden: true,
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
]

//由后端控制路由
export const asyncRouterMap = [
  ////////
  ////////
  ////////
  {
    path: '/setting',
    component: Layout,
    name: 'setting',
    hidden: true,
    meta: {
      title: '设置',
    },
    children: [{
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/app_system/setting/edit'),
    }]
  },
  ////////
  {
    path: '/x_app_system',
    component: Layout,
    // name: '基础应用',
    meta: {
      title: '基础应用',
      icon: 'guide'
    },
    children: [
      {
        path: '/app_admin/list',
        name: 'app_admin',
        meta: {
          title: '应用管理'
        },
        component: () => import('@/views/app_system/app_admin/list'),
      },
      {
        path: '/app_admin/edit',
        name: 'app_admin',
        hidden: true,
        meta: {
          title: '应用配置'
        },
        component: () => import('@/views/app_system/app_admin/edit'),
      },
      {
        path: '/account/list',
        name: 'account',
        meta: {
          title: '账号管理'
        },
        component: () => import('@/views/app_system/account/list'),
      },
      ////////
    ]
  },
  ////////
  ////////
  ////////
  {
    path: '/msg',
    component: Layout,
    meta: {
      title: '消息管理',
      icon: 'link'
    },
    children: [
      {
        path: '/dialog/list',
        name: 'reply',
        meta: {
          title: '对话监控'
        },
        component: () => import('@/views/app/reply/list'),
      },
      {
        path: '/reply/list',
        name: 'reply',
        meta: {
          title: '回复设置'
        },
        component: () => import('@/views/app/reply/list'),
      },
    ]
  },
  ////////
  ////////
  ////////
  {
    path: '/helper',
    component: Layout,
    meta: {
      title: '小帮手',
      icon: 'user'
    },
    children: [
      {
        path: '/cashbook/list',
        name: 'cashbook',
        meta: {
          title: '记帐本'
        },
        component: () => import('@/views/app/cashbook/list'),
      },
      {
        path: '/menu/list',
        name: 'reply',
        meta: {
          title: '智能菜单'
        },
        component: () => import('@/views/app/reply/list'),
      }
    ]
  },
  {
    path: '/wxapp',
    component: Layout,
    meta: {
      title: '选课小程序',
      icon: 'education'
    },
    children: [
      {
        path: '/wxapp_xk/user_list',
        name: 'wxapp_xk',
        meta: {
          title: '用户列表'
        },
        component: () => import('@/views/app_wxapp/wxapp_xk/user_list'),
      },
      {
        path: '/wxapp_xk/subject_list',
        name: 'wxapp_xk',
        meta: {
          title: '设置题目',
        },
        component: () => import('@/views/app_wxapp/wxapp_xk/subject_list'),
      },
      {
        path: '/wxapp_xk/subject_edit',
        name: 'wxapp_xk',
        hidden: true,
        meta: {
          title: '添加题目',
        },
        component: () => import('@/views/app_wxapp/wxapp_xk/subject_edit'),
      },
      {
        path: '/wxapp_xk/list',
        name: 'wxapp_xk',
        hidden: true,
        meta: {
          title: '统计',
        },
        component: () => import('@/views/app/reply/list'),
      }
    ]
  },
  ////////
  //要放最后面
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
];


export default new Router({
  mode: 'history', //后端支持可开
  // scrollBehavior: () => ({
  //   y: 0
  // }),
  routes: constantRouterMap
})
