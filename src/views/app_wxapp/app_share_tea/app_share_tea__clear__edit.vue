<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="名称" prop="tcu_name">
							<el-input class="x-input-60" v-model="form.tcu_name"></el-input>
						</el-form-item>
						<el-form-item label="电话" prop="tcu_phone">
							<el-input class="x-input-60" v-model="form.tcu_phone"></el-input>
						</el-form-item>
						<el-form-item label="门店" prop="tcu_tpio_id">
							<el-select filterable v-model="form.tcu_tpio_id" placeholder="请选择">
								<el-option v-for="item in page_info.list_pio"
										   :label="item.tpio_name"
										   :key="item.tpio_id"
										   :value="item.tpio_id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="入职时间" prop="tcu_entry_date">
							<el-date-picker
								style="width: 200px;"
								v-model="form.tcu_entry_date"
								type="date"
								placeholder="选择入职时间"
								:picker-options="g_cc.picker_options"
								value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="关联openid" prop="tcu_openid">
							<el-input class="x-input-60" v-model="form.tcu_openid"></el-input>
						</el-form-item>
						<el-form-item label="工作时间" prop="tcu_week_time_end">
							<el-time-select
								placeholder="起始时间"
								v-model="form.tcu_week_time_begin"
								:picker-options="{
								  start: '00:00',
								  step: '00:30',
								  end: '23:30',
								}">
							</el-time-select>
							至
							<el-time-select
								placeholder="结束时间"
								v-model="form.tcu_week_time_end"
								:picker-options="{
								  start: '00:00',
								  step: '00:30',
								  end: '23:30',
								  minTime: form.tcu_week_time_begin
								}">
							</el-time-select>
						</el-form-item>
						<el-form-item label="状态" prop="tcu_enable">
							<el-switch v-model="form.tcu_enable"
									   active-color="#13ce66"
									   :active-value="1" active-text="生效"
									   :inactive-value="0" inactive-text="停用">
							</el-switch>
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_share_tea/app_share_tea__clear__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_share_tea/app_share_tea__clear__edit/save')
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
