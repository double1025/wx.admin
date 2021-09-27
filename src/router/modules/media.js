import Layout from '../../views/layout/Layout'

const routerMedia =
	{
		path: '/media',
		component: Layout,
		meta: {
			title: '素材',
			icon: 'media'
		},
		children: [
			{
				path: '/media/media__list',
				// name: 'media',
				meta: {
					title: '配置素材'
				},
				component: () => import('@/views/app/media/media__list')
			},
			{
				path: '/media/media__edit',
				// name: 'media',
				hidden: true,
				meta: {
					title: '素材编辑'
				},
				component: () => import('@/views/app/media/media__edit')
			},
			{
				path: '/media/media__add',
				// name: 'media',
				hidden: true,
				meta: {
					title: '素材批量添加'
				},
				component: () => import('@/views/app/media/media__add')
			},
		]
	}

export default routerMedia
