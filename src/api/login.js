import request from '@/utils/request'

export function login(username, pwd) {
	// console.log(page)
	// console.log(this.cc)
	// 	request({
	// 		url: '/oa/login',
	// 		method: 'post',
	// 		data: {
	// 			username: username,
	// 			pwd: pwd,
	// 		},
	// 	}).then(function(obj) {
	// 		console.log('then')
	// 	}).catch(function(obj) {
	// 		console.log('catch')
	// 	})

// 	request({
// 		url: '/oa/login',
// 		data: {
// 			username,
// 			// pwd,
// 		},
// 	}).then(function(obj) {
// 		console.log('then')
// 		console.log(obj)
// 		if (obj.data.errcode == 0) {
// 
// 		} else {
// 			console.log(obj.data.errmsg)
// 		}
// 	}).catch(function(obj) {
// 		console.log('catch')
// 	})
	// 	return request({
	// 		url: '/oa/login',
	// 		method: 'get',
	// 		data: {
	// 			username,
	// 			pwd
	// 		}
	// 	})
}

export function getInfo(token) {
	return request({
		url: '/user/info',
		method: 'get',
		params: {
			token
		}
	})
}

export function logout() {
	return request({
		url: '/user/logout',
		method: 'post'
	})
}
