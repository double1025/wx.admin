<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button @click="g_page.funcBack" size="mini">返回</el-button>
			<ExprotExcel api_url="/xadmin/sheet/sheet__record__list/export" :api_data="form_q"></ExprotExcel>
			<el-button size="mini" type="danger" icon="el-icon-delete"
					   @click="g_page.funcDel()">删除
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
				</el-form-item>
			</el-form>
			<div class="table-wrap">
				<el-table stripe ref="multipleTable" tooltip-effect="dark"
						  @selection-change="g_page.funcTableSelectionChange"
						  :data="list_data">
					<el-table-column type="selection"></el-table-column>
					<el-table-column label="用户">
						<template slot-scope="data">
							<div v-html="data.row.wxuser_nickName"></div>
							<div v-html="data.row.wxuser_openid"></div>
						</template>
					</el-table-column>
					<el-table-column v-for="(item,index) in page_info.table_head" :key="item.label" :label="item.label">
						<template slot-scope="data">
							<div v-if="item.type=='upload_img'">
								<CompImg :img_root="page_info.file_root" :img_val="data.row[item.field_key]"></CompImg>
							</div>
							<div v-if="item.type!='upload_img'">
								{{ data.row[item.field_key] }}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="填写时间">
						<template slot-scope="data">
							<div v-html="data.row.scord_create_date"></div>
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
	import CompImg from '@/components/CompImg'
	import ExprotExcel from '@/components/ExprotExcel'

	export default {
		components: {
			CompImg,
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
			this.g_page.funcSetApiUrlList('/xadmin/sheet/sheet__record__list')
			this.g_page.funcSetApiUrlDel('/xadmin/sheet/sheet__record__list/del')
			this.g_page.funcSetApiUrlExport('/xadmin/sheet/sheet__record__list/export')
			//页码
			this.g_page.funcSetPageSize(10)
			//搜索
			this.form_q = {
				'compKw': ''
			}
			this.form_q.pid = this.$route.query.pid
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
