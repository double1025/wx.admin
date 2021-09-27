<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="轮播图配置">
							<ItemList :max="6" ref="item_list_00"></ItemList>
							<div class="x-alert">
								<span>提示：可以用鼠标拖拽改变排序</span>
							</div>
						</el-form-item>
						<el-form-item label="店铺设施">
							<el-input class="x-input-60" type="textarea" v-model="form.abc_txt_00" placeholder="多个请用英文逗号分隔"></el-input>
						</el-form-item>
						<el-form-item label="下单温馨提示">
							<Tinymce menubar="" v-model="form.abc_txt_01" :height="350" ref="abc_txt_01"></Tinymce>
						</el-form-item>
						<el-form-item label="下单订阅模板">
							<div class="x-alert">
								<span><b>占位符说明</b></span><br/>
								<span>订单号：{order_order_id}、订单金额：{order_price}、支付时间：{order_pay_ok_date}</span><br/>
								<span>门店名：{tpio_name}、茶室名：{troom_name}、茶室副标题：{troom_title_sub}</span><br/>
							</div>
							<Subscribemsg ref="tmplmsg"></Subscribemsg>
						</el-form-item>
						<el-form-item label="配置时间点">
							<el-button type="primary" size="mini" @click="g_page.funcRedirectEdit('app_share_tea__time__list')">
								前往
							</el-button>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
					<el-tab-pane label="高级配置" name="2">
						<el-form-item label="科技侠-帐号" prop="s_account" ref="s_account">
							<el-input class="x-input-60" v-model="form.s_account" placeholder="帐号"></el-input>
						</el-form-item>
						<el-form-item label="科技侠-密码" prop="s_pwd" ref="s_pwd">
							<el-input type="password" class="x-input-60" v-model="form.s_pwd" placeholder="密码"></el-input>
						</el-form-item>
						<el-form-item label="科技侠-应用ID" prop="s_client_id" ref="s_client_id">
							<el-input class="x-input-60" v-model="form.s_client_id" placeholder="client_id"></el-input>
						</el-form-item>
						<el-form-item label="科技侠-应用secret" prop="s_client_secret" ref="s_client_secret">
							<el-input class="x-input-60" v-model="form.s_client_secret" placeholder="client_secret"></el-input>
						</el-form-item>
						<el-form-item label="绿米-帐号" prop="lm_account" ref="lm_account">
							<el-input class="x-input-60" v-model="form.lm_account" placeholder="帐号"></el-input>
						</el-form-item>
						<el-form-item label="绿米-密码" prop="lm_pwd" ref="lm_pwd">
							<el-input type="password" class="x-input-60" v-model="form.lm_pwd" placeholder="密码"></el-input>
						</el-form-item>
						<el-form-item label="绿米-应用ID" prop="lm_client_id" ref="lm_client_id">
							<el-input class="x-input-60" v-model="form.lm_client_id" placeholder="client_id"></el-input>
						</el-form-item>
						<el-form-item label="绿米-应用secret" prop="lm_client_secret" ref="lm_client_secret">
							<el-input class="x-input-60" v-model="form.lm_client_secret" placeholder="client_secret"></el-input>
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
				<!--				<el-button @click="g_page.funcBack" size="mini">返回</el-button>-->
				<el-button type="success" @click="g_page.funcSave" size="mini">保存</el-button>
				<!--				<el-checkbox style="margin-left: 10px;" label="保存后停留" v-model="checked"/>-->
			</div>
			<!---->
			<!---->
			<!---->
		</el-main>
	</el-container>
</template>

<script>
	import ItemList from '@/components/CompItem/ItemList'
	import Subscribemsg from '@/components/CompSubscribemsg/Subscribemsg'
	import Tinymce from '@/components/Tinymce'

	export default {
		components: {
			ItemList,
			Subscribemsg,
			Tinymce
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_share_tea/app_share_tea__setting')
			this.g_page.funcSetApiUrlSave('/xadmin/app_share_tea/app_share_tea__setting/save')
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
					this.$refs['item_list_00'].funcInit(this.form.abc_str_00)

					this.$refs['tmplmsg'].funcInit(this.form.abc_str_01)

					// debugger
					setTimeout(() => {
						this.$refs['abc_txt_01'].setContent(this.form.abc_txt_01)
					}, 200)
				})

			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)
				data.abc_txt_01 = this.$refs['abc_txt_01'].getContent()
				return data
			}
		}
	}
</script>
