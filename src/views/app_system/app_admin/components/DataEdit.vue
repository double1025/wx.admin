<template>
	<div>
		<!---->
		<!---->
		<!-- 弹框 -->
		<el-dialog :title="page_info.title" :visible.sync="form_dialog_visible" width="70%">
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-form-item v-for="(v, k) in page_info.list_item" :label="v.sitem_label" :key="v.sitem_key" :prop="v.sitem_key">
					<div>
						<el-switch
							v-model="form[`def_${v.sitem_key}`]"
							:active-value="0"
							:inactive-value="1"
							active-text="自定义"
							inactive-text="默认值">
						</el-switch>
					</div>
					<div v-show="form[`def_${v.sitem_key}`]==0">
						<!---->
						<!-- 输入框 -->
						<template v-if="v.sitem_type=='input'">
							<el-input class="x-input-60" v-model="form[`data_${v.sitem_key}`]"/>
						</template>
						<!---->
						<!-- 文本域 -->
						<template v-if="v.sitem_type=='textarea'">
							<el-input type="textarea" class="x-input-60" v-model="form[`data_${v.sitem_key}`]"/>
						</template>
						<!---->
						<!-- 图片 -->
						<template v-if="v.sitem_type=='img'">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   v-bind:value.sync="form[`data_imgs_${v.sitem_key}`]"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</template>
						<!---->
					</div>
					<div class="x-alert">
						<span>默认值：{{ v.sitem_def }}</span>
					</div>
				</el-form-item>
				<!---->
				<!---->
				<!-- 编辑控件 -->
				<!-- 模板消息 -->
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
	export default {
		props: {
			//uix
			pid: {
				type: String
			},
			set_id: {
				type: String,
				default: ''
			},
			//保存成功后，会执行
			funcSaveAfter: {
				type: Function,
				default: undefined
			}
		},
		data() {
			let page_data = { super_uid: '' }
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_admin/app_admin__set_data__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_admin/app_admin__set_data__edit/save')
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
			/**
			 * 显示编辑弹框
			 * @param row
			 */
			funcEdit() {
				//
				let data = {
					pid: this.pid,
					set_id: this.set_id
				}
				this.g_page.funcEdit(data)
			},
			funcShowDialogAfter() {
				if (!this.pid) {
					console.error('【组件】缺少来源ID')
					this.g_cc.func_alert('【组件】缺少来源ID', 'error')
					return
				}
			},
			funcSaveBefore(data) {
				//图片特殊处理
				for (let k in data) {
					let v = data[k]
					if (k.indexOf('data_imgs_') == 0) {
						let feild_key = k.replace('data_imgs_', 'data_')
						data[feild_key] = this.g_page.funcImgArrToStr(v)
					}
				}
				console.log(data)

				return data
			},
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
