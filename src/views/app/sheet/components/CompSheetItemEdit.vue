<template>
	<div>
		<!---->
		<!---->
		<!-- 弹框 -->
		<el-dialog :title="page_info.title" :visible.sync="form_dialog_visible" width="70%" :modal="false">
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-form-item label="显示标题" prop="label">
					<el-input class="x-input-60" v-model="form.label"/>
				</el-form-item>
				<el-form-item label="字段名" prop="field_type">
					<el-radio-group :disabled="form.$index!=-1" v-model="form.field_type">
						<el-radio :label="0">短文本</el-radio>
						<el-radio :label="1">长文本</el-radio>
					</el-radio-group>
					<div class="x-alert">
						<span>短文本长度：200字，可用数量6</span><br/>
						<span>长文本长度：2000字，可用数量4</span>
					</div>
				</el-form-item>
				<el-form-item label="选择控件" prop="type">
					<el-radio-group v-model="form.type">
						<el-radio v-for="(v, k) in page_data.types" :key="k" :label="k">{{ v }}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item v-show="funcShowTypeItem()" label="控件项" prop="type_item">
					<el-input type="textarea" :rows="5" v-model="form.type_item" placeholder="例：张三,李四,王五"/>
					<div class="x-alert">
						<span>多个项请使用英文逗号隔开</span>
					</div>
				</el-form-item>
				<el-form-item label="必填" prop="required">
					<el-radio-group v-model="form.required">
						<el-radio :label="0">否</el-radio>
						<el-radio :label="1">是</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="使用正则限制" prop="use_reg">
					<el-radio-group v-model="form.use_reg">
						<el-radio :label="0">否</el-radio>
						<el-radio :label="1">预设正则</el-radio>
						<el-radio :label="2">自定义</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item v-show="form.use_reg==1" label="正则表达式" prop="reg">
					<el-select filterable v-model="form.reg" placeholder="请选择">
						<el-option v-for="(v, k) in page_data.reg_list"
								   :label="k"
								   :key="v"
								   :value="v">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-show="form.use_reg==2" label="正则表达式" prop="reg">
					<el-input class="x-input-60" v-model="form.reg" placeholder=""/>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="funcBack" size="mini">取消</el-button>
				<el-button type="success" @click="funcSave" size="mini">保存</el-button>
			</div>
		</el-dialog>
		<!---->
		<!---->
		<!---->
	</div>
</template>

<script>
	export default {
		props: {
			//接口数据
			page_data: {
				type: Object,
				default: () => {
					return {}
				}
			},
			//未使用的字段KEY
			list_field: {
				type: Object
			},
			//保存成功后，会执行
			funcSaveAfter: {
				type: Function,
				default: undefined
			}
		},
		data() {
			let page_data = { super_uid: '' }
			//
			// debugger
			page_data = this.g_cc.funcGetInitData(page_data)
			//
			return page_data
		},
		mounted() {
			console.log('mounted', this._uid)
			console.log('mounted', this.page_data)
			//
			this.g_page.funcSetVue(this)
			// 应用ID
			// this.g_page.funcSetApiUrlEdit('/xadmin/sheet/sheet__item__edit')
			// this.g_page.funcSetApiUrlSave('/xadmin/sheet/sheet__item__edit/save')
			// this.g_page.funcSetApiUrlDel('/xadmin/sheet/sheet__item__edit/del')
			//搜索
			this.form_q = {
				'compKw': ''
			}
			//
			this.form_rules = {
				label: [
					{
						required: true,
						message: '字段是必须的',
						trigger: 'blur'
					}
				],
				field_type: [
					{
						required: true,
						message: '字段是必须的',
						trigger: 'blur'
					},
					{
						validator: (rule, value, callback) => {
							//添加才需要检查
							let err = false
							if (this.funcIsAdd()) { //添加操作才需要检查
								if (this.list_field.length <= 0) {
									err = true
								} else {
									let field_key = this.funcGetFieldKey()
									if (field_key === '') {
										err = true
									}
								}
							}

							if (err) {
								callback(new Error('字段数量不足'))
							} else {
								callback()
							}
						},
						trigger: 'blur'
					}
				],
				type_item: [
					{
						validator: (rule, value, callback) => {
							let do_check = this.funcShowTypeItem()
							if (do_check && !value) {
								callback(new Error('字段是必须的'))
							} else {
								callback()
							}
						},
						trigger: 'blur'
					}
				]
			}
			//
		},
		methods: {
			funcIsAdd() {
				return this.form.$index == -1
			},
			funcBack() {
				this.form_dialog_visible = false
			},
			//是否显示类型项
			funcShowTypeItem() {
				console.log('funcShowTypeItem', this.form.type)
				let is_show = false
				switch (this.form.type) {
					case 'select':
					case 'radio':
					case 'checkbox':
						is_show = true
						break
				}

				return is_show
			},
			/**
			 * 显示编辑弹框
			 * @param row
			 */
			funcEdit(index, row) {
				//
				this.form_dialog_visible = true
				let data = {
					type: 'text',
					use_reg: 0,
					required: 1
				}
				data = Object.assign(data, row)
				data.$index = index
				this.form = data
			},
			/**
			 * 保存成功方法重写
			 * @param res
			 */
			funcSave(res) {
				let page = this
				//验证
				page.$refs['form'].validate((valid) => {
					if (valid) {
						page.g_cc.func_alert('保存成功', 'success', function() {
							//选择字段
							if (page.funcIsAdd()) {
								let field_key = page.funcGetFieldKey()
								page.form.field_key = field_key
							}
							//特殊处理
							page.form_dialog_visible = false
							page.funcSaveAfter(page.form)
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
				//
			},
			/**
			 * 获取可保存字段
			 * @returns {string}
			 */
			funcGetFieldKey() {
				let field_key = ''
				// debugger
				for (var key in this.list_field) {
					let val = this.list_field[key]
					let field_fix = ''
					switch (this.form.field_type) {
						case 0:
							field_fix = 'scord_str_'
							break
						case 1:
							field_fix = 'scord_txt_'
							break
					}
					if (key.indexOf(field_fix) >= 0) {
						field_key = key
						break
					}
				}
				return field_key
			}
			////////////////////
		}
	}
</script>
