<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="日期" prop="end_date" ref="end_date">
							<el-date-picker
								style="width: 200px;"
								v-model="form.begin_date"
								type="date"
								placeholder="选择开始时间"
								:picker-options="g_cc.picker_options"
								value-format="yyyy-MM-dd">
							</el-date-picker>
							至
							<el-date-picker
								style="width: 200px;"
								v-model="form.end_date"
								type="date"
								placeholder="选择结束时间"
								:picker-options="{
									disabledDate(time) {
									return g_cc.picker_disabled_date_func(time,form.begin_date);
									},
								}"
								value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="时间点" prop="time" ref="time">
							<el-checkbox-group v-model="form.time">
								<el-checkbox v-for="item in page_info.list_time" :label="item" :key="item">
									{{item}}
								</el-checkbox>
							</el-checkbox-group>
							<el-button type="primary" @click="funcCheckAll" size="mini">全选</el-button>
							<div class="x-alert">
								<span>说明：选10:00，表示：09:30-10:00价格设置</span>
							</div>
						</el-form-item>
						<el-form-item label="价格" prop="time_price" ref="time_price">
							<el-input-number v-model="form.time_price" :precision="2" :min="0.01"></el-input-number>
							元/半小时
							<div class="x-alert">
								<span>注意：记录已存在，默认视为修改操作</span>
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
				<el-button type="success" @click="g_page.funcSave" size="mini">批量生成</el-button>
				<el-checkbox v-if="page_info.is_admin_edit" style="margin-left: 10px;" label="保存后停留" v-model="checked"/>
			</div>
			<!---->
			<!---->
			<!---->
		</el-main>
	</el-container>
</template>

<script>
	import CompSelectCity from '@/components/CompSelectCity'

	export default {
		components: {
			CompSelectCity
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_share_tea/app_share_tea__room__time__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_share_tea/app_share_tea__room__time__edit/save')
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
			//全选
			funcCheckAll() {
				console.log('funcCheckAll')
				this.form.time = []
				for (let key in this.page_info.list_time) {
					if (!this.form.time[key]) {
						let val = this.page_info.list_time[key]
						this.form.time.push(val)
					}
				}
			},
			funcShowDialogAfter() {
				console.log('funcShowDialogAfter')
			},
			//保存之前
			funcSaveBefore(data) {
				// console.log('funcSaveBefore', data)
				return data
			}
		}
	}
</script>
