<template>
	<div class="login-container">
		<el-form ref="form" :model="form" v-loading="login_data.loading" element-loading-text="加载中" :rules="form_rules" class="login-form" auto-complete="on" label-position="left">
			<h3 class="title">{{ title }}</h3>
			<!---->
			<!--右上角-->
			<div class="login-logo" v-if="true">
				<a href="javascript:;" @click="func_login_change">
					<svg-icon :icon-class="login_data.icon"/>
				</a>
			</div>
			<div class="login-tip" v-if="true">
				<div class="login-tip-txt">{{ login_data.txt }}</div>
				<div class="login-tip-arrow"><em></em><span></span></div>
			</div>
			<!---->
			<!-- account -->
			<div v-if="login_data.type=='account'">
				<el-form-item prop="username">
				<span class="svg-container">
					<svg-icon icon-class="user"/>
				</span>
					<el-input v-model="form.username" name="username" type="text" auto-complete="on" placeholder="帐号"/>
				</el-form-item>
				<el-form-item prop="password">
				<span class="svg-container">
					<svg-icon icon-class="password"/>
				</span>
					<el-input :type="pwdType" v-model="form.password" name="password" auto-complete="on" placeholder="密码"
							  @keyup.enter.native="func_login"/>
					<span class="show-pwd" @click="showPwd">
					<svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'"/>
				</span>
				</el-form-item>
				<el-form-item prop="code" v-if="show_code">
					<el-input v-model="form.code" placeholder="验证码" style="width: 50%;"/>
					<div style="float:left;" @click="funcReloadVcode">
						<img style="height: 40px;padding-top: 12px;" :src='vcode'/>
					</div>
				</el-form-item>
				<el-form-item>
					<el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="func_login">
						登录
					</el-button>
				</el-form-item>
			</div>
			<!---->
			<!-- qr -->
			<div class="login-qr" v-if="login_data.type=='qr'">
				<OuathCode ref="oauth_code" init_txt="扫码登陆" :funcSuccessAfter="funcOuathCodeSuccess"></OuathCode>
			</div>
			<!---->
			<!---->
			<el-form-item v-show='false'>
				<el-button :loading="loading" type="primary" style="width:100%;" @click='test'>
					test
				</el-button>
			</el-form-item>
		</el-form>
		<div class="footer" v-html="web_code">
		</div>
	</div>
</template>

