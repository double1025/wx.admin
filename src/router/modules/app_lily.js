import Layout from '../../views/layout/Layout'

const routerAppLily =
	{
		path: '/app_lily',
		component: Layout,
		meta: {
			title: '瑜伽私教-商城',
			icon: 'education'
		},
		children: [
			{
				path: '/app_lily/setting__edit',
				// name: 'app_lily',
				meta: {
					title: '通用配置'
				},
				component: () => import('@/views/app_wxapp/app_lily/setting__edit')
			},
			{
				path: '/app_lily/tea_list',
				// name: 'app_lily',
				meta: {
					title: '导师配置'
				},
				component: () => import('@/views/app_wxapp/app_lily/tea__list')
			},
			{
				path: '/app_lily/tea__edit',
				// name: 'app_lily',
				hidden: true,
				meta: {
					title: '导师编辑'
				},
				component: () => import('@/views/app_wxapp/app_lily/tea__edit')
			},
			{
				path: '/app_lily/class__list',
				// name: 'app_lily',
				meta: {
					title: '课程配置'
				},
				component: () => import('@/views/app_wxapp/app_lily/class__list')
			},
			{
				path: '/app_lily/class__edit',
				// name: 'app_lily',
				hidden: true,
				meta: {
					title: '课程编辑'
				},
				component: () => import('@/views/app_wxapp/app_lily/class__edit')
			},
			{
				path: '/app_lily/class__card__list',
				// name: 'app_lily',
				hidden: true,
				meta: {
					title: '课程-套餐卡列表'
				},
				component: () => import('@/views/app_wxapp/app_lily/class__card__list')
			},
			{
				path: '/app_lily/class__card__edit',
				// name: 'app_lily',
				hidden: true,
				meta: {
					title: '课程-套餐卡编辑'
				},
				component: () => import('@/views/app_wxapp/app_lily/class__card__edit')
			},
			{
				path: '/app_lily/class_item__card__list',
				// name: 'app_lily',
				meta: {
					title: '套餐卡列表'
				},
				component: () => import('@/views/app_wxapp/app_lily/class_item__card__list')
			},
			{
				path: '/app_lily/class_item__card__edit',
				// name: 'app_lily',
				hidden: true,
				meta: {
					title: '套餐卡编辑'
				},
				component: () => import('@/views/app_wxapp/app_lily/class_item__card__edit')
			},
			{
				path: '/app_lily/class_item__list',
				// name: 'app_lily',
				meta: {
					title: '课程预约配置'
				},
				component: () => import('@/views/app_wxapp/app_lily/class_item__list')
			},
			{
				path: '/app_lily/class_item__add',
				// name: 'app_lily',
				hidden: true,
				meta: {
					title: '预约批量操作'
				},
				component: () => import('@/views/app_wxapp/app_lily/class_item__add')
			},
			{
				path: '/app_lily/class_item__edit',
				// name: 'app_lily',
				hidden: true,
				meta: {
					title: '预约编辑'
				},
				component: () => import('@/views/app_wxapp/app_lily/class_item__edit')
			},
			{
				path: '/app_lily/order__list',
				// name: 'app_lily',
				meta: {
					title: '订单列表-课程'
				},
				component: () => import('@/views/app_wxapp/app_lily/order__list')
			},
			{
				path: '/app_lily/order__card__list',
				// name: 'app_lily',
				meta: {
					title: '订单列表-套餐卡'
				},
				component: () => import('@/views/app_wxapp/app_lily/order__card__list')
			},
			{
				path: '/app_lily/order__refund__list',
				// name: 'app_lily',
				meta: {
					title: '取消订单列表'
				},
				component: () => import('@/views/app_wxapp/app_lily/order__refund__list')
			}
		]
	}

export default routerAppLily
