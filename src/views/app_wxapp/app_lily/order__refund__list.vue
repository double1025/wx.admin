<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini">
				<el-form-item label="姓名">
					<el-input v-model="form_q.compKw" style="width: 130px;" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="form_q.compPhone" style="width: 130px;" placeholder="手机号"></el-input>
				</el-form-item>
				<el-form-item label="使用码">
					<el-input v-model="form_q.compCode" style="width: 130px;" placeholder="使用码"></el-input>
				</el-form-item>
				<el-form-item label="退款状态">
					<el-select style="width: 120px;" v-model="form_q.compRefund" placeholder="请选择">
						<el-option label="全部" value="all"></el-option>
						<el-option v-for="(item,index) in page_info.list_refund_status"
								   :label="item"
								   :key="index"
								   :value="index">
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
					<el-table-column label="订单号">
						<template slot-scope="data">
							<div v-html="data.row.loitem_order_id_sub"></div>
						</template>
					</el-table-column>
					<el-table-column label="openid">
						<template slot-scope="data">
							{{ data.row.loitem_wxuser_id }}
						</template>
					</el-table-column>
					<el-table-column label="用户">
						<template slot-scope="data">
							<div>{{ data.row.winfo_name }}</div>
							<div style="color: blue;">{{ data.row.winfo_phone }}</div>
						</template>
					</el-table-column>
					<el-table-column label="课程名称">
						<template slot-scope="data">
							{{ data.row.__name }}
						</template>
					</el-table-column>
					<el-table-column label="类型">
						<template slot-scope="data">
							{{ data.row.__type }}
							<span v-if="data.row.lclass_type=='tea'" style="color: blue;">[{{ data.row.__lclass_type }}]</span>
						</template>
					</el-table-column>
					<el-table-column label="金额">
						<template slot-scope="data">
							{{ data.row.loitem_price }}元
						</template>
					</el-table-column>
					<el-table-column label="时间">
						<template slot-scope="data">
							<div v-html="data.row.time_show"></div>
						</template>
					</el-table-column>
					<el-table-column label="购买时间">
						<template slot-scope="data">
							{{ data.row.loitem_create_date }}
						</template>
					</el-table-column>
					<el-table-column label="购买方式" width="120">
						<template slot-scope="data">
							<div v-if="data.row.loitem_card_code">
								<span style="color:blue;">套餐卡抵扣</span><br/>
								<span>{{data.row.loitem_card_code}}</span>
							</div>
							<div style="color:green;" v-if="!data.row.loitem_card_code">微信支付</div>
						</template>
					</el-table-column>
					<el-table-column label="使用码">
						<template slot-scope="data">
							{{ data.row.loitem_code }}
						</template>
					</el-table-column>
					<el-table-column label="取消状态">
						<template slot-scope="data">
							{{ data.row.__loitem_refund_status }}
							<div v-if="data.row.loitem_refund_status==1">{{ data.row.loitem_refund_date }}</div>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="data">
							<el-button v-show="data.row.loitem_refund_status==10" type="primary"
									   size="mini" @click="g_page.funcShowDialog(data.row)">
								处理取消
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
		<!-- 弹框 -->
		<el-dialog title="处理取消" :visible.sync="form_dialog_visible" width="70%">
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-form-item label="课程名称">
					{{form.__name}}
				</el-form-item>
				<el-form-item label="用户名">
					{{form.winfo_name}}
				</el-form-item>
				<el-form-item label="手机号">
					{{form.winfo_phone}}
				</el-form-item>
				<el-form-item label="时间">
					<div v-html="form.time_show"></div>
				</el-form-item>
				<el-form-item label="金额">
					{{ form.loitem_price }}元
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="funcRefund(-10)" size="mini">不同意取消</el-button>
				<el-button type="danger" @click="funcRefund(1)" size="mini">同意取消</el-button>
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
			this.g_page.funcSetApiUrlList('/xadmin/app_lily/app_lily__order__refund__list')
			//页码
			this.g_page.funcSetPageSize(20)

			var date_now = new Date()

			//搜索
			this.form_q = {
				'compRefund': '10'
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
			//退款
			funcRefund(refund) {
				this.g_cc.func_axios({
					url: '/xadmin/app_lily/app_lily__order__refund__list/funcRefund',
					data: {
						'code': this.form.loitem_code,
						'refund': refund
					},
					success: (res) => {
						if (res.errcode == 0) {
							let g_vue = this
							this.g_cc.func_alert('处理成功', 'success', () => {
								//走back逻辑
								this.g_page.funcBack()

								//更新列表信息
								this.g_page.funcGetList()
							})
						} else {
							this.g_cc.func_alert(res.errmsg, 'error')
						}
					}
				})
			}
			////////////////////
		}
	}
</script>
