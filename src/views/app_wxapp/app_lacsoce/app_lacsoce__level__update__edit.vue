<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="类型" prop="abc_int_00">
							<el-radio-group v-model="form.abc_int_00">
								<el-radio :label="0">单选题</el-radio>
								<el-radio :label="1">多选题</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="题目" prop="abc_txt_00">
							<el-input class="x-input-60" type="textarea" :rows="5" v-model="form.abc_txt_00"></el-input>
						</el-form-item>
						<el-form-item label="选择项" prop="abc_txt_01">
							<el-table stripe ref="item_table" tooltip-effect="dark"
									  row-key="index"
									  @selection-change="g_page.funcTableSelectionChange"
									  :data="page_info.list_item">
								<el-table-column label="拖拽">
									<template slot-scope="data">
										<i class="el-icon-rank"></i>
									</template>
								</el-table-column>
								<el-table-column label="内容">
									<template slot-scope="data">
										<div>{{ data.row.txt }}</div>
									</template>
								</el-table-column>
								<el-table-column fixed="right" label="操作">
									<template slot-scope="data">
										<el-button type="danger" @click="funcDelItem(data.$index)" size="mini">
											删除
										</el-button>
									</template>
								</el-table-column>
							</el-table>
							<div class="x-alert">
								<span>提示：可以用鼠标拖拽改变排序</span>
							</div>
						</el-form-item>
						<el-form-item label="选择项-添加">
							内容：
							<el-input class="x-input-60" v-model="item_txt"></el-input>
							<el-button type="primary" @click="funcAddItem" size="mini">添加</el-button>
						</el-form-item>
						<el-form-item label="正确答案" prop="abc_str_00">
							<el-select multiple filterable v-model="form.abc_str_00" placeholder="请选择">
								<el-option v-for="(v, k) in page_info.list_item"
										   :label="v.txt" :key="v.index" :value="v.index">
								</el-option>
							</el-select>
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
				<el-checkbox style="margin-left: 10px;" label="保存后停留" v-model="checked"/>
			</div>
			<!---->
			<!---->
			<!---->
		</el-main>
	</el-container>
</template>

<script>
	import Sortable from 'sortablejs'

	export default {
		data() {
			let page_data = {
				item_txt: ''
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_lacsoce/app_lacsoce__level__update__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_lacsoce/app_lacsoce__level__update__edit/save')
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
			//删除子项
			funcAddItem() {
				if (this.item_txt == '') {
					this.g_cc.func_alert('请输入完整参数', 'error')
					return false
				}

				let data = {
					index: this.page_info.list_item.length,
					txt: this.item_txt
				}

				//添加
				this.page_info.list_item.push(data)
				this.funcUpdate()
				//清空
				this.item_txt = ''
			},
			//删除子项
			funcDelItem(index) {
				this.g_cc.func_confirm('确定吗？', () => {
					this.page_info.list_item.splice(index, 1)
					this.funcUpdate()
				})
			},
			//更新到表字段
			funcUpdate() {
				let arr = []
				for (let k in this.page_info.list_item) {
					arr.push(this.page_info.list_item[k].txt)
				}
				this.form.abc_txt_01 = JSON.stringify(arr)
				//选择项更新，清空正确答案字段
				this.form.abc_str_00 = []
				console.log('funcUpdate', this.form.abc_txt_01)
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
						this.funcUpdate()
					}
				})
			}
			//////////////////////////////
		}
	}
</script>
