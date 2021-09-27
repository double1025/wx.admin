<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button v-if="$route.query.callback_url" size="mini" icon="el-icon-back" @click="g_page.funcBack">
				返回
			</el-button>
			<el-button v-if="page_info.is_dev" size="mini" type="warning" icon="el-icon-sort-up" @click="funcSyncToSiyoumi">
				同步到siyoumi
			</el-button>
			<el-button v-if="!page_info.is_dev" size="mini" type="warning" icon="el-icon-sort-down" @click="funcSyncFromSiyoumi">
				来自siyoumi同步
			</el-button>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="g_page.funcRedirectEdit(`view_admin__page__edit`)">
				添加
			</el-button>
			<el-button size="mini" type="danger" icon="el-icon-delete" @click="g_page.funcDel()">删除</el-button>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="名称">
					<el-input name="compKw" v-model="form_q.compKw" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item label="APPID">
					<el-select filterable clearable v-model="form_q.app_idx" placeholder="请选择">
						<el-option v-for="(item,index) in page_info.apps"
								   :label="item.app_name" :key="item.app_id" :value="item.app_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="1级">
					<el-select filterable clearable v-model="form_q.pid" placeholder="请选择">
						<el-option label="所有1级" value="all_1"></el-option>
						<el-option v-for="(item,index) in page_info.list_app"
								   :label="item.appr_meta_title" :key="item.appr_id" :value="item.appr_id">
						</el-option>
					</el-select>
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
							<div v-html="data.row.appr_id"></div>
						</template>
					</el-table-column>
					<el-table-column label="APPID">
						<template slot-scope="data">
							<div v-html="data.row.appr_app_id"></div>
						</template>
					</el-table-column>
					<el-table-column label="等级">
						<template slot-scope="data">
							<div v-if="data.row.appr_pid==''">1级</div>
							<div v-if="data.row.appr_pid!=''">2级</div>
						</template>
					</el-table-column>
					<el-table-column label="页面名称">
						<template slot-scope="data">
							<div v-html="data.row.appr_meta_title"></div>
						</template>
					</el-table-column>
					<el-table-column label="隐藏">
						<template slot-scope="data">
							<div v-if="data.row.appr_hidden==1">隐藏</div>
							<div v-if="data.row.appr_hidden==0">显示</div>
						</template>
					</el-table-column>
					<el-table-column label="访问链接">
						<template slot-scope="data">
							{{ data.row.appr_path }}
						</template>
					</el-table-column>
					<el-table-column label="排序">
						<template slot-scope="data">
							{{ data.row.appr_order }}
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="data">
							<el-button type="text" size="mini" @click="g_page.funcRedirectEdit('view_admin__page__edit',data.row)">
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
			this.g_page.funcSetApiUrlList('/xadmin/view_admin/view_admin__page__list')
			this.g_page.funcSetApiUrlDel('/xadmin/view_admin/view_admin__page__list/del')
			//页码
			this.g_page.funcSetPageSize(100)
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
			funcSyncFromSiyoumi() {
				this.g_cc.func_confirm('确定？', () => {
					this.g_cc.func_axios({
						url: '/xadmin/view_admin/view_admin__page__list/funcSyncFromSiyoumi',
						data: {},
						success: (res) => {
							//
							if (res.data.errcode == 0) {
								this.g_cc.func_alert(`新增数量：${res.data.new_count}，更新数量：${res.data.update_count}`)
							} else {
								this.g_cc.func_alert(res.data.errmsg, 'error')
							}
						}
						//
					})
				})
			},
			funcSyncToSiyoumi() {
				this.g_cc.func_confirm('确定？', () => {
					this.g_cc.func_axios({
						url: '/xadmin/view_admin/view_admin__page__list/funcSyncToSiyoumi',
						data: {},
						success: (res) => {
							//
							if (res.data.errcode == 0) {
								this.g_cc.func_alert(`新增数量：${res.data.new_count}，更新数量：${res.data.update_count}`)
							} else {
								this.g_cc.func_alert(res.data.errmsg, 'error')
							}
						}
						//
					})
				})
			}
			//////////////////////////////////////////
		}
	}
</script>
