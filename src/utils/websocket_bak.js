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

/**
 * 检查心跳
 */
service_ws.ping = {
	timeout_s: 5000, //心跳时间
	timeout_send: null,
	timeout_close: null,
	ping_index: 0, //ping 20次会自动断开链接
	ping_max: service_ws.config.ping_max ? service_ws.config.ping_max : 99999, //ping max次会自动断开链接

	initData: function() {
		console.log('重置心跳次数')
		this.ping_index = 0
	},
	start: () => {
		let page = this

		clearTimeout(page.timeout_send)
		clearTimeout(page.timeout_close)

		page.timeout_send = setTimeout(function() {
			if (page.ping_index >= page.ping_max) {
				console.log(`停止心跳，已超出上限${page.ping_max}`)
				return
			}

			//这里发送一个心跳，后端收到后，返回一个心跳消息，
			//onmessage拿到返回的心跳就说明连接正常
			service_ws.ws.send('ping')
			page.ping_index = page.ping_index + 1

			console.log(`ping ${page.ping_index}`)
			page.timeout_close = setTimeout(function() {
				console.log('服务器异常，准备重连')
				service_ws.reconnect.start()
			}, page.timeout_s)

		}, page.timeout_s)
	}
}

/**
 * 重连
 */
service_ws.reconnect = {
	lock: false, //避免ws重复连接
	try_index: 0, //当前重连第几次
	try_max: 3, //重连最大次数

	/**
	 * 初始化
	 * @returns {{lock: boolean, try_index: number, try_max: number}}
	 */
	initData: function() {
		console.log('初始化重连参数')

		this.lock = false
		this.try_index = 0
	},
	/**
	 * 开始重连
	 */
	start: function() {
		let page = this
		if (page.try_index >= page.try_max) {
			console.log('重连失败')
			return
		}
		if (page.lock) return
		if (service_ws.close) return

		console.log('开始重连')

		page.lock = true
		page.try_index = page.try_index + 1
		console.log(`准备重连中：${page.try_index}`)

		setTimeout(function() {
			//没连接上会一直重连，设置延迟避免请求过多
			service_ws.init()

			page.lock = false
		}, 3000)
	}
}

service_ws.get = (cilent_config) => {
	console.log('ws')

	service_ws.config = Object.assign(service_ws.init_config, cilent_config)
	service_ws.close = false
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
			service_ws.close = true
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
			service_ws.reconnect.initData()
			service_ws.ping.initData()

			if (typeof (service_ws.config.onopen) != 'undefined') {
				service_ws.config.onopen(service_ws.ws)
			}

			// service_ws.ping.start()
		}
		service_ws.ws.onmessage = (e) => {
			console.log('onmessage', e.data)

			if (typeof (service_ws.config.onmessage) != 'undefined') {
				service_ws.config.onmessage(e)
			}

			if (e.data != 'ping') {
				// service_ws.ping.initData()
			}
			// service_ws.ping.start()
		}
	}
	catch (e) {
		console.error('连接出现异常，准备重连', e)
		service_ws.reconnect.start()
	}
}

export default service_ws
