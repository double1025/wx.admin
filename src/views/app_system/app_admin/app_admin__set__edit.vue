<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="ID" prop="set_id" ref="set_id">
							<el-input class="x-input-60" v-model="form.set_id"/>
						</el-form-item>
						<el-form-item label="名称" prop="set_name" ref="set_name">
							<el-input class="x-input-60" v-model="form.set_name"/>
						</el-form-item>
						<el-form-item v-show="page_info.is_admin_edit" label="子项">
							<ItemList ref="item_list"></ItemList>
						</el-form-item>
						<el-form-item label="排序">
							<el-input-number v-model="form.set_order" :step="1"></el-input-number>
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
				<el-checkbox v-if="page_info.is_admin_edit" style="margin-left: 10px;" label="保存后停留" v-model="checked"/>
			</div>
			<!---->
			<!---->
			<!---->
		</el-main>
	</el-container>
</template>

<script>
	import ItemList from '@/views/app_system/app_admin/components/ItemList'

	export default {
		components: {
			ItemList
		},
		data() {
			let page_data = { super_uid: '' }
			page_data = this.g_cc.funcGetInitData(page_data)
			return page_data
		},
		mounted() {
			console.log('mounted')
			console.log(this.$route.query)

			this.g_page.funcSetVue(this)
			//
			this.g_page.funcSetApiUrlEdit('/xadmin/app_admin/app_admin__set__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_admin/app_admin__set__edit/save')
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
			// console.log('tag=', this.$refs.reply_app_file.$parent.name);
		},
		methods: {
			funcShowDialogAfter() {
				if (this.page_info.is_admin_edit) {
					this.$refs['item_list'].funcInit(this.form.set_id)
				}
			}
		}
	}
</script>

<style>
</style>
