import Layout from '../../views/layout/Layout'

const routerHelper =
	{
		path: '/helper',
		component: Layout,
		// // name: '基础应用',
		meta: {
			title: '工具箱',
			icon: 'helper'
		},
		children: [
			{
				path: '/wp_qr/wp_qr__list',
				// name: 'wp_qr',
				meta: {
					title: '小程序码',
					icon: 'wx_qr'
				},
				component: () => import('@/views/app_wxapp/wp_qr/wp_qr__list')
			},
			{
				path: '/wp_qr/wp_qr__edit',
				// name: 'wp_qr',
				hidden: true,
				meta: {
					title: '小程序码-编辑'
				},
				component: () => import('@/views/app_wxapp/wp_qr/wp_qr__edit')
			},
			{
				path: '/sheet/sheet__sheet__list',
				// name: 'sheet',
				meta: {
					title: '表单',
					icon: 'sheet'
				},
				component: () => import('@/views/app/sheet/sheet__sheet__list')
			},
			{
				path: '/sheet/sheet__sheet__edit',
				// name: 'sheet',
				hidden: true,
				meta: {
					title: '表单编辑'
				},
				component: () => import('@/views/app/sheet/sheet__sheet__edit')
			},
			{
				path: '/sheet/sheet__record__list',
				// name: 'sheet',
				hidden: true,
				meta: {
					title: '记录列表'
				},
				component: () => import('@/views/app/sheet/sheet__record__list')
			},
			{
				path: '/wp_subscribemsg/wp_subscribemsg__list',
				// name: 'wp_subscribemsg',
				meta: {
					title: '订阅消息',
					icon: 'subscribemsg'
				},
				component: () => import('@/views/app_wxapp/wp_subscribemsg/wp_subscribemsg__list')
			},
			{
				path: '/wp_subscribemsg/wp_subscribemsg__edit',
				// name: 'wp_subscribemsg',
				hidden: true,
				meta: {
					title: '订阅消息-编辑'
				},
				component: () => import('@/views/app_wxapp/wp_subscribemsg/wp_subscribemsg__edit')
			},
			{
				path: '/wp_subscribemsg/wp_subscribemsg__log__list',
				// name: 'wp_subscribemsg',
				hidden: true,
				meta: {
					title: '订阅消息-日志'
				},
				component: () => import('@/views/app_wxapp/wp_subscribemsg/wp_subscribemsg__log__list')
			},
			{
				path: '/tmplmsg/tmplmsg__list',
				// name: 'tmplmsg',
				meta: {
					title: '模板消息',
					icon: 'subscribemsg'
				},
				component: () => import('@/views/app/tmplmsg/tmplmsg__list')
			},
			{
				path: '/tmplmsg/tmplmsg__send',
				// name: 'tmplmsg',
				hidden: true,
				meta: {
					title: '模板发送'
				},
				component: () => import('@/views/app/tmplmsg/tmplmsg__send')
			},
			{
				path: '/cashbook/list',
				// name: 'cashbook',
				meta: {
					title: '记帐本'
				},
				component: () => import('@/views/app/cashbook/list')
			},
			{
				path: '/code_exchange/code_exchange__prize__list',
				// name: 'code_exchange',
				meta: {
					title: '兑换码',
					icon: 'exchange'
				},
				component: () => import('@/views/app/code_exchange/code_exchange__prize__list')
			},
			{
				path: '/code_exchange/code_exchange__code__list',
				// name: 'code_exchange',
				hidden: true,
				meta: {
					title: '兑换码'
				},
				component: () => import('@/views/app/code_exchange/code_exchange__code__list')
			},
			{
				path: '/code_exchange/code_exchange__code__edit',
				// name: 'code_exchange',
				hidden: true,
				meta: {
					title: '兑换码添加'
				},
				component: () => import('@/views/app/code_exchange/code_exchange__code__edit')
			},
			////////
		]
	}

export default routerHelper
