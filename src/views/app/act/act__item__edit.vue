<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="状态" prop="aset_status" ref="aset_status">
							<el-radio-group v-model="form.aset_status">
								<el-radio :label="0">测试</el-radio>
								<el-radio :label="1">上线</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="名称" prop="aset_name" ref="aset_name">
							<el-input class="x-input-60" v-model="form.aset_name"/>
							<el-button v-if="page_info.is_admin_edit" size="mini" icon="el-icon-s-tools" type="primary" plain @click="g_page.funcRedirectAppEdit('act',form.reply_key)"></el-button>
						</el-form-item>
						<el-form-item label="有效期" prop="aset_end_date" ref="aset_end_date">
							<el-date-picker
								style="width: 200px;"
								v-model="form.aset_begin_date"
								type="datetime"
								placeholder="选择开始时间"
								:picker-options="g_cc.picker_options"
								default-time="00:00:00"
								value-format="yyyy-MM-dd HH:mm:ss">
							</el-date-picker>
							至
							<el-date-picker
								style="width: 200px;"
								v-model="form.aset_end_date"
								type="datetime"
								placeholder="选择结束时间"
								:picker-options="{
									disabledDate(time) {
										return g_cc.picker_disabled_date_func(time,form.aset_begin_date);
									},
								}"
								default-time="23:59:59"
								value-format="yyyy-MM-dd HH:mm:ss">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="活动说明" prop="aset_desc" ref="aset_desc">
							<el-input class="x-input-60" type="textarea" :rows="5" v-model="form.aset_desc" placeholder="填写活动说明"/>
						</el-form-item>
						<el-form-item label="排序">
							<el-input-number v-model="form.aset_order" :step="1"></el-input-number>
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
			let page_data = { super_uid: '' }
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
			this.g_page.funcSetApiUrlEdit('/xadmin/act/act__item__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/act/act__item__edit/save')
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
		},
		methods: {
			funcBack() {
				let callback_url = this.$route.query.callback_url
				this.g_cc.func_redirect(callback_url)
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.media_pic = this.g_page.funcImgArrToStr(data.media_pic_imgs)

				return data
			}
		}
	}
</script>

<style>
</style>
