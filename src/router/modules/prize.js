import Layout from '../../views/layout/Layout'

const routerPrize =
	{
		path: '/prize',
		component: Layout,
		meta: {
			title: '奖品',
			icon: 'prize'
		},
		children: [
			{
				path: '/prize/prize__list',
				// name: 'prize',
				meta: {
					title: '奖品列表'
				},
				component: () => import('@/views/app_system/prize/prize__list')
			},
			{
				path: '/prize/prize__set__list',
				// name: 'prize',
				hidden: true,
				meta: {
					title: '奖品配置'
				},
				component: () => import('@/views/app_system/prize/prize__set__list')
			}
			////////
		]
	}

export default routerPrize
