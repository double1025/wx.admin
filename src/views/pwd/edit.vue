<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :model="pp.form" :rules="pp.form_rules" size="mini" label-width="15%">
				<el-tabs type="border-card">
					<el-tab-pane label="修改密码">
						<el-form-item label="原密码" prop="old_pwd">
							<el-input v-model="pp.form.old_pwd" type='password' />
						</el-form-item>
						<el-form-item label="新密码" prop="new_pwd">
							<el-input v-model="pp.form.new_pwd" type='password' />
						</el-form-item>
						<el-form-item label="新密码确认" prop="__new_pwd">
							<el-input v-model="pp.form.__new_pwd" type='password' />
						</el-form-item>
					</el-tab-pane>
				</el-tabs>
				<!-- 按钮部分 -->
				<div class="save_wrap">
					<el-button size="mini" type="success" @click="funcSave">保存</el-button>
				</div>
				<!---->
			</el-form>
		</el-main>
	</el-container>
</template>

<script>
	let page
	export default {
		data() {
			return {
				pp: this.p_data.data,
			}
		},
		mounted() {
			this.g_cc.func_set_vue(this)
			page = this.g_cc.func_get_vue()
			//验证
			page.pp.form_rules = {
				old_pwd: [{
					required: true,
					message: '请输入原密码',
					trigger: 'blur'
				}, ],
				new_pwd: [{
					required: true,
					message: '请输入新密码',
					trigger: 'blur'
				}, ],
				__new_pwd: [{
					validator: function(rule, value, callback) {
						if (value !== page.pp.form.new_pwd) {
							callback(new Error('两次输入密码不一致!'));
						} else {
							callback();
						}
					},
					trigger: 'blur'
				}, ]
			}
			//
			console.log(page)
		},
		methods: {
			funcSave() {
				console.log('funcSave')
				//
				page.$refs.form.validate(valid => {
					if (valid) {
						console.log('ok')
						page.funcSaveMain()
					} else {
						console.log('error submit!!')
						return false
					}
				})
				//
			},
			funcSaveMain() {
				console.log('funcSaveMain')
				page.g_cc.func_axios({
					url: '/x_app_system/pwd/admin/pwd__edit',
					method: 'POST',
					data: page.pp.form,
					success: function(obj) {
						if (obj.data.errcode == 0) {
							page.g_cc.func_alert('修改成功')
						} else {
							page.g_cc.func_alert(obj.data.errmsg, 'error')
						}
					}
				})
			},
			funcBack() {
				console.log('funcBack')
			},
		}
	}
</script>

<style>
</style>
