<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item v-show="!page_info.is_wxapp" label="图文-标题" prop="reply_title" ref="reply_title">
							<el-input class="x-input-60" v-model="form.reply_title"/>
						</el-form-item>
						<el-form-item v-show="!page_info.is_wxapp" label="图文-图片" prop="reply_pic" ref="reply_pic">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   v-bind:value.sync="form.reply_pic_imgs"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item v-show="!page_info.is_wxapp" label="图文-描述" prop="reply_desc">
							<el-input class="x-input-60" type="textarea" :rows="5" v-model="form.reply_desc"/>
						</el-form-item>
						<el-form-item label="开启分享" prop="reply_do_share">
							<el-radio-group v-model="form.reply_do_share">
								<el-radio :label="0">关闭</el-radio>
								<el-radio :label="1">开启</el-radio>
							</el-radio-group>
							<div class="x-alert">
								<span>开启：应用可以分享好友或者朋友圈</span>
							</div>
						</el-form-item>
						<el-form-item v-show="do_share()" label="分享-标题" prop="reply_share_title">
							<el-input class="x-input-60" v-model="form.reply_share_title"/>
						</el-form-item>
						<el-form-item v-show="do_share()" label="分享-图片" prop="reply_share_pic">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   v-bind:value.sync="form.reply_share_pic_imgs"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item v-show="do_share() && !page_info.is_wxapp" label="分享-描述" prop="reply_share_desc">
							<el-input class="x-input-60" type="textarea" :rows="5" v-model="form.reply_share_desc"/>
						</el-form-item>
						<el-form-item v-show="!page_info.is_wxapp" label="授权链接" v-if="form.__oauth_url_x">
							{{form.__oauth_url_x}}
						</el-form-item>
						<el-form-item v-show="!page_info.is_wxapp" label="全键" v-if="form.__oauth_base">
							<el-input class="x-input-30" v-model="form.__word"/>
							<el-button type="primary" @click="funcGenOauthUrl">生成授权链接</el-button>
						</el-form-item>
						<el-form-item v-show="!page_info.is_wxapp" v-if="form.is_dev" label="调试链接">
							<el-input class="x-input-90" v-if="dev_url" v-model="dev_url"/>
							<el-button type="primary" @click="funcGetDevUrl" size="mini">生成</el-button>
							<div class="x-alert">
								<span>链接只能使用1次，有效期：3分钟</span>
							</div>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
					<el-tab-pane label="高级" name="2" v-if="page_info.is_super_admin">
						<el-form-item v-show="!page_info.is_wxapp" label="应用URL" prop="reply_app_url" ref="reply_app_url">
							<el-input class="x-input-60" type="textarea" v-model="form.reply_app_url"/>
							<div class="x-alert">
								<span>公众号授权成功，会跳转此链接</span>
							</div>
						</el-form-item>
						<el-form-item label="应用模板类型" prop="reply_app_file_type">
							<el-radio-group v-model="form.reply_app_file_type">
								<el-radio :label="0">系统模板</el-radio>
								<el-radio :label="1">自定义模板</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item v-show="form.reply_app_file_type==1" label="应用模板" prop="reply_app_file" ref="reply_app_file">
							<el-input class="x-input-60" v-model="form.reply_app_file" placeholder="默认：t_001"/>
						</el-form-item>
						<el-form-item v-show="form.reply_app_file_type==0" label="应用模板" prop="reply_app_file" ref="reply_app_file">
							<el-select filterable v-model="form.reply_app_file" placeholder="请选择">
								<el-option label="" key="" value="">暂无使用</el-option>
								<el-option v-for="(val, k) in page_info.list_app_file"
										   :label="val"
										   :key="k"
										   :value="k">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item v-show="page_info.is_admin_edit" label="特殊属性配置" prop="reply_set_id" ref="reply_set_id">
							<el-select filterable v-model="form.reply_set_id" placeholder="请选择">
								<el-option label="" key="" value="">暂无使用</el-option>
								<el-option v-for="(val, k) in page_info.list_set"
										   :label="val.set_name"
										   :key="val.set_id"
										   :value="val.set_id">
								</el-option>
							</el-select>
							<el-button v-if="form.reply_set_id &&　form.id" size="mini" icon="el-icon-tickets" type="primary" plain @click="funcEditData"></el-button>
						</el-form-item>
						<el-form-item label="启动加速" prop="reply_do_cdn">
							<el-switch v-model="form.reply_do_cdn"
									   active-color="#13ce66"
									   :active-value="1" active-text="已加速"
									   :inactive-value="0" inactive-text="正常">
							</el-switch>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
				</el-tabs>
				<!---->
				<!-- 编辑控件 -->
				<DateEdit ref="data_edit" :pid="form.id" :set_id="form.reply_set_id" :funcSaveAfter="funcEditData_success"></DateEdit>
				<!---->
				<!---->
			</el-form>
			<!---->
			<!---->
			<!-- 按钮部分 -->
			<div class="save_wrap">
				<el-button @click="g_page.funcBack" size="mini">返回</el-button>
				<el-button type="success" @click="g_page.funcSave" size="mini">保存</el-button>
				<el-checkbox v-if="page_info.is_admin_edit" style="margin-left: 10px;" label="保存后停留" v-model="checked"/>
			</div>
			<!---->
			<!---->
			<!---->
		</el-main>
	</el-container>
