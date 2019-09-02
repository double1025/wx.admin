import Cookies from 'js-cookie'
import common from '@/utils/common'

const oa_user = {
	state: {
		token: null,
		page_role: {
			acc: {},
			apps: null
		}, //权限页面
		page_vue: null, //页面的vue组件对象
	},

	mutations: {
		PageRole: (state, page_role) => {
			state.page_role = page_role
		},
		PageVue: (state, page_vue) => {
			state.page_vue = page_vue
		},
		Token: (state) => {
			let token = Cookies.get('token')
			state.token = token
		}
	},
	//
	actions: {
		//获取用户权限
		funcGetPageRole({
			commit
		}) {
			console.log('funcGetPageRole')
			return new Promise((resolve, reject) => {
				//
				common.func_axios({
					url: '/oa/center/init',
					data: {},
					success: function(obj) {
						console.log(obj)
						if (obj.data.errcode == 0) {
							console.log('获取用户权限：成功')
							commit('PageRole', obj.data.return_data)
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
		funcLogout({
			commit,
			state
		}) {
			console.log('funcLogout')
			//
			common.func_axios({
				url: '/oa/logout',
				data: {},
				success: function(obj) {
					let data = {
						token: '',
						OA__acc_name: '',
						OA__acc_role: '',
					}
					//删除cookie
					for (let key in data) {
						Cookies.remove(key)
					}
					//
					state.token = null
					commit('PageRole', {})
				}
			})
			//			
		},
		//
	}
}

export default oa_user
