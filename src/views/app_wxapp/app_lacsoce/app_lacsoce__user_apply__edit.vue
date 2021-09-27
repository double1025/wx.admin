<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="微信信息">
							<img style="width: 10%" :src="form.wxuser_headimgurl"/>
							<div v-html="form.wxuser_nickname"></div>
							<div v-html="form.wxuser_openid"></div>
						</el-form-item>
						<el-form-item label="提交时间">
							{{ form.lapply_create_date }}
						</el-form-item>
						<el-form-item label="审核内容">
							{{ form.__type }}
						</el-form-item>
						<el-form-item label="状态">
							{{ form.__apply }}
						</el-form-item>
						<!-- 注册 -->
						<template v-if="form.lapply_type=='reg'">
							<el-form-item label="姓名">
								{{ form.lapply_str_01 }}
							</el-form-item>
							<el-form-item label="微信号">
								{{ form.lapply_str_02 }}
							</el-form-item>
							<el-form-item label="手机号">
								{{ form.lapply_str_03 }}
							</el-form-item>
							<el-form-item label="身份证号">
								{{ form.lapply_str_04 }}
							</el-form-item>
							<el-form-item label="区域">
								{{ form.lapply_str_05 }}
							</el-form-item>
							<el-form-item label="详细地址">
								{{ form.lapply_txt_01 }}
							</el-form-item>
						</template>
						<el-form-item label="描述">
							<el-input class="x-input-60" type="textarea" v-model="form.lapply_desc"></el-input>
						</el-form-item>
						<el-form-item label="操作">
							<el-button type="danger" @click="funcApply(-10)" size="mini">不通过</el-button>
							<el-button type="success" @click="funcApply(1)" size="mini">通过</el-button>
						</el-form-item>
						<!---->
					</el-tab-pane>
					<!---->
					<!---->
					<el-tab-pane v-if="false" label="模板" name="2">
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
				<!--				<el-button type="success" @click="g_page.funcSave" size="mini">保存</el-button>-->
				<!--				<el-checkbox style="margin-left: 10px;" label="保存后停留" v-model="checked"/>-->
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
			let page_data = {}
			//
			page_data = this.g_cc.funcGetInitData(page_data)
			//
			return page_data
		},
		mounted() {
			console.log('mounted')
			console.log(this.$route.query)

			this.g_page.funcSetVue(this)
			//
			this.g_page.funcSetApiUrlEdit('/xadmin/app_lacsoce/app_lacsoce__user_apply__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_lacsoce/app_lacsoce__user_apply__edit/save')
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
			//审核
			funcApply(handle) {
				this.g_cc.func_axios({
					url: '/xadmin/app_lacsoce/app_lacsoce__user_apply__edit/funcApply',
					data: {
						id: this.form.id,
						handle: handle
					},
					success: (res) => {
						//
						if (res.data.errcode == 0) {
							let page = this;
							page.g_cc.func_alert('成功', 'success', () => {
								page.g_page.funcBack()
							})
						} else {
							this.g_cc.func_alert(res.data.errmsg, 'error')
						}
					}
					//
				})
			},
			funcShowDialogAfter() {
				console.log('funcShowDialogAfter')
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.luser_headimg = this.g_page.funcImgArrToStr(data.luser_headimg_imgs)

				return data
			}
		}
	}
</script>
