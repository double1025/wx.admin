<template>
	<div>
		<!---->
		<!---->
		<!-- 弹框 -->
		<el-dialog :title="page_info.title" :visible.sync="form_dialog_visible" width="70%">
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-form-item v-if="page_info.is_admin_edit" label="小程序路径">
					pages/sheet/index?key={{ form.sheet_id }}
				</el-form-item>
				<el-form-item label="名称" prop="sheet_name" ref="sheet_name">
					<el-input class="x-input-60" v-model="form.sheet_name"/>
				</el-form-item>
				<el-form-item label="有效期" prop="sheet_end_date" ref="sheet_end_date">
					<el-date-picker
						style="width: 200px;"
						v-model="form.sheet_begin_date"
						type="datetime"
						placeholder="选择开始时间"
						value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
					至
					<el-date-picker
						style="width: 200px;"
						v-model="form.sheet_end_date"
						type="datetime"
						placeholder="选择结束时间"
						value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="顶部轮播图" prop="sheet_banner_imgs">
					<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="5"
								   :img_root="page_info.static_file_root"
								   v-bind:value.sync="form.sheet_banner_imgs"
								   :remote-fuc="g_page.funcUpdateImg"
								   :before-upload="g_page.funcUpdateImgBefore"/>
				</el-form-item>
				<el-form-item label="提交方式" prop="sheet_submit_type" ref="sheet_submit_type">
					<el-radio-group :disabled="page_info.is_admin_edit" v-model="form.sheet_submit_type">
						<el-radio :label="0">1次</el-radio>
						<el-radio :label="1">多次</el-radio>
					</el-radio-group>
					<div class="x-alert">
						<span>1次：只会生成一次记录，多次提交会覆盖旧记录</span><br/>
						<span>多次：每次提交都会生成新的记录</span>
					</div>
				</el-form-item>
				<el-form-item label="配置子项">
					<el-button type="primary" @click="funcEditItem()" size="mini">添加</el-button>
					<el-table stripe ref="item_table" tooltip-effect="dark"
							  row-key="field_key"
							  @selection-change="g_page.funcTableSelectionChange"
							  :data="page_info.list_item">
						<el-table-column label="拖拽">
							<template slot-scope="data">
								<i class="el-icon-rank"></i>
							</template>
						</el-table-column>
						<el-table-column label="显示标题">
							<template slot-scope="data">
								<div v-html="data.row.label"></div>
							</template>
						</el-table-column>
						<el-table-column label="类型">
							<template slot-scope="data">
								<div>{{ page_info.item_data.types[data.row.type] }}</div>
								<div style="color:blue;font-size: 10px;">{{ data.row.field_key }}</div>
							</template>
						</el-table-column>
						<el-table-column label="必填">
							<template slot-scope="data">
								<div v-if="data.row.required==1">是</div>
								<div v-if="data.row.required!=1">否</div>
							</template>
						</el-table-column>
						<el-table-column fixed="right" label="操作">
							<template slot-scope="data">
								<el-button type="primary" @click="funcEditItem(data)" size="mini">
									编辑
								</el-button>
								<el-button type="danger" @click="funcDelItem(data)" size="mini">
									删除
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="x-alert">
						<span>提示：可以用鼠标拖拽改变排序</span>
					</div>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="funcBack" size="mini">取消</el-button>
				<el-button type="success" @click="g_page.funcSave" size="mini">保存</el-button>
			</div>
		</el-dialog>
		<!---->
		<!-- 编辑控件 -->
		<CompSheetItemEdit :list_field="page_info.list_field" :page_data="page_info.item_data" ref="item_edit" :funcSaveAfter="funcEditItem_success"></CompSheetItemEdit>
		<!---->
		<!---->
		<!---->
	</div>
</template>

<script>
	import CompSheetItemEdit from '@/views/app/sheet/components/CompSheetItemEdit'
	import Sortable from 'sortablejs'

	export default {
		components: {
			CompSheetItemEdit
		},
		props: {
			//表单ID
			id: {
				type: Number,
				default: null
			},
			uix: {
				type: String,
				default: ''
			},
			//保存成功后，会执行
			funcSaveAfter: {
				type: Function,
				default: undefined
			}
		},
		data() {
			let page_data = {
				page_info: {
					item_data: {
						types: {}
					},
					list_field: {}
				}
			}
			//
			// debugger
			page_data = this.g_cc.funcGetInitData(page_data)
			//
			return page_data
		},
		mounted() {
			console.log('mounted', this._uid)
			//
			// debugger
			this.g_page.funcSetVue(this)
			// 应用ID
			this.g_page.funcSetApiUrlEdit('/xadmin/sheet/sheet__sheet__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/sheet/sheet__sheet__edit/save')
			//搜索
			this.form_q = {
				'compKw': ''
			}
			//
			this.form_rules = {
				acc_uidX: [
					{
						required: true,
						message: '必填',
						trigger: 'blur'
					}
				]
			}
			//
		},
		methods: {
			/**
			 * 显示编辑弹框
			 * @param row
			 */
			funcEdit(id) {
				//
				let data = {
					id: id,
					uix: this.uix
				}
				this.g_page.funcEdit(data)
			},
			funcShowDialogAfter() {
				this.$nextTick(() => {
					this.funcSetSort()
				})
			},
			funcBack() {
				this.form_dialog_visible = false
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				// data.sheet_banner_imgs = this.g_page.funcImgArrToStr(data.sheet_banner_imgs)
				data.sheet_item_data = JSON.stringify(this.page_info.list_item)

				return data
			},
			//保存成功之后
			funcSave__success(res) {
				if (res.errcode == 0) {
					this.g_cc.func_alert('保存成功', 'success', () => {
						this.form_dialog_visible = false
						this.funcSaveAfter(res)
					})
				} else {
					this.g_cc.func_alert(res.data.errmsg, 'error')
				}
			},
			//子项编辑
			funcEditItem(data) {
				console.log('funcEditItem', data)
				if (!data) {
					data = {}
					data.$index = -1
					data.row = {}
				}
				this.$refs['item_edit'].funcEdit(data.$index, data.row)
			},
			funcEditItem_success(data) {
				console.log('funcEditItem_success', data)
				console.log('funcEditItem_success', this.page_info.list_field)
				let index = data.$index
				let is_add = index == -1
				delete data.$index //删除坐标字段
				//
				if (!is_add) {
					//编辑
					this.$set(this.page_info.list_item, index, data)
					// this.page_info.list_item[index] = data
				} else {
					//添加
					delete this.page_info.list_field[data.field_key]
					this.page_info.list_item.push(data)
				}
			},
			//删除子项
			funcDelItem(data) {
				console.log('funcDelItem')
				this.g_cc.func_confirm('确定删除吗？', () => {
					this.page_info.list_field[data.row.field_key] = 1 //保存字段归还数组
					this.page_info.list_item.splice(data.$index, 1)
				})
			},
			//改变排序
			funcSetSort() {
				const el = this.$refs.item_table.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
				let sortable = Sortable.create(el, {
					ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
					setData: function(dataTransfer) {
						dataTransfer.setData('Text', '')
					},
					onEnd: evt => {
						console.log(evt.newIndex, evt.oldIndex)
						if (evt.newIndex == evt.oldIndex) {
							return
						}

						//核心代码，换位置
						const entity_old = this.page_info.list_item.splice(evt.oldIndex, 1)[0]
						this.page_info.list_item.splice(evt.newIndex, 0, entity_old)
					}
				})
			}
			////////////////////
		}
	}
</script>
