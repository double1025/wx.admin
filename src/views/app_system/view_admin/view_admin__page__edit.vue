<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="APPID" prop="appr_app_id">
							<el-input class="x-input-60" v-model="form.appr_app_id"></el-input>
						</el-form-item>
						<el-form-item label="1级" prop="appr_pid">
							<el-select filterable v-model="form.appr_pid" placeholder="请选择">
								<el-option label="无" value=""></el-option>
								<el-option v-for="(item,index) in page_info.list_app"
										   :label="item.appr_meta_title" :key="item.appr_id" :value="item.appr_id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="名称" prop="appr_meta_title">
							<el-input class="x-input-60" v-model="form.appr_meta_title"></el-input>
						</el-form-item>
						<el-form-item label="图标" prop="appr_meta_icon">
							<el-input class="x-input-60" v-model="form.appr_meta_icon" placeholder="act"></el-input>
						</el-form-item>
						<el-form-item label="访问链接" prop="appr_path">
							<el-input class="x-input-60" v-model="form.appr_path" placeholder="/act/act__item__list"></el-input>
						</el-form-item>
						<el-form-item label="文件路径" prop="appr_file_path">
							<el-input class="x-input-60" v-model="form.appr_file_path" placeholder="@/views/app/act/act__item__list"></el-input>
						</el-form-item>
						<el-form-item label="状态" prop="appr_hidden">
							<el-switch v-model="form.appr_hidden"
									   active-color="#13ce66"
									   :active-value="1" active-text="隐藏"
									   :inactive-value="0" inactive-text="显示">
							</el-switch>
						</el-form-item>
						<el-form-item label="排序" prop="appr_order">
							<el-input-number v-model="form.appr_order" :step="1"></el-input-number>
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
			let page_data = {
				form: {
					position: {
						head_x: 0,
						head_y: 0
					}
				}
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
			this.g_page.funcSetApiUrlEdit('/xadmin/view_admin/view_admin__page__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/view_admin/view_admin__page__edit/save')
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
