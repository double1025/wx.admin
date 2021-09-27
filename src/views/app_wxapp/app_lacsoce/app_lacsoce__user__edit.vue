<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="上级信息" prop="luser_luser_id__higher">
							<div v-if="form.higher_luser_name!=''">
								<div>姓名：{{form.higher_luser_name}}</div>
								<div>编号：{{form.higher_luser_num}}</div>
							</div>
							<div v-if="form.higher_luser_name==''">
								无上级
							</div>
							<el-button type="primary" @click="funcChangeHigher" size="mini">修改上级</el-button>
						</el-form-item>
						<el-form-item label="经销商编号">
							{{ form.luser_num }}
						</el-form-item>
						<el-form-item label="识别编号" prop="luser_num_01">
							<el-input class="x-input-60" v-model="form.luser_num_01"></el-input>
						</el-form-item>
						<el-form-item label="等级" prop="luser_level_id">
							<el-select filterable v-model="form.luser_level_id" placeholder="请选择">
								<el-option v-for="(v, k) in page_info.list_level" :label="v.llevel_name" :key="v.llevel_id" :value="v.llevel_id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="姓名" prop="luser_name">
							<el-input class="x-input-60" v-model="form.luser_name"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="luser_phone">
							<el-input class="x-input-60" v-model="form.luser_phone"></el-input>
						</el-form-item>
						<el-form-item label="微信号" prop="luser_wechat">
							<el-input class="x-input-60" v-model="form.luser_wechat"></el-input>
						</el-form-item>
						<el-form-item label="头像" prop="luser_headimg">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :rules="({ maxSize: 0.5})"
										   v-bind:value.sync="form.luser_headimg_imgs"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="省市区" prop="city">
							<CompSelectCity v-model="form.city"></CompSelectCity>
						</el-form-item>
						<el-form-item label="地址" prop="luser_address">
							<el-input class="x-input-60" type="textarea" v-model="form.luser_address"></el-input>
						</el-form-item>
						<el-form-item label="有效期" prop="luser_vaild_end_date">
							<el-date-picker
								style="width: 200px;"
								v-model="form.luser_vaild_begin_date"
								type="date"
								placeholder="选择开始时间"
								value-format="yyyy-MM-dd">
							</el-date-picker>
							至
							<el-date-picker
								style="width: 200px;"
								v-model="form.luser_vaild_end_date"
								type="date"
								placeholder="选择结束时间"
								value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="拉黑" prop="luser_is_blacklist">
							<el-switch v-model="form.luser_is_blacklist"
									   inactive-color="#13ce66"
									   active-color="#ff4949"
									   :active-value="1" active-text="已拉黑"
									   :inactive-value="0" inactive-text="正常">
							</el-switch>
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
	import CompSelectCity from '@/components/CompSelectCity'
	import {
		MessageBox
	} from 'element-ui'

	export default {
		components: {
			CompSelectCity
		},
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_lacsoce/app_lacsoce__user__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_lacsoce/app_lacsoce__user__edit/save')
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
			funcTest() {
				this.form.higher_luser_name = '123'
				console.log(this.form)
			},
			//修改上级
			funcChangeHigher() {
				MessageBox.prompt('输入上级手机号或者编号', '修改上级', {
					confirmButtonText: '修改上级',
					cancelButtonText: '取消',
					inputPattern: /\d{1,}/,
					inputErrorMessage: '请输入内容'
				}).then(({ value }) => {
					console.log('修改上级')
					if (!value) {
						this.g_cc.func_alert('请输入目录', 'error')
						return
					}
					let page = this
					page.g_cc.func_axios({
						url: '/xadmin/app_lacsoce/app_lacsoce__user__edit/funcGetUserInfoHigher',
						data: {
							keyval: value
						},
						success: (res) => {
							if (res.data.errcode == 0) {
								page.g_cc.func_alert('修改成功', 'success', function() {
									page.form.luser_luser_id__higher = res.data.user.luser_id
									page.form.higher_luser_name = res.data.user.luser_name
									page.form.higher_luser_num = res.data.user.luser_num
								})
							} else {
								page.g_cc.func_alert(res.data.errmsg, 'error')
							}
						}//end success
					})
				}).catch(() => {
					console.log('取消')
				})
			},
			funcShowDialogAfter() {
				console.log('funcShowDialogAfter')
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.luser_headimg = this.g_page.funcImgArrToStr(data.luser_headimg_imgs)

				return data
			}
		}
	}
</script>

<style>
	.bm-view {
		width: 100%;
		height: 300px;
	}
</style>
