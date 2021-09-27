<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :model="form" :rules="form_rules" size="mini" label-width="15%">
				<el-tabs type="border-card">
					<el-tab-pane :label="page_info.title">
						<el-form-item label="原密码" prop="old_pwd">
							<el-input class="x-input-60" v-model="form.old_pwd" type='password'/>
						</el-form-item>
						<el-form-item label="新密码" prop="new_pwd">
							<el-input class="x-input-60" v-model="form.new_pwd" type='password'/>
						</el-form-item>
						<el-form-item label="新密码确认" prop="__new_pwd">
							<el-input class="x-input-60" v-model="form.__new_pwd" type='password'/>
						</el-form-item>
					</el-tab-pane>
					<el-tab-pane label="扫码登陆设置">
						<el-form-item label="绑定信息" prop="acc_openid">
							<div v-if="form.acc_openid!=''">
								<div>{{ form.acc_name }}
									<el-button type="text" @click="funcUnBind__" size="mini">解绑</el-button>
								</div>
								<div>{{ form.acc_openid }}</div>
								<div><img :src="form.acc_headimg"/></div>
							</div>
							<div class="x-alert" v-if="form.acc_openid==''">
								<span>扫码登陆，需要进行用户信息绑定</span><br/>
								<span>请点击【修改绑定信息】按钮进行绑定</span>
							</div>
						</el-form-item>
						<el-form-item label="操作">
							<el-button type="primary" v-if="!qr" @click="funcBind" size="mini">修改绑定信息</el-button>
							<div style="text-align: center;width: 20%;">
								<OuathCode ref="oauth_code" v-if="qr" init_txt="扫码绑定帐号" :funcSuccessAfter="funcOuathCodeSuccess"></OuathCode>
							</div>
						</el-form-item>
					</el-tab-pane>
				</el-tabs>
				<!-- 按钮部分 -->
				<div class="save_wrap">
					<el-button type="success" @click="g_page.funcSave" size="mini">保存</el-button>
				</div>
				<!---->
			</el-form>
		</el-main>
	</el-container>
</template>

<script>
	import OuathCode from '@/components/OuathCode'

	export default {
		components: {
			OuathCode
		},
		data() {
			let page_data = { super_uid: '', qr: false }
			page_data = this.g_cc.funcGetInitData(page_data)
			return page_data
		},
		mounted() {
			this.g_page.funcSetVue(this)
			//
			this.g_page.funcSetApiUrlEdit('/xadmin/pwd/pwd__edit/edit')
			this.g_page.funcSetApiUrlSave('/xadmin/pwd/pwd__edit/save')
			let page = this
			//验证
			this.form_rules = {
				old_pwd: [{
					required: true,
					message: '请输入原密码',
					trigger: 'blur'
				}],
				new_pwd: [{
					required: true,
					message: '请输入新密码',
					trigger: 'blur'
				}],
				__new_pwd: [{
					validator: function(rule, value, callback) {
						if (value !== page.form.new_pwd) {
							callback(new Error('两次输入密码不一致!'))
						} else {
							callback()
						}
					},
					trigger: 'blur'
				}]
			}
			let data = this.$route.query
			this.g_page.funcEdit(data)
		},
		methods: {
			funcSave__success(res) {
				if (res.data.errcode == 0) {
					this.g_cc.func_alert('修改成功')
					this.form.old_pwd = ''
					this.form.new_pwd = ''
					this.form.__new_pwd = ''
				} else {
					this.g_cc.func_alert(res.data.errmsg, 'error')
				}
			},
			funcBind() {
				this.qr = true
			},
			//解绑
			funcUnBind__() {
				this.g_cc.func_confirm('确定？', () => {
					this.funcUnBind()
				})
			},
			funcUnBind() {
				//更新帐号绑定用户
				this.g_cc.func_axios({
					url: '/xadmin/pwd/pwd__edit/funcUnBind',
					data: {},
					success: (res) => {
						//
						if (res.data.errcode == 0) {
							this.g_cc.func_alert(res.data.errmsg, 'success', () => {
								this.form.acc_openid = ''
							})
						} else {
							this.g_cc.func_alert(res.data.errmsg, 'error', () => {
								this.$refs['oauth_code'].funcRefresh()
							})
						}
					}
					//
				})
			},
			//
			funcOuathCodeSuccess(res) {
				//更新帐号绑定用户
				this.g_cc.func_axios({
					url: '/xadmin/pwd/pwd__edit/funcBind',
					data: {
						oauth_code: res.oauth_code
					},
					success: (res) => {
						//
						if (res.data.errcode == 0) {
							this.g_cc.func_alert('绑定成功', 'success', () => {
								this.form.acc_openid = res.data.entity_acc.acc_openid
								this.form.acc_headimg = res.data.entity_acc.acc_headimg
							})
						} else {
							this.g_cc.func_alert(res.data.errmsg, 'error')
						}
					}
					//
				})
			}
		}
	}
</script>

<style>
</style>
