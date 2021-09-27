<template>
	<div>
		<!---->
		<!---->
		<!-- 弹框 -->
		<el-dialog z-index="1000" :title="page_info.title" :visible.sync="form_dialog_visible" width="70%"
				   :modal="false"
				   :close-on-click-modal="false"
				   :close-on-press-escape="false">
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<!---->
				<!---->
				<el-form-item label="名称" prop="coupon_name">
					<el-input class="x-input-60" v-model="form.coupon_name"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop="coupon_type">
					<el-radio-group :disabled="page_info.is_admin_edit" v-model="form.coupon_type">
						<el-radio v-for="(v, k) in page_info.list_type" :label="k" :key="k">{{v}}
						</el-radio>
					</el-radio-group>
					<div class="x-alert">
						<span>限制券：指定商品可使用</span><br/>
						<span>通用券：所有商品均可使用</span>
					</div>
				</el-form-item>
				<el-form-item label="抵扣" prop="coupon_down_price">
					满
					<el-input-number v-model="form.coupon_use_price_max" :min="0" :step="0.01" :precision="2"></el-input-number>
					元，抵扣
					<el-input-number v-model="form.coupon_down_price" :min="0.01" :step="0.01" :precision="2"></el-input-number>
					元
					<div class="x-alert">
						<span>满减金额为0：表示无门槛</span>
					</div>
				</el-form-item>
				<el-form-item v-if="form.coupon_app_id=='coupon'" label="用户领取上限" prop="coupon_user_get_max">
					<el-input-number v-model="form.coupon_user_get_max"></el-input-number>
				</el-form-item>
				<el-form-item v-if="form.coupon_app_id=='coupon'" label="领取时间" prop="coupon_get_date_end" ref="coupon_get_date_end">
					<el-date-picker
						style="width: 200px;"
						v-model="form.coupon_get_date_begin"
						type="datetime"
						placeholder="选择开始时间"
						:picker-options="g_cc.picker_options"
						default-time="00:00:00"
						value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
					至
					<el-date-picker
						style="width: 200px;"
						v-model="form.coupon_get_date_end"
						type="datetime"
						placeholder="选择结束时间"
						:picker-options="{
							disabledDate(time) {
								return g_cc.picker_disabled_date_func(time,form.coupon_get_date_begin);
							},
						}"
						default-time="23:59:59"
						value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="总量" v-if="form.coupon_app_id=='coupon'">
					{{ form.__stock_count_total }}
				</el-form-item>
				<el-form-item label="余量" prop="stock_count_left" v-if="form.coupon_app_id=='coupon'">
					<span v-show="!set_stock">{{ form.__stock_count_left }}</span>
					<el-input-number v-show="set_stock" v-model="form.__stock_count_left" :min="0" @change="funcSetStock"></el-input-number>
					<el-button v-if="!set_stock" size="mini" type="text" @click="set_stock=true">设置</el-button>
				</el-form-item>
				<el-form-item v-if="form.coupon_app_id=='coupon'" label="有效期" prop="coupon_vaild_date_type">
					<el-radio-group v-model="form.coupon_vaild_date_type">
						<el-radio :label="0" :key="0">固定日期</el-radio>
						<el-radio :label="1" :key="1">领取后N小时</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item v-if="form.coupon_app_id=='coupon'" v-show="form.coupon_vaild_date_type==1" label="有效期" prop="coupon_vaild_date_after_h">
					领取后
					<el-input-number v-model="form.coupon_vaild_date_after_h" :min="1" :step="1"></el-input-number>
					小时有效
				</el-form-item>
				<el-form-item v-if="form.coupon_app_id=='coupon'" v-show="form.coupon_vaild_date_type==0" label="有效期" prop="coupon_vaild_date_end" ref="coupon_vaild_date_end">
					<el-date-picker
						style="width: 200px;"
						v-model="form.coupon_vaild_date_begin"
						type="datetime"
						placeholder="选择开始时间"
						:picker-options="g_cc.picker_options"
						default-time="00:00:00"
						value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
					至
					<el-date-picker
						style="width: 200px;"
						v-model="form.coupon_vaild_date_end"
						type="datetime"
						placeholder="选择结束时间"
						:picker-options="{
							disabledDate(time) {
								return g_cc.picker_disabled_date_func(time,form.coupon_vaild_date_begin);
							},
						}"
						default-time="23:59:59"
						value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="使用说明" prop="coupon_desc">
					<Tinymce menubar="" :height="350" ref="coupon_desc"></Tinymce>
					<!--					<el-input class="x-input-60" type="textarea" :rows="5" v-model="form.coupon_desc"/>-->
				</el-form-item>
				<el-form-item label="排序">
					<el-input-number v-model="form.coupon_order" :step="1"></el-input-number>
				</el-form-item>
				<!---->
				<!---->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="funcBack" size="mini">取消</el-button>
				<el-button type="success" @click="g_page.funcSave" size="mini">保存</el-button>
			</div>
		</el-dialog>
		<!---->
		<!---->
		<!---->
	</div>
</template>

<script>
	import Tinymce from '@/components/Tinymce'

	export default {
		components: {
			Tinymce
		},
		props: {
			//唯一
			uix: {
				type: String,
				default: null
			},
			app_id: {
				type: String,
				default: null
			},
			//保存成功后，会执行
			funcSaveAfter: {
				type: Function,
				default: undefined
			}
		},
		data() {
			let page_data = {
				set_stock: false //设置库存
			}
			//
			// debugger
			page_data = this.g_cc.funcGetInitData(page_data)
			//
			return page_data
		},
		mounted() {
			console.log('mounted', this._uid)
			//
			// debugger
			this.g_page.funcSetVue(this)
			// 应用ID
			this.g_page.funcSetApiUrlEdit('/xadmin/coupon/coupon__set__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/coupon/coupon__set__edit/save')
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
		},
		methods: {
			funcBack() {
				this.form_dialog_visible = false
			},
			//设置库存
			funcSetStock(e) {
				console.log('funcSetStock', e)
				this.form.stock_count_left = e
			},
			/**
			 * 显示编辑弹框
			 * @param row
			 */
			funcEdit(id) {
				//重置
				this.set_stock = false //设置库存
				//
				let data = {
					id: id
				}
				if (this.app_id) {
					data.app_id = this.app_id
				}
				if (this.uix) {
					data.uix = this.uix
				}
				this.g_page.funcEdit(data)
			},
			funcShowDialogAfter() {
				console.log('funcShowDialogAfter')

				this.$nextTick(() => {
					this.$refs['coupon_desc'].setContent(this.form.coupon_desc)
				})
			},
			funcSaveBefore(data) {
				data.coupon_desc = this.$refs['coupon_desc'].getContent()
				return data
			},
			//
			/**
			 * 保存成功方法重写
			 * @param res
			 */
			funcSave__success(res) {
				//
				if (res.errcode == 0) {
					let errmsg = '保存成功'
					if (res.errmsg) {
						errmsg = res.errmsg
					}
					//
					let page = this
					this.g_cc.func_alert(errmsg, 'success', function() {
						//特殊处理
						page.form_dialog_visible = false
						page.funcSaveAfter(res)
					})
				} else {
					this.g_cc.func_alert(res.data.errmsg, 'error')
				}
			}
			////////////////////
		}
	}
</script>
