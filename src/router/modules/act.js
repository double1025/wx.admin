import Layout from '../../views/layout/Layout'

const routerAct =
	{
		path: '/act',
		component: Layout,
		meta: {
			title: '活动',
			icon: 'act'
		},
		children: [
			{
				path: '/act/act__item__list',
				// name: 'act',
				meta: {
					title: '活动列表'
				},
				component: () => import('@/views/app/act/act__item__list')
			},
			{
				path: '/act/act__item__edit',
				// name: 'act',
				hidden: true,
				meta: {
					title: '活动编辑'
				},
				component: () => import('@/views/app/act/act__item__edit')
			},
			{
				path: '/act/act__launch__list',
				// name: 'act',
				hidden: true,
				meta: {
					title: '发起数据'
				},
				component: () => import('@/views/app/act/act__launch__list')
			},
		]
	}

export default routerAct
