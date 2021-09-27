import Layout from '../../views/layout/Layout'

const routerCoupon =
	{
		path: '/coupon',
		component: Layout,
		meta: {
			title: '优惠券',
			icon: 'coupon'
		},
		children: [
			{
				path: '/coupon/coupon__set__list',
				// name: 'coupon',
				meta: {
					title: '配置'
				},
				component: () => import('@/views/app_system/coupon/coupon__set__list')
			},
			{
				path: '/coupon/coupon__join__list',
				// name: 'coupon',
				hidden: true,
				meta: {
					title: '关联列表'
				},
				component: () => import('@/views/app_system/coupon/coupon__join__list')
			},
			{
				path: '/coupon/coupon__join__edit',
				// name: 'coupon',
				hidden: true,
				meta: {
					title: '添加关联'
				},
				component: () => import('@/views/app_system/coupon/coupon__join__edit')
			},
			{
				path: '/coupon/coupon__record__list',
				// name: 'coupon',
				meta: {
					title: '领取记录'
				},
				component: () => import('@/views/app_system/coupon/coupon__record__list')
			}
			////////
		]
	}

export default routerCoupon