</template>

<script>
	import DateEdit from '@/views/app_system/app_admin/components/DataEdit'
	import {
		MessageBox, Message
	} from 'element-ui'

	export default {
		components: {
			DateEdit
		},
		data() {
			let page_data = {
				super_uid: '',
				dev_url: '',
				openid: ''
			}
			page_data = this.g_cc.funcGetInitData(page_data)
			return page_data
		},
		mounted() {
			console.log('mounted')
			console.log(this.$route.query)

			this.g_page.funcSetVue(this)
			//
			this.g_page.funcSetApiUrlEdit('/xadmin/app_admin/app_admin__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_admin/app_admin__edit/save')
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
			// console.log('tag=', this.$refs.reply_app_file.$parent.name);
		},
		methods: {
			//授权链接
			funcGenOauthUrl() {
				let word = this.form.__word
				let word_encode = escape(word)

				console.log(word)
				console.log(word_encode)

				this.form.__oauth_url = this.form.__oauth_base.replace('__word__', word_encode)
				this.form.__oauth_url_x = this.form.__oauth_base.replace('__word__', word_encode)
			},
			//开户分享
			do_share() {
				return this.form.reply_do_share == 1
			},
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.reply_pic = this.g_page.funcImgArrToStr(data.reply_pic_imgs)
				data.reply_share_pic = this.g_page.funcImgArrToStr(data.reply_share_pic_imgs)

				return data
			},
			//属性编辑
			funcEditData() {
				console.log('funcEditData')
				this.$refs['data_edit'].funcEdit()
			},
			funcEditData_success() {

			},
			//调试链接
			funcGetDevUrl() {
				let page = this
				MessageBox.prompt('请输入OPENID', '生成调整链接', {
					confirmButtonText: '生成',
					cancelButtonText: '取消',
					inputValue: page.openid
				}).then(({ value }) => {
					let openid = value
					if (!openid) {
						this.g_cc.func_alert('输入OPENID', 'error')
						return
					}
					page.openid = openid
					page.g_cc.func_axios({
						url: '/xadmin/app_admin/app_admin__edit/funcGetDevUrl',
						data: {
							openid: openid,
							word: page.form.__word
						},
						loading: false,
						success: (res) => {
							//
							if (res.data.errcode == 0) {
								Message.success({ message: '已生成' })
								page.dev_url = res.data.url
							} else {
								page.g_cc.func_alert(res.data.errmsg, 'error')
							}
						}
						//
					})
				}).catch(() => {
					console.log('取消')
				})
			}
		}
	}
</script>

<style>
</style>
