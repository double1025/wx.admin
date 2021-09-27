<template>
	<div>
		<div id="list_item" class="thumb-container-x">
			<!---->
			<!---->
			<div v-for="(item, i) in list_data" :key="item.id" class="thumb-item">
				<span class="thumb-item-txt" style="color:blue;">卡号：{{item.coupon_id}}</span>
				<span class="thumb-item-txt">名称：{{item.coupon_name}}</span>
				<span class="thumb-item-txt">类型：{{item.type}}</span>
				<div class="control">
					<!--						<i class="el-icon-close del" @click.prevent.stop="funcDelItem(item.id)" title="删除"></i>-->
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
		<CouponSetEdit ref="item_edit" :app_id="app_id" :uix="uix" :funcSaveAfter="funcEditItem_success"></CouponSetEdit>
		<!---->
		<!---->
	</div>
</template>

<script>
	import '@/styles/comp.scss'
	import CouponSetEdit from '@/components/CompCoupon/CouponSetEdit'

	export default {
		components: {
			CouponSetEdit
		},
		props: {
			//是否可以添加多个
			add_more: {
				type: Boolean,
				default: false
			},
			//添加按钮文本
			btn_txt: {
				type: String,
				default: '添加'
			},
			app_id: {
				type: String,
				default: null
			},
			disabled: {
				type: Boolean,
				default: false
			},
			//保存成功后，会执行
			funcSaveAfter: {
				type: Function,
				default: undefined
			}
		},
		data() {
			let page_data = {
				btn_show: false,
				uix: ''
			}
			//
			page_data = this.g_cc.funcGetInitData(page_data)
			//
			return page_data
		}
		,
		mounted() {
			console.log('ItemList:mounted')
			//
			this.g_page.funcSetVue(this)
			// 应用ID
			this.g_page.funcSetApiUrlList('/xadmin/coupon/coupon__set__list')
			this.g_page.funcSetApiUrlDel('/xadmin/coupon/coupon__set__list/del')
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
		}
		,
		created() {
			console.log('ItemList:created')
		}
		,
		methods: {
			//初始化
			funcInit(uix) {
				console.log('ItemList:funcInit')
				// debugger
				if (!uix) {
					this.g_cc.func_alert('初始化失败，miss uix', 'error')
				}
				this.uix = uix
				this.form_q = {
					'uix': this.uix,
					'app_id': this.app_id
				}
				this.g_page.funcGetList()
			},
			funcGetListCommonSuccessAfter(res) {
				console.log('ItemList:funcGetListCommonSuccessAfter')

				// debugger
				//添加按钮控制
				this.btn_show = true
				if (!this.add_more) {
					if (res.list.length > 0) {
						this.btn_show = false
					}
				}
			},
			//子项编辑
			funcEditItem(id) {
				if (this.disabled) {
					return
				}
				console.log('funcEdit', id)
				if (!id) {
					id = ''
				}
				this.$refs['item_edit'].funcEdit(id)
			},
			//子项编辑-成功
			funcEditItem_success(res) {
				console.log('funcEditItem_success')

				// debugger
				if (this.funcSaveAfter) {
					this.funcSaveAfter(res)
				}

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
			}
			////////////////////
		}
	}
</script>
