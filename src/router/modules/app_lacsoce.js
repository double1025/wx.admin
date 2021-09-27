import Layout from '../../views/layout/Layout'

const router = {}

//代理管理
router.routerLacsoceUser =
	{
		path: '/app_lacsoce',
		component: Layout,
		meta: {
			title: '厘肤珍选-经销商',
			icon: 'lacsoce_logo'
		},
		children: [
			{
				path: '/app_lacsoce/app_lacsoce__pio__list',
				// name: 'app_lacsoce',
				meta: {
					title: '门店配置'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__pio__list')
			},
			{
				path: '/app_lacsoce/app_lacsoce__pio__edit',
				// name: 'app_lacsoce',
				hidden: true,
				meta: {
					title: '门店配置'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__pio__edit')
			},
			{
				path: '/app_lacsoce/app_lacsoce__level__list',
				// name: 'app_lacsoce',
				meta: {
					title: '等级配置'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__level__list')
			},
			{
				path: '/app_lacsoce/app_lacsoce__level__edit',
				// name: 'app_lacsoce',
				hidden: true,
				meta: {
					title: '等级配置'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__level__edit')
			},
			{
				path: '/app_lacsoce/app_lacsoce__level__update__list',
				// name: 'app_lacsoce',
				hidden: true,
				meta: {
					title: '升级题目列表'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__level__update__list')
			},
			{
				path: '/app_lacsoce/app_lacsoce__level__update__edit',
				// name: 'app_lacsoce',
				hidden: true,
				meta: {
					title: '添加升级题目'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__level__update__edit')
			},
			{
				path: '/app_lacsoce/app_lacsoce__user__list',
				// name: 'app_lacsoce',
				meta: {
					title: '经销商列表'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__user__list')
			},
			{
				path: '/app_lacsoce/app_lacsoce__user__edit',
				// name: 'app_lacsoce',
				hidden: true,
				meta: {
					title: '经销商编辑'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__user__edit')
			},
			{
				path: '/app_lacsoce/app_lacsoce__user_apply__list',
				// name: 'app_lacsoce',
				hidden: true,
				meta: {
					title: '申请列表'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__user_apply__list')
			},
			{
				path: '/app_lacsoce/app_lacsoce__user_apply__edit',
				// name: 'app_lacsoce',
				hidden: true,
				meta: {
					title: '审核'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__user_apply__edit')
			},
			{
				path: '/app_lacsoce/app_lacsoce__msg_group__list',
				// name: 'app_lacsoce',
				meta: {
					title: '学院资料分组列表'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__msg_group__list')
			},
			{
				path: '/app_lacsoce/app_lacsoce__msg_group__edit',
				// name: 'app_lacsoce',
				hidden: true,
				meta: {
					title: '学院资料分组-编辑'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__msg_group__edit')
			},
			{
				path: '/app_lacsoce/app_lacsoce__msg__list',
				// name: 'app_lacsoce',
				hidden: true,
				meta: {
					title: '学院资料列表'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__msg__list')
			},
			{
				path: '/app_lacsoce/app_lacsoce__msg__edit',
				// name: 'app_lacsoce',
				hidden: true,
				meta: {
					title: '学院资料-编辑'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__msg__edit')
			},
			{
				path: '/app_lacsoce/app_lacsoce__news__list',
				// name: 'app_lacsoce',
				meta: {
					title: '产品中心列表'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__news__list')
			},
			{
				path: '/app_lacsoce/app_lacsoce__news__edit',
				// name: 'app_lacsoce',
				hidden: true,
				meta: {
					title: '产品中心-编辑'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__news__edit')
			},
			{
				path: '/app_lacsoce/app_lacsoce__pio_news__list',
				// name: 'app_lacsoce',
				meta: {
					title: '门店攻略列表'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__pio_news__list')
			},
			{
				path: '/app_lacsoce/app_lacsoce__pio_news__edit',
				// name: 'app_lacsoce',
				hidden: true,
				meta: {
					title: '门店攻略-编辑'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__pio_news__edit')
			},
			{
				path: '/app_lacsoce/app_lacsoce__rule__list',
				// name: 'app_lacsoce',
				meta: {
					title: '规章制度列表'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__rule__list')
			},
			{
				path: '/app_lacsoce/app_lacsoce__rule__edit',
				// name: 'app_lacsoce',
				hidden: true,
				meta: {
					title: '规章制度编辑'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__rule__edit')
			}
		]
	}

//商品管理
router.routerLacsoceGoods =
	{
		path: '/app_lacsoce/goods',
		component: Layout,
		meta: {
			title: '厘肤珍选-商品管理',
			icon: 'lacsoce_logo'
		},
		children: [
			{
				path: '/app_lacsoce/app_lacsoce__setting',
				// name: 'app_lacsoce',
				meta: {
					title: '配置'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__setting')
			},
			{
				path: '/app_lacsoce/app_lacsoce__goods__list',
				// name: 'app_lacsoce',
				meta: {
					title: '商品列表'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__goods__list')
			},
			{
				path: '/app_lacsoce/app_lacsoce__goods__edit',
				// name: 'app_lacsoce',
				hidden: true,
				meta: {
					title: '商品编辑'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__goods__edit')
			},
			{
				path: '/app_lacsoce/app_lacsoce__code__list',
				// name: 'app_lacsoce',
				meta: {
					title: '溯源码列表'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__code__list')
			},
			{
				path: '/app_lacsoce/app_lacsoce__code__add',
				// name: 'app_lacsoce',
				hidden: true,
				meta: {
					title: '溯源码批量添加'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__code__add')
			},
			{
				path: '/app_lacsoce/app_lacsoce__code_log__list',
				// name: 'app_lacsoce',
				meta: {
					title: '溯源码日志'
				},
				component: () => import('@/views/app_wxapp/app_lacsoce/app_lacsoce__code_log__list')
			}
		]
	}

export default router
