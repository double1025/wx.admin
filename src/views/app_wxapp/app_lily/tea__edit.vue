<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="导师名字" prop="lteacher_name" ref="lteacher_name">
							<el-input v-model="form.lteacher_name"/>
						</el-form-item>
						<el-form-item label="导师标签语" prop="lteacher_tag" ref="lteacher_tag">
							<el-input v-model="form.lteacher_tag"/>
						</el-form-item>
						<el-form-item label="图片" prop="lteacher_pic_s">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :rules="{maxSize:1}"
										   v-bind:value.sync="form.lteacher_pic_s_imgs"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="擅长" prop="lteacher_good" ref="lteacher_good">
							<el-input type="textarea" :rows="5" v-model="form.lteacher_good"/>
						</el-form-item>
						<el-form-item label="教学资历" prop="lteacher_desc_00" ref="lteacher_desc_00">
							<el-input type="textarea" :rows="5" v-model="form.lteacher_desc_00"/>
						</el-form-item>
						<el-form-item label="心声" prop="lteacher_desc_01" ref="lteacher_desc_01">
							<el-input type="textarea" :rows="5" v-model="form.lteacher_desc_01"/>
						</el-form-item>
						<el-form-item label="排序" prop="lteacher_order" ref="lteacher_order">
							<el-input-number v-model="form.lteacher_order" :step="10"></el-input-number>
							<div>
								<el-tag type="info" size="small">
									排序大于1000前端会隐藏
								</el-tag>
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
			let page_data = { super_uid: '' }
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_lily/app_lily__tea__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_lily/app_lily__tea__edit/save')
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

				data.lteacher_pic_s = this.g_page.funcImgArrToStr(data.lteacher_pic_s_imgs)

				return data
			}
		}
	}
</script>

<style>
</style>
