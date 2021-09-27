import Layout from '../../views/layout/Layout'

const router = {}

//评课小程序
router.routerShareTeaPio =
	{
		path: '/app_share_tea_setting',
		component: Layout,
		meta: {
			title: '店铺管理',
			icon: 'app_share_tea'
		},
		children: [
			{
				path: '/app_share_tea/app_share_tea__setting',
				// name: 'app_share_tea',
				meta: {
					title: '基础设置'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__setting')
			},
			{
				path: '/app_share_tea/app_share_tea__msg__list',
				// name: 'app_share_tea',
				meta: {
					title: '消息通知'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__msg__list')
			},
			{
				path: '/app_share_tea/app_share_tea__msg__edit',
				// name: 'app_share_tea',
				hidden: true,
				meta: {
					title: '通知发布'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__msg__edit')
			},
			{
				path: '/app_share_tea/app_share_tea__time__list',
				// name: 'app_share_tea',
				hidden: true,
				meta: {
					title: '时间点列表'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__time__list')
			},
			{
				path: '/app_share_tea/app_share_tea__time__edit',
				// name: 'app_share_tea',
				hidden: true,
				meta: {
					title: '时间点-添加'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__time__edit')
			},
			{
				path: '/app_share_tea/app_share_tea__pio__list',
				// name: 'app_share_tea',
				meta: {
					title: '店铺列表'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__pio__list')
			},
			{
				path: '/app_share_tea/app_share_tea__pio__edit',
				// name: 'app_share_tea',
				hidden: true,
				meta: {
					title: '店铺-编辑'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__pio__edit')
			},
			{
				path: '/app_share_tea/app_share_tea__room__list',
				// name: 'app_share_tea',
				meta: {
					title: '茶室列表'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__room__list')
			},
			{
				path: '/app_share_tea/app_share_tea__room__edit',
				// name: 'app_share_tea',
				hidden: true,
				meta: {
					title: '茶室-编辑'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__room__edit')
			},
			{
				path: '/app_share_tea/app_share_tea__room__time__list',
				// name: 'app_share_tea',
				hidden: true,
				meta: {
					title: '特殊时间点列表'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__room__time__list')
			},
			{
				path: '/app_share_tea/app_share_tea__room__time__edit',
				// name: 'app_share_tea',
				hidden: true,
				meta: {
					title: '特殊时间-编辑'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__room__time__edit')
			},
			{
				path: '/app_share_tea/app_share_tea__order__list',
				// name: 'app_share_tea',
				meta: {
					title: '订单中心'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__order__list')
			}
		]
	}

router.routerShareTeaAdmin =
	{
		path: '/app_share_tea',
		component: Layout,
		meta: {
			title: '加盟管理',
			icon: 'user'
		},
		children: [
			{
				path: '/app_share_tea/app_share_tea__b__setting',
				// name: 'app_share_tea',
				meta: {
					title: '基础设置'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__b__setting')
			},
			{
				path: '/app_share_tea/app_share_tea__msg__act__list',
				// name: 'app_share_tea',
				meta: {
					title: '活动申请'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__msg__act__list')
			},
			{
				path: '/app_share_tea/app_share_tea__msg__repair__list',
				// name: 'app_share_tea',
				meta: {
					title: '茶室报修'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__msg__repair__list')
			},
			{
				path: '/app_share_tea/app_share_tea__admin__list',
				// name: 'app_share_tea',
				meta: {
					title: '加盟商管理'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__admin__list')
			},
			{
				path: '/app_share_tea/app_share_tea__admin__edit',
				// name: 'app_share_tea',
				hidden: true,
				meta: {
					title: '加盟商-编辑'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__admin__edit')
			},
			{
				path: '/app_share_tea/app_share_tea__admin__record__list',
				// name: 'app_share_tea',
				meta: {
					title: '提现记录'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__admin__record__list')
			}
		]
	}

router.routerShareTeaClear =
	{
		path: '/app_share_clear',
		component: Layout,
		meta: {
			title: '保洁系统',
			icon: 'app_share_tea_clear'
		},
		children: [
			{
				path: '/app_share_tea/app_share_tea__clear__setting',
				// name: 'app_share_tea',
				meta: {
					title: '基础设置'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__clear__setting')
			},
			{
				path: '/app_share_tea/app_share_tea__clear__list',
				// name: 'app_share_tea',
				meta: {
					title: '保洁用户'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__clear__list')
			},
			{
				path: '/app_share_tea/app_share_tea__clear__edit',
				// name: 'app_share_tea',
				hidden: true,
				meta: {
					title: '保洁用户-编辑'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__clear__edit')
			},
			{
				path: '/app_share_tea/app_share_tea__clear_get__list',
				// name: 'app_share_tea',
				meta: {
					title: '工作记录'
				},
				component: () => import('@/views/app_wxapp/app_share_tea/app_share_tea__clear_get__list')
			}
		]
	}

export default router
