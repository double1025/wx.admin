<template>
	<el-container>
		<el-header class='x-header'>
			<div class="title">
				<b>
					{{ page_info.title }}
				</b>
				<el-button size="mini" icon="el-icon-s-tools" type="primary" plain @click="g_page.funcRedirectAppEdit('coupon')"></el-button>
			</div>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="funcEdit('')">
				添加
			</el-button>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="卡号">
					<el-input name="compKw" v-model="form_q.compKw" placeholder="卡号"></el-input>
				</el-form-item>
				<el-form-item label="应用">
					<el-select filterable v-model="form_q.compAppID" placeholder="请选择">
						<el-option label="全部" key="all" value="all"></el-option>
						<el-option label="优惠券" key="coupon" value="coupon"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="领取">
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
					<el-table-column label="卡号">
						<template slot-scope="data">
							<div v-html="data.row.coupon_id"></div>
						</template>
					</el-table-column>
					<el-table-column label="应用">
						<template slot-scope="data">
							<div v-html="data.row.coupon_app_id"></div>
						</template>
					</el-table-column>
					<el-table-column label="名称">
						<template slot-scope="data">
							<div v-html="data.row.coupon_name"></div>
						</template>
					</el-table-column>
					<el-table-column label="类型">
						<template slot-scope="data">
							<div v-html="data.row.type"></div>
						</template>
					</el-table-column>
					<el-table-column label="抵扣">
						<template slot-scope="data">
							<div v-if="data.row.coupon_use_price_max>0">
								满{{ data.row.coupon_use_price_max }}元，抵扣{{data.row.coupon_down_price }}元
							</div>
							<div v-if="data.row.coupon_use_price_max==0">无门槛，抵扣{{ data.row.coupon_down_price }}元</div>
						</template>
					</el-table-column>
					<el-table-column label="余量/总量">
						<template slot-scope="data">
							<div v-if="data.row.coupon_app_id=='coupon'">
								{{ data.row.stock_count_left }} /
								{{ data.row.stock_count_left + data.row.stock_count_use }}
							</div>
							<div v-if="data.row.coupon_app_id!='coupon'">
								应用控制
							</div>
						</template>
					</el-table-column>
					<el-table-column label="领取日期">
						<template slot-scope="data">
							<div v-html="data.row.coupon_get_date_begin"></div>
							<div v-html="data.row.coupon_get_date_end"></div>
							<div style="color: red;" v-if="data.row.is_expire">已过期</div>
						</template>
					</el-table-column>
					<el-table-column label="排序">
						<template slot-scope="data">
							<div>{{data.row.coupon_order}}</div>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="data">
							<el-button v-if="data.row.coupon_app_id=='coupon'" type="primary" size="mini" @click="funcEdit(data.row.id)">
								编辑
							</el-button>
							<el-button v-if="data.row.coupon_type==''" size="mini" @click="g_page.funcRedirectEdit(`coupon__join__edit?pid=${data.row.id}`)">
								关联商品
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
		<!-- 编辑控件 -->
		<CouponSetEdit ref="item_edit" :app_id="form_q.app_id" :funcSaveAfter="funcEditItem_success"></CouponSetEdit>
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
	import CouponSetEdit from '@/components/CompCoupon/CouponSetEdit'

	export default {
		components: {
			CouponSetEdit
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
			this.g_page.funcSetApiUrlList('/xadmin/coupon/coupon__set__list')
			this.g_page.funcSetApiUrlDel('/xadmin/coupon/coupon__set__list/del')
			//页码
			this.g_page.funcSetPageSize(20)
			//搜索
			this.form_q = {
				'compKw': '',
				'compAppID': 'coupon'
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
			funcEdit(id) {
				this.$refs['item_edit'].funcEdit(id)
			},
			funcEditItem_success(e) {
				this.g_page.funcGetList()
			}
		}
	}
</script>
