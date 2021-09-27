<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="类型" prop="lclass_type" ref="lclass_type">
							<el-radio-group v-model="form.lclass_type" :disabled="page_info.is_admin_edit">
								<el-radio v-for="item in page_info.list_type" :key="item.key" :label="item.key">
									{{item.val}}
								</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="课程名称" prop="lclass_name" ref="lclass_name">
							<el-input v-model="form.lclass_name"/>
						</el-form-item>
						<el-form-item label="选择导师" prop="tea_ids">
							<el-checkbox-group v-model="form.tea_ids" @change="funcTeaChange">
								<el-checkbox v-for="item in page_info.list_tea" :label="item.lteacher_id" :key="item.lteacher_id">
									{{item.lteacher_name}}
								</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
						<el-form-item label="轮播图" prop="lclass_pic">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="5"
										   v-bind:value.sync="form.lclass_pic_imgs"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="课程介绍-适合人群" prop="lclass_desc_00" ref="lclass_desc_00">
							<el-input type="textarea" :rows="5" v-model="form.lclass_desc_00"/>
						</el-form-item>
						<el-form-item label="课程介绍-内容介绍" prop="lclass_desc_01" ref="lclass_desc_01">
							<el-input type="textarea" :rows="5" v-model="form.lclass_desc_01"/>
						</el-form-item>
						<el-form-item label="活动规则" prop="lclass_desc_02" ref="lclass_desc_02">
							<el-alert class="x-alert" :closable="false">
								<div v-text="desc_02_alert"></div>
							</el-alert>
							<el-input type="textarea" :rows="5" v-model="form.lclass_desc_02"/>
						</el-form-item>
						<el-form-item label="状态" prop="lclass_hide">
							<el-alert :closable="false" class="x-alert">
								状态只会影响后台配置选择列表
							</el-alert>
							<el-radio-group v-model="form.lclass_hide">
								<el-radio :label="0">显示</el-radio>
								<el-radio :label="1">隐藏</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="排序" prop="lclass_order" ref="lclass_order">
							<el-input-number v-model="form.lclass_order" :step="10"></el-input-number>
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
			let page_data = {
				desc_02_alert: '内容需要换行，需要加上<p>内容</p>'
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_lily/app_lily__class__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_lily/app_lily__class__edit/save')
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

				data.lclass_pic = this.g_page.funcImgArrToStr(data.lclass_pic_imgs)

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
