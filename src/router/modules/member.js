import Layout from '../../views/layout/Layout'

const routerMember =
	{
		path: '/member',
		component: Layout,
		meta: {
			title: '会员',
			icon: 'member'
		},
		children: [
			{
				path: '/member/member__set__list',
				// name: 'member',
				meta: {
					title: '等级配置'
				},
				component: () => import('@/views/app/member/member__set__list')
			},
			{
				path: '/member/member__set__edit',
				// name: 'member',
				hidden: true,
				meta: {
					title: '等级编辑 '
				},
				component: () => import('@/views/app/member/member__set__edit')
			},
			{
				path: '/member/member__user__list',
				// name: 'member',
				meta: {
					title: '会员列表'
				},
				component: () => import('@/views/app/member/member__set__list')
			},
			////////
		]
	}

export default routerMember
