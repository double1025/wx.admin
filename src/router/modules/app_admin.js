import Layout from '../../views/layout/Layout'

const routerAppAdmin =
	{
		path: '/x_app_system',
		component: Layout,
		// // name: '基础应用',
		meta: {
			title: '基础应用',
			icon: 'guide'
		},
		children: [
			{
				path: '/accsuper_admin/accsuper_admin__list',
				meta: {
					title: '超管列表',
					icon: 'accsuper_admin'
				},
				component: () => import('@/views/app_system/accsuper_admin/accsuper_admin__list')
			},
			{
				path: '/accsuper_admin/accsuper_admin__edit',
				hidden: true,
				meta: {
					title: '超管-添加'
				},
				component: () => import('@/views/app_system/accsuper_admin/accsuper_admin__edit')
			},
			{
				path: '/accsuper_admin/accsuper_admin__app__list',
				hidden: true,
				meta: {
					title: '超管关系应用-列表'
				},
				component: () => import('@/views/app_system/accsuper_admin/accsuper_admin__app__list')
			},
			{
				path: '/accsuper_admin/accsuper_admin__app__edit',
				hidden: true,
				meta: {
					title: '超管关系应用-添加'
				},
				component: () => import('@/views/app_system/accsuper_admin/accsuper_admin__app__edit')
			},
			{
				path: '/app_admin/list',
				meta: {
					title: '应用管理',
					icon: 'app_admin'
				},
				component: () => import('@/views/app_system/app_admin/list')
			},
			{
				path: '/app_admin/edit',
				hidden: true,
				meta: {
					title: '应用配置'
				},
				component: () => import('@/views/app_system/app_admin/edit')
			},
			{
				path: '/app_admin/app_admin__set__list',
				// name: 'app_admin',
				hidden: true,
				meta: {
					title: '应用属性',
					icon: 'app_admin'
				},
				component: () => import('@/views/app_system/app_admin/app_admin__set__list')
			},
			{
				path: '/app_admin/app_admin__set__edit',
				hidden: true,
				meta: {
					title: '应用属性-编辑'
				},
				component: () => import('@/views/app_system/app_admin/app_admin__set__edit')
			},
			{
				path: '/account/list',
				// name: 'account',
				meta: {
					title: '账号管理',
					icon: 'account'
				},
				component: () => import('@/views/app_system/account/list')
			},
			{
				path: '/file/file__list',
				meta: {
					title: '文件管理',
					icon: 'file'
				},
				component: () => import('@/views/app_system/file/file__list')
			},
			{
				path: '/file/file__edit',
				hidden: true,
				meta: {
					title: '文件编辑'
				},
				component: () => import('@/views/app_system/file/file__edit')
			},
			{
				path: '/view_admin/view_admin__page__list',
				meta: {
					title: '页面管理',
					icon: 'view_admin'
				},
				component: () => import('@/views/app_system/view_admin/view_admin__page__list')
			},
			{
				path: '/view_admin/view_admin__page__edit',
				hidden: true,
				meta: {
					title: '页面编辑',
				},
				component: () => import('@/views/app_system/view_admin/view_admin__page__edit')
			},
			////////
		]
	}

export default routerAppAdmin
