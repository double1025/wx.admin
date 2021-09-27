import Layout from '../../views/layout/Layout'

const routerAppMenu =
	{
		path: '/app_menu',
		component: Layout,
		// // name: '基础应用',
		meta: {
			title: '菜单查询',
			icon: 'form'
		},
		children: [
			{
				path: '/app_menu/app_menu__setting',
				// name: 'app_menu',
				meta: {
					title: '基础配置'
				},
				component: () => import('@/views/app_wxapp/app_menu/app_menu__setting')
			},
			{
				path: '/app_menu/app_menu__type__list',
				// name: 'app_menu',
				meta: {
					title: '食用方式'
				},
				component: () => import('@/views/app_wxapp/app_menu/app_menu__type__list')
			},
			{
				path: '/app_menu/app_menu__type__edit',
				// name: 'app_menu',
				hidden: true,
				meta: {
					title: '食用方式编辑'
				},
				component: () => import('@/views/app_wxapp/app_menu/app_menu__type__edit')
			},
			{
				path: '/app_menu/app_menu__type2__list',
				// name: 'app_menu',
				hidden: true,
				meta: {
					title: '烹饪方式配置'
				},
				component: () => import('@/views/app_wxapp/app_menu/app_menu__type2__list')
			},
			{
				path: '/app_menu/app_menu__type2__edit',
				// name: 'app_menu',
				hidden: true,
				meta: {
					title: '分烹饪方式编辑'
				},
				component: () => import('@/views/app_wxapp/app_menu/app_menu__type2__edit')
			},
			{
				path: '/app_menu/app_menu__type0__list',
				// name: 'app_menu',
				meta: {
					title: '过敏源'
				},
				component: () => import('@/views/app_wxapp/app_menu/app_menu__type0__list')
			},
			{
				path: '/app_menu/app_menu__type0__edit',
				// name: 'app_menu',
				hidden: true,
				meta: {
					title: '过敏源编辑'
				},
				component: () => import('@/views/app_wxapp/app_menu/app_menu__type0__edit')
			},
			{
				path: '/app_menu/app_menu__menu__list',
				// name: 'app_menu',
				meta: {
					title: '菜单列表'
				},
				component: () => import('@/views/app_wxapp/app_menu/app_menu__menu__list')
			},
			{
				path: '/app_menu/app_menu__menu__edit',
				// name: 'app_menu',
				hidden: true,
				meta: {
					title: '菜单编辑'
				},
				component: () => import('@/views/app_wxapp/app_menu/app_menu__menu__edit')
			}
			////////
		]
	}

export default routerAppMenu
