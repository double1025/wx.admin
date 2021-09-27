import Layout from '../../views/layout/Layout'

const router = {}

router.routerPlace =
	{
		path: '/place',
		component: Layout,
		meta: {
			title: '景点',
			icon: 'place'
		},
		children: [
			{
				path: '/place/place__setting',
				meta: {},
				component: () => import('@/views/app/place/place__setting')
			},
			{
				path: '/place/place__item__list',
				meta: {},
				component: () => import('@/views/app/place/place__item__list')
			},
			{
				path: '/place/place__item__edit',
				meta: {},
				component: () => import('@/views/app/place/place__item__edit')
			},
			{
				path: '/place/place__act__list',
				meta: {},
				component: () => import('@/views/app/place/place__act__list')
			},
			{
				path: '/place/place__act__edit',
				meta: {},
				component: () => import('@/views/app/place/place__act__edit')
			},
			{
				path: '/place/place__act__data__list',
				meta: {},
				component: () => import('@/views/app/place/place__act__data__list')
			},
			{
				path: '/place/place__route__list',
				meta: {},
				component: () => import('@/views/app/place/place__route__list')
			},
			{
				path: '/place/place__route__edit',
				meta: {},
				component: () => import('@/views/app/place/place__route__edit')
			}
		]
	}

export default router
