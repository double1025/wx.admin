<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="编号">
					<el-input v-model="form_q.compNum" placeholder="编号"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="form_q.compPhone" placeholder="手机号"></el-input>
				</el-form-item>
				<el-form-item label="类型">
					<el-select v-model="form_q.compType" placeholder="请选择">
						<el-option label="全部" key="" value=""></el-option>
						<el-option v-for="(item,index) in page_info.type"
								   :label="item" :key="index" :value="index">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核状态">
					<el-select v-model="form_q.compApply" placeholder="请选择">
						<el-option label="全部" key="" value=""></el-option>
						<el-option v-for="(item,index) in page_info.apply"
								   :label="item" :key="index" :value="index">
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
					<el-table-column label="微信信息" width="250">
						<template slot-scope="data">
							<img style="width: 20%" :src="data.row.wxuser_headimgurl"/>
							<div v-html="data.row.wxuser_nickname"></div>
							<div v-html="data.row.wxuser_openid"></div>
						</template>
					</el-table-column>
					<el-table-column label="审核内容">
						<template slot-scope="data">
							{{ data.row.__type }}
						</template>
					</el-table-column>
					<el-table-column label="提交时间">
						<template slot-scope="data">
							<div>{{ data.row.lapply_create_date }}</div>
						</template>
					</el-table-column>
					<el-table-column label="状态">
						<template slot-scope="data">
							<div>{{ data.row.__apply }}</div>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="data">
							<el-button v-if="data.row.lapply_apply==0" type="primary" size="mini" @click="g_page.funcRedirectEdit('app_lacsoce__user_apply__edit',data.row)">
								处理
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
			this.g_page.funcSetApiUrlList('/xadmin/app_lacsoce/app_lacsoce__user_apply__list')
			this.g_page.funcSetApiUrlDel('/xadmin/app_lacsoce/app_lacsoce__user_apply__list/del')
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
