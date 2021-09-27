<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="管理员">
							<el-input class="x-input-60" :rows="10" type="textarea" v-model="form.abc_txt_00" placeholder="多个换行分隔"/>
							<div class="x-alert">
								<span>多个换行分隔</span>
							</div>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
					<el-tab-pane v-if="false" label="高级配置" name="2">
						<!--						<el-form-item label="科技侠-帐号" prop="s_account" ref="s_account">-->
						<!--							<el-input class="x-input-60" v-model="form.s_account" placeholder="帐号"></el-input>-->
						<!--						</el-form-item>-->
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
	import FileList from '@/components/UploadFile/UploadFileList'

	export default {
		components: {
			ItemList,
			FileList
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_menu/app_menu__setting')
			this.g_page.funcSetApiUrlSave('/xadmin/app_menu/app_menu__setting/save')
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
				// this.$nextTick(() => {
				// 	this.$refs['item_list_00'].funcInit(this.form.abc_str_00)
				// })

			},
			//保存之前
			funcSaveBefore(data) {
				return data
			}
		}
	}
</script>
