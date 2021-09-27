<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button size="mini" type="success" icon="el-icon-back" @click="funcEdit">添加</el-button>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="名称">
					<el-input name="compKw" v-model="form_q.compKw" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item label="类型">
					<el-select v-model="form_q.compType" placeholder="请选择">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="(item,index) in page_info.list_type"
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
					<el-table-column label="套餐卡标题">
						<template slot-scope="data">
							{{ data.row.lcitem_title }}
							<span style="color: #3963bc;" v-if="data.row.lcitem_first">[初]</span>
						</template>
					</el-table-column>
					<el-table-column label="套餐卡副标题">
						<template slot-scope="data">
							<div v-html="data.row.lcitem_title_sub"></div>
						</template>
					</el-table-column>
					<el-table-column label="课程类型">
						<template slot-scope="data">
							<div v-html="data.row.__type"></div>
						</template>
					</el-table-column>
					<el-table-column label="套餐卡价格">
						<template slot-scope="data">
							{{ data.row.lcitem_price_now }}元
						</template>
					</el-table-column>
					<el-table-column label="总课">
						<template slot-scope="data">
							{{ data.row.lcitem_use_total }}节
						</template>
					</el-table-column>
					<el-table-column label="出售余量/总量">
						<template slot-scope="data">
							<b style="color: blue;">{{ data.row.stcnt_count_left }}</b>
							/ {{ data.row.stcnt_count_total }}
						</template>
					</el-table-column>
					<el-table-column label="有效期" width="160">
						<template slot-scope="data">
							<div v-if="data.row.is_expire" style="color:red;">【已过期】</div>
							<div>{{ data.row.lcitem_begin_time }}</div>
							<div>{{ data.row.lcitem_end_time }}</div>
						</template>
					</el-table-column>
					<el-table-column label="状态">
						<template slot-scope="data">
							{{ data.row.__hide }}
						</template>
					</el-table-column>
					<el-table-column label="排序">
						<template slot-scope="data">
							{{ data.row.lcitem_order }}
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
			this.g_page.funcSetApiUrlList('/xadmin/app_lily/app_lily__class_item__card__list')
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
			funcEdit(row) {
				let id = ''
				if (row) {
					id = row.id
				}
				this.g_cc.func_redirect('/app_lily/class_item__card__edit', {
					id: id,
					callback_url: '/app_lily/class_item__card__list'
				})
			}
			////////////////////
		}
	}
</script>
