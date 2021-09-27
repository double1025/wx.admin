<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button size="mini" type="danger" icon="el-icon-delete" @click="funcDelCode()">删除防伪码</el-button>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="g_page.funcRedirectEdit('app_lacsoce__code__add')">
				批量添加
			</el-button>
			<ExprotExcel api_url="/xadmin/app_lacsoce/app_lacsoce__code__list/export" :api_data="form_q"></ExprotExcel>
			<el-button size="mini" type="danger" icon="el-icon-delete" @click="g_page.funcDel()">删除</el-button>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="箱码">
					<el-input v-model="form_q.compBoxCode" placeholder="箱码"></el-input>
				</el-form-item>
				<el-form-item label="溯源码">
					<el-input v-model="form_q.compSourceCode" placeholder="溯源码"></el-input>
				</el-form-item>
				<el-form-item label="防伪码">
					<el-input v-model="form_q.compCode" placeholder="防伪码"></el-input>
				</el-form-item>
				<el-form-item label="批次标记">
					<el-input v-model="form_q.compTag" placeholder="批次标记"></el-input>
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
					<el-table-column label="箱码">
						<template slot-scope="data">
							<div v-html="data.row.lcode_box_code"></div>
						</template>
					</el-table-column>
					<el-table-column label="溯源码">
						<template slot-scope="data">
							<div v-html="data.row.lcode_source_code"></div>
						</template>
					</el-table-column>
					<el-table-column label="商品名">
						<template slot-scope="data">
							<div v-html="data.row.lgoods_name"></div>
						</template>
					</el-table-column>
					<el-table-column label="防伪码">
						<template slot-scope="data">
							<div v-if="data.row.lcode_code_del==0" v-html="data.row.__code"></div>
							<div style="color:red;" v-if="data.row.lcode_code_del>0">
								<div style="text-decoration: line-through;">{{ data.row.__code }}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="防伪码使用状态">
						<template slot-scope="data">
							<div v-if="data.row.lcode_code_use==1">
								<div>已使用</div>
								<div>{{ data.row.lcode_code_use_date }}</div>
							</div>
							<b style="color:green;" v-if="data.row.lcode_code_use==0">未使用</b>
						</template>
					</el-table-column>
					<el-table-column label="批次标记">
						<template slot-scope="data">
							<div v-html="data.row.lcode_tag"></div>
						</template>
					</el-table-column>
					<el-table-column label="溯源记录">
						<template slot-scope="data">
							<el-button type="primary" size="mini" @click="funcRedirect(data.row)">
								查看
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
			this.g_page.funcSetApiUrlList('/xadmin/app_lacsoce/app_lacsoce__code__list')
			this.g_page.funcSetApiUrlDel('/xadmin/app_lacsoce/app_lacsoce__code__list/del')
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
			funcRedirect(row) {
				let callback_url = this.$route.fullPath
				this.g_cc.func_redirect('app_lacsoce__code_log__list', {
					compSourceCode: row.lcode_source_code,
					callback_url: callback_url
				})
			},
			//标记删除防伪码
			funcDelCode(row) {
				console.log('funcDelCode')
				let page = this
				page.g_cc.func_confirm('删除确认防伪码吗', function() {
					//
					let data = page.selected_data
					if (data.length <= 0) {
						page.g_cc.func_alert('至少选择一项', 'info')
						return
					}
					let ids = data.join(',')
					//
					page.g_cc.func_axios({
						method: 'post',
						url: '/xadmin/app_lacsoce/app_lacsoce__code__list/clearCode',
						data: {
							ids: ids
						},
						success: function(res) {
							if (res.data.errcode == 0) {
								page.g_cc.func_alert(`成功处理${res.data.i}`, 'success', function() {
									page.g_page.funcGetList()
								})
							} else {
								page.g_cc.func_alert(res.data.errmsg, 'error')
							}
						}//end success
					})
				}, null, 'error')
			}
			////////////////////
		}
	}
</script>
