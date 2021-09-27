<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="生成数量" prop="num" ref="num">
							<el-input-number v-model="form.num" :step="1" :min="1" :max="99"></el-input-number>
							<div class="x-alert">
								<span>一次最多生成99个兑换码</span>
							</div>
						</el-form-item>
						<el-form-item label="有效期" prop="vaild_date_end" ref="vaild_date_end">
							<el-date-picker
								style="width: 200px;"
								v-model="form.vaild_date_begin"
								type="datetime"
								placeholder="选择开始时间"
								:picker-options="g_cc.picker_options"
								default-time="00:00:00"
								value-format="yyyy-MM-dd HH:mm:ss">
							</el-date-picker>
							至
							<el-date-picker
								style="width: 200px;"
								v-model="form.vaild_date_end"
								type="datetime"
								placeholder="选择结束时间"
								:picker-options="{
									disabledDate(time) {
										return g_cc.picker_disabled_date_func(time,form.vaild_date_begin);
									},
								}"
								default-time="23:59:59"
								value-format="yyyy-MM-dd HH:mm:ss">
							</el-date-picker>
							<div class="x-alert">
								<span>兑换码的使用日期</span>
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
			this.g_page.funcSetApiUrlEdit('/xadmin/code_exchange/code_exchange__code__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/code_exchange/code_exchange__code__edit/save')
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
					this.$refs['item_list'].funcInit()
				})
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				// data.abc_str_00 = this.g_page.funcImgArrToStr(data.abc_str_00_imgs)

				return data
			}
		}
	}
</script>
