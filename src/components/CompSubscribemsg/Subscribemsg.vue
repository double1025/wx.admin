<template>
	<div>
		<div id="list_item" class="thumb-container-x">
			<!---->
			<!---->
			<div v-if="item" class="thumb-item">
				<span class="thumb-item-txt">订阅模板</span>
				<span class="thumb-item-txt">名称：{{item.wxsg_name}}</span>
				<span class="thumb-item-txt">环境：{{item.state_str}}</span>
				<div class="control">
					<div class="preview" title="编辑" @click="funcEditItem(item.id)">
						<i class="el-icon-edit"></i>
					</div>
				</div>
			</div>
			<!---->
			<!---->
		</div>
		<!---->
		<!---->
		<div v-if="btn_show" class="thumb-item-add" @click="funcEditItem('')">
			<i class="el-icon-plus" style="font-size: 3em;"></i>
			<div style="margin-top: 1em;">{{ btn_txt }}</div>
		</div>
		<!---->
		<!---->
		<!-- 编辑控件 -->
		<SubscribemsgEdit ref="item_edit" :uix="uix" :funcSaveAfter="funcEditItem_success"></SubscribemsgEdit>
		<!---->
		<!---->
	</div>
</template>

<script>
	import '@/styles/comp.scss'
	import SubscribemsgEdit from '@/components/CompSubscribemsg/SubscribemsgEdit'

	export default {
		components: {
			SubscribemsgEdit
		},
		props: {
			//添加按钮文本
			btn_txt: {
				type: String,
				default: '添加订阅模板'
			}
		},
		data() {
			let page_data = {
				uix: '',
				item: {},
				btn_show: false
			}
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
			// this.g_page.funcSetApiUrlList('/xadmin/z_common/item__list')
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
		},
		created() {
			console.log('ItemList:created')
		},
		methods: {
			//初始化
			funcInit(uix) {
				console.log('ItemList:funcInit')
				this.uix = uix
				this.data = {
					'uix': this.uix
				}
				this.g_cc.func_axios({
					url: '/xadmin/wp_subscribemsg/wp_subscribemsg__edit/info',
					data: this.data,
					loading: false,
					success: (res) => {
						if (res.errcode == 0) {
							this.item = res.entity
							this.btn_show = true
							if (this.item || this.item != null) {
								this.btn_show = false
							}
						} else {
							this.g_cc.func_alert(res.errmsg, 'error')
						}
					}
				})
			},
			funcEditItem() {
				let id = ''
				if (this.item) {
					id = this.item.wxsg_id
				}
				this.$refs['item_edit'].funcEdit(id)
			},
			funcEditItem_success(res) {
				console.log('funcEditItem_success')
				this.funcInit(this.uix)
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
