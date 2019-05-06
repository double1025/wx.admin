import axios from 'axios'
import {
	Loading
} from 'element-ui';

import store from '../store'
import {
	getToken
} from '@/utils/auth'

import common from '@/utils/common'


// 创建axios实例
let service = axios.create({
	baseURL: process.env.BASE_API, // api 的 base_url
	timeout: 1500,
	transformRequest: [function(data) {
		// 将数据转换为表单数据
		let ret = ''
		for (let it in data) {
			ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
		}
		return ret
	}],
})

let loading //定义loading变量

// request拦截器
service.interceptors.request.use(
	request => {
		console.log('loading-show')
		//
		loading = Loading.service({
			lock: true,
			text: '加载中',
			background: 'rgba(0, 0, 0, 0.7)',
		})
		//
		request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		if (store.getters.token) {
			request.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
		}
		//
		if (typeof(request.url) == "undefined") {
			console.error('url is undefined');
			return;
		}
		//
		if (typeof(request.method) == "undefined") {
			request.method = 'get';
		}
		//
		request.responseType = "json";
		//
		if (typeof(request.data) == "undefined") {
			request.data = {};
		}
		//
		if (typeof(request.data.__d) == "undefined") {
			request.data.__d = (new Date()).valueOf();
		}
		//
		if (request.method.toLowerCase() == 'get') {
			request.params = request.data;
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
		console.log('response')

		console.log('loading-close')
		loading.close()

		return Promise.resolve(response)
	},
	error => {
		console.log('response.error')
		console.log(error)
		//
		loading.close()

		return Promise.reject(error)
	}
)

export default service
