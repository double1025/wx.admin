<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
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
							<el-alert :closable="false">
								{$now}：当前时间，例：2019-08-12 11：01:12<br/>
								{$date}：今天，例：2019-08-12<br/>
							</el-alert>
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
			<!---->
			<!---->
			<!-- 按钮部分 -->
			<div class="save_wrap">
				<el-button @click="g_page.funcBack" size="mini">返回</el-button>
				<el-button type="success" @click="g_page.funcSave" size="mini">保存</el-button>
				<el-checkbox style="margin-left: 10px;" label="保存后停留" v-model="checked"/>
			</div>
			<!---->
			<!---->
			<!---->
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			let page_data = {
				list_tmpl: [],
				tmpl: null,
				test: {
					test_openid: '',
					test_res: ''
				}
			}
			//
			page_data = this.g_cc.funcGetInitData(page_data)
			//
			return page_data
		},
		mounted() {
			console.log('mounted')
			console.log(this.$route.query)

			this.g_page.funcSetVue(this)
			//
			this.g_page.funcSetApiUrlEdit('/xadmin/wp_subscribemsg/wp_subscribemsg__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/wp_subscribemsg/wp_subscribemsg__edit/save')
			let page = this
			//验证
			this.form_rules = {
				__test: [{
					required: true,
					message: '请输入原密码',
					trigger: 'blur'
				}]
			}

			let data = this.$route.query
			this.g_page.funcEdit(data)
			// debugger
		},
		methods: {
			funcShowDialogAfter() {
				console.log('funcShowDialogAfter')
				this.funcInitTemplmsg()
				//
				this.test.id = this.$route.query.id
			},
			funcBack() {
				let callback_url = this.$route.query.callback_url
				this.g_cc.func_redirect(callback_url)
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
					success: (res) => {
						if (res.errcode == 0) {
							this.list_tmpl = res.list
							if (this.page_info.is_admin_edit) {
								this.funcChange(this.form.wxsg_template_id)
							}
						} else {
							this.g_cc.func_alert(res.errmsg, 'error')
						}
					}
				})
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
			//
		}
	}
</script>

<style>
</style>
