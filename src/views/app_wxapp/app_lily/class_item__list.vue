<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="funcAdd">批量添加</el-button>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="名称">
					<el-input name="compKw" v-model="form_q.compKw" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item label="课程">
					<el-select filterable v-model="form_q.compClassID" placeholder="请选择">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="item in page_info.list_class"
								   :label="item.lclass_name"
								   :key="item.lclass_id"
								   :value="item.lclass_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="日期">
					<el-date-picker
						style="width: 45%"
						v-model="form_q.compBeginDate"
						type="date"
						placeholder="选择开始时间"
						value-format="yyyy-MM-dd">
					</el-date-picker>
					至
					<el-date-picker
						style="width: 45%"
						v-model="form_q.compEndDate"
						type="date"
						placeholder="选择过期时间"
						value-format="yyyy-MM-dd">
					</el-date-picker>
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
					<el-table-column label="课程名称">
						<template slot-scope="data">
							<div v-html="data.row.lclass_name"></div>
						</template>
					</el-table-column>
					<el-table-column label="预约时间段">
						<template slot-scope="data">
							{{ data.row.__date }} <b>{{ data.row.__time }}</b>
						</template>
					</el-table-column>
					<el-table-column label="价格">
						<template slot-scope="data">
							{{ data.row.lcitem_price_now }}元
						</template>
					</el-table-column>
					<el-table-column label="出售余量/总量">
						<template slot-scope="data">
							<b style="color: blue;">{{ data.row.stcnt_count_left }}</b>
							/ {{ data.row.stcnt_count_total }}
						</template>
					</el-table-column>
					<el-table-column label="状态">
						<template slot-scope="data">
							{{ data.row.__hide }}
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
			this.g_page.funcSetApiUrlList('/xadmin/app_lily/app_lily__class_item__list')
			//页码
			this.g_page.funcSetPageSize(20)

			var date_now = new Date();
			//搜索
			this.form_q = {
				'compKw': '',
				'compBeginDate': date_now.toLocaleDateString(),
				'compEndDate': date_now.toLocaleDateString(),
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
			//编辑
			funcEdit(row) {
				let id = ''
				if (row) {
					id = row.id
				}
				this.g_cc.func_redirect('/app_lily/class_item__edit', {
					id: id,
					callback_url: '/app_lily/class_item__list'
				})
			},
			////////////////////
			//批量添加按钮
			funcAdd(row) {
				let id = ''
				if (row) {
					id = row.id
				}
				this.g_cc.func_redirect('/app_lily/class_item__add', {
					id: id,
					callback_url: '/app_lily/class_item__list'
				})
			}
			////////////////////
		}
	}
</script>
