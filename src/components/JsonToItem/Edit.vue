<template>
	<div>
		<!---->
		<!---->
		<!-- 弹框 -->
		<el-dialog :title="page_info.title" :visible.sync="form_dialog_visible" width="70%" :modal="false">
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-form-item label="显示标题" prop="label">
					<el-input class="x-input-60" v-model="form.label" placeholder="例：名称"/>
				</el-form-item>
				<el-form-item label="字段名" prop="field_key">
					<el-input class="x-input-60" v-model="form.field_key" placeholder="例：name"/>
				</el-form-item>
				<el-form-item label="选择控件" prop="type">
					<el-radio-group v-model="form.type" @change="funcChangeType">
						<el-radio v-for="(v, k) in types" :key="k" :label="k">{{ v }}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item v-if="form.type=='upload_img'" label="上传数量" prop="type_max">
					<el-input-number v-model="form.type_max" :step="1"></el-input-number>
				</el-form-item>
				<el-form-item v-show="funcShowTypeItem()" label="控件项" prop="type_item">
					<el-input type="textarea" class="x-input-60" :rows="5" v-model="form.type_item" placeholder="例：张三,李四,王五"/>
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
				<!--				<el-form-item label="使用正则限制" prop="use_reg">-->
				<!--					<el-radio-group v-model="form.use_reg">-->
				<!--						<el-radio :label="0">否</el-radio>-->
				<!--						<el-radio :label="1">预设正则</el-radio>-->
				<!--						<el-radio :label="2">自定义</el-radio>-->
				<!--					</el-radio-group>-->
				<!--				</el-form-item>-->
				<!--				<el-form-item v-show="form.use_reg==1" label="正则表达式" prop="reg">-->
				<!--					<el-select filterable v-model="form.reg" placeholder="请选择">-->
				<!--						<el-option v-for="(v, k) in reg_list"-->
				<!--								   :label="k"-->
				<!--								   :key="v"-->
				<!--								   :value="v">-->
				<!--						</el-option>-->
				<!--					</el-select>-->
				<!--				</el-form-item>-->
				<!--				<el-form-item v-show="form.use_reg==2" label="正则表达式" prop="reg">-->
				<!--					<el-input class="x-input-60" v-model="form.reg" placeholder=""/>-->
				<!--				</el-form-item>-->
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
			types: {
				type: Object,
				default: () => {
					return {}
				}
			},
			list_item: {
				type: Array,
				default: () => {
					return []
				}
			},
			//保存成功后，会执行
			funcSaveAfter: {
				type: Function,
				default: undefined
			}
		},
		data() {
			let page_data = {
				reg_list: [],
				init_field_key: ''
			}
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
				field_key: [
					{
						required: true,
						message: '字段是必须的',
						trigger: 'blur'
					},
					{
						validator: (rule, value, callback) => {
							//检查字段名是否存在
							let is_pass = true
							for (let k in this.list_item) {
								let v = this.list_item[k]

								if (v.field_key == this.init_field_key) {
									continue
								}

								if (v.field_key == value) {
									is_pass = false
									break
								}

							}

							if (!is_pass) {
								callback(new Error('字段名已存在'))
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
			funcChangeType(e) {
				switch (e) {
					case 'upload_img':
						if (!this.form.type_max) {
							this.form.type_max = 1
						}
						break
				}
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

				if (!this.funcIsAdd()) {
					this.init_field_key = this.form.field_key
				}
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
						//选择字段
						if (page.funcIsAdd()) {
						}
						//特殊处理
						page.form_dialog_visible = false
						page.funcSaveAfter(page.form)
						// page.g_cc.func_alert('保存成功', 'success', function() {
						// 	//选择字段
						// 	if (page.funcIsAdd()) {
						// 	}
						// 	//特殊处理
						// 	page.form_dialog_visible = false
						// 	page.funcSaveAfter(page.form)
						// })
					} else {
						console.log('error submit!!')
						return false
					}
				})
				//
			}
			////////////////////
		}
	}
</script>
