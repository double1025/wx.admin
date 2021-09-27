<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<ExprotExcel api_url="/xadmin/money/money__item__list/export" :api_data="form_q"></ExprotExcel>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="openid">
					<el-input name="compKw" v-model="form_q.compKw" placeholder="名称或者openid"></el-input>
				</el-form-item>
				<el-form-item label="日期">
					<el-date-picker
						style="width: 45%"
						v-model="form_q.compBeginDate"
						type="date"
						placeholder="选择开始时间"
						value-format="yyyy-MM-dd">
					</el-date-picker>
					至
					<el-date-picker
						style="width: 45%"
						v-model="form_q.compEndDate"
						type="date"
						placeholder="选择过期时间"
						value-format="yyyy-MM-dd">
					</el-date-picker>
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
							<div v-html="data.row.id"></div>
						</template>
					</el-table-column>
					<el-table-column label="用户">
						<template slot-scope="data">
							<div v-html="data.row.wxuser_nickname"></div>
							<div v-html="data.row.wxuser_openid"></div>
						</template>
					</el-table-column>
					<el-table-column label="应用">
						<template slot-scope="data">
							<div v-html="data.row.mrec_app_id"></div>
						</template>
					</el-table-column>
					<el-table-column label="数值">
						<template slot-scope="data">
							<div style="color: green;" v-if="data.row.mrec_num>=0">{{data.row.mrec_num}}</div>
							<div style="color: red;" v-if="data.row.mrec_num<0">{{data.row.mrec_num}}</div>
						</template>
					</el-table-column>
					<el-table-column label="描述">
						<template slot-scope="data">
							<div v-html="data.row.mrec_desc"></div>
						</template>
					</el-table-column>
					<el-table-column label="创建时间">
						<template slot-scope="data">
							<div v-html="data.row.mrec_create_date"></div>
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
			this.g_page.funcSetApiUrlList('/xadmin/money/money__record__list')
			// this.g_page.funcSetApiUrlDel('/xadmin/money/money__record__list/del')
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
