<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="等级名称" prop="llevel_name">
							<el-input v-model="form.llevel_name"></el-input>
						</el-form-item>
						<el-form-item label="级别" prop="llevel_level">
							<el-input-number v-model="form.llevel_level" :step="1"></el-input-number>
						</el-form-item>
						<el-form-item label="图标" prop="llevel_icon">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :rules="({ maxSize: 0.5})"
										   v-bind:value.sync="form.llevel_icon_imgs"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="证书底图" prop="llevel_pic_cert">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :rules="({ maxSize: 0.5})"
										   v-bind:value.sync="form.llevel_pic_cert_imgs"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="审核权限">
							<div>
								注册审核权限：
								<el-radio-group v-model="form.llevel_auth_reg">
									<el-radio :label="0">无</el-radio>
									<el-radio :label="1">有</el-radio>
								</el-radio-group>
							</div>
							<div>
								升级审核权限：
								<el-radio-group v-model="form.llevel_auth_update">
									<el-radio :label="0">无</el-radio>
									<el-radio :label="1">有</el-radio>
								</el-radio-group>
							</div>
							<div>
								续签审核权限：
								<el-radio-group v-model="form.llevel_auth_extension">
									<el-radio :label="0">无</el-radio>
									<el-radio :label="1">有</el-radio>
								</el-radio-group>
							</div>
						</el-form-item>
						<el-form-item label="可邀请注册" prop="llevel_share_reg">
							<el-radio-group v-model="form.llevel_share_reg">
								<el-radio :label="0">否</el-radio>
								<el-radio :label="1">是</el-radio>
							</el-radio-group>
							<div class="x-alert">
								<span>是：品牌授权邀请才会出现此等级选择</span>
							</div>
						</el-form-item>
						<el-form-item label="升级考核" prop="llevel_update_check">
							<el-radio-group v-model="form.llevel_update_check">
								<el-radio :label="0">关闭</el-radio>
								<el-radio :label="1">开启</el-radio>
							</el-radio-group>
							<div class="x-alert">
								<span>开启：升级申请需要考核通过才能填写申请表</span>
							</div>
						</el-form-item>
						<el-form-item label="联合审核" prop="llevel_join_apply">
							<el-radio-group v-model="form.llevel_join_apply">
								<el-radio :label="0">关闭</el-radio>
								<el-radio :label="1">开启</el-radio>
							</el-radio-group>
							<div class="x-alert">
								<span>开启：审核此等级所有业务，需要上级和联合等级成员进行审核才会生效</span>
							</div>
						</el-form-item>
						<el-form-item v-show="form.llevel_join_apply==1" label="联合审核-等级" prop="llevel_join_apply_level">
							<el-select filterable v-model="form.llevel_join_apply_level" placeholder="请选择">
								<el-option label="无" key="" value=""></el-option>
								<el-option v-for="(item,index) in page_info.list_level"
										   :label="item.llevel_name" :key="item.llevel_id" :value="item.llevel_id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="可添加门店" prop="llevel_pio">
							<el-radio-group v-model="form.llevel_pio">
								<el-radio :label="0">否</el-radio>
								<el-radio :label="1">是</el-radio>
							</el-radio-group>
							<div class="x-alert">
								<span>是：可申请门店</span>
							</div>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
					<el-tab-pane v-if="false" label="模板" name="2">
						<el-form-item label="应用模板" prop="reply_app_file" ref="reply_app_file">
							<el-col :span="6">
								<el-input v-model="form.reply_app_file" placeholder="默认：t_001"/>
							</el-col>
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
			let page_data = {}
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_lacsoce/app_lacsoce__level__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_lacsoce/app_lacsoce__level__edit/save')
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
		},
		methods: {
			funcShowDialogAfter() {
				console.log('funcShowDialogAfter')
			},
			funcBack() {
				let callback_url = this.$route.query.callback_url
				this.g_cc.func_redirect(callback_url)
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.llevel_icon = this.g_page.funcImgArrToStr(data.llevel_icon_imgs)
				data.llevel_pic_cert = this.g_page.funcImgArrToStr(data.llevel_pic_cert_imgs)

				return data
			}
		}
	}
</script>
