<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="轮播图">
							<ItemList :max="6" ref="item_list_00"></ItemList>
							<div class="x-alert">
								<span>提示：可以用鼠标拖拽改变排序</span>
							</div>
						</el-form-item>
						<el-form-item label="广告图" prop="abc_str_02">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :img_root="page_info.static_file_root"
										   v-bind:value.sync="form.abc_str_02"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="广告图配置" prop="abc_int_00">
							<el-switch v-model="form.abc_int_00"
									   active-color="#13ce66"
									   :active-value="1" active-text="开启"
									   :inactive-value="0" inactive-text="关闭">
							</el-switch>
						</el-form-item>
						<el-form-item label="搜索框随机词语">
							<el-input class="x-input-60" type="textarea" v-model="form.abc_txt_00" placeholder="多个换行分隔"/>
							<div class="x-alert">
								<span>多个换行分隔</span>
							</div>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
					<el-tab-pane v-if="false" label="高级配置" name="2">
						<!--						<el-form-item label="科技侠-帐号" prop="s_account" ref="s_account">-->
						<!--							<el-input class="x-input-60" v-model="form.s_account" placeholder="帐号"></el-input>-->
						<!--						</el-form-item>-->
					</el-tab-pane>
					<!---->
					<!---->
				</el-tabs>
			</el-form>
			<!---->
			<!---->
			<!-- 按钮部分 -->
			<div class="save_wrap">
				<!--				<el-button @click="g_page.funcBack" size="mini">返回</el-button>-->
				<el-button type="success" @click="g_page.funcSave" size="mini">保存</el-button>
				<!--				<el-checkbox style="margin-left: 10px;" label="保存后停留" v-model="checked"/>-->
			</div>
			<!---->
			<!---->
			<!---->
		</el-main>
	</el-container>
</template>

<script>
	import ItemList from '@/components/CompItem/ItemList'
	import FileList from '@/components/UploadFile/UploadFileList'

	export default {
		components: {
			ItemList,
			FileList
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_fengce/app_fengce__setting')
			this.g_page.funcSetApiUrlSave('/xadmin/app_fengce/app_fengce__setting/save')
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
					this.$refs['item_list_00'].funcInit(this.form.abc_str_00)
					// this.$refs['item_list_01'].funcInit(this.form.abc_str_01)
				})

			},
			//保存之前
			funcSaveBefore(data) {
				return data
			}
		}
	}
</script>
