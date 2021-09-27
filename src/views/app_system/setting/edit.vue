<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card">
					<!---->
					<!---->
					<el-tab-pane :label="type_name()">
						<el-form-item :label="type_name()">
							<el-link href="https://mp.weixin.qq.com" target="_blank" type="success">登陆微信MP后台获取信息
							</el-link>
						</el-form-item>
						<el-form-item label="原始ID" prop="aconfig_gh_id">
							<el-input class="x-input-60" v-model="form.aconfig_gh_id"/>
						</el-form-item>
						<el-form-item label="APP ID" prop="aconfig_app_id">
							<el-input class="x-input-60" v-model="form.aconfig_app_id"/>
						</el-form-item>
						<el-form-item label="APP SECRET" prop="aconfig_app_secret">
							<el-input class="x-input-60" v-model="form.aconfig_app_secret"/>
						</el-form-item>
						<el-form-item label="开启支付功能" prop="aconfig_pay_enable">
							<el-radio-group v-model="form.aconfig_pay_enable">
								<el-radio :label="0">关闭</el-radio>
								<el-radio :label="1">开启</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item v-show="pay_enable()" label="支付-APP ID" prop="aconfig_pay_app_id">
							<el-input class="x-input-60" v-model="form.aconfig_pay_app_id"/>
						</el-form-item>
						<el-form-item v-show="pay_enable()" label="支付-商户号" prop="aconfig_partnerId">
							<el-input class="x-input-60" v-model="form.aconfig_partnerId"/>
						</el-form-item>
						<el-form-item v-show="pay_enable()" label="支付-密钥" prop="aconfig_partnerKey">
							<el-input class="x-input-60" v-model="form.aconfig_partnerKey"/>
						</el-form-item>
						<el-form-item v-show="pay_enable()" label="支付-子商户号" prop="aconfig_partnerId_sub">
							<el-input class="x-input-60" v-model="form.aconfig_partnerId_sub" placeholder="服务商模式才需要填写"/>
						</el-form-item>
						<el-form-item v-if="form.aconfig_type=='wxapp'" label="关联公众号" prop="aconfig_x_id__wx">
							<el-select filterable v-model="form.aconfig_x_id__wx" placeholder="请选择">
								<el-option v-for="item in page_info.list_wx"
										   :label="item.aconfig_id"
										   :key="item.aconfig_id"
										   :value="item.aconfig_id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="token更新时间">
							{{ form.aconfig_access_token_date }}
							<el-button type="primary" @click="funcRefresh" size="mini">刷新</el-button>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
					<el-tab-pane label="回复配置信息" v-if="form.aconfig_type!='wxapp'">
						<el-form-item label="授权域名">
							{{ form.oauth_root }}
						</el-form-item>
						<el-form-item label="URL">
							<el-input :disabled="true" v-model="form.url"/>
						</el-form-item>
						<el-form-item label="Token">
							<el-input v-model="form.aconfig_token"/>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
					<el-tab-pane v-if="form.is_x" label="高级">
						<el-form-item label="调试链接">
							<el-switch v-model="form.is_dev" @change="funcDev"
									   active-color="#13ce66"
									   :active-value="true" active-text="开启中"
									   :inactive-value="false" inactive-text="已关闭">
							</el-switch>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
				</el-tabs>
			</el-form>
			<!---->
			<!---->
			<!-- 按钮部分 -->
			<div class="save_wrap">
				<!--        <el-button @click="g_page.funcBack" size="mini">返回</el-button>-->
				<el-button type="success" @click="g_page.funcSave" size="mini">保存</el-button>
				<!--        <el-checkbox style="margin-left: 10px;" label="保存后停留" v-model="checked"/>-->
			</div>
			<!---->
			<!---->
			<!---->
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			let page_data = { super_uid: '' }
			page_data = this.g_cc.funcGetInitData(page_data)
			return page_data
		},
		mounted() {
			console.log(this.$route.query)

			this.g_page.funcSetVue(this)
			//
			this.g_page.funcSetApiUrlEdit('/xadmin/setting/edit')
			this.g_page.funcSetApiUrlSave('/xadmin/setting/save')
			let page = this
			//验证
			this.form_rules = {
				__test: [{
					required: true,
					message: '请输入原密码',
					trigger: 'blur'
				}]
			}

			let data = this.$route.query
			this.g_page.funcEdit(data)
		},
		methods: {
			type_name() {
				return this.form.aconfig_type == 'wx' ? '微信公众号' : '微信小程序'
			},
			pay_enable() {
				return this.form.aconfig_pay_enable == 1
			},
			//刷新token
			funcRefresh() {
				this.g_cc.func_axios({
					url: '/xadmin/setting/funcRedisClearToken',
					data: {},
					success: (res) => {
						if (res.errcode == 0) {
							this.g_cc.func_alert('成功')
						} else {
							this.g_cc.func_alert(res.errmsg, 'error')
						}
					}
				})
			},
			//刷新token
			funcDev() {
				this.g_cc.func_axios({
					url: '/xadmin/setting/funcDev',
					data: {},
					success: (res) => {
						if (res.errcode == 0) {
							this.g_cc.func_alert(res.errmsg)
							this.form.is_dev = res.is_dev
						} else {
							this.g_cc.func_alert(res.errmsg, 'error')
						}
					}
				})
			}
			/////////////////////////
		}
	}
</script>

<style>
</style>