<script>
	import Base64 from '@/utils/base64'
	import Cookies from 'js-cookie'
	import OuathCode from '@/components/OuathCode'

	export default {
		components: {
			OuathCode
		},
		name: 'Login',
		data() {
			return {
				form: {
					username: '',
					password: '',
					code: ''
				},
				form_rules: {
					username: [{
						required: true,
						message: '账号不能为空',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入6-20位密码',
						trigger: 'blur'
					}],
					code: [
						{
							validator: (rule, value, callback) => {
								if (this.show_code) {
									if (!this.form.code || this.form.code == '') {
										callback(new Error('请输入验证码'))
									} else {
										callback()
									}
								} else {
									callback()
								}
							}, trigger: 'blur'
						}
					]
				},
				refresh_qr: false,
				login_data: {
					loading: false,
					type: 'account',
					icon: 'qr_code',
					txt: '扫码登陆',
					qr_url: '',
					qr_txt: '扫码登陆'
				},
				form_rules_422: [],
				loading: false,
				pwdType: 'password',
				redirect: undefined,
				show_code: false,
				vcode: ''
			}
		},
		watch: {
			$route: {
				handler: function(route) {
					this.redirect = route.query && route.query.redirect
				},
				immediate: true
			}
		},
		computed: {
			title() {
				return WEB_TITLE
			},
			web_code() {
				return WEB_CODE
			}
		},
		mounted() {
			this.g_cc.func_set_vue(this)
			let page = this.g_cc.func_get_vue()
			//
			let token = page.g_cc.func_get_token()
			console.log('mounted', token)
			if (token && token.length > 0) {
				page.g_cc.func_redirect('/dashboard', {
					__d: new Date().valueOf()
				})
			}

			// this.login_data.type == 'account'
			// this.funcWebSocket()
		},
		methods: {
			test() {
				// setToken('token')
				// 				console.log(this.redirect)
				// 				console.log(this.$route)
				// 				console.log(asyncRouterMap)
				// 				this.$router.addRoutes(asyncRouterMap)
				// 				this.$router.options.routes = asyncRouterMap
				// 				//
				// 				console.log(this.$router)
				//
				console.log(this.$store)
			},
			func_login_change() {
				if (this.login_data.type == 'account') {
					console.log('扫码登陆')
					this.login_data.type = 'qr'
					this.login_data.icon = 'user'
					this.login_data.txt = '密码登录'
				} else {
					console.log('帐号登陆')
					this.login_data.type = 'account'
					this.login_data.icon = 'qr_code'
					this.login_data.txt = '扫码登录'
				}
			},
			funcOuathCodeSuccess(res) {
				console.log('funcOuathCodeSuccess', res)
				// res.oauth_code
				// debugger
				this.funcLoginQr(res.oauth_code)
			},
			showPwd() {
				if (this.pwdType === 'password') {
					this.pwdType = ''
				} else {
					this.pwdType = 'password'
				}
			},
			func_login() {
				//
				this.$refs.form.validate(valid => {
					if (valid) {
						console.log('ok')
						this.__func_login()
					} else {
						console.log('error submit!!')
						return false
					}
				})
				//
			},
			__func_login() {
				//
				let page = this
				//
				let app_base64 = new Base64()
				let pwd = app_base64.encode(page.form.password)
				//
				page.g_cc.func_axios({
					url: '/login',
					data: {
						'username': page.form.username,
						'password': pwd,
						'code': page.form.code
					},
					success: (res) => {
						page.funcLoginSuccess(res)
					}
				})
				//
			},
			funcLoginQr(oauth_code) {
				//
				let page = this
				//
				page.g_cc.func_axios({
					url: '/login/login_qr',
					data: {
						'oauth_code': oauth_code
					},
					success: (res) => {
						if (res.errcode !== 0) {
							page.g_cc.func_alert(res.data.errmsg, 'error', () => {
								this.$refs['oauth_code'].funcRefresh()
							})
						} else {
							page.funcLoginSuccess(res)
						}
					}
				})
				//
			},
			funcLoginSuccess(res) {
				let page = this
				if (res.errcode == 0) {
					//
					// debugger
					let token = res.token
					if (!token) {
						page.g_cc.func_alert('参数异常', 'error')
						return
					}
					//记录cookie
					Cookies.set('token', token)
					//
					if (page.login_data.type == 'qr') {
						page.g_cc.func_redirect('/dashboard', {
							__d: new Date().valueOf()
						})
					} else {
						page.g_cc.func_alert('登录成功', 'success', function() {
							//跳转
							page.g_cc.func_redirect('/dashboard', {
								__d: new Date().valueOf()
							})
						})
					}
				} else {
					if (res.errcode == -50) {
						//验证码错误
						this.form.code = ''
					} else {
						if (res.show_code) {
							page.show_code = res.show_code
							if (page.show_code) {
								page.funcReloadVcode()
							}
						}
					}
					page.g_cc.func_alert(res.errmsg, 'error')
				}
			},
			//刷新验证码
			funcReloadVcode() {
				// process.env.BASE_API
				console.log('func_reload_vcode')
				this.vcode = ''
				this.vcode = BASE_API + '/login/vcode?v=' + (new Date()).valueOf()
				//
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	$bg: #2d3a4b;
	$light_gray: #eee;

	/* reset element-ui css */
	.login-container {
		.el-input {
			display: inline-block;
			height: 47px;
			width: 85%;

			input {
				background: transparent;
				border: 0px;
				-webkit-appearance: none;
				border-radius: 0px;
				padding: 12px 5px 12px 15px;
				color: $light_gray;
				height: 47px;

				&:-webkit-autofill {
					-webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
					-webkit-text-fill-color: #fff !important;
				}
			}
		}

		.el-form-item {
			border: 1px solid rgba(255, 255, 255, 0.1);
			background: rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			color: #454545;
		}
	}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
	$bg: #2d3a4b;
	$dark_gray: #889aa4;
	$light_gray: #eee;

	.footer {
		color: #d9d9d9;
		font-size: 13px;
		height: 20px;
		position: fixed;
		bottom: 0;
		width: 100%;
		text-align: center;
	}

	.login-container {
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: $bg;

		.login-qr {
			text-align: center;
			color: #ffffff;

			img {
				width: 200px;
			}
		}

		.svg-icon {
			width: 1em;
			height: 1em;
			vertical-align: -0.15em;
			fill: currentColor;
			overflow: hidden;
		}

		.login-logo {
			color: #eee;
			position: absolute;
			right: 0px;
			top: 0px;
		}

		.login-logo .svg-icon {
			width: 30px;
			height: 30px;
		}

		.login-tip {
			position: absolute;
			color: #eee;
			font-size: 12px;
			right: 37px;
			top: 3px;
		}

		.login-tip-txt {
			line-height: 16px;
			position: relative;
			border: 1px solid #eee;
			padding: 5px 10px;
			border-radius: 5px;
		}

		.login-tip-arrow {
			position: absolute;
			z-index: 10;
			top: 8px;
			right: 0;
		}

		.login-tip-arrow em {
			position: absolute;
			width: 0;
			height: 0;
			border-color: hsla(0, 0%, 100%, 0);
			border-style: solid;
			overflow: hidden;
			top: 0;
			left: 0px;
			border-left-color: #eee;
			border-width: 6px 0 6px 6px;
		}

		.login-tip-arrow span {
			border-width: 6px 0 6px 6px;
			position: absolute;
			width: 0;
			height: 0;
			border-color: hsla(0, 0%, 100%, 0);
			border-left-color: #2d3a4b;
			border-style: solid;
			overflow: hidden;
			top: 0;
			left: -2px;
		}

		.login-form {
			position: absolute;
			left: 0;
			right: 0;
			width: 520px;
			max-width: 100%;
			padding: 35px 35px 15px 35px;
			margin: 120px auto;
			border-radius: 8px;
			border: 1px solid rgba(255, 255, 255, 0.1);
		}

		.tips {
			font-size: 14px;
			color: #fff;
			margin-bottom: 10px;

			span {
				&:first-of-type {
					margin-right: 16px;
				}
			}
		}

		.svg-container {
			padding: 6px 5px 6px 15px;
			color: $dark_gray;
			vertical-align: middle;
			width: 30px;
			display: inline-block;
		}

		.title {
			font-size: 26px;
			font-weight: 400;
			color: $light_gray;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}

		.show-pwd {
			position: absolute;
			right: 10px;
			top: 7px;
			font-size: 16px;
			color: $dark_gray;
			cursor: pointer;
			user-select: none;
		}
	}
</style>
