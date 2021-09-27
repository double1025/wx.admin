import axios from 'axios'

// 创建axios实例
let service = axios.create({
	baseURL: BASE_API, // api 的 base_url
	timeout: 3 * 1000,
	transformRequest: []
})

// request拦截器
service.interceptors.request.use(
	request => {
		//
		request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		//
		if (typeof (request.url) == 'undefined') {
			console.error('url is undefined')
			return
		}
		//
		if (request.method.toLowerCase() == 'get') {
			request.params = request.data
		}
		//
		// console.log(request)
		//
		return request
	},
	error => {
		// Do something with request error
		console.log(error) // for debug
		Promise.reject(error)
	}
)

service.interceptors.response.use(
	response => {
		// console.log('response', response)
		return Promise.resolve(response)
	},
	error => {
		console.log('response.error',error)

		return Promise.reject(error)
	}
)

export default service
