<template>
	<el-container>
		<el-header class='x-header'>
			<b class="title">{{ page_info.title }}</b>
			<el-button v-if="$route.query.callback_url" size="mini" icon="el-icon-back" @click="funcBack">
				返回
			</el-button>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="funcAddDir">
				创建目录
			</el-button>
			<el-button size="mini" type="success" icon="el-icon-edit" @click="funcAddDialog">
				添加文件
			</el-button>
			<el-button size="mini" type="danger" icon="el-icon-delete" @click="funcDel()">删除</el-button>
			<el-button size="mini" icon="el-icon-refresh" @click="g_page.funcReload()">刷新</el-button>
		</el-header>
		<el-main class='x-main'>
			<el-form :inline="true" :model="form_q" size="mini" v-show="false">
				<input type="hidden" v-model="form_q.dir"/>
				<el-form-item label="名称">
					<el-input name="compKw" v-model="form_q.compKw" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="g_page.funcSearch">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="table-wrap">
				<el-table stripe ref="multipleTable" tooltip-effect="dark" @selection-change="g_page.funcTableSelectionChange"
						  :data="list_data">
					<el-table-column type="selection"></el-table-column>
					<el-table-column label="名称">
						<template slot-scope="data">
							<div v-html="data.row.filename"></div>
						</template>
					</el-table-column>
					<el-table-column label="类型">
						<template slot-scope="data">
							<div v-if="data.row.type!='目录'">{{ data.row.type }}</div>
							<b style="color:green;" v-if="data.row.type=='目录'">{{ data.row.type }}</b>
						</template>
					</el-table-column>
					<el-table-column label="访问链接">
						<template slot-scope="data">
							<div v-if="data.row.type!='目录'">
								<a target="_blank" :href="data.row.file_url">
									访问链接
								</a>
								<CompImg v-if="data.row.type=='图片'" :img_root="page_info.static_file_root"
										 :show_size="true"
										 :img_val="data.row.file_url">
								</CompImg>
							</div>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="data">
							<el-button v-if="data.row.do_edit" type="text" @click="funcRedirect(`file__edit?dir=${form_q.dir}&filename=${data.row.filename}`)">
								编辑
							</el-button>
							<el-button v-if="data.row.is_dir" type="text" @click="funcRedirect(`file__list?dir=${form_q.dir}${data.row.filename}/`)">
								进入
							</el-button>
							<el-button type="text" @click="funcRename(data.row)">
								重命名
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-main>
		<!---->
		<!---->
		<!-- 分页 -->
		<el-footer v-if="page_show">
			<el-pagination class="paging" background layout="total, prev, pager, next, jumper"
						   @current-change="g_page.funcPageChange"
						   :current-page="page_index" :page-size="page_size" :total="page_total">
			</el-pagination>
		</el-footer>
		<!---->
		<!---->
		<!-- 弹框 -->
		<el-dialog title="添加文件" :visible.sync="form_dialog_visible" width="70%">
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-form-item label="目录">
					{{ form.dir }}
				</el-form-item>
				<el-form-item label="文件名">
					<el-upload
						ref="upload"
						:file-list="list_file"
						class="upload-demo"
						:limit="10"
						drag
						name="file0"
						:action="`${BASE_API}/xadmin/file/file__list/upload_file`"
						:data="form"
						:auto-upload="false"
						:on-success="funcAddSuccess"
						:before-upload="funcAddBefore"
						:accept="form_q.ext_accept"
						multiple>
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						<div class="el-upload__tip" slot="tip">只能上传{{ form_q.ext }}文件</div>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="funcAddDialogCancel" size="mini">取消</el-button>
				<el-button type="success" @click="funcAdd" size="mini">保存</el-button>
			</div>
		</el-dialog>
		<!---->
		<!---->
		<!---->
	</el-container>
</template>


