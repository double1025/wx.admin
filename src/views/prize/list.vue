<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">奖品列表</b>
			<a @click="func_back()"><i class="el-icon-back"></i>添加</a>
			<a class="add" @click="func_back()"><i class="el-icon-back"></i>返回</a>
			<el-button size="mini" round>超小按钮</el-button>
			<el-button size="mini" type="primary" icon="el-icon-edit">添加</el-button>
		</el-header>
		<el-main>
			<el-form :inline="true" :model="form" size="mini" class="demo-form-inline">
				<el-form-item label="卡类型名称">
					<el-input name="compKw" v-model="form.compKw" placeholder="卡类型名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="success" native-type="submit">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="table-wrap">
				<el-table stripe ref="multipleTable" tooltip-effect="dark" @selection-change="funcTableSelectionChange" :data="list_data">
					<el-table-column type="selection">
					</el-table-column>
					<el-table-column label="幸运卡号">
						<template slot-scope="data">
							<div v-html="data.row.abc_id"></div>
						</template>
					</el-table-column>
					<el-table-column label="卡类型名称">
						<template slot-scope="data">
							<div v-html="data.row.abc_name"></div>
						</template>
					</el-table-column>
					<el-table-column label="领卡用户">
						<template slot-scope="data">
							<div v-html="data.row.abc_name"></div>
						</template>
					</el-table-column>
					<el-table-column label="领卡时间">
						<template slot-scope="data">
							<div v-html="data.row.abc_yn"></div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-pagination class="paging" background layout="total, prev, pager, next, jumper" @current-change="funcPageChange"
			 :current-page="page_current" :page-size="page_size" :total="page_total">
			</el-pagination>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				form: [],
				list_data: [{
						'abc_id': '123',
						'abc_name': '123',
						'abc_yn': 0,
					},
					{
						'abc_id': '123',
						'abc_name': '123',
						'abc_yn': 0,
					},
				],
				selected_data: [], //table checkbox
				page_current: 1,
				page_size: 10,
				page_total: 10,
			}
		},
		methods: {
			funcTableSelectionChange(val) {
				this.selected_data = val;
			},
			funcPageChange(page_index) {
				location.href = '';
			},
		}
	}
</script>
