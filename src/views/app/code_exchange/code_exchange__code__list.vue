<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button v-if="$route.query.callback_url" size="mini" icon="el-icon-back" @click="g_page.funcBack">
				返回
			</el-button>
			<el-button type="success" size="mini" @click="g_page.funcRedirectEdit(`code_exchange__code__edit?pid=${form_q.pid}`)">
				批量添加
			</el-button>
			<el-button size="mini" type="danger" icon="el-icon-delete" @click="g_page.funcDel()">删除</el-button>
			<ExprotExcel api_url="/xadmin/code_exchange/code_exchange__code__list/export" :api_data="form_q"></ExprotExcel>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="码">
					<el-input name="compKw" v-model="form_q.compKw" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="g_page.funcSearch">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="table-wrap">
				<el-table stripe ref="multipleTable" tooltip-effect="dark" @selection-change="g_page.funcTableSelectionChange"
						  :data="list_data">
					<el-table-column type="selection"></el-table-column>
					<el-table-column label="兑换码">
						<template slot-scope="data">
							<div>{{data.row.code}}</div>
						</template>
					</el-table-column>
					<el-table-column label="有效期">
						<template slot-scope="data">
							<div>{{data.row.code_vaild_date_begin}}</div>
							<div>{{data.row.code_vaild_date_end}}</div>
							<div style="color: red;" v-if="data.row.is_exprire">过期</div>
						</template>
					</el-table-column>
					<el-table-column label="使用状态">
						<template slot-scope="data">
							<div v-if="data.row.code_use==1">
								<b style="color:green;">已使用</b>
								<div>{{ data.row.code_use_date }}</div>
							</div>
							<div v-if="data.row.code_use==0">未使用</div>
						</template>
					</el-table-column>
					<el-table-column label="创建日期">
						<template slot-scope="data">
							<div>{{data.row.code_create_date}}</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-main>
		<!---->
		<!---->
		<!-- 分页 -->
		<el-footer v-if="page_show">
			<el-pagination class="paging" background layout="total, prev, pager, next, jumper"
						   @current-change="g_page.funcPageChange"
						   :current-page="page_index" :page-size="page_size" :total="page_total">
			</el-pagination>
		</el-footer>
		<!---->
		<!---->
		<!-- 编辑控件 -->
		<PrizeSetEdit ref="item_edit" :id_src="form_q.pid" :app_id="form_q.app_id" :funcSaveAfter="funcEditItem_success"></PrizeSetEdit>
		<!---->
		<!---->
		<!-- 弹框 -->
		<el-dialog :title="form.app_idx+'配置'" :visible.sync="form_dialog_visible" width="70%">
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-form-item label="入口链接" v-if="!g_page.funcIsAdminAdd()">
					<el-input :disabled="true" v-model="form.oauth_url"/>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="g_page.funcBack" size="mini">取消</el-button>
				<el-button type="success" @click="g_page.funcSave" size="mini">保存</el-button>
			</div>
		</el-dialog>
		<!---->
		<!---->
		<!---->
	</el-container>
</template>


<script>
	import PrizeSetEdit from '@/components/CompPrize/PrizeSetEdit'
	import ExprotExcel from '@/components/ExprotExcel'

	export default {
		components: {
			PrizeSetEdit,
			ExprotExcel
		},
		data() {
			let page_data = { super_uid: '' }
			page_data = this.g_cc.funcGetInitData(page_data)
			return page_data
		},
		mounted() {
			console.log('mounted')
			//
			this.g_page.funcSetVue(this)
			// 应用ID
			this.g_page.funcSetApiUrlList('/xadmin/code_exchange/code_exchange__code__list')
			this.g_page.funcSetApiUrlDel('/xadmin/code_exchange/code_exchange__code__list/del')
			//页码
			this.g_page.funcSetPageSize(30)
			//搜索
			this.form_q = {
				'compKw': ''
			}
			this.g_page.funcGetList()
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
			funcEditItem_success(e) {
				this.g_page.funcGetList()
			},
			funcEdit(id) {
				this.$refs['item_edit'].funcEdit(id)
			}
			////////////////////
		}
	}
</script>
