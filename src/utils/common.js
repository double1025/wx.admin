import {
	Message,
	MessageBox
} from 'element-ui'
import request from '@/utils/request'


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

////////////////////////////////////////////
/// ajax
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
				// debugger
				let err = error.response.data.data;
				//
				store.dispatch('funcSetErr422', err)				
				console.log(store.getters.v_error_422)
				//
				common.func_alert('提交的数据不正确，请重新输入', 'error');
				//
			} else {
				axios_data.error(obj);
			}
		});
}

export default common
