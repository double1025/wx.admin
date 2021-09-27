import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* 通用应用 */
import Layout from '../views/layout/Layout'
import routerAppAdmin from './modules/app_admin'
import routerAppLily from './modules/app_lily'
import routerMedia from './modules/media'
import routerMall from './modules/mall'
import routerAct from './modules/act'
import routerPrize from './modules/prize'
import routerFun from './modules/fun'
import routerMoney from './modules/money'
import routerCoupon from './modules/coupon'
import routerHelper from './modules/helper'
import routerMember from './modules/member'
import routerUserRelation from './modules/user_relation'
import routerWebsite from './modules/website'

//定制应用
import routerLacsoce from './modules/app_lacsoce'
import routerGrade from './modules/app_grade'
import routerShareTea from './modules/app_share_tea'
import routerAppMenu from './modules/app_menu'
import routerAppFengceMsg from './modules/app_fengce'
import routerAppShow from './modules/app_show'
import routerPlace from './modules/place'

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
		// name: 'Dashboard',
		hidden: true,
		children: [{
			path: '/dashboard',
			component: () => import('@/views/dashboard/index')
		}]
	},
	////////
	////////
	//////// test page
	{
		path: '/test',
		component: Layout,
		// // name: 'test',
		meta: {
			title: '测试',
			icon: 'form'
		},
		hidden: true,
		children: [
			{
				path: '/test_app',
				component: () => import('@/views/common'),
				// name: '测试应用',
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
			}
			////////
		]
	},
	////////
	////////
	//////// error page
	{
		path: '/302',
		component: () => import('@/views/err/302'),
		hidden: true
	},
	{
		path: '/500',
		component: () => import('@/views/err/500'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/err/404'),
		hidden: true
	}
]

//由后端控制路由
export const asyncRouterMap = [
	////////
	////////
	////////
	{
		path: '/pwd__edit',
		component: Layout,
		hidden: true,
		meta: {
			title: '修改密码'
		},
		children: [{
			path: '/pwd__edit',
			// name: 'pwd',
			component: () => import('@/views/app_system/pwd/pwd__edit')
		}]
	},
	////////
	{
		path: '/setting',
		component: Layout,
		hidden: true,
		meta: {
			title: '设置'
		},
		children: [{
			path: '/setting',
			// name: 'setting',
			component: () => import('@/views/app_system/setting/edit')
		}]
	},
	////////
	{
		path: '/sys_log',
		component: Layout,
		hidden: true,
		meta: {
			title: '系统'
		},
		children: [
			{
				path: '/sys_log__list',
				// // name: 'sys_log_0',
				component: () => import('@/views/app_system/sys_log/sys_log__list')
			},
			{
				path: '/sys_log__job__list',
				// // name: 'sys_log_1',
				component: () => import('@/views/app_system/sys_log/sys_log__job__list')
			}
		]
	},
	{
		path: '/user',
		component: Layout,
		meta: {
			title: '用户管理',
			icon: 'user'
		},
		children: [
			{
				path: '/user/user__list',
				// name: 'user',
				meta: {
					title: '用户列表'
				},
				component: () => import('@/views/app_system/user/user__list')
			},
			{
				path: '/user/user__edit',
				// name: 'user',
				hidden: true,
				meta: {
					title: '用户详情'
				},
				component: () => import('@/views/app_system/user/user__edit')
			}
		]
	},
	////////
	//应用管理
	routerAppAdmin,
	////////
	//官网
	routerWebsite,
	////////
	//景点
	routerPlace.routerPlace,
	////////
	//共享茶室
	routerShareTea.routerShareTeaPio,
	////////
	//表单管理
	routerHelper,
	////////
	//素材
	routerMedia,
	////////
	//活动
	routerAct,
	//宝箱
	routerPrize,
	////////
	//钱包
	routerMoney,
	////////
	//优惠券
	routerCoupon,
	////////
	//用户激请
	routerUserRelation,
	////////
	//商城
	routerMall.routerMallSetting,
	routerMall.routerMallOrder,
	////////
	//积分系统
	//积分查询
	routerFun.routerFun,
	//积分签到
	routerFun.routerFunSign,
	//积分兑换
	routerFun.routerFunMall,
	////////
	////////
	//会员
	routerMember,
	////////
	////////
	{
		path: '/msg',
		component: Layout,
		meta: {
			title: '消息管理',
			icon: 'msg'
		},
		children: [
			{
				path: '/dialog/list',
				// name: 'dialog',
				meta: {
					title: '对话监控'
				},
				component: () => import('@/views/app/reply/list')
			},
			{
				path: '/reply/list',
				// name: 'reply',
				meta: {
					title: '回复设置'
				},
				component: () => import('@/views/app/reply/list')
			}
		]
	},
	////////
	////////
	////////
	{
		path: '/qr',
		component: Layout,
		meta: {
			title: '二维码',
			icon: 'qr_code'
		},
		children: [
			{
				path: '/qr/list',
				// name: 'qr',
				meta: {
					title: '二维码'
				},
				component: () => import('@/views/app/qr/list')
			},
			{
				path: '/qr/edit',
				// name: 'qr',
				hidden: true,
				meta: {
					title: '二维码-编辑'
				},
				component: () => import('@/views/app/qr/edit')
			}
		]
	},
	////////
	////////
	//菜单查询
	routerAppMenu,
	////////
	////////
	//共享茶室系统
	routerShareTea.routerShareTeaAdmin,
	routerShareTea.routerShareTeaClear,
	////////
	////////
	////////
	//文章系统
	routerAppFengceMsg.routerAppFengceMsg,
	////////
	////////
	////////
	//瑜伽预约系统
	routerAppLily,
	////////
	////////
	////////
	//lacsoce
	routerLacsoce.routerLacsoceUser,
	routerLacsoce.routerLacsoceGoods,
	////////
	////////
	////////
	//评课系统
	routerGrade.routerGradeSetting,
	routerGrade.routerGrade,
	////////
	////////
	////////
	//作品展示
	routerAppShow,
	////////
	////////
	//要放最后面
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
]

export const asyncRoutes = [
	//要放最后面
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
]

// export default new Router({
// 	mode: 'history', //后端支持可开
// 	// scrollBehavior: () => ({
// 	//   y: 0
// 	// }),
// 	routes: constantRouterMap
// })

const createRouter = () => new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
