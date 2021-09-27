<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button v-if="$route.query.callback_url" size="mini" icon="el-icon-back" @click="g_page.funcBack">
				返回
			</el-button>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="g_page.funcRedirectEdit(`app_share_tea__pio__edit`)">
				添加
			</el-button>
			<el-button size="mini" type="danger" icon="el-icon-delete" @click="g_page.funcDel()">删除</el-button>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="店铺名称">
					<el-input name="compKw" v-model="form_q.compKw" placeholder="店铺名称"></el-input>
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
							<div v-html="data.row.tpio_id"></div>
						</template>
					</el-table-column>
					<el-table-column label="设备号">
						<template slot-scope="data">
							<div v-html="data.row.tpio_gate_num"></div>
						</template>
					</el-table-column>
					<el-table-column label="名称">
						<template slot-scope="data">
							<div v-html="data.row.tpio_name"></div>
						</template>
					</el-table-column>
					<el-table-column label="管理员">
						<template slot-scope="data">
							<div v-html="data.row.tadmin_name"></div>
							<div v-html="data.row.tadmin_phone"></div>
						</template>
					</el-table-column>
					<el-table-column label="地址">
						<template slot-scope="data">
							{{ data.row.tpio_province }}
							{{ data.row.tpio_city }}
							{{ data.row.tpio_district }}
							{{ data.row.tpio_address }}
						</template>
					</el-table-column>
					<el-table-column label="评分">
						<template slot-scope="data">
							<div v-if="data.row.tpio_show_comment==1">显示</div>
							<div v-if="data.row.tpio_show_comment==0">隐藏</div>
						</template>
					</el-table-column>
					<el-table-column label="状态">
						<template slot-scope="data">
							<div style="color:red;" v-if="data.row.tpio_close==1">关店中</div>
							<div style="color:green;" v-if="data.row.tpio_close==0">营业中</div>
						</template>
					</el-table-column>
					<el-table-column label="营业日期">
						<template slot-scope="data">
							<div>{{data.row.tpio_open_date_begin }}</div>
							<div>{{data.row.tpio_open_date_end }}</div>
							<div v-if="data.row.is_expire" style="color:red;">已过期</div>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="100">
						<template slot-scope="data">
							<el-button type="text" size="mini" @click="g_page.funcRedirectEdit('app_share_tea__pio__edit',data.row)">
								编辑
							</el-button>
							<el-button type="text" size="mini" @click="g_page.funcRedirectEdit(`app_share_tea__room__list?pid=${data.row.id}`)">
								茶室
							</el-button>
							<br/>
							<el-button type="text" size="mini" @click="g_page.funcRedirectEdit(`app_share_tea__order__list?pio_id=${data.row.id}`)">
								店铺订单
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
			this.g_page.funcSetApiUrlList('/xadmin/app_share_tea/app_share_tea__pio__list')
			this.g_page.funcSetApiUrlDel('/xadmin/app_share_tea/app_share_tea__pio__list/del')
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
