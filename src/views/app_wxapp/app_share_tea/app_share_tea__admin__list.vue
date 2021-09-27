<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button v-if="$route.query.callback_url" size="mini" icon="el-icon-back" @click="g_page.funcBack">
				返回
			</el-button>
			<ExprotExcel api_url="/xadmin/app_share_tea/app_share_tea__admin__list/export" :api_data="form_q"></ExprotExcel>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="g_page.funcRedirectEdit(`app_share_tea__admin__edit`)">
				添加
			</el-button>
<!--			<el-button size="mini" type="danger" icon="el-icon-delete" @click="g_page.funcDel()">删除</el-button>-->
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="名称">
					<el-input name="compKw" v-model="form_q.compKw" placeholder="加盟商名称"></el-input>
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
					<el-table-column label="编号">
						<template slot-scope="data">
							<div v-html="data.row.tadmin_id"></div>
						</template>
					</el-table-column>
					<el-table-column label="类型">
						<template slot-scope="data">
							<div v-if="data.row.tadmin_type==0">加盟商</div>
							<div v-if="data.row.tadmin_type==1">合伙人</div>
						</template>
					</el-table-column>
					<el-table-column label="姓名">
						<template slot-scope="data">
							<div v-html="data.row.tadmin_name"></div>
						</template>
					</el-table-column>
					<el-table-column label="手机号">
						<template slot-scope="data">
							<div v-html="data.row.tadmin_phone"></div>
						</template>
					</el-table-column>
					<el-table-column label="当前操作门店">
						<template slot-scope="data">
							<div v-html="data.row.tpio_name"></div>
						</template>
					</el-table-column>
					<el-table-column label="状态">
						<template slot-scope="data">
							<div v-if="data.row.tadmin_enable==1">生效</div>
							<div style="color:red;" v-if="data.row.tadmin_enable!=1">停用</div>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="data">
							<el-button type="primary" size="mini" @click="g_page.funcRedirectEdit('app_share_tea__admin__edit',data.row)">
								编辑
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
			this.g_page.funcSetApiUrlList('/xadmin/app_share_tea/app_share_tea__admin__list')
			// this.g_page.funcSetApiUrlDel('/xadmin/app_share_tea/app_share_tea__admin__list/del')
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
