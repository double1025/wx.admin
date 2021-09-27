<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="funcAdd">批量导入</el-button>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="funcEdit">添加</el-button>
			<el-button size="mini" type="danger" icon="el-icon-delete"
					   @click="g_page.funcDel()">删除
			</el-button>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="发送时间">
					<el-date-picker
						style="width: 200px;"
						v-model="form_q.compSendDate"
						type="date"
						placeholder="选择开始时间"
						value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="处理状态">
					<el-select filterable v-model="form_q.compRobotSend" placeholder="请选择">
						<el-option label="全部" value=""></el-option>
						<el-option label="待发送" :value="0"></el-option>
						<el-option label="已发送" :value="1"></el-option>
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
					<el-table-column label="发送时间">
						<template slot-scope="data">
							<div v-html="data.row.media_send_date"></div>
						</template>
					</el-table-column>
					<el-table-column label="平台">
						<template slot-scope="data">
							<div v-html="data.row.__type"></div>
						</template>
					</el-table-column>
					<el-table-column label="内容">
						<template slot-scope="data">
							<el-input type="textarea" v-model="data.row.media_txt"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="机器人处理状态">
						<template slot-scope="data">
							<div v-if="data.row.media_robot_send==1">
								<div style="color:green;"><b>已发送</b></div>
								<div style="font-size: 11px;">{{data.row.media_robot_send_date}}</div>
							</div>
							<div v-if="data.row.media_robot_send==0">
								<span style="color: #97a8be;">待发送</span>
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
			this.g_page.funcSetApiUrlList('/xadmin/media/media__list')
			this.g_page.funcSetApiUrlDel('/xadmin/media/media__list/del')
			//页码
			this.g_page.funcSetPageSize(10)
			//搜索
			this.form_q = {
				'compRobotSend': '',
				'compSendDate': this.g_cc.today()
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
			funcAdd(row) {
				let id = ''
				if (row) {
					id = row.id
				}
				this.g_cc.func_redirect('/media/media__add', {
					id: id,
					callback_url: '/media/media__list'
				})
			},
			funcEdit(row) {
				let id = ''
				if (row) {
					id = row.id
				}
				this.g_cc.func_redirect('/media/media__edit', {
					id: id,
					callback_url: '/media/media__list'
				})
			}
			////////////////////
		}
	}
</script>
