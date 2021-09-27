<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button v-if="form_q.callback_url" icon="el-icon-back" @click="g_page.funcBack" size="mini">返回
			</el-button>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="发货人">
					<el-input v-model="form_q.compNum" placeholder="发货人-编号、识别编号"></el-input>
				</el-form-item>
				<el-form-item label="收货人">
					<el-input v-model="form_q.compNumTo" placeholder="收货人-编号"></el-input>
				</el-form-item>
				<el-form-item label="溯源码">
					<el-input v-model="form_q.compSourceCode" placeholder="溯源码"></el-input>
				</el-form-item>
				<el-form-item label="发货日期">
					<el-date-picker
						style="width: 130px;"
						v-model="form_q.compBeginDate"
						type="date"
						placeholder="选择开始时间"
						value-format="yyyy-MM-dd">
					</el-date-picker>
					至
					<el-date-picker
						style="width: 130px;"
						v-model="form_q.compEndDate"
						type="date"
						placeholder="选择结束时间"
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
					<el-table-column label="溯源码">
						<template slot-scope="data">
							<div v-html="data.row.lslog_source_code"></div>
						</template>
					</el-table-column>
					<el-table-column label="经销商信息">
						<template slot-scope="data">
							<div style="color: #97a8be;" v-html="data.row.luser_name"></div>
							<div v-html="data.row.luser_num"></div>
						</template>
					</el-table-column>
					<el-table-column label="物流单号">
						<template slot-scope="data">
							<div v-html="data.row.lslog_logistics_num"></div>
						</template>
					</el-table-column>
					<el-table-column label="发货信息" width="350">
						<template slot-scope="data">
							<div style="font-size: 11px;">
								<div>姓名：{{data.row.lslog_name}}</div>
								<div>手机：{{data.row.lslog_phone}}</div>
								<div>地址：{{data.row.lslog_address}}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="发货日期">
						<template slot-scope="data">
							{{ data.row.lslog_create_date }}
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
			this.g_page.funcSetApiUrlList('/xadmin/app_lacsoce/app_lacsoce__code_log__list')
			//页码
			this.g_page.funcSetPageSize(20)

			//搜索
			this.form_q = {
				'compKw': ''
			}
			this.form_q = Object.assign(this.form_q, this.$route.query)
			console.log(this.form_q)
			// this.g_vue.$route.query

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
			funcDelCode(row) {
				console.log('funcDelCode')
			}
			////////////////////
		}
	}
</script>
