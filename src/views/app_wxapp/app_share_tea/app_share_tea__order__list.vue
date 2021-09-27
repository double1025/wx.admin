<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button v-if="$route.query.callback_url" size="mini" icon="el-icon-back" @click="g_page.funcBack">
				返回
			</el-button>
			<ExprotExcel api_url="/xadmin/app_share_tea/app_share_tea__order__list/export" :api_data="form_q"></ExprotExcel>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="订单号">
					<el-input name="compKw" v-model="form_q.compKw" placeholder="订单号"></el-input>
				</el-form-item>
				<el-form-item v-if="page_info.pio" label="茶室">
					<el-select filterable v-model="form_q.compRoomID" placeholder="请选择">
						<el-option label="全部" key="all" value="all">全部</el-option>
						<el-option v-for="(val, k) in page_info.list_room"
								   :label="val.troom_name"
								   :key="val.troom_id"
								   :value="val.troom_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="支付状态">
					<el-select filterable v-model="form_q.compPayOk" placeholder="请选择">
						<el-option label="全部" key="all" value="all"></el-option>
						<el-option label="已支付" key="1" value="1"></el-option>
						<el-option label="未支付" key="0" value="0"></el-option>
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
					<el-table-column label="订单号">
						<template slot-scope="data">
							<div v-html="data.row.order_order_id"></div>
							<div style="color:red;font-size: 12px;" v-if="data.row.order_del">用户标记删除</div>
						</template>
					</el-table-column>
					<el-table-column label="用户">
						<template slot-scope="data">
							<div v-html="data.row.wxuser_nickName"></div>
							<div v-html="data.row.wxuser_openid"></div>
						</template>
					</el-table-column>
					<el-table-column label="店铺">
						<template slot-scope="data">
							{{ data.row.tpio_name }} {{ data.row.troom_name }}
						</template>
					</el-table-column>
					<el-table-column label="预约时间">
						<template slot-scope="data">
							<div v-html="data.row.torder_time_begin"></div>
							<div v-html="data.row.torder_time_end"></div>
						</template>
					</el-table-column>
					<el-table-column label="订单金额">
						<template slot-scope="data">
							<div v-html="data.row.order_price"></div>
						</template>
					</el-table-column>
					<el-table-column label="优惠券">
						<template slot-scope="data">
							<div v-if="data.row.use_coupon">
								<div>已使用</div>
								<div>{{ data.row.order_coupon }}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="支付状态">
						<template slot-scope="data">
							<div v-if="data.row.order_pay_ok==1">
								<div>
									已支付 <span style="color:blue;" v-if="data.row.order_use_money==1">（余额支付）</span>
								</div>
								<div>{{ data.row.order_pay_ok_date }}</div>
							</div>
							<div v-if="data.row.order_pay_ok!=1">
								<div style="color:darkgray;" v-if="data.row.order_pay_expire_handle==1">已过期</div>
								<div v-if="data.row.order_pay_expire_handle!=1">待支付</div>
							</div>
						</template>
					</el-table-column>
					<!--					<el-table-column fixed="right" label="操作">-->
					<!--						<template slot-scope="data">-->
					<!--							<el-button type="primary" size="mini" @click="g_page.funcRedirectEdit('app_share_tea__pio__edit',data.row)">-->
					<!--								编辑-->
					<!--							</el-button>-->
					<!--						</template>-->
					<!--					</el-table-column>-->
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
	import ExprotExcel from '@/components/ExprotExcel'

	export default {
		components: {
			ExprotExcel
		},
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
			this.g_page.funcSetApiUrlList('/xadmin/app_share_tea/app_share_tea__order__list')
			this.g_page.funcSetApiUrlDel('/xadmin/app_share_tea/app_share_tea__order__list/del')
			//页码
			this.g_page.funcSetPageSize(20)
			//搜索
			this.form_q = {
				'compPayOk': '1'
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
