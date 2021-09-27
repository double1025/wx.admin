<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="g_page.funcRedirectEdit('app_lacsoce__user__edit')">
				添加
			</el-button>
			<!--			<el-button size="mini" type="danger" icon="el-icon-delete" @click="g_page.funcDel()">删除</el-button>-->
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="编号">
					<el-input v-model="form_q.compNum" placeholder="编号、识别编号"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="form_q.compName" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="form_q.compPhone" placeholder="手机号"></el-input>
				</el-form-item>
				<el-form-item label="等级">
					<el-select filterable v-model="form_q.compLevel" placeholder="请选择">
						<el-option label="全部" key="" value=""></el-option>
						<el-option v-for="(v, k) in page_info.list_level" :label="v.llevel_name" :key="v.llevel_id" :value="v.llevel_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否过期">
					<el-select style="width: 100px;" filterable v-model="form_q.compDateState" placeholder="请选择">
						<el-option label="全部" key="" value=""></el-option>
						<el-option label="过期" :key="0" :value="0"></el-option>
						<el-option label="未过期" :key="1" :value="1"></el-option>
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
							<div :class="{'blacklist':data.row.luser_is_blacklist==1}" style="font-size: 10px;">
								<div>编号:{{data.row.luser_num}}</div>
								<div>识别:{{data.row.luser_num_01}}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="等级">
						<template slot-scope="data">
							<b>{{data.row.llevel_name}}</b>[{{data.row.llevel_level}}]
						</template>
					</el-table-column>
					<el-table-column label="微信信息">
						<template slot-scope="data">
							<div v-if="!data.row.luser_openid">
								未绑定小程序
							</div>
							<div v-if="data.row.luser_openid">
								<div>{{data.row.wxuser_nickName}}</div>
								<div>{{data.row.luser_openid}}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="信息">
						<template slot-scope="data">
							<div>姓名:{{data.row.luser_name}}</div>
							<div>手机:{{data.row.luser_phone}}</div>
						</template>
					</el-table-column>
					<el-table-column label="上级信息">
						<template slot-scope="data">
							<div v-if="data.row.higher_luser_id">
								<div>{{data.row.higher_luser_name}}</div>
								<div>{{data.row.higher_luser_num}}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="下级数量">
						<template slot-scope="data">
							{{ data.row.luser_lower_count }}
						</template>
					</el-table-column>
					<el-table-column label="有效期" width="160">
						<template slot-scope="data">
							<div>{{ data.row.luser_vaild_begin_date }}</div>
							<div>{{ data.row.luser_vaild_end_date }}</div>
							<div style="color: red;" v-if="data.row.is_expire">(过期)</div>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="data">
							<el-button type="primary" size="mini" @click="g_page.funcRedirectEdit('app_lacsoce__user__edit',data.row)">
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

<style>
	.blacklist {
		color: red;
		text-decoration: line-through;
	}
</style>
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
			this.g_page.funcSetApiUrlList('/xadmin/app_lacsoce/app_lacsoce__user__list')
			this.g_page.funcSetApiUrlDel('/xadmin/app_lacsoce/app_lacsoce__user__list/del')
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
