<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="导入文件" prop="txt" ref="txt">
							<upload-excel-component ref="upload" :funcSuccess="funcSuccess"/>
						</el-form-item>
						<el-form-item label="结果">
							成功数量：{{ upload_index }} 失败数量： {{ upload_total }}
						</el-form-item>
						<el-form-item v-if="false" label="操作">
							<el-button type="success" size="mini" @click="funcTest">test</el-button>
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
				<el-button v-if="false" type="success" @click="g_page.funcSave" size="mini">保存</el-button>
				<el-checkbox v-if="page_info.is_admin_edit" style="margin-left: 10px;" label="保存后停留" v-model="checked"/>
			</div>
			<!---->
			<!---->
			<!---->
		</el-main>
	</el-container>
</template>

<script>
	import UploadExcelComponent from '@/components/UploadExcel/index.vue'

	export default {
		components: { UploadExcelComponent },
		data() {
			let page_data = {
				errmsg: '',
				upload_step: 1, //每次上次数量
				upload_index: 0,
				upload_total: 0 //上传总数
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
			this.g_page.funcSetApiUrlEdit('/xadmin/media/media__add')
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
			funcTest() {
				console.log('funcTest')
				this.g_cc.func_loading(false, 'aaaa')
				setTimeout(() => {
					console.log('funcTest bbbb')
					// this.g_cc.loading.text = 'bbbb';
					this.g_cc.func_loading(false, 'bbbb')
				}, 2000)
			},
			//excel解析完成
			funcSuccess(res) {
				console.log('funcSuccess', res)
				this.upload_data = res.results
				this.upload_index = 0
				this.upload_total = this.upload_data.length
				this.funcHandleUpdateData()
			},
			//处理需要上传的数据
			funcHandleUpdateData() {
				this.g_cc.func_loading(false, `导入进度：${this.upload_index} / ${this.upload_total}`)
				if (this.upload_data.length <= 0) {
					this.g_cc.func_loading(true)
					this.g_cc.func_alert('上传完成')
					return
				}
				//
				let data_add = [] //请求的数据
				for (let i = 0; i < this.upload_step; i++) {
					//
					if (this.upload_data.length <= 0) {
						break
					}
					let data = this.upload_data.splice(0, 1)[0]
					data_add.push(data)
					this.upload_index++
				}
				console.log('funcHandleUpdateData', this.upload_index, data_add)
				this.funcAdd(data_add)
			},
			//上传数据
			funcAdd(data) {
				let page = this
				page.g_cc.func_axios({
					method: 'post',
					url: '/xadmin/media/media__add/add',
					loading: false,
					data: {
						upload_data: JSON.stringify(data)
					},
					success: (res) => {
						//
						if (res.data.errcode == 0) {
							this.funcHandleUpdateData()
						} else {
							this.g_cc.func_alert(res.data.errmsg, 'error')
						}
					}
					//
				})
			}
			////////////////////////////////
		}
	}
</script>

<style>
</style>
