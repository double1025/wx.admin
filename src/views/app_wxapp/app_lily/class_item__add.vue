<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="课程" prop="lcitem_lclass_id">
							<el-select filterable v-if="!page_info.is_admin_edit" v-model="form.lcitem_lclass_id" placeholder="请选择">
								<el-option v-for="item in page_info.list_class"
										   :label="item.lclass_name"
										   :key="item.lclass_id"
										   :value="item.lclass_id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="价格" prop="lcitem_price_now" ref="lcitem_price_now">
							<el-col :span="5">
								<el-input v-model="form.lcitem_price_now"/>
							</el-col>
							元
						</el-form-item>
						<el-form-item label="出售库存" prop="__stcnt_count_total">
							<el-input-number v-model="form.__stcnt_count_total" :step="5"></el-input-number>
						</el-form-item>
						<el-form-item label="日期" prop="end_date" ref="end_date">
							<el-col :span="5">
								<el-date-picker
									style="width: 100%"
									v-model="form.begin_date"
									type="date"
									placeholder="选择开始时间"
									value-format="yyyy-MM-dd">
								</el-date-picker>
							</el-col>
							<el-col :span="1" style="text-align: center;">至</el-col>
							<el-col :span="5">
								<el-date-picker
									style="width: 100%"
									v-model="form.end_date"
									type="date"
									placeholder="选择过期时间"
									:picker-options="{
								  		minTime: form.begin_date
									}"
									value-format="yyyy-MM-dd">
								</el-date-picker>
							</el-col>
						</el-form-item>
						<el-form-item label="星期" prop="week">
							<el-checkbox-group v-model="form.week">
								<el-checkbox v-for="(week, key) in page_info.weeks" :label="key" :key="key">{{ week }}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
						<el-form-item label="时间段" prop="end_time">
							<el-time-select
								placeholder="起始时间"
								v-model="form.begin_time"
								:picker-options="{
								  start: '08:00',
								  step: '00:15',
								  end: '21:30'
								}">
							</el-time-select>
							<el-time-select
								placeholder="结束时间"
								v-model="form.end_time"
								:picker-options="{
								  start: '08:00',
								  step: '00:15',
								  end: '21:30',
								  minTime: form.begin_time
								}">
							</el-time-select>
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_lily/app_lily__class_item__add')
			this.g_page.funcSetApiUrlSave('/xadmin/app_lily/app_lily__class_item__add/save')
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
			funcSave__success(res) {
				if (res.errcode == 0) {
					this.g_cc.func_alert(res.data.errmsg)
				} else {
					this.g_cc.func_alert(res.data.errmsg, 'error')
				}
			}
		}
	}
</script>

<style>
</style>
