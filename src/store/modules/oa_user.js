import Cookies from 'js-cookie'

const oa_user = {
	state: {
		OA__x: '',
		OA__acc_id: '',
		OA__nonce_str: '',
		OA__ENC_CODE: '',
		pages: [], //权限页面
		v_error_422: [], //表单验证错误提示
	},

	mutations: {
		OA_DATA: (state, data) => {
			console.log(data)
			//
			for (let key in data) {
				state[key] = data[key]
			}
			//
		},
		PAGES: (state, pages) => {
			state.pages = pages
		},
		ERR_422: (state, err) => {
			//
			state.v_error_422[err.err_field] = err
			//
		}
	},
	//
	actions: {
		//设置用户信息
		funcSetData({
			commit
		}, data) {
			console.log('login')
			return new Promise((resolve, reject) => {
				//设置cookie
				for (let key in data) {
					Cookies.set(key, data[key])
				}
				//
				commit('OA_DATA', data)
			})
		},
		//删除用户信息
		funcDelData({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				let data = {
					OA__x: '',
					OA__acc_id: '',
					OA__nonce_str: '',
					OA__ENC_CODE: '',
				}
				commit('OA_DATA', data)
				commit('PAGES', [])
				//删除cookie
				for (let key in data) {
					Cookies.remove(key)
				}
				//
			})
		},
		//
		funcSetErr422({
			commit,
			state
		}, err) {
			return new Promise((resolve, reject) => {
				//
				commit('ERR_422', err)
			})
		}
	}
}

export default oa_user
