<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">列表</b>
			<el-button size="mini" icon="el-icon-back">返回</el-button>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="funcShowDialog(null)">添加</el-button>
			<el-button size="mini" type="primary" icon="el-icon-download">导出</el-button>
			<el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
			<el-button size="mini" icon="el-icon-refresh">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" ref="form" :model="form" :rules="form_rules" size="mini">
				<el-form-item label="关键词">
					<el-input name="compKw" v-model="form.compKw" placeholder="关键词"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="success" native-type="submit">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="table-wrap">
				<el-table stripe ref="multipleTable" tooltip-effect="dark" @selection-change="funcTableSelectionChange" :data="list_data">
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
							<el-button type="primary" size="mini" @click="funcShowDialog(data.row)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-main>
		<!---->
		<!---->
		<!-- 分页 -->
		<el-footer>
			<el-pagination class="paging" background layout="total, prev, pager, next, jumper" @current-change="funcPageChange"
			 :current-page="page_current" :page-size="page_size" :total="page_total">
			</el-pagination>
		</el-footer>
		<!---->
		<!---->
		<!-- 弹框 -->
		<el-dialog title="编辑" :visible.sync="form_dialog_visible" width="70%">
			<el-form ref="form_dialog" :rules="form_rules" :model="form_dialog" size="mini" label-width="15%">
				<el-form-item label="卡号" prop="abc_id">
					<el-input v-model="form_dialog.abc_id" />
				</el-form-item>
				<el-form-item label="用户" prop="abc_name">
					<el-input v-model="form_dialog.abc_name" />
				</el-form-item>
				<el-form-item label="是否领取" prop="abc_yn">
					<el-input v-model="form_dialog.abc_yn" />
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="funcBack" size="mini">取消</el-button>
				<el-button type="primary" @click="funcSave" size="mini">保存</el-button>
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
				form: {
					compKw: '',
				},
				form_dialog_index: 0,
				form_dialog: {
					compKw: '',
				},
				form_dialog_visible: false,
				form_rules: {},
				form_rules_422: [],
				list_data: [{
						'abc_id': '123',
						'abc_name': '张三',
						'abc_yn': 0,
					},
					{
						'abc_id': '456',
						'abc_name': '李四',
						'abc_yn': 1,
					},
				],
				selected_data: [], //table checkbox
				page_current: 1,
				page_size: 10,
				page_total: 20,
			}
		},
		mounted() {
			this.g_cc.func_set_vue(this)
			page = this.g_cc.func_get_vue()
		},
		methods: {
			funcTableSelectionChange(val) {
				this.selected_data = val;
			},
			funcPageChange(page_index) {
				location.href = '';
			},
			//显示编辑弹框
			funcShowDialog(row) {
				console.log('funcShowDialog')
				console.log(row)
				//
				this.form_dialog_index = -1;//-1表示添加，非-1编辑
				this.form_dialog = {}
				if (row) {
					//记录坐标
					this.form_dialog_index = this.list_data.indexOf(row)
					//复制对象
					this.form_dialog = Object.assign({}, row)
				}
				console.log('坐标=' + this.form_dialog_index)
				//
				this.form_dialog_visible = true
			},
			funcSave() {
				console.log('funcSave')
				console.log(this.form_dialog)
				if (this.form_dialog_index != -1) {
					//edit
					this.list_data.splice(this.form_dialog_index, 1, this.form_dialog)
				} else {
					//add
					this.list_data.unshift(this.form_dialog)
				}
				//
				this.form_dialog_visible = false
			},
			funcBack() {
				console.log('funcBack')
				//
				this.form_dialog_visible = false
			},
		}
	}
</script>
