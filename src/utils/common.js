import {
	Message,
	MessageBox
} from 'element-ui'
import request from '@/utils/request'

import store from '../store'
import router from '../router'


const common = {
	isAndroid: (/android/gi).test(navigator.appVersion),
	isIDevice: (/iphone|ipad/gi).test(navigator.appVersion),
	isPlaybook: (/playbook/gi).test(navigator.appVersion),
	isTouchPad: (/android/gi).test(navigator.appVersion),
	isWX: (/MicroMessenger/gi).test(navigator.appVersion),
	//func
	func_alert: function(msg, type, auto_close_t) {
		if (typeof(type) == 'undefined') {
			type = 'success'
		}

		if (typeof(auto_close_t) == 'undefined') {
			auto_close_t = 1500
		}

		Message({
			message: msg,
			type: type,
			duration: auto_close_t
		})
	},
	func_confirm: function() {
		console.log('func_confirm')
	},
	func_test: function() {
		console.log(this)
	},
}

common.isMobile = common.isAndroid || common.isIDevice


//跳转
common.func_redirect = function(path, query) {
	//
	router.push({
		path: path,
		query: query
	})
}

// ajax
common.func_axios = function(axios_data) {
	//
	if (typeof(axios_data.error) == "undefined") {
		axios_data.error = function(data) {
			console.log('error');
			console.log(data.response);

			var errmsg = data.message;

			common.func_alert(errmsg, 'error');
		}
	}
	//
	request(axios_data)
		.then(axios_data.success)
		.catch(function(obj) {
			if (obj.response && obj.response.status == 422) {
				// 422错误信息处理
				let err = obj.response.data.data;
				//
				var form_rules = axios_data.page.form_rules[err.err_field];
				console.log(form_rules);
				if (form_rules) {
					//删除已存在validator规则
					for (var index in form_rules) {
						var r = form_rules[index];
						if (r['validator']) {
							form_rules.splice(index, 1);
						}
					}
				}
				//
				axios_data.page.form_rules_422[err.err_field] = false; //作用：不让错误出现第二次
				//
				form_rules.push({
					validator: function(rule, value, callback) {
						if (axios_data.page.form_rules_422[err.err_field] == false) {
							axios_data.page.form_rules_422[err.err_field] = true;
							callback(new Error(err.err_msg));
						} else {
							callback();
						}
					},
				});
				// console.log(rules);
				axios_data.page.$refs.form.validateField(err.err_field);
				//
				common.func_alert('提交的数据不正确，请重新输入', 'error');
				//
			} else {
				axios_data.error(obj);
			}
		});
}

export default common
