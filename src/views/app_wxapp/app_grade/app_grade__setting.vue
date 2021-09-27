<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="轮播图配置">
							<ItemList :max="6" ref="item_list_00"></ItemList>
							<div class="x-alert">
								<span>提示：可以用鼠标拖拽改变排序</span>
							</div>
						</el-form-item>
						<el-form-item label="联系客服-页面" prop="abc_str_01">
							<div class="x-alert">
								<span>所有页面图片建议宽度：750px</span>
							</div>
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :rules="({ maxSize: 0.5})"
										   v-bind:value.sync="form.abc_str_01_imgs"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
							<div class="x-alert">
								<span>路径：/pages/app_grade/pageDefault/pageDefault?prop=abc_str_01</span>
							</div>
						</el-form-item>
						<el-form-item label="我要合作-页面" prop="abc_str_02">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :rules="({ maxSize: 0.5})"
										   v-bind:value.sync="form.abc_str_02_imgs"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
							<div class="x-alert">
								<span>路径：/pages/app_grade/pageDefault/pageDefault?prop=abc_str_02</span>
							</div>
						</el-form-item>
						<el-form-item label="企业服务-页面" prop="abc_str_03">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :rules="({ maxSize: 0.5})"
										   v-bind:value.sync="form.abc_str_03_imgs"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
							<div class="x-alert">
								<span>路径：/pages/app_grade/pageDefault/pageDefault?prop=abc_str_03</span>
							</div>
						</el-form-item>
						<el-form-item label="协议及声明-页面" prop="abc_str_04">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :rules="({ maxSize: 0.5})"
										   v-bind:value.sync="form.abc_str_04_imgs"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
							<div class="x-alert">
								<span>路径：/pages/app_grade/pageDefault/pageDefault?prop=abc_str_04</span>
							</div>
						</el-form-item>
						<el-form-item label="帮助中心-页面" prop="abc_str_05">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :rules="({ maxSize: 0.5})"
										   v-bind:value.sync="form.abc_str_05_imgs"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
							<div class="x-alert">
								<span>路径：/pages/app_grade/pageDefault/pageDefault?prop=abc_str_05</span>
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
	import ItemList from '@/components/CompItem/ItemList'

	export default {
		components: {
			ItemList
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_grade/app_grade__setting__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_grade/app_grade__setting__edit/save')
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
				this.$refs['item_list_00'].funcInit(this.form.abc_str_00)
				// this.$refs['test'].funcInit(this.form.abc_str_01)
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.abc_str_01 = this.g_page.funcImgArrToStr(data.abc_str_01_imgs)
				data.abc_str_02 = this.g_page.funcImgArrToStr(data.abc_str_02_imgs)
				data.abc_str_03 = this.g_page.funcImgArrToStr(data.abc_str_03_imgs)
				data.abc_str_04 = this.g_page.funcImgArrToStr(data.abc_str_04_imgs)
				data.abc_str_05 = this.g_page.funcImgArrToStr(data.abc_str_05_imgs)

				return data
			}
		}
	}
</script>
