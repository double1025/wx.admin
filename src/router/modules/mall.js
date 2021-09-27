import Layout from '../../views/layout/Layout'

const router = {}

//商品配置
router.routerMallSetting =
	{
		path: '/mall',
		component: Layout,
		meta: {
			title: '商城商品配置',
			icon: 'mall'
		},
		children: [
			{
				path: '/mall/mall__setting',
				// name: 'mall',
				meta: {
					title: '商城首页配置'
				},
				component: () => import('@/views/app/mall/mall__setting')
			}
		]
	}

//商城-订单管理
router.routerMallOrder =
	{
		path: '/media',
		component: Layout,
		meta: {
			title: '商城-订单管理',
			icon: 'mall'
		},
		children: [
			{
				path: '/mall/mall__order',
				// name: 'mall',
				meta: {
					title: '订单列表'
				},
				component: () => import('@/views/app/media/media__list')
			}
		]
	}

export default router
