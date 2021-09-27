<template>
	<div>
		<el-form-item label="导入文件" prop="txt" ref="txt">
			<upload-excel-component ref="upload" :autoSplit="false" :funcSuccess="funcSuccess" :funcAfterSelect="funcAfterFileSelect"/>
		</el-form-item>
		<el-form-item label="结果">
			已处理数：{{ upload_index }} / 总数： {{ upload_total }}
		</el-form-item>
		<el-form-item label="操作">
			<el-button :disabled="btn_disabled" type="primary" size="mini" @click="funcImport">{{ btn_txt }}</el-button>
			<div class="x-alert">
				<span>speed：{{ upload_step }}</span>
			</div>
		</el-form-item>
	</div>
</template>

<script>
	//导入组件
	import UploadExcelComponent from '@/components/UploadExcel/index.vue'

	export default {
		components: { UploadExcelComponent },
		props: {
			//请求链接
			api_url: {
				type: String
			},
			api_data: {
				type: Object,
				default: null
			},
			//每次上次数量
			upload_step: {
				type: Number,
				default: 200
			},
			//按钮文本
			btn_txt: {
				type: String,
				default: '开始导入'
			},
			//完成事件
			funcDone: Function,
			//开始导入前事件
			funcBeforeImport: Function
		},
		data() {
			return {
				file_name: '',
				upload_index: 0,
				upload_total: 0, //上传总数
				upload_data: [],
				btn_disabled: true
			}
		},
		methods: {
			//导入开始
			funcImport() {
				if (typeof (this.funcBeforeImport) != 'undefined') {
					if (this.funcBeforeImport() != true) {
						return
					}
				}

				this.$refs['upload'].funcUploadFile()
			},
			//选择文件后触发
			funcAfterFileSelect(file_name) {
				console.log('funcAfterFileSelect', file_name)
				this.btn_disabled = false
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
					this.btn_disabled = true
					this.g_cc.func_loading(true)
					this.g_cc.func_alert('上传完成')
					this.funcDone && this.funcDone()
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
				let post_data = {
					upload_data: JSON.stringify(data)
				}
				if (this.api_data != null) {
					post_data = Object.assign(post_data, this.api_data)
				}
				page.g_cc.func_axios({
					method: 'post',
					url: page.api_url,
					loading: false,
					data: post_data,
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
