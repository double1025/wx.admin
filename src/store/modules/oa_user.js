import Cookies from 'js-cookie'
import common from '@/utils/common'
import Layout from '@/views/layout/Layout'

const oa_user = {
	state: {
		page_vue: null, //页面的vue组件对象
		//用户信息
		page_user: {
			acc: null,
			routes: []
		}
	},

	mutations: {
		PageUser: (state, page_user) => {
			state.page_user = page_user
		},
		PageVue: (state, page_vue) => {
			state.page_vue = page_vue
		}
	},
	//
	actions: {
		//获取用户权限
		funcGetPageRole({ commit }) {
			console.log('funcGetPageRole')
			return new Promise((resolve, reject) => {
				//
				common.func_axios({
					url: '/center',
					data: {},
					success: function(obj) {
						// console.log(obj)
						if (obj.errcode == 0) {
							console.log('获取用户权限：成功')
							let routers = []
							let apps_r = obj.apps_r
							//根据数据库，动态生成路由
							for (let k in apps_r) {
								let v = apps_r[k]
								let app_x = {
									path: v.appr_path,
									component: Layout,
									hidden: v.appr_hidden == 1 ? true : false,
									meta: {
										title: v.appr_meta_title,
										icon: v.appr_meta_icon
									},
									children: []
								}
								for (let ck in v.children) {
									let cv = v.children[ck]
									app_x.children.push({
										path: cv.appr_path,
										name: cv.appr_id,
										hidden: cv.appr_hidden == 1 ? true : false,
										meta: {
											title: cv.appr_meta_title,
											icon: cv.appr_meta_icon
										},
										component: () => import(cv.appr_file_path)
										// component: (resolve) => require([cv.appr_file_path], resolve)
										// component: cv.appr_file_path != '' ? import(cv.appr_file_path)
										// component: () => {
										// 	return import(cv.appr_file_path)
										// }
									})
								}
								routers.push(app_x)
							}
							//
							let page_user = {
								'acc': obj.acc,
								'routes': routers
							}
							commit('PageUser', page_user)
							//
							resolve(obj)
						} else {
							obj.message = obj.data.errmsg
							reject(obj)
						}
					},
					error: function(obj) {
						reject(obj)
					}
				})
				//
			})
		},
		//退出登陆
		funcLogout({ commit, state }) {
			console.log('funcLogout')
			return new Promise((resolve, reject) => {
				common.func_axios({
					url: '/logout',
					data: {},
					success: function(obj) {
						//删除cookie
						Cookies.remove('token')
						//
						state.token = null
						commit('PageUser', {})

						let page_user = {
							acc: null,
							routes: []
						}
						commit('PageUser', page_user)

						resolve(obj)
					}
				})
				//
			})
		}
		//
	}
}

export default oa_user
