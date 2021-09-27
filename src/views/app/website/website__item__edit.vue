<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="编号" prop="id">
							{{form.id}}
						</el-form-item>
						<el-form-item v-for="(item,index) in page_info.item_data" :label="item.label" :key="index" :prop="item.field_key">
							<template v-if="item.type=='text'">
								<el-input class="x-input-60" v-model="form[item.field_key]"></el-input>
							</template>
							<template v-if="item.type=='textarea'">
								<el-input type="textarea" class="x-input-60" v-model="form[item.field_key]"></el-input>
							</template>
							<template v-if="item.type=='upload_img'">
								<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="item.type_max"
											   :img_root="page_info.static_file_root"
											   :rules="({ maxSize: 2})"
											   v-bind:value.sync="form[item.field_key]"
											   :remote-fuc="g_page.funcUpdateImg"
											   :before-upload="g_page.funcUpdateImgBefore"/>
							</template>
							<template v-if="item.type=='date'">
								<el-date-picker
									style="width: 200px;"
									v-model="form[item.field_key]"
									type="date"
									placeholder="选择时间"
									:picker-options="g_cc.picker_options"
									value-format="yyyy-MM-dd">
								</el-date-picker>
							</template>
							<template v-if="item.type=='datetime'">
								<el-date-picker
									style="width: 200px;"
									v-model="form[item.field_key]"
									type="datetime"
									placeholder="选择时间"
									:picker-options="g_cc.picker_options"
									default-time="00:00:00"
									value-format="yyyy-MM-dd HH:mm:ss">
								</el-date-picker>
							</template>
							<template v-if="item.type=='select'">
								<el-select filterable v-model="form[item.field_key]" placeholder="请选择">
									<el-option v-for="(v, k) in item.type_item"
											   :label="v"
											   :key="v"
											   :value="v">
									</el-option>
								</el-select>
							</template>
							<template v-if="item.type=='radio'">
								<el-radio-group v-model="form[item.field_key]">
									<el-radio v-for="(val,key) in item.type_item" :key="val" :label="val">
										{{val}}
									</el-radio>
								</el-radio-group>
							</template>
							<template v-if="item.type=='editor'">
								<Tinymce menubar="" :height="500" v-model="form[item.field_key]" :ref="item.field_key"></Tinymce>
							</template>
						</el-form-item>
						<el-form-item v-if="page_info.set_type=1" label="排序" prop="sdata_order">
							<el-input-number v-model="form.sdata_order" :step="1"></el-input-number>
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
			this.g_page.funcSetApiUrlEdit('/xadmin/website/website__item__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/website/website__item__edit/save')
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
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				for (let k in this.page_info.item_data) {
					let v = this.page_info.item_data[k]
					if (v.type == 'editor') {
						data[v.field_key] = this.$refs[v.field_key][0].getContent()
					}
				}
				// data.abc_txt_01 = this.$refs['abc_txt_01'].getContent();

				return data
			}
		}
	}
</script>
