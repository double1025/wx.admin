<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button size="mini" icon="el-icon-back" @click="g_page.funcBack">返回</el-button>
			<ExprotExcel api_url="/xadmin/act/act__launch__list/export" :api_data="form_q"></ExprotExcel>
			<el-button v-if="form_q.is_test" size="mini" type="danger" icon="el-icon-delete" @click="funcDelTest">
				删除测试数据
			</el-button>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="名称">
					<el-input name="compKw" v-model="form_q.compKw" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="g_page.funcSearch">搜索</el-button>
					<!--					<el-button @click="func_test" size="mini">test</el-button>-->
				</el-form-item>
			</el-form>
			<div class="table-wrap">
				<el-table stripe ref="multipleTable" tooltip-effect="dark"
						  @selection-change="g_page.funcTableSelectionChange"
						  :data="list_data">
					<el-table-column type="selection"></el-table-column>
					<el-table-column label="活动名称">
						<template slot-scope="data">
							<div v-html="data.row.aset_name"></div>
						</template>
					</el-table-column>
					<el-table-column label="用户">
						<template slot-scope="data">
							<div v-html="data.row.wxuser_nickname"></div>
							<div v-html="data.row.wxuser_openid"></div>
						</template>
					</el-table-column>
					<el-table-column label="发起时间">
						<template slot-scope="data">
							<div>{{ data.row.adl_create_date }}</div>
						</template>
					</el-table-column>
					<el-table-column label="文本">
						<template slot-scope="data">
							<div v-html="data.row.adl_str_00"></div>
						</template>
					</el-table-column>
					<el-table-column label="文本">
						<template slot-scope="data">
							<div v-html="data.row.adl_str_01"></div>
						</template>
					</el-table-column>
					<el-table-column label="数值">
						<template slot-scope="data">
							<div v-html="data.row.adl_int_00"></div>
						</template>
					</el-table-column>
				</el-table>
				<a target="_blank"></a>
			</div>
		</el-main>
		<!---->
		<!---->
		<!-- 分页 -->
		<el-footer v-if="page_show">
			<div style="font-size: 12px;">PV：{{ page_info.pv }}</div>
			<el-pagination class="paging" background layout="total, prev, pager, next, jumper"
						   @current-change="g_page.funcPageChange"
						   :current-page="page_index" :page-size="page_size" :total="page_total">
			</el-pagination>
		</el-footer>
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
	import ExprotExcel from '@/components/ExprotExcel'

	export default {
		components: {
			ExprotExcel
		},
		data() {
			let page_data = { super_uid: '' }
			//
			page_data = this.g_cc.funcGetInitData(page_data)
			//
			return page_data
		},
		mounted() {
			console.log('mounted')
			//
			this.g_page.funcSetVue(this)
			// 应用ID
			this.g_page.funcSetApiUrlList('/xadmin/act/act__launch__list')
			// this.g_page.funcSetApiUrlDel('/xadmin/act/act__launch__list/del')
			//页码
			this.g_page.funcSetPageSize(20)
			//搜索
			this.form_q = {}
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
			func_test() {
				this.g_cc.func_loading()
			},
			//删除测试数据
			funcDelTest() {
				let page = this
				page.g_cc.func_confirm('删除测试数据确认吗', function() {
					//
					page.g_cc.func_axios({
						url: '/xadmin/act/act__launch__list/del',
						data: {
							pid: page.form_q.pid
						},
						success: function(res) {
							//默认删除成功事件
							if (res.data.errcode == 0) {
								page.g_cc.func_alert('成功', 'success', function() {
									page.g_page.funcGetList()
								})
							} else {
								page.g_cc.func_alert(res.data.errmsg, 'error')
							}
						}//end success
					})
				}, null, 'error')
			}
			////////////////////
		}
	}
</script>
