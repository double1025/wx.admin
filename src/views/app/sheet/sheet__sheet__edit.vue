<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
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
										   v-bind:value.sync="form.sheet_banner_imgs"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="提交方式" prop="sheet_submit_type" ref="sheet_submit_type">
							<el-radio-group v-model="form.sheet_submit_type">
								<el-radio :label="0">1次</el-radio>
								<el-radio :label="1">多次</el-radio>
							</el-radio-group>
							<div class="x-alert">
								<span>1次：只会生成一次记录，多次提交会覆盖旧记录</span><br/>
								<span>多次：每次提交都会生成新的记录</span>
							</div>
						</el-form-item>
						<el-form-item v-show="!form.id" label="配置子项">
							<span style="color: blue;">请先保存，才能配置子项</span>
						</el-form-item>
						<el-form-item v-show="form.id" label="配置子项">
							<el-button type="primary" @click="funcEditItem('')" size="mini">添加</el-button>
							<el-table stripe ref="item_table" tooltip-effect="dark"
									  row-key="sitem_id"
									  @selection-change="g_page.funcTableSelectionChange"
									  :data="page_info.list_item">
								<el-table-column label="拖拽">
									<template slot-scope="data">
										<i class="el-icon-rank"></i>
									</template>
								</el-table-column>
								<el-table-column label="显示标题">
									<template slot-scope="data">
										<div v-html="data.row.sitem_label"></div>
									</template>
								</el-table-column>
								<el-table-column label="类型">
									<template slot-scope="data">
										<div>{{ page_info.type[data.row.sitem_type] }}</div>
										<div style="color:blue;font-size: 10px;">{{ data.row.sitem_field_key }}</div>
									</template>
								</el-table-column>
								<el-table-column label="必填">
									<template slot-scope="data">
										<div v-if="data.row.sitem_required==1">是</div>
										<div v-if="data.row.sitem_required!=1">否</div>
									</template>
								</el-table-column>
								<el-table-column fixed="right" label="操作">
									<template slot-scope="data">
										<el-button type="primary" @click="funcEditItem(data.row.sitem_id)" size="mini">
											编辑
										</el-button>
										<el-button type="danger" @click="funcDelItem(data.row.sitem_id)" size="mini">
											删除
										</el-button>
									</template>
								</el-table-column>
							</el-table>
							<div class="x-alert">
								<span>提示：可以用鼠标拖拽改变排序</span>
							</div>
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
				<!-- 编辑控件 -->
				<CompSheetItemEdit ref="item_edit" :pid="form.sheet_id" :funcSaveAfter="funcEditItem_success" :funcDelAfter="funcDelItem_success"></CompSheetItemEdit>
				<!---->
				<!---->
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
	import CompSheetItemEdit from '@/views/app/sheet/components/CompSheetItemEdit'
	import Sortable from 'sortablejs'

	export default {
		components: {
			CompSheetItemEdit
		},
		data() {
			let page_data = { dialogVisible: false }
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
			this.g_page.funcSetApiUrlEdit('/xadmin/sheet/sheet__sheet__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/sheet/sheet__sheet__edit/save')
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
		created() {
			//
			this.$nextTick(() => {
				this.funcSetSort()
			})
		},
		methods: {
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.sheet_banner_imgs = this.g_page.funcImgArrToStr(data.sheet_banner_imgs)

				return data
			},
			//子项编辑
			funcEditItem(id) {
				console.log('funcEdit', id)
				if (!id) {
					id = ''
				}
				this.$refs['item_edit'].funcEdit(id)
			},
			funcEditItem_success() {
				console.log('funcEditItem_success')
				let data = this.$route.query
				this.g_page.funcEdit(data)
			},
			//删除子项
			funcDelItem(id) {
				console.log('funcDelItem', id)
				this.$refs['item_edit'].funcDel(id)
			},
			funcDelItem_success(res) {
				let data = this.$route.query
				this.g_page.funcEdit(data)
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
						//保存数据库
						let list_index = ''
						for (let k in this.page_info.list_item) {
							list_index += this.page_info.list_item[k].sitem_id + ','
						}
						this.funcItemSetOrder(list_index)
					}
				})
			},
			////////////////
			funcItemSetOrder(list_index) {
				this.g_cc.func_axios({
					url: '/xadmin/sheet/sheet__sheet__edit/funcItemSetOrder',
					data: {
						list_index: list_index
					},
					loading: false,
					success: (res) => {
						//
						if (res.data.errcode == 0) {
						} else {
							this.g_cc.func_alert(res.data.errmsg)
						}
					}
					//
				})
			}
			////////////////
		}
	}
</script>

<style>
	.sortable-ghost {
		opacity: .8;
		color: #fff !important;
		background: #42b983 !important;
	}
</style>
