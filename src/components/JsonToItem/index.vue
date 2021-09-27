<template>
	<div>
		<!---->
		<!---->
		<el-button type="primary" @click="funcEditItem()" size="mini">添加</el-button>
		<el-table stripe ref="item_table" tooltip-effect="dark"
				  row-key="field_key"
				  @selection-change="g_page.funcTableSelectionChange"
				  :data="list_item">
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
			<el-table-column label="字段名">
				<template slot-scope="data">
					<div v-html="data.row.field_key"></div>
				</template>
			</el-table-column>
			<el-table-column label="类型">
				<template slot-scope="data">
					<div>{{ types[data.row.type] }}</div>
				</template>
			</el-table-column>
			<el-table-column label="必填">
				<template slot-scope="data">
					<div v-if="data.row.required==1">是</div>
					<div v-if="data.row.required!=1">否</div>
				</template>
			</el-table-column>
			<el-table-column label="列表显示" v-if="show.show_list">
				<template slot-scope="data">
					<el-switch v-model="data.row.show_list"
							   @change="funcChangeShowList(data.$index,data.row.show_list)"
							   active-color="#13ce66"
							   :active-value="1" active-text=""
							   :inactive-value="0" inactive-text="">
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作">
				<template slot-scope="data">
					<el-button type="text" @click="funcEditItem(data)" size="mini">
						编辑
					</el-button>
					<el-button type="text" @click="funcDelItem(data)" size="mini">
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="x-alert">
			<span>提示：可以用鼠标拖拽改变排序</span>
			<span v-if="!src_show"><a @click="funcShowSrc">查看源码</a></span>
		</div>
		<!---->
		<!-- 源码 -->
		<div v-if="src_show">
			<el-input :rows="8" type="textarea" v-model="src_val"></el-input>
			<el-button type="text" @click="funcSaveSrc" size="mini">
				修改源码
			</el-button>
		</div>
		<!---->
		<!---->
		<!-- 编辑控件 -->
		<Edit :types="types" ref="item_edit" :list_item="list_item" :funcSaveAfter="funcEditItem_success"></Edit>
		<!---->
		<!---->
	</div>
</template>

<script>
	import Edit from '@/components/JsonToItem/Edit'
	import Sortable from 'sortablejs'

	export default {
		components: {
			Edit
		},
		props: {
			value: {
				// type: Array,
				// default: () => []
			},
			show: {
				type: Object,
				default: () => {
					return {}
				}
			},
			//成功后，会执行
			funcSuccessAfter: {
				type: Function,
				default: undefined
			}
		},
		computed: {},
		watch: {
			/** 初始化值修改时重新初始化*/
			value(val) {
				if (val == '' || val == null) {
					this.list_item = []
				} else {
					this.list_item = JSON.parse(val)
				}
			}
		},
		data() {
			let page_data = {
				src_show: false,
				src_val: '',
				list_item: [],
				types: {
					'text': '文本框',
					'textarea': '文本域',
					'upload_img': '上传图片',
					'date': '日期',
					'datetime': '时间',
					'select': '下拉框',
					'radio': '单选框',
					'editor': '富文本'
					// 'checkbox': '复选框'
				}
			}
			//
			page_data = this.g_cc.funcGetInitData(page_data)
			//
			return page_data
		},
		mounted() {
			console.log('JsonToItem:mounted')
			//
			this.g_page.funcSetVue(this)
			// 应用ID
			// this.g_page.funcSetApiUrlList('/xadmin/prize/prize__set__list')
			// this.g_page.funcSetApiUrlDel('/xadmin/prize/prize__set__list/del')
			//页码
			this.g_page.funcSetPageSize(10)
			//搜索
			this.form_q = {
				// 'pid': this.pid
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
			this.funcSetSort()
		},
		methods: {
			funcEditItem(data) {
				console.log('funcEditItem', data)
				if (!data) {
					data = {}
					data.$index = -1
					data.row = {}
				}
				this.$refs['item_edit'].funcEdit(data.$index, data.row)
			},
			//删除子项
			funcDelItem(data) {
				console.log('funcDelItem')
				this.g_cc.func_confirm('确定删除吗？', () => {
					this.list_item.splice(data.$index, 1)

					this.funcListToVal()
				})
			},
			funcEditItem_success(data) {
				console.log('funcEditItem_success', data)
				let index = data.$index
				let is_add = index == -1
				delete data.$index //删除坐标字段
				//
				if (!is_add) {
					//编辑
					this.$set(this.list_item, index, data)
				} else {
					//添加
					this.list_item.push(data)
				}

				this.funcListToVal()
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
						const entity_old = this.list_item.splice(evt.oldIndex, 1)[0]
						this.list_item.splice(evt.newIndex, 0, entity_old)
						this.funcListToVal()
					}
				})
			},
			//显示源码
			funcShowSrc() {
				this.src_show = true
				this.src_val = this.value
			},
			//保存源码
			funcSaveSrc() {
				this.list_item = JSON.parse(this.src_val)
				this.funcListToVal()
				this.src_show = false
			},
			//改变列表显示状态
			funcChangeShowList(index, e) {
				console.log('funcChangeShowList', index, e)
				// debugger
				this.list_item[index].show_list = e
				this.funcListToVal()
			},
			funcListToVal() {
				let val = JSON.stringify(this.list_item)
				console.log('funcListToVal', val)
				this.$emit('update:value', val)
			}
			////////////////////
		}
	}
</script>
