<template>
	<div class="login-container">
		<el-form ref="form" :model="form" :rules="form_rules" class="login-form" auto-complete="on" label-position="left">
			<h3 class="title">微信公众平台</h3>
			<el-form-item prop="username">
				<span class="svg-container">
					<svg-icon icon-class="user" />
				</span>
				<el-input v-model="form.username" name="username" type="text" auto-complete="on" placeholder="帐号" />
			</el-form-item>
			<el-form-item prop="password">
				<span class="svg-container">
					<svg-icon icon-class="password" />
				</span>
				<el-input :type="pwdType" v-model="form.password" name="password" auto-complete="on" placeholder="密码"
				 @keyup.enter.native="handleLogin" />
				<span class="show-pwd" @click="showPwd">
					<svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
				</span>
			</el-form-item>
			<el-form-item>
				<el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="func_login">
					登陆
				</el-button>
			</el-form-item>
			<el-form-item v-show='false'>
				<el-button :loading="loading" type="primary" style="width:100%;" @click='test'>
					test
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import Base64 from '@/utils/base64'

	let page
	export default {
		name: 'Login',
		data() {
			return {
				form: {
					username: '',
					password: ''
				},
				form_rules: {
					username: [{
						required: true,
						message: '账号不能为空',
						trigger: 'blur'
					}, ],
					password: [{
						required: true,
						message: '请输入6-20位密码',
						trigger: 'blur'
					}, ]
				},
				form_rules_422: [],
				loading: false,
				pwdType: 'password',
				redirect: undefined
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
		mounted() {
			page = this
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
				page.$refs.form.validate(valid => {
					if (valid) {
						console.log('ok')
						page.__func_login()
					} else {
						console.log('error submit!!')
						return false
					}
				})
				//
			},
			__func_login() {
				//
				let app_base64 = new Base64();
				let pwd = app_base64.encode(page.form.password);
				//
				page.$cc.func_axios({
					page: page,
					url: '/oa/login',
					data: {
						'username': page.form.username,
						// 'password': pwd,
					},
					success: function(obj) {
						// console.log(obj)
						if (obj.data.errcode == 0) {
							page.$cc.func_alert('成功')
							//
							// debugger
							let login_data = obj.data.data.data
							//记录cookie
							page.$store.dispatch('funcSetData', login_data)
							console.log(page.$store.state)
							//跳转
							page.$cc.func_redirect('/dashboard', {
								id: 'xxx'
							})
							// 							page.$router.push({
							// 								path: '/dashboard',
							// 								query: {
							// 									id: 'xxx',
							// 								}
							// 							})
							//
						} else {
							page.$cc.func_alert(obj.data.errmsg, 'error')
						}
					}
				})
				//
			},
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	$bg:#2d3a4b;
	$light_gray:#eee;

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
	$bg:#2d3a4b;
	$dark_gray:#889aa4;
	$light_gray:#eee;

	.login-container {
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: $bg;

		.login-form {
			position: absolute;
			left: 0;
			right: 0;
			width: 520px;
			max-width: 100%;
			padding: 35px 35px 15px 35px;
			margin: 120px auto;
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
