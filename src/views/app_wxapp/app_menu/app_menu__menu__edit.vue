<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="食用方式" prop="abc_pid">
							<el-radio-group v-model="form.abc_pid" @change="funcChangeType">
								<el-radio v-for="item in page_info.list_type" :label="item.abc_id" :key="item.abc_id">
									{{item.abc_name}}
								</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="烹饪方式" prop="abc_str_02">
							<el-select
								v-model="form.abc_str_02"
								class="x-input-60"
								multiple
								filterable
								default-first-option>
								<el-option
									v-for="item in list_type2"
									:key="item.abc_name"
									:label="item.abc_name"
									:value="item.abc_name">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="名称" prop="abc_name">
							<el-input class="x-input-60" v-model="form.abc_name"></el-input>
						</el-form-item>
						<el-form-item label="过敏源" prop="abc_str_03">
							<el-select
								v-model="form.abc_str_03"
								class="x-input-60"
								multiple
								filterable
								default-first-option
								placeholder="选择过敏源">
								<el-option
									v-for="item in page_info.list_type0"
									:key="item.abc_name"
									:label="item.abc_name"
									:value="item.abc_name">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="图片" prop="abc_str_01">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :img_root="page_info.static_file_root"
										   :rules="({ maxSize: 0.5})"
										   v-bind:value.sync="form.abc_str_01"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="食材" prop="abc_txt_01">
							<Tinymce menubar="" :height="200" ref="abc_txt_01"></Tinymce>
						</el-form-item>
						<el-form-item label="制作过程" prop="abc_txt_00">
							<Tinymce menubar="" :height="300" ref="abc_txt_00"></Tinymce>
						</el-form-item>
						<el-form-item label="排序" prop="abc_order">
							<el-input-number v-model="form.abc_order" :step="1"></el-input-number>
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
	import Tinymce from '@/components/Tinymce'

	export default {
		components: {
			Tinymce
		},
		data() {
			let page_data = {
				list_type2: []
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_menu/app_menu__menu__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_menu/app_menu__menu__edit/save')
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
			funcChangeType(e) {
				console.log('funcChangeType', e)
				this.form.abc_str_02 = []
				this.funcInitType2(e)
			},
			//初始化烹饪方式
			funcInitType2(id) {
				this.list_type2 = []
				for (let k in this.page_info.list_type2) {
					let v = this.page_info.list_type2[k]
					if (v.abc_pid == id) {
						this.list_type2.push(v)
					}
				}
			},
			funcShowDialogAfter() {
				console.log('funcShowDialogAfter')
				if (this.page_info.is_admin_edit) {
					this.funcInitType2(this.form.abc_pid)
				}

				this.$refs['abc_txt_00'].setContent(this.form.abc_txt_00);
				this.$refs['abc_txt_01'].setContent(this.form.abc_txt_01);
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.abc_txt_01 = this.$refs['abc_txt_01'].getContent();
				data.abc_txt_00 = this.$refs['abc_txt_00'].getContent();

				return data
			},
			funcBack() {
				let callback_url = this.$route.query.callback_url
				this.g_cc.func_redirect(callback_url)
			}
		}
	}
</script>
