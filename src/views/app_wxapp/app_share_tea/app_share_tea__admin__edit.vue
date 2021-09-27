<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="类型" prop="tadmin_type">
							<el-radio-group v-model="form.tadmin_type">
								<el-radio :label="0">加盟商</el-radio>
								<!--								<el-radio :label="1">合伙人</el-radio>-->
							</el-radio-group>
						</el-form-item>
						<el-form-item label="名称" prop="tadmin_name">
							<el-input class="x-input-60" v-model="form.tadmin_name"></el-input>
						</el-form-item>
						<el-form-item label="电话" prop="tadmin_phone">
							<el-input class="x-input-60" v-model="form.tadmin_phone"></el-input>
						</el-form-item>
						<el-form-item label="关联openid" prop="tadmin_openid">
							<el-input class="x-input-60" v-model="form.tadmin_openid"></el-input>
						</el-form-item>
						<el-form-item label="公司" prop="tadmin_company">
							<el-input class="x-input-60" v-model="form.tadmin_company"></el-input>
						</el-form-item>
						<el-form-item label="地址" prop="tadmin_address">
							<el-input class="x-input-60" type="textarea" v-model="form.tadmin_address"></el-input>
						</el-form-item>
						<el-form-item label="状态" prop="tadmin_enable">
							<el-switch v-model="form.tadmin_enable"
									   active-color="#13ce66"
									   :active-value="1" active-text="生效"
									   :inactive-value="0" inactive-text="停用">
							</el-switch>
							<div class="x-alert">
								<span>停用状态：茶室收入不会分成给加盟商</span>
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_share_tea/app_share_tea__admin__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_share_tea/app_share_tea__admin__edit/save')
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
