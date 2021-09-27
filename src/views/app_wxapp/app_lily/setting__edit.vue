<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="联系电话" prop="abc_str_00" ref="abc_str_00">
							<el-input v-model="form.abc_str_00"/>
						</el-form-item>
						<el-form-item label="地址" prop="abc_str_01" ref="abc_str_01">
							<el-input v-model="form.abc_str_01"/>
						</el-form-item>
						<el-form-item label="首页-轮播图" prop="abc_txt_00">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="5"
										   v-bind:value.sync="form.abc_txt_00_imgs"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
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
				<el-button v-if="false" @click="g_page.funcBack" size="mini">返回</el-button>
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_lily/app_lily__setting__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_lily/app_lily__setting__edit/save')
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
			funcBack() {
				let callback_url = this.$route.query.callback_url
				this.g_cc.func_redirect(callback_url)
			},
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.abc_txt_00 = this.g_page.funcImgArrToStr(data.abc_txt_00_imgs)

				return data
			},
			funcTeaChange(e) {
				console.log('funcTeaChange', e)
				this.form.do_update_tea = 1
			}
		}
	}
</script>

<style>
</style>
