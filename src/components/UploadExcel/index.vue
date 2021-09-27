<template>
	<div>
		<input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls, .csv" @change="handleClick">
		<el-button style="width: 200px;" size="mini" type="primary" @click="handleUpload">
			{{btnTxt}}
		</el-button>
		<div v-if="file_name">文件：{{file_name}}</div>
		<div class="x-alert">
			<span>上传文件不能超{{fileSize}}M</span>
		</div>
	</div>
</template>

<script>
	//解析excel组件
	import XLSX from 'xlsx'

	export default {
		props: {
			//按钮显示文本
			btnTxt: {
				type: String,
				default: '选择导入文件'
			},
			//文件大小限制
			fileSize: {
				type: Number,
				default: 1
			},
			//选择文件后是否自动解析文件
			autoSplit: {
				type: Boolean,
				default: true
			},
			funcAfterSelect: Function, // 选择文件之后事件
			funcBeforeUpload: Function, // 上传文件前事件
			funcSuccess: Function// excel解析完成
		},
		data() {
			return {
				file_name: ''
			}
		},
		methods: {
			//点击上传文件按钮
			handleUpload() {
				this.$refs['excel-upload-input'].click()
			},
			handleClick(e) {
				console.log('handleClick')
				this.file_name = ''
				const files = e.target.files
				this.file = files[0] // only use files[0]
				if (!this.file) {
					console.error('file error')
					return
				}
				this.file_name = this.file.name
				if (this.autoSplit) {
					this.funcUploadFile()
				} else {
					this.funcAfterSelect && this.funcAfterSelect(this.file_name)
				}
			},
			funcUploadFile() {
				console.log('funcUploadFile')
				this.$refs['excel-upload-input'].value = null // fix can't select the same excel

				let rawFile = this.file
				if (typeof (rawFile) == 'undefined') {
					this.g_cc.func_alert('请选择导入文件', 'error')
					return
				}
				console.log('funcUploadFile', rawFile)
				let file_size_max = 1024 * 1024 * this.fileSize
				if (rawFile.size > file_size_max) {
					this.g_cc.func_alert(`文件大小不能超过${this.fileSize}M`)
					return true
				}
				if (!this.isExcel(rawFile)) {
					this.g_cc.func_alert('格式错误，只能上传.xlsx, .xls, .csv', 'error')
					return false
				}
				//解析数据之后，判断
				if (this.funcBeforeUpload) {
					const res = this.funcBeforeUpload(rawFile)
					if (res != true) {
						return
					}
				}

				//解析数据
				this.funcSplitFileRun(rawFile)
			},
			funcSplitFileRun(rawFile) {
				this.g_cc.func_loading(false, '文件解析中')
				setTimeout(() => {
					this.funcSplitFile(rawFile)
				}, 1000)
			},
			//解析数据
			funcSplitFile(rawFile) {
				return new Promise((resolve, reject) => {
					const reader = new FileReader()
					reader.onload = e => {
						try {
							const data = e.target.result
							const workbook = XLSX.read(data, { type: 'array' })
							const firstSheetName = workbook.SheetNames[0]
							const worksheet = workbook.Sheets[firstSheetName]
							const results = XLSX.utils.sheet_to_json(worksheet)
							this.g_cc.func_loading(true)
							this.funcSplitFileSuccess({ results })
						}
						catch (e) {
							console.error(e)
							this.g_cc.func_loading(true)
							this.g_cc.func_alert(e, 'error')
						}
						finally {
						}

						resolve()
					}
					reader.readAsArrayBuffer(rawFile)
				})
			},
			//解析数据-成功
			funcSplitFileSuccess(results) {
				this.$refs['excel-upload-input'].value = null
				this.funcSuccess && this.funcSuccess(results)
			},
			isExcel(file) {
				return /\.(xlsx|xls|csv)$/.test(file.name)
			}
		}
	}
</script>

<style scoped>
	.excel-upload-input {
		display: none;
		z-index: -9999;
	}

	.drop {
		border: 2px dashed #bbb;
		width: 600px;
		height: 160px;
		line-height: 160px;
		margin: 0 auto;
		font-size: 24px;
		border-radius: 5px;
		text-align: center;
		color: #bbb;
		position: relative;
	}
</style>
