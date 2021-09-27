<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="标题" prop="fmsg_title">
							<el-input class="x-input-60" v-model="form.fmsg_title"></el-input>
						</el-form-item>
						<el-form-item label="发布时间" prop="fmsg_post_date">
							<el-date-picker
								style="width: 200px;"
								v-model="form.fmsg_post_date"
								type="date"
								placeholder="选择发布时间"
								:picker-options="g_cc.picker_options"
								value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="来源" prop="fmsg_author">
							<el-input class="x-input-60" v-model="form.fmsg_author"></el-input>
						</el-form-item>
						<el-form-item label="封面图" prop="fmsg_pic">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :rules="{maxSize: 2}"
										   :img_root="page_info.static_file_root"
										   v-bind:value.sync="form.fmsg_pic"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="内容" prop="fmsg_content">
							<Tinymce menubar="" v-model="form.fmsg_content" :height="500" ref="fmsg_content"></Tinymce>
						</el-form-item>
						<el-form-item label="视频" prop="fmsg_mp4">
							<FileList v-bind:value.sync="form.fmsg_mp4"
									  :rules="{file_size_max:page_info.file_max_size}"
									  btn_txt="上传视频"
									  :img_root="page_info.static_file_root" :max="1">
							</FileList>
						</el-form-item>
						<el-form-item label="附件名称" prop="fmsg_file_name">
							<el-input class="x-input-60" v-model="form.fmsg_file_name"></el-input>
						</el-form-item>
						<el-form-item label="附件" prop="fmsg_file">
							<FileList v-bind:value.sync="form.fmsg_file"
									  :rules="{file_size_max:page_info.file_max_size}"
									  :accept="file_accept"
									  :img_root="page_info.static_file_root" :max="1">
							</FileList>
						</el-form-item>
						<el-form-item label="隐藏" prop="fmsg_hide">
							<el-switch v-model="form.fmsg_hide"
									   active-color="#13ce66"
									   :active-value="1" active-text="是"
									   :inactive-value="0" inactive-text="否">
							</el-switch>
						</el-form-item>
						<el-form-item label="排序">
							<el-input-number v-model="form.fmsg_order" :step="1"></el-input-number>
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
	import Tinymce from '@/components/Tinymce'
	import FileList from '@/components/UploadFile/UploadFileList'

	export default {
		components: {
			Tinymce,
			FileList
		},
		data() {
			let page_data = {
				BASE_API: BASE_API,
				file_accept: '.docx,.doc,.xls,.xlsx,.pdf,.txt'
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_fengce/app_fengce__msg__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_fengce/app_fengce__msg__edit/save')
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

				this.$nextTick(() => {
					// debugger
					setTimeout(() => {
						this.$refs['fmsg_content'].setContent(this.form.fmsg_content)
					}, 200)
				})
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.fmsg_content = this.$refs['fmsg_content'].getContent()

				return data
			}
		}
	}
</script>
