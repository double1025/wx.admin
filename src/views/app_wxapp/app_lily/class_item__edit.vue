<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="课程">
							{{ form.lclass_name }}
						</el-form-item>
						<el-form-item label="时间段">
							{{ form.__date }} <b>{{ form.__time }}</b>
						</el-form-item>
						<el-form-item label="价格" prop="lcitem_price_now" ref="lcitem_price_now">
							<el-col :span="5">
								<el-input v-model="form.lcitem_price_now"/>
							</el-col>
							元
						</el-form-item>
						<el-form-item label="出售库存">
							<div>
								<b style="color: blue;">余{{ form.stcnt_count_left }}</b>
								/ 总{{ form.stcnt_count_total }}
							</div>
						</el-form-item>
						<el-form-item label="增加库存" prop="__set_count_total" ref="__set_count_total">
							<el-input-number v-model="form.__stcnt_count_total" :rules="{maxSize:1}" :step="5"></el-input-number>
						</el-form-item>
						<el-form-item label="状态" prop="lcitem_hide">
							<el-radio-group v-model="form.lcitem_hide">
								<el-radio v-for="(item,index) in page_info.list_hide" :key="index" :label="index">{{ item }}
								</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
					<el-tab-pane label="限制" name="2">
						<el-form-item label="用户购买上限" prop="lcitem_user_buy_max" ref="lcitem_user_buy_max">
							<div>
								<el-tag type="info" size="small">
									单个用户能购买数量
								</el-tag>
								<el-tag type="info" size="small">
									0：表示不作限制
								</el-tag>
							</div>
							<el-col :span="5">
								<el-input v-model="form.lcitem_user_buy_max"/>
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_lily/app_lily__class_item__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_lily/app_lily__class_item__edit/save')
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
			funcTeaChange(e) {
				console.log('funcTeaChange', e)
				this.form.do_update_tea = 1
			}
		}
	}
</script>

<style>
</style>
