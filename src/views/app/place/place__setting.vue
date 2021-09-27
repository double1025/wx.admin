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
							<el-button size="mini" icon="el-icon-s-tools" type="primary" plain @click="g_page.funcRedirectAppEdit('place')"></el-button>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
					<el-tab-pane label="高级配置" name="2" v-if="false">
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

	export default {
		components: {
			ItemList
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
			this.g_page.funcSetApiUrlEdit('/xadmin/place/place__setting')
			this.g_page.funcSetApiUrlSave('/xadmin/place/place__setting/save')
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
