import Layout from '../../views/layout/Layout'

const router = {}

router.routerFunSign =
	{
		path: '/fun_sign',
		component: Layout,
		meta: {
			title: '积分签到',
			icon: 'fun_sign'
		},
		children: [
			{
				path: '/fun_sign/fun_sign__item__list',
				// name: 'fun_sign',
				meta: {
					title: '积分签到'
				},
				component: () => import('@/views/app/fun_sign/fun_sign__item__list')
			},
			{
				path: '/fun_sign/fun_sign__item__edit',
				// name: 'fun_sign',
				hidden: true,
				meta: {
					title: '签到编辑'
				},
				component: () => import('@/views/app/fun_sign/fun_sign__item__edit')
			},
			{
				path: '/fun_sign/fun_sign__log__list',
				// name: 'fun_sign',
				hidden: true,
				meta: {
					title: '签到记录'
				},
				component: () => import('@/views/app/fun_sign/fun_sign__log__list')
			}
		]
	}

router.routerFunMall =
	{
		path: '/fun_mall',
		component: Layout,
		meta: {
			title: '积分兑换',
			icon: 'exchange'
		},
		children: [
			{
				path: '/fun_mall/fun_mall__setting',
				// name: 'fun_mall',
				meta: {
					title: '基础配置'
				},
				component: () => import('@/views/app/fun_mall/fun_mall__setting')
			},
			{
				path: '/fun_mall/fun_mall__group__list',
				// name: 'fun_mall',
				meta: {
					title: '商品分组配置'
				},
				component: () => import('@/views/app/fun_mall/fun_mall__group__list')
			},
			{
				path: '/fun_mall/fun_mall__group__edit',
				// name: 'fun_mall',
				hidden: true,
				meta: {
					title: '分组-编辑'
				},
				component: () => import('@/views/app/fun_mall/fun_mall__group__edit')
			},
			{
				path: '/fun_mall/fun_mall__good__list',
				// name: 'fun_mall',
				meta: {
					title: '商品列表'
				},
				component: () => import('@/views/app/fun_mall/fun_mall__good__list')
			},
			{
				path: '/fun_mall/fun_mall__good__edit',
				// name: 'fun_mall',
				hidden: true,
				meta: {
					title: '商品-编辑'
				},
				component: () => import('@/views/app/fun_mall/fun_mall__good__edit')
			}
		]
	}

router.routerFun =
	{
		path: '/fun',
		component: Layout,
		meta: {
			title: '积分查询',
			icon: 'fun'
		},
		children: [
			{
				path: '/fun/fun__item__list',
				// name: 'fun',
				meta: {
					title: '积分查询'
				},
				component: () => import('@/views/app/fun/fun__item__list')
			},
			{
				path: '/fun/fun__item__add',
				// name: 'fun_mall',
				hidden: true,
				meta: {
					title: '加积分'
				},
				component: () => import('@/views/app/fun/fun__item__add')
			}
		]
	}

export default router
