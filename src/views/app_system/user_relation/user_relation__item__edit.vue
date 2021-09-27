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
						<el-form-item label="背景" prop="abc_str_00">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :img_root="page_info.static_file_root"
										   v-bind:value.sync="form.abc_str_00"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="码设置" prop="position_qr_y">
							<div class="item">
								X:
								<el-input-number v-model="form.position_qr_x" :step="1"></el-input-number>
								Y:
								<el-input-number v-model="form.position_qr_y" :step="1"></el-input-number>
							</div>
							<div class="item">
								宽:
								<el-input-number v-model="form.position_qr_w" :step="1"></el-input-number>
								高:
								<el-input-number v-model="form.position_qr_h" :step="1"></el-input-number>
							</div>
						</el-form-item>
						<el-form-item label="其他元素">
							<div class="item">
								头像位置：
								<el-checkbox v-model="form.position_head_enble"/>
								<span v-if="form.position_head_enble">
								X:
								<el-input-number v-model="form.position_head_x" :step="1"></el-input-number>
								Y:
								<el-input-number v-model="form.position_head_y" :step="1"></el-input-number>
							</span>
							</div>
							<div class="item">
								昵称位置：
								<el-checkbox v-model="form.position_name_enble"/>
								<span v-if="form.position_name_enble">
								X:
								<el-input-number v-model="form.position_name_x" :step="1"></el-input-number>
								Y:
								<el-input-number v-model="form.position_name_y" :step="1"></el-input-number>
							</span>
							</div>
						</el-form-item>
						<el-form-item label="隐藏" prop="abc_hide">
							<el-switch v-model="form.abc_hide"
									   active-color="#13ce66"
									   :active-value="1" active-text="隐藏"
									   :inactive-value="0" inactive-text="显示">
							</el-switch>
						</el-form-item>
						<el-form-item label="排序" prop="abc_order">
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
	import PrizeSetList from '@/components/CompPrize/PrizeSetList'

	export default {
		components: {
			PrizeSetList
		},
		data() {
			let page_data = {
				form: {
					position: {
						head_x: 0,
						head_y: 0
					}
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
			this.g_page.funcSetApiUrlEdit('/xadmin/user_relation/user_relation__item__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/user_relation/user_relation__item__edit/save')
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

				return data
			}
		}
	}
</script>

<style scoped>
	.item {
		margin-bottom: 5px;
	}
</style>
