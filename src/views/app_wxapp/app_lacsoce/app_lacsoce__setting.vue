<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="广告通知" prop="abc_str_00">
							<el-input class="x-input-60" type="textarea" :rows="5" v-model="form.abc_str_00"></el-input>
						</el-form-item>
						<el-form-item label="防伪码查询提示" prop="code_ok_msg">
							<div>
								<div>成功提示：</div>
								<el-input class="x-input-60" type="textarea" v-model="form.code_ok_msg"></el-input>
							</div>
							<div>
								<div>已使用提示：</div>
								<el-input class="x-input-60" type="textarea" v-model="form.code_use_msg"></el-input>
							</div>
							<div>
								<div>没找到提示：</div>
								<el-input class="x-input-60" type="textarea" v-model="form.code_err_msg"></el-input>
							</div>
						</el-form-item>
						<el-form-item label="经销商查询提示" prop="user_ok_msg">
							<div>
								<div>成功提示：</div>
								<el-input class="x-input-60" type="textarea" v-model="form.user_ok_msg"></el-input>
							</div>
							<div>
								<div>没找到提示：</div>
								<el-input class="x-input-60" type="textarea" v-model="form.user_err_msg"></el-input>
							</div>
							<div>
								<div>过期提示：</div>
								<el-input class="x-input-60" type="textarea" v-model="form.user_expire_msg"></el-input>
							</div>
						</el-form-item>
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
				<el-button type="success" @click="g_page.funcSave" size="mini">保存</el-button>
				<el-checkbox style="margin-left: 10px;" label="保存后停留" v-model="checked"/>
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_lacsoce/app_lacsoce__setting__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_lacsoce/app_lacsoce__setting__edit/save')
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
			funcShowDialogAfter() {
				console.log('funcShowDialogAfter')
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.lgoods_pic = this.g_page.funcImgArrToStr(data.lgoods_pic_imgs)

				return data
			}
		}
	}
</script>
