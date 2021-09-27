<template>
	<el-container>
		<el-header class='x-header'>
			<div class="title">
				<b>
					{{ page_info.title }}
				</b>
				<el-button size="mini" icon="el-icon-s-tools" type="primary" plain @click="g_page.funcRedirectAppEdit('prize')"></el-button>
			</div>
			<el-button v-if="$route.query.callback_url" size="mini" icon="el-icon-back" @click="g_page.funcBack">
				返回
			</el-button>
			<ExprotExcel api_url="/xadmin/prize/prize__item__list/export" :api_data="form_q"></ExprotExcel>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="名称">
					<el-input name="compKw" v-model="form_q.compKw" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item label="信息">
					<el-input name="compUseJson" v-model="form_q.compUseJson" placeholder="信息"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="g_page.funcSearch">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="table-wrap">
				<el-table stripe ref="multipleTable" tooltip-effect="dark" @selection-change="g_page.funcTableSelectionChange"
						  :data="list_data">
					<el-table-column type="selection"></el-table-column>
					<el-table-column label="编号">
						<template slot-scope="data">
							<div>{{data.row.prize_id}}</div>
						</template>
					</el-table-column>
					<el-table-column label="用户">
						<template slot-scope="data">
							<div>{{data.row.wxuser_nickname}}</div>
							<div>{{data.row.wxuser_openid}}</div>
						</template>
					</el-table-column>
					<el-table-column label="类型">
						<template slot-scope="data">
							<div>{{data.row.type}}</div>
						</template>
					</el-table-column>
					<el-table-column label="名称">
						<template slot-scope="data">
							<div>{{data.row.prize_name}}</div>
						</template>
					</el-table-column>
					<el-table-column label="奖品图">
						<template slot-scope="data">
							<CompImg :img_root="page_info.static_file_root" :img_val="data.row.prize_pic"></CompImg>
						</template>
					</el-table-column>
					<el-table-column label="有效期">
						<template slot-scope="data">
							<div>{{data.row.prize_begin_date}}</div>
							<div>{{data.row.prize_end_date}}</div>
						</template>
					</el-table-column>
					<el-table-column label="使用状态">
						<template slot-scope="data">
							<div v-if="data.row.prize_use==0">未使用</div>
							<div v-if="data.row.prize_use==1">
								<b style="color:green;">已使用</b>
								<div>{{ data.row.prize_use_date }}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="描述">
						<template slot-scope="data">
							<div>{{data.row.prize_desc}}</div>
						</template>
					</el-table-column>
					<el-table-column label="附加信息" width="200">
						<template slot-scope="data">
							<div v-for="(v,k) in data.row.prize_use_json">
								{{k}}：{{v}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="操作时间">
						<template slot-scope="data">
							<div>{{data.row.prize_create_date}}</div>
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
	import ExprotExcel from '@/components/ExprotExcel'

	export default {
		components: {
			ExprotExcel
		},
		data() {
			let page_data = { super_uid: '' }
			page_data = this.g_cc.funcGetInitData(page_data)
			return page_data
		},
		mounted() {
			console.log('mounted')
			//
			this.g_page.funcSetVue(this)
			// 应用ID
			this.g_page.funcSetApiUrlList('/xadmin/prize/prize__item__list')
			// this.g_page.funcSetApiUrlDel('/xadmin/prize/prize__item__list/del')
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
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				// data.reply_pic = this.g_page.funcImgArrToStr(data.reply_pic_imgs)

				return data
			}
			////////////////////
		}
	}
</script>
