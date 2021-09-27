<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="轮播图配置">
							<ItemList ref="item_list_00"></ItemList>
							<div class="x-alert">
								<span>提示：可以用鼠标拖拽改变排序</span>
							</div>
						</el-form-item>
						<el-form-item label="入口配置">
							<ItemList ref="item_list_01"></ItemList>
							<div class="x-alert">
								<span>提示：可以用鼠标拖拽改变排序</span>
							</div>
						</el-form-item>
						<el-form-item label="选择商品">

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
				<!---->
				<!---->
			</el-form>
			<!---->
			<!---->
			<!-- 按钮部分 -->
			<div class="save_wrap">
<!--				<el-button @click="funcTest" size="mini">test</el-button>-->
<!--				<el-button @click="g_page.funcBack" size="mini">返回</el-button>-->
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
	import ItemList from '@/components/CompItem/ItemList'

	export default {
		components: {
			ItemList
		},
		data() {
			let page_data = { pid: '' }
			//
			page_data = this.g_cc.funcGetInitData(page_data)
			//
			return page_data
		},
		mounted() {
			console.log('mounted', this._uid)
			console.log(this.$route.query)

			this.g_page.funcSetVue(this)
			//
			this.g_page.funcSetApiUrlEdit('/xadmin/mall/mall__setting')
			this.g_page.funcSetApiUrlSave('/xadmin/mall/mall__setting/save')
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
			funcTest() {
				console.log(this.$route.fullPath)
				// let url = `/302?callback_url=${encodeURIComponent(this.$route.fullPath)}`
				this.g_cc.func_redirect(this.$route.fullPath)
			},
			funcShowDialogAfter() {
				this.$refs['item_list_00'].funcInit(this.form.abc_str_00)
				this.$refs['item_list_01'].funcInit(this.form.abc_str_01)
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				// data.sheet_banner_imgs = this.g_page.funcImgArrToStr(data.sheet_banner_imgs)

				return data
			}
			////////////////
		}
	}
</script>
