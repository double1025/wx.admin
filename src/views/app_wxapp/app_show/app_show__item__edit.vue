<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="名称" prop="abc_name">
							<el-input class="x-input-60" v-model="form.abc_name"></el-input>
						</el-form-item>
						<el-form-item label="上线时间" prop="abc_date_00">
							<el-date-picker
								style="width: 150px;"
								v-model="form.abc_date_00"
								type="date"
								placeholder="选择开始时间"
								:picker-options="g_cc.picker_options"
								value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="展示图" prop="abc_str_00">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :img_root="page_info.static_file_root"
										   v-bind:value.sync="form.abc_str_00"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="描述" prop="abc_txt_00">
							<el-input type="textarea" :rows="5" class="x-input-60" v-model="form.abc_txt_00"></el-input>
						</el-form-item>
						<el-form-item label="小程序appid" prop="abc_str_01">
							<el-input class="x-input-60" v-model="form.abc_str_01"></el-input>
						</el-form-item>
						<el-form-item label="小程序路径" prop="abc_str_02">
							<el-input class="x-input-60" v-model="form.abc_str_02"></el-input>
						</el-form-item>
						<el-form-item label="排序">
							<el-input-number v-model="form.abc_order" :step="1"></el-input-number>
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_show/app_show__item__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_show/app_show__item__edit/save')
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
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				// data.llevel_icon = this.g_page.funcImgArrToStr(data.llevel_icon_imgs)
				// data.llevel_pic_cert = this.g_page.funcImgArrToStr(data.llevel_pic_cert_imgs)

				return data
			}
		}
	}
</script>
