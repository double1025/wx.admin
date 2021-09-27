<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="分组" prop="fprize_abc_id__group">
							<el-select v-model="form.fprize_abc_id__group" placeholder="请选择">
								<el-option label="未设置" key="" value=""></el-option>
								<el-option v-for="(item,index) in page_info.list_group"
										   :label="item.abc_name" :key="item.abc_id" :value="item.abc_id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="奖品" prop="set_prize">
							<PrizeSetList ref="item_list" btn_txt="奖品配置"
										  :arr_hide="{pschou_win_rate:1}"
										  :funcSaveAfter="funcPrizeEdit_success"
										  :id_src="form.fprize_uix"
										  :pset_key="form.fprize_uix"
										  app_id="fun_mall">
							</PrizeSetList>
						</el-form-item>
						<el-form-item label="所需积分" prop="fprize_fun" ref="fprize_fun">
							<el-input-number v-model="form.fprize_fun" :min="1" :step="1"></el-input-number>
						</el-form-item>
						<el-form-item label="用户兑换上限" prop="fprize_get_total" ref="fprize_get_total">
							<el-input-number v-model="form.fprize_get_total" :min="0" :step="1"></el-input-number>
							<div class="x-alert">
								<span>每位用户可兑换数量</span><br/>
							</div>
						</el-form-item>
						<el-form-item label="可兑换时间" prop="fprize_end_date">
							<el-date-picker
								style="width: 200px;"
								v-model="form.fprize_begin_date"
								type="datetime"
								placeholder="选择开始时间"
								:picker-options="g_cc.picker_options"
								default-time="00:00:00"
								value-format="yyyy-MM-dd HH:mm:ss">
							</el-date-picker>
							至
							<el-date-picker
								style="width: 200px;"
								v-model="form.fprize_end_date"
								type="datetime"
								placeholder="选择结束时间"
								default-time="23:59:59"
								:picker-options="{
									disabledDate(time) {
										return g_cc.picker_disabled_date_func(time,form.fprize_begin_date);
									},
								}"
								value-format="yyyy-MM-dd HH:mm:ss">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="上下架" prop="fprize_shelve">
							<el-switch v-model="form.fprize_shelve"
									   active-color="#13ce66"
									   :active-value="1" active-text="上架"
									   :inactive-value="0" inactive-text="下架">
							</el-switch>
						</el-form-item>
						<el-form-item label="排序" prop="fprize_order" ref="fprize_order">
							<el-input-number v-model="form.fprize_order" :step="1"></el-input-number>
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
			<!-- 编辑控件 -->
			<!--			<PrizeSetList ref="item_edit" :id_src="form.fprize_uix" :pset_key="form.fprize_uix" app_id="fun_mall"></PrizeSetList>-->
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
	import PrizeSetList from '@/components/CompPrize/PrizeSetList'

	export default {
		components: {
			PrizeSetList
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
			this.g_page.funcSetApiUrlEdit('/xadmin/fun_mall/fun_mall__good__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/fun_mall/fun_mall__good__edit/save')
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
			},
			funcPrizeEdit_success(res) {
				console.log('funcPrizeEdit_success', res)
				this.form.set_prize = 1
			}
		}
	}
</script>
