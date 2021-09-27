<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcBack">返回</el-button>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="名称">
					<el-input name="compKw" v-model="form_q.compKw" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="g_page.funcSearch">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="table-wrap">
				<el-table stripe ref="multipleTable" tooltip-effect="dark"
						  @selection-change="g_page.funcTableSelectionChange"
						  :data="list_data">
					<el-table-column type="selection"></el-table-column>
					<el-table-column
						label="用户">
						<template slot-scope="data">
							<div v-html="data.row.wxuser_nickname"></div>
							<div v-html="data.row.wxsglog_openid"></div>
						</template>
					</el-table-column>
					<el-table-column
						label="订阅时间">
						<template slot-scope="data">
							<div v-html="data.row.wxsglog_create_date"></div>
						</template>
					</el-table-column>
					<el-table-column
						label="状态">
						<template slot-scope="data">
							<div v-if="data.row.wxsglog_use>0">
								<span style="color: #9d9d9d;">已使用</span>
								<div>使用时间：@{{ data.row.__use_date }}</div>
								<div>errcode：@{{ data.row.wxsglog_use_errcode }}</div>
								<div>errmsg：@{{ data.row.wxsglog_use_errmsg }}</div>
							</div>
							<div v-if="data.row.wxsglog_use==0">
								<span style="color:green;">未使用</span>
							</div>
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
	export default {
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
			this.g_page.funcSetApiUrlList('/xadmin/wp_subscribemsg/wp_subscribemsg__log__list')
			//页码
			this.g_page.funcSetPageSize(10)
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
			funcBack() {
				let callback_url = this.$route.query.callback_url
				this.g_cc.func_redirect(callback_url)
			},
			funcEdit(row) {
				let id = ''
				if (row) {
					id = row.id
				}
				this.g_cc.func_redirect('/wp_subscribemsg/wp_subscribemsg__edit', {
					id: id,
					callback_url: '/wp_subscribemsg/wp_subscribemsg__list'
				})
			}
			////////////////////
		}
	}
</script>
