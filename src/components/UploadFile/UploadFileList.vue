<template>
	<div>
		<div style="margin-bottom: 5px;">
			<el-button v-if="!src_code" type="text" @click="src_code=true">查看源码</el-button>
			<div v-if="src_code">
				值：
				<el-input class="x-input-60" v-model="value" @change="funcListToVal"/>
			</div>
		</div>
		<div class="x-alert">
			文件上传格式<span>{{ accept }}</span>
		</div>
		<div id="list_item" class="thumb-container-x">
			<!---->
			<!---->
			<div v-for="(item, i) in list_data" :key="item.id" class="thumb-item">
				<span class="thumb-item-txt">文件</span>
				<div class="control">
					<i class="el-icon-close del" @click.prevent.stop="funcDelItem(i,item)" title="删除"></i>
					<div class="preview" :title="`查看：${item}`" @click="funcShowItem(i,item)">
						<i class="el-icon-view"></i>
					</div>
				</div>
			</div>
			<!---->
			<!---->
		</div>
		<!---->
		<!---->
		<div v-if="btn_show" class="thumb-item-add" @click="funcEditItem()">
			<i class="el-icon-plus" style="font-size: 3em;"></i>
			<div style="margin-top: 1em;">
				<div>{{btn_txt}}</div>
				<div>文件大小<={{ rules.file_size_max }}MB</div>
			</div>
		</div>
		<!---->
		<!---->
		<!---->
		<input v-show="false" class="thumb-item-add" type="file" ref="input_file" @change="funcHandleChange" :accept="accept"/>
		<!---->
		<!---->
	</div>
</template>

<script>
	import '@/styles/comp.scss'

	export default {
		props: {
			value: {
				// type: Array,
				// default: () => []
			},
			//图片域名
			img_root: {
				type: String
			},
			rules: {
				type: [Object, Function],
				default: () => ({
					file_size_max: 5 //最大上传5M
				})
			},
			btn_txt: {
				type: String,
				default: '上传文件'
			},
			accept: {
				type: String,
				default: '.mp4'
			},
			//是否添加多少个
			max_num: {
				type: Number,
				default: 1
			},
			//保存前，会执行
			funcSaveBefore: {
				type: Function,
				default: undefined
			},
			//保存成功后，会执行
			funcSaveAfter: {
				type: Function,
				default: undefined
			}
		},
		computed: {
			btn_show() {
				let is_pass = false
				if (this.list_data.length < this.max_num) {
					is_pass = true
				}
				return is_pass
			}
		},
		watch: {
			/** 初始化值修改时重新初始化*/
			value(val) {
				this.list_data = []
				if (val && val) {
					this.list_data = val.split(',')
				}
			}
		},
		data() {
			let page_data = {
				src_code: false
			}
			//
			page_data = this.g_cc.funcGetInitData(page_data)
			//
			return page_data
		},
		mounted() {
			console.log('UploadFileList:mounted')
			//
			this.g_page.funcSetVue(this)
			// 应用ID
			// this.g_page.funcSetApiUrlList('/xadmin/prize/prize__set__list')
			// this.g_page.funcSetApiUrlDel('/xadmin/prize/prize__set__list/del')
			//页码
			this.g_page.funcSetPageSize(10)
			//搜索
			this.form_q = {
				// 'pid': this.pid
			}
			//
			this.form_rules = {
				acc_uidX: [
					{
						required: true,
						message: '必填',
						trigger: 'blur'
					}
				]
			}
		},
		created() {
			console.log('FileList:created')
			//添加按钮控制
			// debugger
			//
			// this.$emit('update:value', val)
		},
		methods: {
			funcHandleChange(e) {
				const { files } = e.target
				const file = files[0]
				console.log('funcHandleChange', file)
				if (typeof (file) == 'undefined') {
					return
				}
				//
				let ONE_MB = 1 * 1024 * 1024
				debugger
				let max_mb = ONE_MB * this.rules.file_size_max
				if (file.size > max_mb) {
					this.g_cc.func_alert(`文件大小不能超${this.rules.file_size_max}MB`, 'error')
					return
				}
				//
				let is_pass = true
				if (this.funcSaveBefore) {
					is_pass = this.funcSaveBefore(file)
				}
				if (is_pass) {
					this.funcApi(file)
				}
			},
			funcApi(file) {
				this.g_cc.func_axios({
					method: 'post',
					url: `${BASE_API}/xadmin/z_common/file/uploadFile`,
					data: {
						'file0': file
					},
					success: (res) => {
						//
						if (res.data.errcode == 0) {
							this.list_data.push(res.data.img.id)
							this.funcListToVal()
							//
							if (this.funcSaveAfter) {
								this.funcSaveAfter(res)
							}
						} else {
							this.g_cc.func_alert(res.data.errmsg)
						}
					}
				})
			},
			//子项编辑
			funcEditItem() {
				this.$refs['input_file'].value = null
				this.$refs['input_file'].click()
			},
			//查看
			funcShowItem(index, val) {
				let url = this.g_cc.funcGetImgUrl(val, this.img_root)
				let html = `
<a href="${url}" target="_blank" style="text-align: center;">
<div style="word-wrap: break-word;">${val}</div>
<div style="color:blue;">点击查看</div>
</a>`
				this.$confirm(html, '查看文件', {
					dangerouslyUseHTMLString: true,
					showCancelButton: false,
					showConfirmButton: false,
					showClose: true
				}).catch(() => {

				})
				// window.open(url, '_blank')
			},
			//子项删除
			funcDelItem(index, val) {
				console.log('funcDelItem', index)
				this.list_data.splice(index, 1)
				this.funcListToVal()
			},
			funcListToVal() {
				let val = this.list_data.join(',')
				console.log('funcListToVal', val)
				this.$emit('update:value', val)
			}
			////////////////////
		}
	}
</script>
