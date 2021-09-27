<template>
	<div>
		<!---->
		<!---->
		<!-- 弹框 -->
		<el-dialog z-index="900" :title="page_info.title" :visible.sync="form_dialog_visible" width="70%"
				   :close-on-click-modal="false"
				   :close-on-press-escape="false">
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<!---->
				<!---->
				<el-form-item label="奖品名" prop="pset_name">
					<el-input class="x-input-60" v-model="form.pset_name"></el-input>
				</el-form-item>
				<!---->
				<!-- 奖品名类型 -->
				<el-form-item label="奖品名类型" prop="pset_type">
					<el-radio-group :disabled="page_info.is_admin_edit" v-model="form.pset_type" @change="funcChangeType">
						<el-radio v-for="(v, k) in page_info.list_type" :label="k" :key="k">{{v}}
						</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item v-if="form.pset_type=='fun'" label="积分配置" prop="pset_int_00">
					<el-input-number v-model="form.pset_int_00" :step="1" :min="1"></el-input-number>
					-
					<el-input-number v-model="form.pset_int_01" :step="1" :min="1"></el-input-number>
				</el-form-item>
				<el-form-item v-show="form.pset_type=='coupon'" label="优惠券" prop="pset_str_00">
					<CouponSetList ref="coupon" :app_id="app_id" :uix="form.pset_str_00"></CouponSetList>
				</el-form-item>
				<!---->
				<!-- 实物核销方式 -->
				<el-form-item v-if="form.pset_type==''" label="使用方式" prop="pset_use_type">
					<el-radio-group v-model="form.pset_use_type">
						<el-radio :label="0" :key="0">密码核销</el-radio>
						<!--						<el-radio :label="1" :key="1">填写表单</el-radio>-->
						<el-radio :label="2" :key="2">发货</el-radio>
					</el-radio-group>
				</el-form-item>
				<div v-if="form.pset_type==''">
					<el-form-item v-if="form.pset_use_type==0" label="密码" prop="pset_use_str_00">
						<el-input class="x-input-60" v-model="form.pset_use_str_00"></el-input>
					</el-form-item>
					<el-form-item v-if="form.pset_use_type==1" label="表单ID" prop="pset_use_str_00">
						<el-input class="x-input-60" v-model="form.pset_use_str_00"></el-input>
					</el-form-item>
				</div>
				<!---->
				<!---->
				<el-form-item v-show="!arr_hide.pset_pic" label="奖品图" prop="pset_pic">
					<x-upload-imgs :sortable="true" :max-num="1"
								   :img_root="page_info.static_file_root"
								   :rules="({ maxSize: 0.5})"
								   v-bind:value.sync="form.pset_pic"
								   :remote-fuc="g_page.funcUpdateImg"
								   :before-upload="g_page.funcUpdateImgBefore"/>
				</el-form-item>
				<el-form-item label="奖品描述" v-show="form.pset_type!='coupon'" prop="pset_desc">
					<Tinymce menubar="" v-model="form.pset_desc" :height="500" ref="pset_desc"></Tinymce>
				</el-form-item>
				<el-form-item v-show="!arr_hide.pschou_win_rate" label="中奖率" prop="pschou_win_rate">
					<el-input-number v-model="form.pschou_win_rate" :precision="3" :step="0.01" :min="0" :max="1"></el-input-number>
				</el-form-item>
				<el-form-item v-show="!arr_hide.stock" label="总量">
					{{ form.__stock_count_total }}
				</el-form-item>
				<el-form-item v-show="!arr_hide.stock" label="余量" prop="stock_count_left">
					<span v-show="!set_stock">{{ form.__stock_count_left }}</span>
					<el-input-number v-show="set_stock" v-model="form.__stock_count_left" :min="0" @change="funcSetStock"></el-input-number>
					<el-button v-if="!set_stock" size="mini" type="text" @click="set_stock=true">设置</el-button>
				</el-form-item>
				<el-form-item label="有效期" prop="pset_vaild_date_type">
					<el-radio-group v-model="form.pset_vaild_date_type">
						<el-radio :label="0" :key="0">固定日期</el-radio>
						<el-radio :label="1" :key="1">中奖后N小时</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item v-show="form.pset_vaild_date_type==1" label="有效期" prop="pset_vaild_date_win_h">
					中奖后
					<el-input-number v-model="form.pset_vaild_date_win_h" :min="1" :step="1"></el-input-number>
					小时有效
				</el-form-item>
				<el-form-item v-show="form.pset_vaild_date_type==0" label="有效期" prop="pset_vaild_date_end" ref="pset_vaild_date_end">
					<el-date-picker
						style="width: 200px;"
						v-model="form.pset_vaild_date_begin"
						type="datetime"
						placeholder="选择开始时间"
						:picker-options="g_cc.picker_options"
						default-time="00:00:00"
						value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
					至
					<el-date-picker
						style="width: 200px;"
						v-model="form.pset_vaild_date_end"
						type="datetime"
						placeholder="选择结束时间"
						:picker-options="{
							disabledDate(time) {
								return g_cc.picker_disabled_date_func(time,form.pset_vaild_date_begin);
							},
						}"
						default-time="23:59:59"
						value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="中奖通知" prop="pset_send_type">
					<el-radio-group v-model="form.pset_send_type" @change="funcChangeSend">
						<el-radio :label="0" :key="0">无</el-radio>
						<el-radio :label="1" :key="1">消息通知</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item v-show="form.pset_send_type==1" label="中奖通知" prop="pset_send_id">
					<Tmplmsg v-if="!page_info.is_wxapp" ref="tmplmsg" :uix="form.pset_send_id" :app_id="app_id" :id_src="id_src"></Tmplmsg>
					<Subscribemsg v-if="page_info.is_wxapp" ref="tmplmsg" :uix="form.pset_send_id"></Subscribemsg>
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
	import Tmplmsg from '@/components/CompTmplmsg/Tmplmsg'
	import Subscribemsg from '@/components/CompSubscribemsg/Subscribemsg'
	import CouponSetList from '@/components/CompCoupon/CouponSetList'
	import Tinymce from '@/components/Tinymce'

	export default {
		components: {
			Tmplmsg,
			Subscribemsg,
			CouponSetList,
			Tinymce
		},
		props: {
			//来源ID
			id_src: {
				type: String,
				default: null
			},
			app_id: {
				type: String,
				default: null
			},
			//唯一标识
			pset_key: {
				type: String,
				default: null
			},
			//保存成功后，会执行
			funcSaveAfter: {
				type: Function,
				default: undefined
			},
			//隐藏字段
			arr_hide: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data() {
			let page_data = {
				set_stock: false, //设置库存
				init_coupon: false, //是否已初始化优惠券
				init_send: false //是否已初始化发送
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
			this.g_page.funcSetApiUrlEdit('/xadmin/prize/prize__set__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/prize/prize__set__edit/save')
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
			funcChangeType(e) {
				if (e == 'coupon' && !this.init_coupon) {
					this.init_coupon = true
					this.$refs['coupon'].funcInit(this.form.pset_str_00)
				}
			},
			funcChangeSend(e) {
				if (!this.init_send) {
					this.init_send = true
					this.$refs['tmplmsg'].funcInit(this.form.pset_send_id)
				}
			},
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
				console.log('隐藏字段', this.arr_hide)
				//重置
				this.set_stock = false //设置库存
				//
				let data = {
					id: id,
					id_src: this.id_src
				}
				// debugger
				if (this.pset_key) {
					data.key = this.pset_key
				}
				if (this.app_id) {
					data.app_id = this.app_id
				}
				this.g_page.funcEdit(data)
			},
			funcShowDialogAfter() {
				console.log('funcShowDialogAfter')
				this.$nextTick(() => {
					this.$refs['pset_desc'].setContent(this.form.pset_desc)

					if (this.page_info.is_admin_edit) {
						if (this.form.pset_send_type == 1) {
							this.$refs['tmplmsg'].funcInit(this.form.pset_send_id)
						}
						if (this.form.pset_type == 'coupon') {
							this.$refs['coupon'].funcInit(this.form.pset_str_00)
						}
					}
				})
			},
			funcSaveBefore(data) {
				data.pset_desc = this.$refs['pset_desc'].getContent()

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
