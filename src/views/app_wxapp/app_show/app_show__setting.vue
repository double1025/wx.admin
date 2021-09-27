<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="跳转链接" prop="abc_str_00" ref="abc_str_00">
							<el-input class="x-input-60" v-model="form.abc_str_00"/>
						</el-form-item>
						<el-form-item label="首页附加项设置" prop="abc_txt_00" ref="abc_txt_00">
							<el-input type="textarea" :rows="5" class="x-input-60" v-model="form.abc_txt_00"/>
						</el-form-item>
						<el-form-item label="推荐奖励说明" prop="abc_txt_01">
							<Tinymce menubar="" v-model="form.abc_txt_01" :height="500" ref="abc_txt_01"></Tinymce>
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
	import Tinymce from '@/components/Tinymce'

	export default {
		components: {
			Tinymce
		},
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_show/app_show__setting')
			this.g_page.funcSetApiUrlSave('/xadmin/app_show/app_show__setting/save')
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

				this.$nextTick(() => {
					setTimeout(() => {
						this.$refs['abc_txt_01'].setContent(this.form.abc_txt_01)
					}, 200)
				})
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.abc_txt_01 = this.$refs['abc_txt_01'].getContent()

				return data
			}
		}
	}
</script>
