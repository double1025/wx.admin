<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="帐号类型" prop="aconfig_type">
							<el-radio-group v-model="form.aconfig_type">
								<el-radio label="wx">公众号</el-radio>
								<el-radio label="wxapp">小程序</el-radio>
								<el-radio label="app">应用</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="帐号名称" prop="acc_name">
							<el-input class="x-input-60" v-model="form.acc_name"/>
						</el-form-item>
						<el-form-item label="帐号ID" prop="acc_uid">
							<el-input class="x-input-60" v-model="form.acc_uid"/>
							<div class="x-alert">
								<span>用于登陆后台</span>
							</div>
						</el-form-item>
						<el-form-item label="密码" prop="acc_pwd">
							<el-input class="x-input-60" type="password" v-model="form.acc_pwd"/>
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
				<el-button type="success" @click="g_page.funcSave" size="mini">保存</el-button>
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
			this.g_page.funcSetApiUrlEdit('/xadmin/accsuper_admin/accsuper_admin__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/accsuper_admin/accsuper_admin__edit/save')
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
		methods: {}
	}
</script>

<style>
</style>
