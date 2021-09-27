<template>
	<div>
		<span v-if="entity">{{ entity.wxtmplmsg_name }}</span>
		<el-button size="mini" icon="el-icon-s-tools" type="primary" plain @click="funcEditItem"></el-button>
		<!---->
		<!---->
		<!-- 编辑控件 -->
		<TmplmsgEdit ref="item_edit" :uix="uix" :id_src="id_src" :app_id="app_id" :funcSaveAfter="funcEditItem_success"></TmplmsgEdit>
		<!---->
		<!---->
	</div>
</template>

<script>
	import TmplmsgEdit from '@/components/CompTmplmsg/TmplmsgEdit'

	export default {
		components: {
			TmplmsgEdit
		},
		props: {
			//唯一值
			uix: {
				type: String,
				default: ''
			},
			//来源ID
			id_src: {
				type: String,
				default: null
			},
			app_id: {
				type: String,
				default: null
			}
		},
		data() {
			let page_data = {
				entity: {}
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
					url: '/xadmin/tmplmsg/tmplmsg__edit/info',
					data: this.data,
					loading: false,
					success: (res) => {
						if (res.errcode == 0) {
							this.entity = res.entity
						} else {
							this.g_cc.func_alert(res.errmsg, 'error')
						}
					}
				})
			},
			funcEditItem() {
				let id = ''
				if (this.entity) {
					id = this.entity.wxtmplmsg_id
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
