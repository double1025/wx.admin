const service_ws = {
	init_config: {
		debug: false,
		token: '', //验证握手用
		url: ''
	},
	config: {},
	ws: null,
	close: false
	////
}

service_ws.get = (cilent_config) => {
	console.log('ws')

	service_ws.config = Object.assign(service_ws.init_config, cilent_config)
	service_ws.init()
}

//start
service_ws.init = () => {
	console.log('ws init')
	console.log('ws init:config', service_ws.config)
	try {
		if ('WebSocket' in window) {
			service_ws.ws = new WebSocket(service_ws.config.url, [service_ws.config.token])
		} else {
			console.error('您的浏览器不支持websocket')
		}

		service_ws.ws.onclose = () => {
			console.log('onclose')
			if (typeof (service_ws.config.onclose) != 'undefined') {
				service_ws.config.onclose()
			}
		}
		service_ws.ws.onerror = (e) => {
			console.log('onerror')
			service_ws.reconnect.start()
		}
		service_ws.ws.onopen = () => {
			console.log('onopen ws连接成功')

			if (typeof (service_ws.config.onopen) != 'undefined') {
				service_ws.config.onopen(service_ws.ws)
			}
		}
		service_ws.ws.onmessage = (e) => {
			console.log('onmessage', e.data)

			if (typeof (service_ws.config.onmessage) != 'undefined') {
				service_ws.config.onmessage(e)
			}

			if (e.data != 'ping') {
			}
		}
	}
	catch (e) {
		console.error('连接出现异常，准备重连', e)
	}
}

export default service_ws
