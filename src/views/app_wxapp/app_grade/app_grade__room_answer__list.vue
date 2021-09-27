<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button v-if="$route.query.callback_url" size="mini" icon="el-icon-back" @click="g_page.funcBack">
				返回
			</el-button>
<!--			<ExprotExcel api_url="/xadmin/app_grade/app_grade__room_answer__list/export" :api_data="form_q"></ExprotExcel>-->
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="名称">
					<el-input v-model="form_q.compKw" placeholder="名称或openid"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="form_q.compPhone" placeholder="手机号"></el-input>
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
					<el-table-column label="房间信息">
						<template slot-scope="data">
							<div>房间号：{{ data.row.room_num }}</div>
							<div>密码：{{ data.row.room_pwd }}</div>
						</template>
					</el-table-column>
					<el-table-column label="评课人">
						<template slot-scope="data">
							<div v-html="data.row.winfo_name"></div>
							<div v-html="data.row.winfo_openid"></div>
						</template>
					</el-table-column>
					<el-table-column label="分组">
						<template slot-scope="data">
							<div v-html="data.row.group_name"></div>
						</template>
					</el-table-column>
					<el-table-column label="提交时间">
						<template slot-scope="data">
							<div v-html="data.row.auser_create_date"></div>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="data">
							<el-button type="primary" size="mini" @click="g_page.funcRedirectEdit(`app_grade__room_answer__info__list?room_id=${data.row.room_id}&openid=${data.row.winfo_openid}`)">
								评课详情
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
			this.g_page.funcSetApiUrlList('/xadmin/app_grade/app_grade__room_answer__list')
			// this.g_page.funcSetApiUrlDel('/xadmin/app_grade/app_grade__user__list/del')
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
			////////////////////
		}
	}
</script>
