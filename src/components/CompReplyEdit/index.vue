<template>
	<div>
		<el-button v-if="!btnHide" :type="btnType" size="mini" @click="funcEdit()">{{ btnTxt }}</el-button>
		<!---->
		<!---->
		<!-- 弹框 -->
		<el-dialog :title="page_info.title" :visible.sync="form_dialog_visible" width="70%">
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-form-item label="KEY" prop="reply_key">
					<el-input v-model="form.reply_key"/>
				</el-form-item>
				<el-form-item label="名称" prop="reply_name">
					<el-input v-model="form.reply_name"/>
				</el-form-item>
				<el-form-item label="类型" prop="reply_type">
					<el-radio v-model="form.reply_type" label="text">文本回复</el-radio>
					<el-radio v-model="form.reply_type" label="msg">图文回复</el-radio>
				</el-form-item>
				<el-form-item v-show="isMsg()" label="图文-标题" prop="reply_title">
					<el-input v-model="form.reply_title"/>
				</el-form-item>
				<el-form-item v-show="isMsg()" label="图文-图片" prop="reply_pic">
					<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
								   v-bind:value.sync="form.reply_pic_imgs"
								   :remote-fuc="g_page.funcUpdateImg"
								   :before-upload="g_page.funcUpdateImgBefore"/>
				</el-form-item>
				<el-form-item :label="isMsg()?'图文-描述':'回复内容'" prop="reply_desc">
					<el-input type="textarea" :rows="5" v-model="form.reply_desc"/>
					<!--          <p class="">发送文本消息时，支持插入跳小程序的文字链文本内容</p>-->
				</el-form-item>
				<el-form-item v-show="isMsg()" label="跳转方式" prop="reply_redirect_type">
					<el-radio v-model="form.reply_redirect_type" label="">键跳转</el-radio>
					<el-radio v-model="form.reply_redirect_type" label="url">链接跳转</el-radio>
				</el-form-item>
				<el-form-item v-show="isMsg()" label="跳转-内容" prop="reply_redirect">
					<el-input v-model="form.reply_redirect"/>
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
			id: {
				type: Number,
				default: null
			},
			btnTxt: {
				type: String,
				default: '编辑'
			},
			btnType: {
				type: String,
				default: 'primary'
			},
			btnHide: {
				type: Boolean,
				default: false
			},
			//保存成功后，会执行
			funcSaveAfter: {
				type: Function,
				default: undefined
			}
		},
		model: {
			prop: 'id',
			event: 'setID'
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
			this.g_page.funcSetApiUrlEdit('/xadmin/reply/reply__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/reply/reply__edit/save')
			//搜索
			this.form_q = {
				'compKw': ''
			}
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
			funcEdit() {
				console.log('funcEdit')
				console.log('funcIsAdminAdd', this.funcIsAdminAdd())
				//
				if (!this.funcIsAdminAdd()) {
					if (!this.id) {
						console.error('id is null')
					}
				}
				//
				this.g_cc.func_axios({
					url: this.g_page.api_func__edit,
					data: {
						id: this.id
					},
					success: (res) => {
						if (res.errcode == 0) {
							let row = {}
							row = Object.assign(row, res.data)
							this.page_info = res.page_info
							console.log('funcEdit:success', row)
							this.g_page.funcShowDialog(row)
						} else {
							this.g_cc.func_alert(res.errmsg, 'error')
						}
					}
				})
				//
			},
			/**
			 * 是否添加操作
			 * @returns {boolean}
			 */
			funcIsAdminAdd() {
				if (this.id) {
					return false
				}
				return true
			},
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.reply_pic = this.g_page.funcImgArrToStr(data.reply_pic_imgs)

				return data
			},
			isMsg() {
				return this.form.reply_type == 'msg'
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
						//走back逻辑
						page.funcBack()
						//
						if (typeof (page.funcSaveAfter) != 'undefined') {
							page.funcSaveAfter(res)
						}
					})
				} else {
					this.g_cc.func_alert(res.data.errmsg, 'error')
				}
			}
			////////////////////
		}
	}
</script>
