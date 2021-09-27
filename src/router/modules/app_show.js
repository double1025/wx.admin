import Layout from '../../views/layout/Layout'

const routerAppShow =
	{
		path: '/app_show',
		component: Layout,
		meta: {
			title: '展示作品',
			icon: 'app_show'
		},
		children: [
			{
				path: '/app_show/app_show__setting',
				// name: 'app_show',
				meta: {
					title: '通用配置'
				},
				component: () => import('@/views/app_wxapp/app_show/app_show__setting')
			},
			{
				path: '/app_show/app_show__item__list',
				// name: 'app_show',
				meta: {
					title: '作品'
				},
				component: () => import('@/views/app_wxapp/app_show/app_show__item__list')
			},
			{
				path: '/app_show/app_show__item__edit',
				// name: 'app_show',
				hidden: true,
				meta: {
					title: '作品编辑'
				},
				component: () => import('@/views/app_wxapp/app_show/app_show__item__edit')
			}
		]
	}

export default routerAppShow
