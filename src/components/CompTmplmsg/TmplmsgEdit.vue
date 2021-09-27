<template>
	<div>
		<!---->
		<!---->
		<!-- 弹框 -->
		<el-dialog :title="page_info.title" :visible.sync="form_dialog_visible" width="70%" :modal="false">
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="模板名称" prop="wxtmplmsg_name">
							<el-input v-model="form.wxtmplmsg_name"></el-input>
						</el-form-item>
						<el-form-item label="选择模板" prop="wxtmplmsg_tmpl_id">
							<el-select v-model="form.wxtmplmsg_tmpl_id" @change="funcTmplChange">
								<el-option
									v-for="item in page_info.list_templmsg"
									:value="item.template_id"
									:key="item.template_id"
									:label="item.title">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item v-show="false" label="内容" prop="wxtmplmsg_content">
							<el-input type="textarea" autosize v-model="form.wxtmplmsg_content"></el-input>
						</el-form-item>
						<el-form-item label="模板内容" prop="wxtmplmsg_content">
							<div v-for="(val,key) in tmpl.content_list">
								<div>{{ val.val }}：</div>
								<!---->
								<!---->
								<el-color-picker v-model="form['color_' + key]"></el-color-picker>
								<el-input type="textarea" v-model="form['data_' + key]" :placeholder="key"></el-input>
								<!---->
								<!---->
							</div>
							<div class="x-alert">
								<span>{$now}：当前时间，例：2019-08-12 11：01:12</span><br/>
								<span>{$date}：今天，例：2019-08-12</span><br/>
							</div>
						</el-form-item>
						<el-form-item label="跳转方式" prop="wxtmplmsg_redirect_type">
							<el-radio-group v-model="form.wxtmplmsg_redirect_type">
								<el-radio label="">链接跳转</el-radio>
								<el-radio label="wxapp">小程序跳转</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item v-show="form.wxtmplmsg_redirect_type=='wxapp'" label="appid" prop="wxtmplmsg_redirect_str_01">
							<el-input v-model="form.wxtmplmsg_redirect_str_01"></el-input>
						</el-form-item>
						<el-form-item :label="form.wxtmplmsg_redirect_type=='wxapp'?'pagepath':'链接'" prop="wxtmplmsg_redirect_str_00">
							<el-input v-model="form.wxtmplmsg_redirect_str_00"></el-input>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<el-tab-pane label="测试发送" name="2">
						<el-form-item label="openid">
							<el-input class="x-input-60" v-model="send_openid"></el-input>
						</el-form-item>
						<el-form-item label="操作">
							<el-button type="primary" @click="funcSendTest" size="mini">发送</el-button>
						</el-form-item>
						<el-form-item label="结果">
							<el-input class="x-input-60" type="textarea" v-model="send_res"></el-input>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
				</el-tabs>
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
			//来源ID
			id_src: {
				type: String,
				default: null
			},
			uix: {
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
				tmpl: { content_list: [] },
				list_tmpl: [],
				send_openid: '', //发送openid
				send_res: ''//发送结果
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
			this.g_page.funcSetApiUrlEdit('/xadmin/tmplmsg/tmplmsg__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/tmplmsg/tmplmsg__edit/save')
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
			//测试发送
			funcSendTest() {
				let page = this
				this.g_cc.func_axios({
					url: '/xadmin/tmplmsg/tmplmsg__edit/funcTestSend',
					data: {
						id: page.form.id,
						openid: page.send_openid
					},
					success: (res) => {
						//
						this.send_res = res.data.errmsg
					}
					//
				})
			},
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
					id_src: this.id_src,
					uix: this.uix
				}
				this.g_page.funcEdit(data)
			},
			funcShowDialogAfter() {
				this.funcTmplChange()
			},
			funcSaveBefore(data) {
				// data.item_pic = this.g_page.funcImgArrToStr(data.item_pic_imgs)

				return data
			},
			//模板列表选择事件
			funcTmplChange(e) {
				if (this.form.wxtmplmsg_tmpl_id) {
					this.tmpl = this.page_info.list_templmsg[this.form.wxtmplmsg_tmpl_id]
				}

				if (typeof (this.tmpl) == 'undefined') {
					this.tmpl = {
						content_list: []
					}
				}
				console.log('funcTmplChange:tmpl', this.tmpl)
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
