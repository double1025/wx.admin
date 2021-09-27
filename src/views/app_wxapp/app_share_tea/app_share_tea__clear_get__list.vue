<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button v-if="$route.query.callback_url" size="mini" icon="el-icon-back" @click="g_page.funcBack">
				返回
			</el-button>
			<ExprotExcel api_url="/xadmin/app_share_tea/app_share_tea__clear_get__list/export" :api_data="form_q"></ExprotExcel>
			<!--			<el-button size="mini" type="danger" icon="el-icon-delete" @click="g_page.funcDel()">删除</el-button>-->
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
					<el-table-column label="编号">
						<template slot-scope="data">
							<div v-html="data.row.id"></div>
						</template>
					</el-table-column>
					<el-table-column label="门店">
						<template slot-scope="data">
							<div v-html="data.row.tpio_name"></div>
						</template>
					</el-table-column>
					<el-table-column label="茶室">
						<template slot-scope="data">
							<div v-html="data.row.troom_name"></div>
						</template>
					</el-table-column>
					<el-table-column label="客人使用时间">
						<template slot-scope="data">
							<div v-html="data.row.tcget_torder_time_begin"></div>
							<div v-html="data.row.tcget_torder_time_end"></div>
						</template>
					</el-table-column>
					<el-table-column label="创建时间">
						<template slot-scope="data">
							<div v-html="data.row.tcget_create_date"></div>
						</template>
					</el-table-column>
					<el-table-column label="订单状态">
						<template slot-scope="data">
							<div style="font-size: 12px;" v-if="data.row.tcget_done==1">
								<div>已完成</div>
								<div>{{ data.row.tcget_done_date }}</div>
							</div>
							<div style="color:blue;" v-if="data.row.tcget_done!=1">处理中</div>
						</template>
					</el-table-column>
					<el-table-column label="订单完成信息">
						<template slot-scope="data">
							<div style="font-size: 12px;" v-if="data.row.tcget_done==1">
								<div>名：{{ data.row.tcu_name }}</div>
								<div>手：{{ data.row.tcu_phone }}</div>
								<CompImg :img_root="page_info.static_file_root" :img_val="data.row.tcget_done_pic"></CompImg>
							</div>
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
			this.g_page.funcSetApiUrlList('/xadmin/app_share_tea/app_share_tea__clear_get__list')
			// this.g_page.funcSetApiUrlDel('/xadmin/app_share_tea/app_share_tea__clear_get__list/del')
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
