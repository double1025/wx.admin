import {
	Message,
	MessageBox,
	Loading
} from 'element-ui'
import request from '@/utils/request'

import store from '../store'
import router from '../router'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
//页面初始化类
import Page from '@/common/Page'
import PageBase from '@/common/PageBase'

const common = {
	isAndroid: (/android/gi).test(navigator.appVersion),
	isIDevice: (/iphone|ipad/gi).test(navigator.appVersion),
	isPlaybook: (/playbook/gi).test(navigator.appVersion),
	isTouchPad: (/android/gi).test(navigator.appVersion),
	isWX: (/MicroMessenger/gi).test(navigator.appVersion),
	loading: null,
	//func
	func_message: function(msg, type = 'success') {
		Message({
			message: msg,
			type: type
		})
	},
	func_alert: function(msg, type, func_ok) {
		if (typeof (type) == 'undefined') {
			type = 'success'
		}

		if (typeof (func_ok) == 'undefined') {
			func_ok = () => {
				console.log('ok')
			}
		}
		//
		MessageBox({
			title: '消息',
			message: msg,
			type: type,
			dangerouslyUseHTMLString: true,
			showClose: false,
			closeOnClickModal: false
		}).then(func_ok)
	},
	/**
	 * 确认提示框
	 * @param msg
	 * @param func_ok
	 * @param func_cancel
	 */
	func_confirm: function(msg, func_ok, func_cancel, type) {
		if (typeof (func_ok) == 'undefined') {
			func_ok = () => {
				console.log('ok')
			}
		}

		if (typeof (func_canel) == 'undefined') {
			func_cancel = (e) => {
				console.log('cancel')
				console.log(e)
			}
		}
		if (typeof (type) == 'undefined') {
			type = 'warning'
		}

		MessageBox({
			title: '提示',
			message: msg,
			type: type,
			showCancelButton: true,
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			dangerouslyUseHTMLString: true
		}).then(func_ok).catch(func_cancel)
	},
	func_loading: function(close, txt) {
		// debugger
		if (close) {
			// console.log('func_loading', 'close')
			if (common.loading != null) {
				common.loading.close()
			}
		} else {
			if (typeof (txt) == 'undefined') {
				txt = '加载中'
			}
			//
			// console.log(common.loading)
			if (common.loading != null && common.loading.visible) {
				//loading已存在，只更新文本
				common.loading.text = txt
			} else {
				// console.log('func_loading', 'show')
				//等于null，创建一个loading对象
				common.loading = Loading.service({
					lock: true,
					text: txt,
					background: 'rgba(255, 255, 255, 0.5)'
				})
			}
		}
	},
	/**
	 * 刷新页面
	 */
	func_reload() {
		location.reload()
	},
	/**
	 * 获取页面初始化数据
	 * @param data
	 * @returns PageBase
	 */
	funcGetInitData(data) {
		let page_base = new PageBase()
		let page_data = Object.assign(data, page_base.page_data)
		//
		// console.log('new page')
		let page = new Page()
		//
		page_data.g_page = page
		//
		// console.log('funcGetInitData', page_data)
		return page_data
	},
	func_test: function() {
		console.log(this)
	}
}

/**
 * 是手机
 * @type {boolean}
 */
common.isMobile = common.isAndroid || common.isIDevice
common.oneKB = 1024
common.oneMB = common.oneKB * 1024

