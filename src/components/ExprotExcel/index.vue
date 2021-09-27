<template>
	<el-button size="mini" type="primary" icon="el-icon-download" @click="funcBtn">
		{{btnTxt}}
	</el-button>
</template>

<script>
	//导出excel组件
	require('file-saver')
	import XLSX from 'xlsx'

	export default {
		props: {
			//按钮显示文本
			btnTxt: {
				type: String,
				default: '导出'
			},
			//请求URL
			api_url: {
				type: String,
				required: true
			},
			//请求参数
			api_data: {
				type: Object,
				default: () => {
					return {
						name: ''
					}
				}
			},
			//导出文件名
			file_name: {
				type: String,
				default: 'data'
			},
			funcBeforeUpload: Function, // eslint-disable-line
			funcSuccess: Function// eslint-disable-line
		},
		data() {
			return {
				ex_data_index: 1,
				ex_data: []
			}
		},
		methods: {
			//点击按钮
			funcBtn() {
				if (!this.api_url) {
					const errmsg = '请设置导出请求url，提示：api_url'
					console.error(errmsg)
					// this.g_cc.func_alert(errmsg, 'error');
					return
				}

				this.g_cc.func_loading(false, '导出：正在生成csv')
				this.ex_data_index = 1
				this.ex_data = []
				this.funcGetData()
			},
			funcGetData() {
				let page = this
				//
				page.api_data.page = page.ex_data_index
				//
				page.g_cc.func_axios({
					url: page.api_url,
					data: page.api_data,
					loading: false,
					success: (res) => {
						//
						if (res.data.errcode == 0) {
							for (let i = 0; i < res.data.list.length; i++) {
								page.ex_data.push(res.data.list[i])
							}

							// funcExport(g_vue.ex_list);
							if (res.data.list.length <= 0) {
								//已完成，进行导出
								console.log(page.ex_data)
								page.funcExport(page.ex_data)
							} else {
								//继续收集数据
								page.ex_data_index++
								page.funcGetData()
							}
						} else {
							this.g_cc.func_loading(true)
							page.g_cc.func_alert(res.data.errmsg, 'error')
						}
					},
					error: (res) => {
						let data = res.response.data
						// debugger
						let getMessage = data.getMessage
						let getLine = data.getLine
						let getFile = data.getFile
						let errmsg = `${getMessage} <br />${getFile}[${getLine}]`
						page.g_cc.func_alert(errmsg, 'error', () => {
							this.g_cc.func_loading(true)
						})
					}
					//
				})
			},
			//根据数据，生成csv文件
			funcExport(data) {
				console.log('funcExport')
				// var data = [
				//     ['姓名', '性别', '年龄', '注册时间'],
				//     ['张三', '男', 18, new Date()],
				//     ['李四', '女', 22, new Date()]
				// ];
				try {
					var sheet = XLSX.utils.aoa_to_sheet(data)

					var sheet_name = 'data'
					var workbook_obj = {
						SheetNames: [sheet_name],
						Sheets: {}
					}
					workbook_obj.Sheets[sheet_name] = sheet

					var workbook = XLSX.write(workbook_obj, {
						bookType: 'csv',
						bookSST: false,
						type: 'binary'
					})
					// console.log(workbook);

					var blob = this.funcWorkBookToBlob(workbook)

					let file_name = `${this.file_name}.csv`
					saveAs(blob, file_name)
				}
				catch (e) {
					console.error(e)
				}

				this.g_cc.func_loading(true)
			},
			funcWorkBookToBlob(s) {
				var buf = new ArrayBuffer(s.length)
				var view = new Uint8Array(buf)
				for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF

				var b = new Blob([buf], { type: 'application/octet-stream' })

				return b
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
