<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="题目分组" prop="abc_pid">
							<el-select v-model="form.abc_pid" placeholder="请选择">
								<el-option v-for="(item,index) in page_info.list_subject_group"
										   :label="item.abc_str_00" :key="item.abc_id" :value="item.abc_id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="标签" prop="abc_str_00">
							<el-select v-if="form.abc_pid" v-model="form.abc_str_00" placeholder="请选择">
								<el-option label="未配置标签" key="" value=""></el-option>
								<el-option v-for="(item,index) in page_info.list_subject_group[form.abc_pid].tag_arr"
										   :label="item" :key="item" :value="item">
								</el-option>
							</el-select>
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
								<el-table-column label="分数">
									<template slot-scope="data">
										<div>{{ data.row.fun }}</div>
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
							<el-col>
								内容：
								<el-input class="x-input-60" v-model="item_txt"></el-input>
							</el-col>
							<el-col style="margin-top: 10px;">
								分数：
								<el-input-number v-model="item_fun" :step="1"></el-input-number>
								<el-button type="primary" @click="funcAddItem" size="mini">添加</el-button>
							</el-col>
						</el-form-item>
						<el-form-item label="排序" prop="abc_order" ref="abc_order">
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
	import Sortable from 'sortablejs'

	export default {
		data() {
			let page_data = {
				item_txt: '',
				item_fun: 0
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_grade/app_grade__subject__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_grade/app_grade__subject__edit/save')
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

				this.funcSetSort()
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				// data.llevel_icon = this.g_page.funcImgArrToStr(data.llevel_icon_imgs)
				// data.llevel_pic_cert = this.g_page.funcImgArrToStr(data.llevel_pic_cert_imgs)

				return data
			},
			//添加子项
			funcAddItem() {
				if (this.item_txt == '') {
					this.g_cc.func_alert('请输入完整参数', 'error')
					return false
				}

				let data = {
					index: this.page_info.list_item.length,
					txt: this.item_txt,
					fun: this.item_fun
				}

				//添加
				this.page_info.list_item.push(data)
				this.funcUpdate()
				//清空
				this.item_txt = ''
				this.item_fun = 0
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
					let val = this.page_info.list_item[k]
					let data = {
						txt: val.txt,
						fun: val.fun
					}
					arr.push(data)
				}
				this.form.abc_txt_01 = JSON.stringify(arr)
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
			//////////////////////////////////////
		}
	}
</script>
