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
export const constantRouterMap = [{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/404'),
		hidden: true
	},

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
	{
		path: '/example',
		component: Layout,
		redirect: '/example/table',
		name: 'Example',
		meta: {
			title: '例子',
			icon: 'example'
		},
		children: [{
				path: 'table',
				name: 'Table',
				component: () => import('@/views/table/index'),
				meta: {
					title: 'Table123',
					icon: 'table'
				}
			},
			{
				path: 'tree',
				name: 'Tree',
				component: () => import('@/views/tree/index'),
				meta: {
					title: 'Tree',
					icon: 'tree'
				}
			}
		]
	},
	{
		path: '/form',
		component: Layout,
		children: [{
			path: 'index',
			name: 'Form',
			component: () => import('@/views/form/index'),
			meta: {
				title: 'Form',
				icon: 'form'
			}
		}]
	},
	{
		path: '/test',
		component: Layout,
		// redirect: '/test/1',
		name: 'test',
		meta: {
			title: '活动相关',
			icon: 'nested'
		},
		children: [{
				path: 'prize',
				component: () => import('@/views/common/common'), // Parent router-view
				name: '我的奖品',
				meta: {
					title: '我的奖品'
				},
				children: [{
						path: 'x',
						name: '图文',
						component: () => import('@/views/prize/list'),
						meta: {
							title: '图文'
						}
					},
					{
						path: 'xx',
						name: '设置',
						component: () => import('@/views/prize/setting'),
						meta: {
							title: '设置'
						}
					},
					{
						path: 'xxx',
						name: '奖品列表',
						component: () => import('@/views/prize/list'),
						meta: {
							title: '奖品列表'
						}
					}
				]
			},
			{
				path: 'act',
				component: () => import('@/views/nested/menu1/index'), // Parent router-view
				name: '活动',
				meta: {
					title: '活动'
				},
				children: [{
						path: 'x',
						component: () => import('@/views/nested/menu1/menu1-1'),
						name: '图文',
						meta: {
							title: '图文'
						}
					},
					{
						path: 'xxx',
						name: '活动列表',
						component: () => import('@/views/nested/menu1/menu1-3'),
						meta: {
							title: '活动列表'
						}
					}
				]
			},
		]
	},
	{
		path: 'external-link',
		component: Layout,
		children: [{
			path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
			meta: {
				title: 'External Link',
				icon: 'link'
			}
		}]
	},
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
]

export const asyncRouterMap = [{
		path: '/test',
		component: Layout,
		children: [{
			path: 'index',
			name: 'test',
			component: () => import('@/views/test/index'),
			meta: {
				title: 'test',
				icon: 'form'
			}
		}]
	},
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
];


export default new Router({
	// mode: 'history', //后端支持可开
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRouterMap
})
