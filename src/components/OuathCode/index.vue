<template>
	<div>
		<!---->
		<!---->
		<div v-if="refresh_qr" @click="funcRefresh">
			<svg-icon style="width: 6em;height: 6em;" icon-class="refresh"/>
			<div>点击刷新二维码</div>
		</div>
		<div v-if="!refresh_qr">
			<img style="width: 132px;" :src="qr_url"/>
		</div>
		<div>{{ txt }}</div>
		<!---->
		<!---->
	</div>
</template>

<script>
	import ws from '@/utils/websocket'

	export default {
		props: {
			init_txt: {
				type: String,
				default: ''
			},
			//成功后，会执行
			funcSuccessAfter: {
				type: Function,
				default: undefined
			}
		},
		computed: {},
		data() {
			let page_data = {
				qr_url: '',
				txt: '',
				refresh_qr: false
			}
			//
			page_data = this.g_cc.funcGetInitData(page_data)
			//
			return page_data
		},
		mounted() {
			console.log('OuathCode:mounted')
			//
			this.g_page.funcSetVue(this)
			// 应用ID
			// this.g_page.funcSetApiUrlList('/xadmin/prize/prize__set__list')
			// this.g_page.funcSetApiUrlDel('/xadmin/prize/prize__set__list/del')
			//页码
			this.g_page.funcSetPageSize(10)
			//搜索
			this.form_q = {
				// 'pid': this.pid
			}
			//
			this.form_rules = {
				acc_uidX: [
					{
						required: true,
						message: '必填',
						trigger: 'blur'
					}
				]
			}
			//
			this.funcWebSocket()
		},
		created() {
			console.log('OuathCode:created')
			//添加按钮控制
			// debugger
			//
			// this.$emit('update:value', val)
		},
		methods: {
			funcSetTxt(s) {
				this.txt = s
			},
			//刷新二维码
			funcRefresh(e) {
				this.funcWebSocket()
			},
			funcWebSocket() {
				this.txt = this.init_txt

				let that = this
				that.g_cc.func_loading(false, '连接中')
				that.refresh_qr = false

				ws.get({
					url: 'wss://app.siyoumi.com/ws/login_qr?role=master',
					// url: 'ws://php.x.siyoumi.com/ws/login_qr?role=master',
					debug: true,
					token: 'abc',
					onmessage(e) {
						console.log('onmessage')
						let res = JSON.parse(e.data)
						console.log('onmessage', res)
						if (res.action == 'init') {
							//二维码，初始化成功
							// that.txt = '已扫码'
							that.txt = res.data.wxuser_nickName
							that.qr_url = res.data.wxuser_headimgurl
						} else if (res.action == 'confirm') {
							//确认登陆
							// res.oauth_code
							that.funcSuccessAfter(res)
						} else if (res.action == 'gen_qr') {
							that.qr_url = res.qr_url
							that.g_cc.func_loading(true)
						} else if (res.action == 'cancel') {
							that.txt = '已取消'
							ws.ws.close()
						}
					},
					onopen: (e) => {
						console.log('onopen', e)
					},
					onclose() {
						console.log('onclose', 'index')
						if (that.txt == '') {
							that.txt = '二维码已失效'
						}
						that.qr_url = ''
						that.refresh_qr = true
					},
					onerror() {
						that.g_cc.func_loading(true)
					}
				})
			}
			////////////////////
		}
	}
</script>
