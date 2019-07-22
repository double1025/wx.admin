<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">账号管理</b>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="p_data.funcShowDialog">添加</el-button>
			<el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
			<el-button size="mini" icon="el-icon-refresh">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" ref="form" :model="pp.form" size="mini">
				<el-form-item label="关键词">
					<el-input name="compKw" v-model="pp.form.compKw" placeholder="关键词"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="success" native-type="submit">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="table-wrap">
				<el-table stripe ref="multipleTable" tooltip-effect="dark" @selection-change="p_data.funcTableSelectionChange"
				 :data="pp.list_data">
					<el-table-column type="selection"></el-table-column>
					<el-table-column label="卡号">
						<template slot-scope="data">
							<div v-html="data.row.abc_id"></div>
						</template>
					</el-table-column>
					<el-table-column label="用户">
						<template slot-scope="data">
							<div v-html="data.row.abc_name"></div>
						</template>
					</el-table-column>
					<el-table-column label="是否领取">
						<template slot-scope="data">
							<div v-html="data.row.abc_yn"></div>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="data">
							<el-button type="primary" size="mini" @click="p_data.funcShowDialog(data.row)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-main>
		<!---->
		<!---->
		<!-- 分页 -->
		<el-footer>
			<el-pagination class="paging" background layout="total, prev, pager, next, jumper" @current-change="this.p_data.funcPageChange"
			 :current-page="pp.page_current" :page-size="pp.page_size" :total="pp.page_total">
			</el-pagination>
		</el-footer>
		<!---->
		<!---->
		<!-- 弹框 -->
		<el-dialog title="编辑" :visible.sync="pp.form_dialog_visible" width="70%">
			<el-form ref="form_dialog" :rules="pp.form_rules" :model="pp.form_dialog" size="mini" label-width="15%">
				<el-form-item label="卡号" prop="abc_id">
					<el-input v-model="pp.form_dialog.abc_id" />
				</el-form-item>
				<el-form-item label="用户" prop="abc_name">
					<el-input v-model="pp.form_dialog.abc_name" />
				</el-form-item>
				<el-form-item label="是否领取" prop="abc_yn">
					<el-input v-model="pp.form_dialog.abc_yn" />
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="p_data.funcBack" size="mini">取消</el-button>
				<el-button type="primary" @click="p_data.funcSave" size="mini">保存</el-button>
			</div>
		</el-dialog>
		<!---->
		<!---->
		<!---->
	</el-container>
</template>

<script>
	let page
	export default {
		data() {
			return {
				pp: this.p_data.data,
			}
		},
		mounted() {
			console.log('mounted')
			//
			this.g_cc.func_set_vue(this)
			page = this.g_cc.func_get_vue()
			//
			page.p_data.funcGetList('');
// 			page.pp.list_data = [{
// 					'abc_id': '123',
// 					'abc_name': '张三',
// 					'abc_yn': 0,
// 				},
// 				{
// 					'abc_id': '456',
// 					'abc_name': '李四',
// 					'abc_yn': 1,
// 				},
// 			]
// 			page.pp.page_total = 2
			//
			page.pp.form_rules = {
				abc_id: [{
					required: true,
					message: '必填',
					trigger: 'blur'
				}, ],
			}
			//
		},
		methods: {}
	}
</script>
