import Layout from '../../views/layout/Layout'

const routerMoney =
	{
		path: '/money',
		component: Layout,
		// // name: '基础应用',
		meta: {
			title: '钱包',
			icon: 'money'
		},
		children: [
			{
				path: '/money/money__item__list',
				// name: 'money',
				meta: {
					title: '充值项配置'
				},
				component: () => import('@/views/app_system/money/money__item__list')
			},
			{
				path: '/money/money__item__edit',
				// name: 'money',
				hidden: true,
				meta: {
					title: '充值项-编辑'
				},
				component: () => import('@/views/app_system/money/money__item__edit')
			},
			{
				path: '/money/money__add__list',
				// name: 'money',
				meta: {
					title: '充值记录',
				},
				component: () => import('@/views/app_system/money/money__add__list')
			},
			{
				path: '/money/money__record__list',
				// name: 'money',
				meta: {
					title: '操作记录',
				},
				component: () => import('@/views/app_system/money/money__record__list')
			},
			////////
		]
	}

export default routerMoney
