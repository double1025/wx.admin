import Layout from '../../views/layout/Layout'

const router = {}

//评课小程序
router.routerGradeSetting =
	{
		path: '/app_grade_setting',
		component: Layout,
		meta: {
			title: '评课系统-配置',
			icon: 'system'
		},
		children: [
			{
				path: '/app_grade/app_grade__setting',
				// name: 'app_grade',
				meta: {
					title: '基础设置'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__setting')
			},
			{
				path: '/app_grade/app_grade__code__list',
				// name: 'app_grade',
				meta: {
					title: '企业代码配置'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__code__list')
			},
			{
				path: '/app_grade/app_grade__code__edit',
				// name: 'app_grade',
				hidden: true,
				meta: {
					title: '企业代码-编辑'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__code__edit')
			},
			{
				path: '/app_grade/app_grade__school__list',
				// name: 'app_grade',
				meta: {
					title: '学校配置'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__school__list')
			},
			{
				path: '/app_grade/app_grade__school__edit',
				// name: 'app_grade',
				hidden: true,
				meta: {
					title: '学校-编辑'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__school__edit')
			},
			{
				path: '/app_grade/app_grade__year__list',
				// name: 'app_grade',
				meta: {
					title: '年级配置'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__year__list')
			},
			{
				path: '/app_grade/app_grade__year__edit',
				// name: 'app_grade',
				hidden: true,
				meta: {
					title: '年级-编辑'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__year__edit')
			},
			{
				path: '/app_grade/app_grade__course__list',
				// name: 'app_grade',
				meta: {
					title: '学科配置'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__course__list')
			},
			{
				path: '/app_grade/app_grade__course__edit',
				// name: 'app_grade',
				hidden: true,
				meta: {
					title: '学科-编辑'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__course__edit')
			},
			{
				path: '/app_grade/app_grade__subject_group__list',
				// name: 'app_grade',
				meta: {
					title: '题目分组配置'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__subject_group__list')
			},
			{
				path: '/app_grade/app_grade__subject_group__edit',
				// name: 'app_grade',
				hidden: true,
				meta: {
					title: '题目分组-编辑'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__subject_group__edit')
			},
			{
				path: '/app_grade/app_grade__subject__list',
				// name: 'app_grade',
				meta: {
					title: '题库'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__subject__list')
			},
			{
				path: '/app_grade/app_grade__subject__edit',
				// name: 'app_grade',
				hidden: true,
				meta: {
					title: '题目-编辑'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__subject__edit')
			},
			{
				path: '/app_grade/app_grade__subject__add',
				// name: 'app_grade',
				hidden: true,
				meta: {
					title: '题目-导入'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__subject__add')
			},
			{
				path: '/app_grade/app_grade__school__add',
				// name: 'app_grade',
				hidden: true,
				meta: {
					title: '学校-导入'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__school__add')
			}
		]
	}

router.routerGrade =
	{
		path: '/app_grade',
		component: Layout,
		meta: {
			title: '评课系统-查询',
			icon: 'system'
		},
		children: [
			{
				path: '/app_grade/app_grade__user__list',
				// name: 'app_grade',
				meta: {
					title: '注册用户列表'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__user__list')
			},
			{
				path: '/app_grade/app_grade__room__list',
				// name: 'app_grade',
				meta: {
					title: '开课记录'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__room__list')
			},
			{
				path: '/app_grade/app_grade__room_answer__list',
				// name: 'app_grade',
				meta: {
					title: '评课记录'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__room_answer__list')
			},
			{
				path: '/app_grade/app_grade__room_answer__info__list',
				// name: 'app_grade',
				hidden: true,
				meta: {
					title: '评课详情'
				},
				component: () => import('@/views/app_wxapp/app_grade/app_grade__room_answer__info__list')
			}
		]
	}

export default router
