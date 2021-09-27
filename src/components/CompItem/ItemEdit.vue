<template>
	<div>
		<!---->
		<!---->
		<!-- 弹框 -->
		<el-dialog :title="page_info.title" :visible.sync="form_dialog_visible" width="70%">
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-form-item label="标题" prop="item_title">
					<el-input class="x-input-60" v-model="form.item_title"/>
				</el-form-item>
				<el-form-item label="图片" prop="item_pic">
					<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
								   v-bind:value.sync="form.item_pic_imgs"
								   :remote-fuc="g_page.funcUpdateImg"
								   :before-upload="g_page.funcUpdateImgBefore"/>
				</el-form-item>
				<el-form-item label="跳转方式" prop="item_redirect_type">
					<el-radio-group v-model="form.item_redirect_type">
						<el-radio v-for="(v, k) in page_info.item_redirect_type" :key="k" :label="k">{{ v }}</el-radio>
					</el-radio-group>
				</el-form-item>
				<div v-if="form.item_redirect_type=='url'">
					<el-form-item label="链接" prop="item_redirect_str_00">
						<el-input v-model="form.item_redirect_str_00" placeholder="例：http://siyoumi.com"/>
					</el-form-item>
				</div>
				<div v-if="form.item_redirect_type=='wxapp'">
					<el-form-item label="小程序路径" prop="item_redirect_str_00">
						<el-input class="x-input-60" v-model="form.item_redirect_str_00" placeholder="例：/pages/index/index"/>
					</el-form-item>
				</div>
				<div v-if="form.item_redirect_type=='wxapp_other'">
					<el-form-item label="小程序appid" prop="item_redirect_str_01">
						<el-input class="x-input-60" v-model="form.item_redirect_str_01"/>
					</el-form-item>
					<el-form-item label="小程序路径" prop="item_redirect_str_00">
						<el-input class="x-input-60" v-model="form.item_redirect_str_00"/>
					</el-form-item>
				</div>
				<el-form-item label="描述" prop="item_desc">
					<el-input type="textarea" class="x-input-60" v-model="form.item_desc" placeholder="可选"/>
				</el-form-item>
				<el-form-item label="排序" prop="item_order">
					<el-input-number v-model="form.item_order" :step="1"></el-input-number>
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
			//表单ID
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
			this.g_page.funcSetApiUrlEdit('/xadmin/z_common/item__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/z_common/item__edit/save')
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
					console.error('【组件】缺少id_src')
					this.g_cc.func_alert('【组件】缺少id_src', 'error')
					return
				}
			},
			funcSaveBefore(data) {
				data.item_pic = this.g_page.funcImgArrToStr(data.item_pic_imgs)

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
