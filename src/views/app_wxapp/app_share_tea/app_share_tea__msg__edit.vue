<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="类型" prop="log_type_sub">
							<el-radio-group v-model="form.log_type_sub">
								<el-radio v-for="(val,key) in page_info.types" :key="key" :label="key">{{val}}
								</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item v-if="form.log_type_sub=='pio'" label="门店" prop="log_str_01">
							<el-select filterable v-model="form.log_str_01" placeholder="请选择">
								<el-option v-for="item in page_info.list_pio"
										   :label="item.tpio_name"
										   :key="item.tpio_id"
										   :value="item.tpio_id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="标题" prop="log_str_00">
							<el-input class="x-input-60" v-model="form.log_str_00"></el-input>
						</el-form-item>
						<el-form-item label="通知内容" prop="log_txt_00">
							<el-input type="textarea" :rows="5" class="x-input-60" v-model="form.log_txt_00"></el-input>
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
				<el-checkbox v-if="page_info.is_admin_edit" style="margin-left: 10px;" label="保存后停留" v-model="checked"/>
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_share_tea/app_share_tea__msg__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_share_tea/app_share_tea__msg__edit/save')
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

				return data
			}
		}
	}
</script>
