<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<ExprotExcel api_url="/xadmin/app_share_tea/app_share_tea__admin__record__list/export" :api_data="form_q"></ExprotExcel>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="店铺">
					<el-input name="compKw" v-model="form_q.compKw" placeholder="店铺名称"></el-input>
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
				<br/>
				<el-form-item>
					<el-button type="success" @click="funcApply(1)">同意</el-button>
					<el-button type="warning" @click="funcApply(-10)">不同意</el-button>
				</el-form-item>
			</el-form>
			<div class="table-wrap">
				<el-table stripe ref="multipleTable" tooltip-effect="dark"
						  @selection-change="g_page.funcTableSelectionChange"
						  :data="list_data">
					<el-table-column type="selection"></el-table-column>
					<el-table-column label="店铺">
						<template slot-scope="data">
							<div v-html="data.row.tpio_name"></div>
						</template>
					</el-table-column>
					<el-table-column label="金额">
						<template slot-scope="data">
							<div style="color: green;" v-if="data.row.srec_num>=0">{{data.row.srec_num}}</div>
							<div style="color: red;" v-if="data.row.srec_num<0">{{data.row.srec_num}}</div>
						</template>
					</el-table-column>
					<el-table-column label="描述">
						<template slot-scope="data">
							<div v-html="data.row.srec_desc"></div>
						</template>
					</el-table-column>
					<el-table-column label="操作时间">
						<template slot-scope="data">
							<div v-html="data.row.srec_create_date"></div>
						</template>
					</el-table-column>
					<el-table-column label="提现参数">
						<template slot-scope="data">
							<div>银行：{{ data.row.bank_name }}</div>
							<div>卡号：{{ data.row.bank_no }}</div>
							<div>姓名：{{ data.row.user_name }}</div>
							<div>手机号：{{ data.row.user_phone }}</div>
						</template>
					</el-table-column>
					<el-table-column label="处理状态">
						<template slot-scope="data">
							<div v-html="data.row.__type"></div>
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
			this.g_page.funcSetApiUrlList('/xadmin/app_share_tea/app_share_tea__admin__record__list')
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
			funcApply(apply) {
				let data = this.selected_data
				if (data.length <= 0) {
					this.g_cc.func_alert('至少选择一项', 'info')
					return
				}
				this.g_cc.func_confirm('确定？', () => {
					this.funcApply__(apply)
				})
			},
			funcApply__(apply) {
				let ids = this.selected_data.join(',')
				//
				this.g_cc.func_axios({
					url: '/xadmin/app_share_tea/app_share_tea__admin__record__list/funcApply',
					data: {
						ids: ids,
						apply: apply
					},
					success: (res) => {
						//
						if (res.data.errcode == 0) {
							this.g_cc.func_alert('成功', 'success', () => {
								this.g_page.funcGetList()
							})
						} else {
							this.g_cc.func_alert(res.data.errmsg)
						}
					}
					//
				})
			}
		}
	}
</script>
