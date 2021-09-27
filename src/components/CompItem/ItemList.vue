<template>
	<div>
		<div id="list_item" class="thumb-container-x">
			<!---->
			<!---->
			<div v-for="(item, i) in list_data" :key="item.id" class="thumb-item">
				<span class="thumb-item-txt">标题：{{item.item_title}}</span>
				<div class="thumb-item-img">
					<img :src="item.__pic">
				</div>
				<span class="thumb-item-txt">跳转方式：{{item.__type}}</span>
				<div class="control">
					<i class="el-icon-close del" @click.prevent.stop="funcDelItem(item.id)" title="删除"></i>
					<div class="preview" title="编辑" @click="funcEditItem(item.id)">
						<i class="el-icon-edit"></i>
					</div>
				</div>
			</div>
		</div>
		<!---->
		<!-- 添加 -->
		<div v-if="list_data.length < max" class="thumb-item-add" @click="funcEditItem('')">
			<i class="el-icon-plus" style="font-size: 3em;"></i>
			<div style="margin-top: 1em;">添加</div>
		</div>
		<!---->
		<!---->
		<!-- 编辑控件 -->
		<ItemEdit ref="item_edit" :pid="this.pid" :funcSaveAfter="funcEditItem_success"></ItemEdit>
		<!---->
		<!---->
	</div>
</template>

<script>
	import '@/styles/comp.scss'

	import ItemEdit from '@/components/CompItem/ItemEdit'
	import Sortable from 'sortablejs'

	export default {
		components: {
			ItemEdit
		},
		props: {
			max: {
				type: Number,
				default: 8
			}
		},
		data() {
			let page_data = { pid: '' }
			//
			page_data = this.g_cc.funcGetInitData(page_data)
			//
			return page_data
		},
		mounted() {
			console.log('ItemList:mounted')
			//
			this.g_page.funcSetVue(this)
			// 应用ID
			this.g_page.funcSetApiUrlList('/xadmin/z_common/item__list')
			this.g_page.funcSetApiUrlDel('/xadmin/z_common/item__list/del')
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
		created() {
			console.log('ItemList:created')
		},
		methods: {
			//初始化
			funcInit(pid) {
				console.log('ItemList:funcInit')
				this.pid = pid
				this.form_q = {
					'pid': this.pid
				}
				this.g_page.funcGetList()
			},
			funcGetListCommonSuccessAfter(res) {
				console.log('ItemList:funcGetListCommonSuccessAfter')
			},
			//子项编辑
			funcEditItem(id) {
				console.log('funcEdit', id)
				if (!id) {
					id = ''
				}
				this.$refs['item_edit'].funcEdit(id)
			},
			//子项编辑-成功
			funcEditItem_success() {
				console.log('funcEditItem_success')
				this.g_page.funcGetList()
			},
			//子项删除
			funcDelItem(id) {
				console.log('funcDelItem', id)
				if (!id) {
					id = ''
				}

				let ids = [id]
				this.g_page.funcDel(ids)
			},
			//改变排序
			funcSetSort() {
				let el = this.$el.querySelector('#list_item')
				console.log('funcSetSort', el)
				let sortable = Sortable.create(el, {
					ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
					handle: '.thumb-item',
					setData: function(dataTransfer) {
						dataTransfer.setData('Text', '')
					},
					onEnd: evt => {
						console.log(evt.newIndex, evt.oldIndex)
						if (evt.newIndex == evt.oldIndex) {
							return
						}

						//核心代码，换位置
						const entity_old = this.list_data.splice(evt.oldIndex, 1)[0]
						this.list_data.splice(evt.newIndex, 0, entity_old)
						//保存数据库
						let list_index = ''
						for (let k in this.list_data) {
							list_index += this.list_data[k].id + ','
						}
						console.log(list_index)
						this.funcItemSetOrder(list_index)
					}
				})
			},
			////////////////
			funcItemSetOrder(list_index) {
				this.g_cc.func_axios({
					url: '/xadmin/z_common/item__list/funcItemSetOrder',
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
			////////////////////
		}
	}
</script>
