<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="通知管理员-模板消息" prop="abc_str_01">
							<el-input class="x-input-60" v-model="form.abc_str_01"></el-input>
							<div class="x-alert">
								<span>活动申请及报修通过公众号通知管理员</span><br/>
								<span>{$msg}：通知内容</span>
							</div>
						</el-form-item>
						<el-form-item label="通知管理员配置" prop="abc_str_02">
							<el-input :rows="5" type="textarea" class="x-input-60" v-model="form.abc_str_02"></el-input>
							<div class="x-alert">
								<span>多个通知管理员请换行分隔</span>
							</div>
						</el-form-item>
						<el-form-item label="提现注意事项" prop="abc_txt_00">
							<el-input :rows="5" type="textarea" class="x-input-60" v-model="form.abc_txt_00"></el-input>
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_share_tea/app_share_tea__b__setting')
			this.g_page.funcSetApiUrlSave('/xadmin/app_share_tea/app_share_tea__b__setting/save')
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
				})

			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)
				return data
			}
		}
	}
</script>
