<template>
	<div>
		<!---->
		<!---->
		<!-- 弹框 -->
		<el-dialog :title="page_info.title" :visible.sync="form_dialog_visible" width="70%" :modal="false">
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%" v-loading="loading">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="名称" prop="wxsg_name">
							<el-input v-model="form.wxsg_name"></el-input>
						</el-form-item>
						<el-form-item label="选择模板" prop="wxsg_template_id">
							<el-select v-model="form.wxsg_template_id" @change="funcChange">
								<el-option
									v-for="item in list_tmpl"
									:value="item.priTmplId"
									:key="item.priTmplId"
									:label="item.title">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="模板详情" v-if="tmpl">
							<div>模版ID：{{ form.wxsg_template_id }}</div>
							<div>模版标题：{{ tmpl.title }}</div>
							<div>
								模版类型：
								<span v-if="tmpl.type==2">一次性订阅</span>
								<span v-if="tmpl.type==3">永久订阅</span>
							</div>
							<div>
								<b style="color:red;">配置内容比较严格，请按照系统提示输入，否则会发送失败</b>
								<a target="_blank"
								   href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html">详情查看微信文档</a>
							</div>
							<div v-for="(val,key) in tmpl.content_list">
								<el-col :span="24">
									{{ val.val }}：
									<el-input style="width: 50%" v-model="form['data_' + key]" :placeholder="key"></el-input>
								</el-col>
								<!---->
								<!---->
								<!-- 提示 -->
								<div v-if="val.msg" style="font-size: 11px;">
									<span style="color: blue;">{{ val.msg }}</span>，
									{{ val.example }}
								</div>
								<!---->
								<!---->
							</div>
							<div class="x-alert">
								<span><b>占位符：</b></span><br/>
								<span>{$now}：当前时间，例：2019-08-12 11：01:12</span><br/>
								<span>{$date}：今天，例：2019-08-12</span><br/>
							</div>
						</el-form-item>
						<el-form-item label="page" prop="wxsg_page">
							<el-input v-model="form.wxsg_page" placeholder="小程序链接，如：pages/abc/abc"></el-input>
						</el-form-item>
						<el-form-item label="跳转小程序环境" prop="wxsg_miniprogram_state">
							<el-radio-group v-model="form.wxsg_miniprogram_state">
								<el-radio v-for="(val,key) in page_info.miniprogram_state" :key="key" :label="key">
									{{ val }}
								</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
					<el-tab-pane v-if="page_info.is_admin_edit" label="测试" name="2">
						<el-form-item label="openid">
							<el-input type="textarea" class="x-input-60" v-model="test.test_openid" property="多个使用回车"></el-input>
							<el-button type="primary" @click="funcTestSend" size="mini">测试发送</el-button>
						</el-form-item>
						<el-form-item label="结果">
							<el-input class="x-input-60" rows="5" type="textarea" v-model="test.test_res"></el-input>
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
				list_tmpl: [],
				tmpl: null,
				test: {
					test_openid: '',
					test_res: ''
				},
				loading: false
			}
			//
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
			this.g_page.funcSetApiUrlEdit('/xadmin/wp_subscribemsg/wp_subscribemsg__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/wp_subscribemsg/wp_subscribemsg__edit/save')
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
				//初始化数据
				this.page_tag = '1'
				this.list_tmpl = []
				this.tmpl = null
				this.test.test_res = ''
				let data = {
					id: id,
					uix: this.uix
				}
				this.loading = true
				this.g_page.funcEdit(data)
			},
			funcShowDialogAfter() {
				console.log('funcShowDialogAfter')
				this.funcInitTemplmsg()
				//
				this.test.id = this.$route.query.id
			},
			funcChange(e) {
				console.log('func_change')

				this.tmpl = this.list_tmpl[e]
				// if (this.tmpl) {
				//   this.tmpl.content_list
				// }
				console.log(this.tmpl)
			},
			//初始化订阅模板列表
			funcInitTemplmsg() {
				this.g_cc.func_axios({
					url: '/xadmin/wp_subscribemsg/wp_subscribemsg__edit/funcGetMpTemplmsg',
					data: {},
					// loading: false,
					success: (res) => {
						if (res.errcode == 0) {
							this.list_tmpl = res.list
							if (this.page_info.is_admin_edit) {
								this.funcChange(this.form.wxsg_template_id)
							}
						} else {
							this.g_cc.func_alert(res.errmsg, 'error')
						}
					},
					complete: () => {
						this.loading = false
					}
				})
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
			},
			//测试发送
			funcTestSend() {
				let page = this
				this.g_cc.func_axios({
					url: '/xadmin/wp_subscribemsg/wp_subscribemsg__edit/funcTestSend',
					data: page.test,
					success: (res) => {
						if (res.errcode == 0) {
							this.test.test_res = res.res
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
