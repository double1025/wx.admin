<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="平台" prop="media_type" ref="media_type">
							<el-radio-group v-model="form.media_plat">
								<el-radio v-for="(val,key) in page_info.plat" :key="key" :label="key">{{val}}</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="发送时间" prop="yyyyMMdd" ref="yyyyMMdd">
							<el-date-picker
								style="width: 150px;"
								v-model="form.yyyyMMdd"
								type="date"
								placeholder="选择开始时间"
								value-format="yyyy-MM-dd">
							</el-date-picker>
							<el-select style="width: 80px;" v-model="form.HH" placeholder="时">
								<el-option v-for="(val,key) in page_info.list_hour" :label="val" :key="val" :value="val"/>
							</el-select>
							时
							<el-select style="width: 80px;" v-model="form.mm" placeholder="分">
								<el-option v-for="(val,key) in page_info.list_minute" :label="val" :key="val" :value="val"/>
							</el-select>
							分
						</el-form-item>
						<el-form-item label="文本" prop="media_txt" ref="media_txt">
							<el-input class="x-input-60" type="textarea" :rows="5" v-model="form.media_txt" placeholder="填写淘宝、京东优惠码"/>
						</el-form-item>
						<el-form-item label="图片" prop="media_pic" ref="media_pic">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   v-bind:value.sync="form.media_pic_imgs"
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
			this.g_page.funcSetApiUrlEdit('/xadmin/media/media__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/media/media__edit/save')
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
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.media_pic = this.g_page.funcImgArrToStr(data.media_pic_imgs)

				return data
			}
		}
	}
</script>

<style>
</style>
