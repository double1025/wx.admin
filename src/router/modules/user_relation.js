import Layout from '../../views/layout/Layout'

const routerUserRelation =
	{
		path: '/user_relation',
		component: Layout,
		// // name: '基础应用',
		meta: {
			title: '用户邀请',
			icon: 'user'
		},
		children: [
			{
				path: '/user_relation/user_relation__setting',
				// name: 'user_relation',
				meta: {
					title: '基础设置'
				},
				component: () => import('@/views/app_system/user_relation/user_relation__setting')
			},
			{
				path: '/user_relation/user_relation__item__list',
				// name: 'user_relation',
				meta: {
					title: '邀请海报'
				},
				component: () => import('@/views/app_system/user_relation/user_relation__item__list')
			},
			{
				path: '/user_relation/user_relation__item__edit',
				// name: 'user_relation',
				hidden: true,
				meta: {
					title: '邀请海报-编辑'
				},
				component: () => import('@/views/app_system/user_relation/user_relation__item__edit')
			},
			{
				path: '/user_relation/user_relation__inv__list',
				// name: 'user_relation',
				meta: {
					title: '邀请记录'
				},
				component: () => import('@/views/app_system/user_relation/user_relation__inv__list')
			},
			////////
		]
	}

export default routerUserRelation
