<template>
	<div>
		<!---->
		<!---->
		<!-- 弹框 -->
		<el-dialog :title="page_info.title" :visible.sync="form_dialog_visible" width="70%">
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-form-item label="设置项-名称" prop="sitem_label">
					<el-input class="x-input-60" v-model="form.sitem_label"/>
				</el-form-item>
				<el-form-item label="设置项-key" prop="sitem_key">
					<el-input class="x-input-60" v-model="form.sitem_key"/>
					<div class="x-alert">
						<span>字段必须唯一</span>
					</div>
				</el-form-item>
				<el-form-item label="类型" prop="sitem_type">
					<el-radio-group v-model="form.sitem_type">
						<el-radio v-for="(v, k) in page_info.set_type" :key="k" :label="k">{{ v }}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="默认值" prop="sitem_def">
					<el-input class="x-input-60" v-model="form.sitem_def" placeholder="选填"/>
				</el-form-item>
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
			//属性模板ID
			pid: {
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_admin/app_admin__set_item__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_admin/app_admin__set_item__edit/save')
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
			funcBack() {
				this.form_dialog_visible = false
			},
			/**
			 * 显示编辑弹框
			 * @param row
			 */
			funcEdit(id) {
				//
				let data = {
					id: id,
					pid: this.pid
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
				// data.item_pic = this.g_page.funcImgArrToStr(data.item_pic_imgs)

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
