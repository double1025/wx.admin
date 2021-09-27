<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="说明">
							<a target="_blank" href="http://file.weixin.siyoumi.com/app/app_grade/temp.xlsx">模板下载</a>
						</el-form-item>
						<ImportExcelComponent
							:upload_step="form.upload_step" :api_url="api_url" :api_data="api_data"
							btn_txt="开始发送"
							:funcDone="funcImportExcelSuccess"></ImportExcelComponent>
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
				<el-button v-if="false" type="success" @click="g_page.funcSave" size="mini">保存</el-button>
				<el-checkbox v-if="page_info.is_admin_edit" style="margin-left: 10px;" label="保存后停留" v-model="checked"/>
			</div>
			<!---->
			<!---->
			<!---->
		</el-main>
	</el-container>
</template>

<script>
	import ImportExcelComponent from '@/components/ImportExcel/index.vue'

	export default {
		components: { ImportExcelComponent },
		data() {
			let page_data = {
				api_url: '/xadmin/tmplmsg/tmplmsg__send/funcSend',
				api_data: {}
			}
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
			this.g_page.funcSetApiUrlEdit('/xadmin/tmplmsg/tmplmsg__send')
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
			this.api_data = data
			this.g_page.funcEdit(data)

			// debugger
		},
		methods: {
			funcImportExcelSuccess(e) {
				console.log('funcImportExcelSuccess', e)
			},
			funcTest() {
				console.log('funcTest')
				this.g_cc.func_loading(false, 'aaaa')
				setTimeout(() => {
					console.log('funcTest bbbb')
					// this.g_cc.loading.text = 'bbbb';
					this.g_cc.func_loading(false, 'bbbb')
				}, 2000)
			}
			////////////////////////////////
		}
	}
</script>

<style>
</style>
