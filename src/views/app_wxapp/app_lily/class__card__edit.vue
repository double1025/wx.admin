<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="套餐卡" prop="lczc_card_id" ref="lczc_card_id">
							<el-select filterable v-model="form.lczc_card_id" placeholder="请选择" @change="funcCardChange">
								<el-option v-for="item in page_info.list_card"
										   :label="item.lcitem_title"
										   :key="item.lcitem_id"
										   :value="item.lcitem_id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="预约设置" prop="lczc_use_x_1" ref="lczc_use_x_1">
							<el-alert :closable="false">
								套餐卡一共可预约{{card.lcitem_use_total}}节课，每1次预约扣{{form.lczc_use_x_1}}节
							</el-alert>
							<el-col :span="24">
								每次扣课
								<el-input style="width: 20%" v-model="form.lczc_use_x_1"/>
								节
							</el-col>
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
				<el-checkbox style="margin-left: 10px;" label="保存后停留" v-model="checked"/>
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
				card: {}
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_lily/app_lily__class__card__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_lily/app_lily__class__card__edit/save')
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
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.lclass_pic = this.g_page.funcImgArrToStr(data.lclass_pic_imgs)

				return data
			},
			funcCardChange(e) {
				console.log('funcCardChange', e)
				this.card = this.page_info.list_card[e]
			}
		}
	}
</script>

<style>
</style>
