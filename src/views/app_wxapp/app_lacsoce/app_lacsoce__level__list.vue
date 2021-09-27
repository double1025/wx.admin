<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="g_page.funcRedirectEdit('app_lacsoce__level__edit')">
				添加
			</el-button>
			<el-button size="mini" type="danger" icon="el-icon-delete" @click="g_page.funcDel()">删除</el-button>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini" v-if="false">
				<el-form-item label="门店名称">
					<el-input name="compKw" v-model="form_q.compKw" placeholder="门店名称"></el-input>
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
					<el-table-column label="等级名称">
						<template slot-scope="data">
							<div v-html="data.row.llevel_name"></div>
						</template>
					</el-table-column>
					<el-table-column label="级别">
						<template slot-scope="data">
							{{data.row.llevel_level}}
						</template>
					</el-table-column>
					<el-table-column label="图标">
						<template slot-scope="data">
							<CompImg style="width: 30%;" :img_root="page_info.static_file_root" :img_val="data.row.llevel_icon"></CompImg>
						</template>
					</el-table-column>
					<el-table-column label="审核权限">
						<template slot-scope="data">
							<div v-if="data.row.llevel_auth_reg==1">注册审核</div>
							<div v-if="data.row.llevel_auth_update==1">升级审核</div>
							<div v-if="data.row.llevel_auth_extension==1">续签审核</div>
						</template>
					</el-table-column>
					<el-table-column label="联合审核">
						<template slot-scope="data">
							<div v-if="data.row.llevel_join_apply==1">
								{{ data.row.llevel_name__apply }}
							</div>
							<div v-if="data.row.llevel_join_apply==0">
								无
							</div>
						</template>
					</el-table-column>
					<el-table-column label="可邀请等级">
						<template slot-scope="data">
							<div v-if="data.row.llevel_share_reg==1"> 是</div>
							<div v-if="data.row.llevel_share_reg==0">否</div>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="data">
							<el-button type="text" size="mini" @click="g_page.funcRedirectEdit('app_lacsoce__level__edit',data.row)">
								编辑
							</el-button>
							<el-button v-if="data.row.llevel_update_check==1" type="text" size="mini" @click="g_page.funcRedirectEdit(`app_lacsoce__level__update__list?pid=${data.row.id}`)">
								配置升级考核题目
							</el-button>
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
			this.g_page.funcSetApiUrlList('/xadmin/app_lacsoce/app_lacsoce__level__list')
			this.g_page.funcSetApiUrlDel('/xadmin/app_lacsoce/app_lacsoce__level__list/del')
			//页码
			this.g_page.funcSetPageSize(20)
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
			////////////////////
		}
	}
</script>