<script>
	import {
		MessageBox
	} from 'element-ui'

	export default {
		data() {
			let page_data = {
				BASE_API: BASE_API,
				super_uid: '',
				list_file: []
			}
			page_data = this.g_cc.funcGetInitData(page_data)
			return page_data
		},
		mounted() {
			console.log('mounted')
			//
			this.g_page.funcSetVue(this)
			// 应用ID
			this.g_page.funcSetApiUrlList('/xadmin/file/file__list')
			this.g_page.funcSetApiUrlDel('/xadmin/file/file__list/del')
			//页码
			this.g_page.funcSetPageSize(100)
			//搜索
			this.form_q = {
				'compKw': ''
			}
			if (!this.$route.query.dir) {
				this.$route.query.dir = ''
			}
			//初始化上传文件接口参数
			this.form = {
				token: this.g_cc.func_get_token(),
				dir: this.$route.query.dir
			}
			this.g_page.funcGetList()
		},
		methods: {
			//添加文件
			funcAddDialog() {
				this.form.dir = this.$route.query.dir
				this.form_dialog_visible = true
			},
			funcAddDialogCancel() {
				this.form_dialog_visible = false
				this.g_page.funcGetList()
			},
			//上传前判断
			funcAddBefore(file) {
				//300K
				const file_size_max = 500 * 1024
				if (file.size > file_size_max) {
					this.g_cc.func_alert(`【${file.name}】文件大小不能超过500k`, 'error')
					return false
				}

				return true
			},
			//添加
			funcAdd() {
				this.$refs.upload.submit()
			},
			//添加文件成功
			funcAddSuccess(res, file, fileList) {
				console.log('funcSaveSuccess', file, fileList)
				if (res.errcode == 0) {
					this.g_cc.func_alert(`【${file.name}】文件上传成功`)
				} else {
					var errmsg = `【${file.name}】${res.errmsg}`
					this.g_cc.func_alert(errmsg, 'error')

					this.list_file = []
					for (i = 0; i < fileList.length; i++) {
						let file_ = fileList[i]
						if (file_.uid != file.uid) {
							this.list_file.push(file_)
						}
					}
				}
			},
			//跳转
			funcRedirect(url) {
				console.log('funcRedirect', url)

				let callback_url = this.$route.fullPath
				this.g_cc.func_redirect(url, {
					callback_url: callback_url
				})
				this.g_page.funcGetList()
			},
			//创建目录
			funcAddDir() {
				MessageBox.prompt('目录名称', '创建目录', {
					confirmButtonText: '创建',
					cancelButtonText: '取消'
					// inputValue: row.filename
				}).then(({ value }) => {
					console.log('创建目录，创建')
					let dir_name = value
					if (!dir_name) {
						this.g_cc.func_alert('请输入目录', 'error')
						return
					}
					let page = this
					page.g_cc.func_axios({
						url: '/xadmin/file/file__list/addDir',
						data: {
							dir: page.form_q.dir,
							dir_name: dir_name
						},
						loading: false,
						success: (res) => {
							if (res.data.errcode == 0) {
								page.g_cc.func_alert('成功', 'success', function() {
									page.g_page.funcGetList()
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
			//重命名
			funcRename(row) {
				MessageBox.prompt('', '重命名', {
					confirmButtonText: '修改',
					cancelButtonText: '取消',
					inputValue: row.filename
				}).then(({ value }) => {
					console.log('重命名，确认修改')
					let old_name = row.filename
					let new_name = value
					if (old_name == new_name) {
						console.log('重命名，相同不作修改')
						return
					}
					let page = this
					page.g_cc.func_axios({
						url: '/xadmin/file/file__list/rename',
						data: {
							dir: page.form_q.dir,
							old_name: old_name,
							new_name: new_name
						},
						loading: false,
						success: (res) => {
							if (res.data.errcode == 0) {
								page.g_cc.func_alert('成功', 'success', function() {
									page.g_page.funcGetList()
								})
							} else {
								page.g_cc.func_alert(res.data.errmsg, 'error')
							}
						}//end success
					})
				}).catch(() => {
					console.log('重命名，取消')
				})
			},
			//删除文件
			funcDel() {
				let page = this
				page.g_cc.func_confirm('删除确认吗', function() {
					//
					let data = page.selected_data
					if (data.length <= 0) {
						page.g_cc.func_alert('至少选择一项', 'info')
						return
					}
					let files = data.join(',')
					//
					page.g_cc.func_axios({
						method: 'post',
						url: '/xadmin/file/file__list/del',
						data: {
							dir: page.form_q.dir,
							files: files
						},
						success: (res) => {
							if (res.data.errcode == 0) {
								page.g_cc.func_alert(res.data.errmsg, 'success', function() {
									page.g_page.funcGetList()
								})
							} else {
								page.g_cc.func_alert(res.data.errmsg, 'error')
							}
						}//end success
					})
				}, null, 'error')
			},
			//返回
			funcBack() {
				console.log('funcBack')
				//
				let callback_url = this.$route.query.callback_url
				if (typeof (callback_url) != 'undefined') {
					this.g_cc.func_redirect(callback_url)
				}
				if (!this.$route.query.dir) {
					this.form_q.dir = ''
				}
				this.g_page.funcGetList()
			}
			////////////////////
		}
	}
</script>
