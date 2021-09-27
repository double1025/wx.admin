<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="邀请奖励" prop="abc_int_00">
							<el-input-number v-model="form.abc_int_00" :step="1"></el-input-number>
						</el-form-item>
						<el-form-item label="邀请成功通知">
							<Subscribemsg ref="tmplmsg"></Subscribemsg>
						</el-form-item>
						<el-form-item label="邀请成功跳转链接" prop="abc_str_01">
							<el-input class="x-input-60" v-model="form.abc_str_01"/>
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
	import Subscribemsg from '@/components/CompSubscribemsg/Subscribemsg'

	export default {
		components: {
			Subscribemsg
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
			this.g_page.funcSetApiUrlEdit('/xadmin/user_relation/user_relation__setting')
			this.g_page.funcSetApiUrlSave('/xadmin/user_relation/user_relation__setting/save')
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
					this.$refs['tmplmsg'].funcInit(this.form.abc_str_00)
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
