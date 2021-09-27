<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button size="mini" type="warning" icon="el-icon-edit-outline" @click="funcApplyDialog">审核</el-button>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="funcEdit">添加</el-button>
			<el-button size="mini" type="danger" icon="el-icon-delete" @click="g_page.funcDel()">删除</el-button>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="门店名称">
					<el-input name="compKw" v-model="form_q.compKw" placeholder="门店名称"></el-input>
				</el-form-item>
				<el-form-item label="审核状态">
					<el-select filterable v-model="form_q.compApply" placeholder="请选择">
						<el-option label="全部" key="" value=""></el-option>
						<el-option v-for="(v, k) in page_info.list_apply"
								   :label="v"
								   :key="k"
								   :value="k">
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
					<el-table-column label="名称">
						<template slot-scope="data">
							<div v-html="data.row.lpio_name"></div>
						</template>
					</el-table-column>
					<el-table-column label="绑定用户">
						<template slot-scope="data">
							<div v-if="data.row.lpio_user_num" style="font-size: 10px;">
								<div>名称:{{data.row.luser_name}}</div>
								<div>编号:{{data.row.luser_num}}</div>
							</div>
							<div v-if="!data.row.lpio_user_num">
								未绑定
							</div>
						</template>
					</el-table-column>
					<el-table-column label="门店类型">
						<template slot-scope="data">
							{{data.row.lpio_type}}{{data.row.lpio_area}}
						</template>
					</el-table-column>
					<el-table-column label="门店地址">
						<template slot-scope="data">
							{{data.row.lpio_province}}{{data.row.lpio_city}}{{data.row.lpio_district}}{{data.row.lpio_address}}
						</template>
					</el-table-column>
					<el-table-column label="审核状态">
						<template slot-scope="data">
							{{data.row.lpio_apply}}
							<div v-if="data.row.lpio_apply!='未处理'">
								{{data.row.lpio_apply_date}}
							</div>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="data">
							<el-button type="primary" size="mini" @click="funcEdit(data.row)">编辑</el-button>
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
		<el-dialog title="审核" :visible.sync="form_dialog_visible" width="70%">
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-form-item label="审核">
					<el-select filterable v-model="form_q.compApply" placeholder="请选择">
						<el-option label="通过" :key="1" :value="1"></el-option>
						<el-option label="不通过" :key="-10" :value="-10"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="g_page.funcBack" size="mini">取消</el-button>
				<el-button type="success" @click="funcApply" size="mini">保存</el-button>
			</div>
		</el-dialog>
		<!---->
		<!---->
		<!---->
	</el-container>
</template>


<script>
	import {
		MessageBox
	} from 'element-ui'

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
			this.g_page.funcSetApiUrlList('/xadmin/app_lacsoce/app_lacsoce__pio__list')
			this.g_page.funcSetApiUrlDel('/xadmin/app_lacsoce/app_lacsoce__pio__list/del')
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
			funcApplyDialog() {
				MessageBox({
					title: '提示',
					message: '审核门店',
					type: 'info',
					showCancelButton: true,
					confirmButtonText: '通过',
					cancelButtonText: '不通过',
					dangerouslyUseHTMLString: true
				}).then(() => {
					this.funcApply(1)
				}).catch(() => {
					this.funcApply(-10)
				})
			},
			//审核
			funcApply(apply) {
				let ids = this.g_page.funcGetIds()
				this.g_cc.func_axios({
					url: '/xadmin/app_lacsoce/app_lacsoce__pio__list/apply',
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
				})
			},
			funcEdit(row) {
				let id = ''
				if (row) {
					id = row.id
				}
				this.g_cc.func_redirect('app_lacsoce__pio__edit', {
					id: id,
					callback_url: 'app_lacsoce__pio__list'
				})
			}
			////////////////////
		}
	}
</script>
