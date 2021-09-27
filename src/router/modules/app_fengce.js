import Layout from '../../views/layout/Layout'

const router = {}

//评课小程序
router.routerAppFengceMsg =
	{
		path: '/app_fengce_setting',
		component: Layout,
		meta: {
			title: '文章管理',
			icon: 'app_fengce'
		},
		children: [
			{
				path: '/app_fengce/app_fengce__setting',
				// name: 'app_fengce',
				meta: {
					title: '基础设置'
				},
				component: () => import('@/views/app_wxapp/app_fengce/app_fengce__setting')
			},
			{
				path: '/app_fengce/app_fengce__msg__news__list',
				// name: 'app_fengce',
				meta: {
					title: '最新新闻'
				},
				component: () => import('@/views/app_wxapp/app_fengce/app_fengce__msg__news__list')
			},
			{
				path: '/app_fengce/app_fengce__msg__edit',
				// name: 'app_fengce',
				hidden: true,
				meta: {
					title: '文章-编辑'
				},
				component: () => import('@/views/app_wxapp/app_fengce/app_fengce__msg__edit')
			},
			{
				path: '/app_fengce/app_fengce__msg__pro__list',
				// name: 'app_fengce',
				meta: {
					title: '政策解读'
				},
				component: () => import('@/views/app_wxapp/app_fengce/app_fengce__msg__pro__list')
			},
			{
				path: '/app_fengce/app_fengce__msg__rule_type__list',
				// name: 'app_fengce',
				meta: {
					title: '政策法规'
				},
				component: () => import('@/views/app_wxapp/app_fengce/app_fengce__msg__rule_type__list')
			},
			{
				path: '/app_fengce/app_fengce__msg__rule_type__edit',
				// name: 'app_fengce',
				hidden: true,
				meta: {
					title: '政策法规-分类编辑'
				},
				component: () => import('@/views/app_wxapp/app_fengce/app_fengce__msg__rule_type__edit')
			},
			{
				path: '/app_fengce/app_fengce__msg__rule__list',
				// name: 'app_fengce',
				hidden: true,
				meta: {
					title: '政策法规'
				},
				component: () => import('@/views/app_wxapp/app_fengce/app_fengce__msg__rule__list')
			}
		]
	}

export default router
