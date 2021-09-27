import Layout from '../../views/layout/Layout'

const routerWebsite =
	{
		path: '/website',
		component: Layout,
		meta: {
			title: '官网配置',
		},
		children: [
			{
				path: '/website_option/website__option__list',
				meta: {
					title: '官网配置项-列表'
				},
				component: () => import('@/views/app/website/website__option__list')
			},
			{
				path: '/website_option/website__option__edit',
				hidden: true,
				meta: {
					title: '官网配置项-编辑'
				},
				component: () => import('@/views/app/website/website__option__edit')
			},
			{
				path: '/website/website__item__list',
				meta: {
					title: '官网-列表'
				},
				component: () => import('@/views/app/website/website__item__list')
			},
			{
				path: '/website/website__item__edit',
				hidden: true,
				meta: {
					title: '官网配置项-编辑'
				},
				component: () => import('@/views/app/website/website__item__edit')
			},
		]
	}

export default routerWebsite
