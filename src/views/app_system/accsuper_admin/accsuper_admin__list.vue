<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="g_page.funcRedirectEdit(`accsuper_admin__edit?pid=${form_q.id}`)">
				添加
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
				<el-table stripe ref="multipleTable" tooltip-effect="dark" @selection-change="g_page.funcTableSelectionChange"
						  :data="list_data">
					<el-table-column type="selection"></el-table-column>
					<el-table-column label="ID">
						<template slot-scope="data">
							<div>{{data.row.aconfig_id}}</div>
						</template>
					</el-table-column>
					<el-table-column label="名称">
						<template slot-scope="data">
							<div>{{data.row.acc_name}}</div>
						</template>
					</el-table-column>
					<el-table-column label="类型">
						<template slot-scope="data">
							<div>{{data.row.aconfig_type}}</div>
						</template>
					</el-table-column>
					<el-table-column label="Token更新时间">
						<template slot-scope="data">
							<div>{{data.row.aconfig_access_token_date}}</div>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="data">
							<el-button type="warning" size="mini" @click="funcResetPwd(data.row)">
								重设超管密码
							</el-button>
							<el-button size="mini" @click="g_page.funcRedirectEdit(`accsuper_admin__app__list`,data.row)">
								查看关联应用
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
			page_data = this.g_cc.funcGetInitData(page_data)
			return page_data
		},
		mounted() {
			console.log('mounted')
			//
			this.g_page.funcSetVue(this)
			// 应用ID
			this.g_page.funcSetApiUrlList('/xadmin/accsuper_admin/accsuper_admin__list')
			// this.g_page.funcSetApiUrlSave('/app_admin/admin/app_admin/save');
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
			//重置密码
			funcResetPwd(row) {
				this.g_cc.func_confirm(`确定重置[${row.aconfig_id}]密码？(密码：A当前时间)`, () => {
					this.g_cc.func_axios({
						url: '/xadmin/accsuper_admin/accsuper_admin__list/funcResetPwd',
						data: {
							id: row.id
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
					})
				})
			},
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				// data.reply_pic = this.g_page.funcImgArrToStr(data.reply_pic_imgs)

				return data
			}
			////////////////////
		}
	}
</script>
