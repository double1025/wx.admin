<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">回复列表</b>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="funcEdit()">添加</el-button>
			<el-button size="mini" type="danger" icon="el-icon-delete"
					   @click="g_page.funcDel()">删除
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
				<el-table stripe ref="multipleTable" tooltip-effect="dark"
						  @selection-change="g_page.funcTableSelectionChange"
						  :data="list_data">
					<el-table-column type="selection"></el-table-column>
					<el-table-column label="KEY">
						<template slot-scope="data">
							{{ data.row.reply_key }}
						</template>
					</el-table-column>
					<el-table-column label="名称">
						<template slot-scope="data">
							{{ data.row.reply_name }}
						</template>
					</el-table-column>
					<el-table-column label="类型">
						<template slot-scope="data">
							{{ data.row.type }}
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="data">
							<CompReplyEdit v-model="data.row.id" :funcSaveAfter="funcSaveAfter"></CompReplyEdit>
						</template>
					</el-table-column>
				</el-table>
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
		<CompReplyEdit ref="add" :funcSaveAfter="funcSaveAfter" :btnHide="true"></CompReplyEdit>
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
			this.g_page.funcSetApiUrlList('/xadmin/reply/reply__list')
			this.g_page.funcSetApiUrlDel('/xadmin/reply/reply__list/del')
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
			funcEdit(row) {
				console.log('funcEdit', row)
				// debugger
				this.$refs.add.funcEdit()
			},
			funcSaveAfter(res) {
				console.log('aaa')
				// debugger
				//
				this.g_page.funcGetList()
			}
			////////////////////
		}
	}
</script>