//设置页面的vue组件对象
common.func_set_vue = function(page_vue) {
	store.commit('PageVue', page_vue)
}
//vue组件对象
common.g_vue = []
common.funcSetVue = function(page_vue) {
	// debugger
	common.g_vue[page_vue.g_vue_key] = page_vue
}
//获取页面的vue组件对象
common.func_get_vue = function(k) {
	// debugger
	if (!k) {
		k = 'main'
	}
	if (common.g_vue[k]) {
		return common.g_vue[k]
	}
	return store.getters.page_vue
}
//跳转
common.func_redirect = function(path, query) {
	//
	router.push({
		path: path,
		query: query
	})
}
//获取token
common.func_get_token = function() {
	return Cookies.get('token')
}
//axios
common.func_axios = function(axios_data) {
	//
	if (typeof (axios_data.success) == 'undefined') {
		throw new Error('缺少success方法')
	}

	//method
	if (typeof (axios_data.method) == 'undefined') {
		axios_data.method = 'get'
	}

	if (typeof (axios_data.responseType) == 'undefined') {
		axios_data.responseType = 'json'
	}

	if (typeof (axios_data.data) == 'undefined') {
		axios_data.data = {}
	}
	// token
	let token = common.func_get_token()
	if (token) {
		axios_data.data['token'] = token
	}
	//
	if (typeof (axios_data.data.__d) == 'undefined') {
		axios_data.data.__d = (new Date()).valueOf()
	}

	//post参数特殊处理
	if (axios_data.method.toLowerCase() == 'post') {
		let f = new FormData()
		for (let k in axios_data.data) {
			f.append(k, axios_data.data[k])
		}

		axios_data.data = f
	}

	//自定义error事件
	if (typeof (axios_data.error) == 'undefined') {
		axios_data.error = function(res) {
			console.log('error')
			console.log(res)

			let errmsg = ''
			if (typeof (res.response) == 'undefined') {
				errmsg = '系统繁忙，请稍后再试'
			} else {
				let data = res.response.data
				// debugger
				let getMessage = data.getMessage
				let getLine = data.getLine
				let getFile = data.getFile
				errmsg = `${getMessage} <br />${getFile}[${getLine}]`
			}

			common.func_alert(errmsg, 'error')
		}
	}
	//成功失败都会走的事件
	if (typeof (axios_data.complete) == 'undefined') {
		axios_data.complete = function(res) {
			// console.log('complete')
			// console.log(res)

			if (typeof (axios_data.loading) == 'undefined' || axios_data.loading == true) {
				common.func_loading(true)
			}
		}
	}
	//可能控制loading是否出现
	if (typeof (axios_data.loading) == 'undefined' || axios_data.loading == true) {
		let loading_txt = '加载中'
		if (axios_data.loading_txt) {
			loading_txt = axios_data.loading_txt
		}
		common.func_loading(false, loading_txt)
	}
	//
	request(axios_data)
		.then(function(res) {
			// console.log('success')
			if (typeof (res.data) != 'undefined') {
				//返回参数优化，如：res.data.errcode 变 res.errcode
				Object.assign(res, res.data)
			}

			if (res.errcode == -555 || res.errcode == -556) {
				console.error('登陆异常', res.errcode)
				let errmsg = res.errmsg
				//
				let g_vue = common.func_get_vue()
				g_vue.$store.dispatch('funcLogout').then(res => {
					common.func_alert(errmsg, 'error', function() {
						setTimeout(function() {
							common.func_redirect(`/login?redirect=${g_vue.$route.path}`)
							// location.href = `/login?redirect=${g_vue.$route.path}`
						}, 100)
					})
					//
				}).catch((err) => {
					console.log(err)
				})
				//
			} else {
				axios_data.success(res)
			}
			//
			axios_data.complete(res)
			//
		})
		.catch(function(obj) {
			if (obj.response && obj.response.status == 422) {
				// 422错误信息处理
				// debugger
				let g_vue = common.func_get_vue(axios_data.g_vue_key)
				//
				g_vue.$refs.form.clearValidate()
				//
				let err_key__first = ''
				let errs = obj.response.data.errors
				// debugger;
				for (var key in errs) {
					// debugger
					let err = errs[key]
					let err_field = key
					//记录第一个错误的key
					if (!err_key__first) {
						err_key__first = err_field
					}
					//
					let form_rules = g_vue.form_rules[err_field]
					// console.log(form_rules)
					if (form_rules) {
						//删除已存在validator规则
						for (var index in form_rules) {
							var r = form_rules[index]
							if (r['validator']) {
								form_rules.splice(index, 1)
							}
						}
					} else {
						g_vue.form_rules[err_field] = []
					}
					//
					g_vue.form_rules_422[err_field] = false //作用：不让错误出现第二次
					//
					// debugger
					g_vue.form_rules[err_field].push({
						validator: function(rule, value, callback) {
							if (g_vue.form_rules_422[err_field] == false) {
								g_vue.form_rules_422[err_field] = true
								// debugger
								callback(new Error(err.errmsg))
							} else {
								callback()
							}
						},
						trigger: 'blur'
					})
					//
					g_vue.$refs.form.validateField(err_field)
				}
				//
				console.log('表单验证', g_vue.form_rules)
				//
				console.log('切换第一个err，el-tag')
				if (err_key__first) {
					//获取第一个错误所在的tag name
					let err_dom__first = g_vue.$refs[err_key__first]
					if (err_dom__first) {
						let tag_name = err_dom__first.$parent.name
						console.log(`第一个错误所在的tag_name=${tag_name}`)
						g_vue.page_tag = tag_name
					}
				}
				// g_vue.$refs
				//
				let errmsg = '提交的数据不正确，请重新输入'
				if (obj.response.data.errmsg) {
					errmsg = obj.response.data.errmsg
				}
				common.func_alert(errmsg, 'error')
				//
			} else {
				axios_data.error(obj)
			}
			//
			axios_data.complete(obj)
			//
		})
}
//日期快捷项
common.picker_options = {
	// disabledDate(time) {
	// 	console.log('disabledDate', this)
	// 	return time.getTime() > Date.now()
	// },
	shortcuts: [{
		text: '今天',
		onClick(picker) {
			picker.$emit('pick', new Date())
		}
	}, {
		text: '昨天',
		onClick(picker) {
			const date = new Date()
			date.setTime(date.getTime() - 3600 * 1000 * 24)
			picker.$emit('pick', date)
		}
	}, {
		text: '一周前',
		onClick(picker) {
			const date = new Date()
			date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
			picker.$emit('pick', date)
		}
	}, {
		text: '30天前',
		onClick(picker) {
			const date = new Date()
			date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
			picker.$emit('pick', date)
		}
	}]
}

