<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="openid">
							{{ form.wxuser_openid }}
						</el-form-item>
						<el-form-item v-if="form.wxuser_unionid" label="unionid">
							{{ form.wxuser_unionid }}
						</el-form-item>
						<el-form-item label="微信名">
							{{ form.wxuser_nickname }}
						</el-form-item>
						<el-form-item label="头像">
							<a target="_blank" :href="form.wxuser_headimgurl">
								<img :src="form.wxuser_headimgurl">
							</a>
						</el-form-item>
						<el-form-item label="性别">
							{{ form.wxuser_sex }}
						</el-form-item>
						<el-form-item label="省市">
							{{ form.wxuser_province }} {{ form.wxuser_city }}
						</el-form-item>
						<el-form-item label="关注状态">
							<div v-if="form.wxuser_subscribe!=1">未关注</div>
							<div v-if="form.wxuser_subscribe==1">
								<div>关注中</div>
								<div>关注时间：{{ form.wxuser_subscribe_time }}</div>
							</div>
							<div class="x-alert">
								<span>小程序请忽略该字段</span>
							</div>
						</el-form-item>
						<el-form-item label="手机号">
							{{ form.winfo_phone }}
						</el-form-item>
						<el-form-item label="更新时间">
							{{ form.wxuser_user_data_update_date }}
							<el-button type="primary" @click="funcResetUpdateDate" size="mini">还原</el-button>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
					<el-tab-pane label="模板" v-if="false" name="2">
						<el-form-item label="应用模板" prop="reply_app_file" ref="reply_app_file">
							<el-col :span="6">
								<el-input v-model="form.reply_app_file" placeholder="默认：t_001"/>
							</el-col>
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
				<el-button @click="g_page.funcBack" size="mini">返回</el-button>
				<el-button v-if="false" type="success" @click="g_page.funcSave" size="mini">保存</el-button>
				<el-checkbox v-if="false" style="margin-left: 10px;" label="保存后停留" v-model="checked"/>
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
			console.log('mounted')
			console.log(this.$route.query)

			this.g_page.funcSetVue(this)
			//
			this.g_page.funcSetApiUrlEdit('/xadmin/user/user__edit')
			//
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

			// debugger
			// console.log('tag=', this.$refs.reply_app_file.$parent.name);
		},
		methods: {
			funcResetUpdateDate() {
				this.g_cc.func_confirm('确定？', () => {
					let id = this.form.wxuser_openid
					this.g_cc.func_axios({
						url: '/xadmin/user/user__edit/funcResetUpdateDate',
						data: {
							id: id
						},
						success: (res) => {
							//
							if (res.data.errcode == 0) {
								this.g_cc.func_alert('更新成功')
							} else {
								this.g_cc.func_alert(res.data.errmsg, 'error')
							}
						}
						//
					})
				})
			}
		}
	}
</script>

<style>
</style>
