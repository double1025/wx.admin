<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="g_page.funcRedirectEdit(`fun_mall__good__edit`)">
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
							<div v-html="data.row.fprize_id"></div>
						</template>
					</el-table-column>
					<el-table-column label="分组名称">
						<template slot-scope="data">
							<div v-if="data.row.abc_id">
								{{ data.row.abc_name }}
							</div>
							<div v-if="!data.row.abc_id">未设置分组</div>
						</template>
					</el-table-column>
					<el-table-column label="类型">
						<template slot-scope="data">
							{{ data.row.type }}
						</template>
					</el-table-column>
					<el-table-column label="商品">
						<template slot-scope="data">
							<div v-html="data.row.pset_name"></div>
							<CompImg :img_root="page_info.static_file_root" :img_val="data.row.pset_pic"></CompImg>
						</template>
					</el-table-column>
					<el-table-column label="兑换上限">
						<template slot-scope="data">
							<div v-html="data.row.fprize_get_total"></div>
						</template>
					</el-table-column>
					<el-table-column label="所需积分">
						<template slot-scope="data">
							<div v-html="data.row.fprize_fun"></div>
						</template>
					</el-table-column>
					<el-table-column label="余/总">
						<template slot-scope="data">
							{{data.row.stock_count_left}} / {{data.row.stock_count_left + data.row.stock_count_use}}
						</template>
					</el-table-column>
					<el-table-column label="有效期" width="150">
						<template slot-scope="data">
							<div v-html="data.row.fprize_begin_date"></div>
							<div v-html="data.row.fprize_end_date"></div>
							<div style="color: red;" v-if="data.row.is_expire">已过期</div>
						</template>
					</el-table-column>
					<el-table-column label="状态">
						<template slot-scope="data">
							<div v-if="data.row.fprize_shelve==1">上架</div>
							<div v-if="data.row.fprize_shelve==0">
								<b style="color: red;">下架</b>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="排序">
						<template slot-scope="data">
							<div v-html="data.row.fprize_order"></div>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="data">
							<el-button type="text" size="mini" @click="g_page.funcRedirectEdit('fun_mall__good__edit',data.row)">
								编辑
							</el-button>
							<el-button type="text" size="mini" @click="g_page.funcRedirectEdit(`/prize/prize__list?pid=${data.row.fprize_uix}`)">
								兑换记录
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
			this.g_page.funcSetApiUrlList('/xadmin/fun_mall/fun_mall__good__list')
			this.g_page.funcSetApiUrlDel('/xadmin/fun_mall/fun_mall__good__list/del')
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