common.picker_disabled_date_func = (time, b_data_str) => {
	let day = new Date(time.toLocaleDateString())
	let b_day = new Date(b_data_str) //不知为何，2020-08-08 转成 2020-08-08 08:00
	let b_day_1 = new Date(b_day.toLocaleDateString())
	// console.log('picker_disabled_date_func', time.toLocaleDateString(), day.getTime(), b_data_str, b_day.getTime())
	return day.getTime() < b_day_1.getTime()
}

//now
common.now = function() {
	return common.funcNowFormat('yyyy-MM-dd hh:mm:ss')
}
//今天
common.today = function() {
	return common.funcNowFormat('yyyy-MM-dd')
}
//格式当前时间
common.funcNowFormat = function(fmt) {
	let d = new Date()
	var o = {
		'M+': d.getMonth() + 1, // 月份
		'd+': d.getDate(), // 日
		'h+': d.getHours(), // 小时
		'm+': d.getMinutes(), // 分
		's+': d.getSeconds(), // 秒
		'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
		'S': d.getMilliseconds() // 毫秒
	}
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
	}
	return fmt
}

/**
 * 加密AES
 * @param txt
 * @param key
 * @param vi
 * @returns {string}
 */
common.funcAesEn = function(txt, key, vi) {
	var key = CryptoJS.enc.Latin1.parse(key) //为了避免补位，直接用16位的秘钥
	var iv = CryptoJS.enc.Latin1.parse(vi) //16位初始向量
	var encrypted = CryptoJS.AES.encrypt(txt, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	})

	return encrypted.toString()
}

/**
 * 解密AES
 * @param txt
 * @param key
 * @param vi
 * @returns {string}
 */
common.funcAesDec = function(txt, key, vi) {
	var key = CryptoJS.enc.Latin1.parse(key) //为了避免补位，直接用16位的秘钥
	var iv = CryptoJS.enc.Latin1.parse(vi) //16位初始向量
	var encrypted = CryptoJS.AES.decrypt(txt, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	})

	return encrypted.toString()
}

//获取图片链接
common.funcGetImgUrl = function(val, root) {
	if (!val) {
		return ''
	}
	if (val.indexOf('http') == 0) {
		return val
	}

	let url = root + val
	// console.log('funcGetImgUrl', url)

	return url
}

export default common
