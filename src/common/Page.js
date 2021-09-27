import common from '@/utils/common'

class Page {
	constructor() {
		//绑定方法this为page对象
		this.funcEdit = this.funcEdit.bind(this)
		this.funcShowDialog = this.funcShowDialog.bind(this)
		this.funcSearch = this.funcSearch.bind(this)
		this.funcGetList = this.funcGetList.bind(this)

		this.funcBack = this.funcBack.bind(this)
		this.funcDel = this.funcDel.bind(this)
		this.funcExport = this.funcExport.bind(this)
		this.funcSave = this.funcSave.bind(this)

		this.funcTableSelectionChange = this.funcTableSelectionChange.bind(this)
		this.funcPageChange = this.funcPageChange.bind(this)
		this.funcIsAdminAdd = this.funcIsAdminAdd.bind(this)
		this.funcUpdateImg = this.funcUpdateImg.bind(this)
		this.funcUpdateImgBefore = this.funcUpdateImgBefore.bind(this)
		this.funcRedirectAppEdit = this.funcRedirectAppEdit.bind(this)
	}

	funcTest() {
		console.log('funcTest')
		console.log(this)
		console.log(this.g_vue)
	}

	/**
	 * common类
	 */
	get g_cc() {
		return common
	}

	/**
	 * 初始化
	 * @param v vue对象
	 */
	funcSetVue(v) {
		this.g_vue = v
		this.g_vue.g_vue_key = this.g_vue._uid
		//将对象保存到vuex
		this.g_cc.funcSetVue(v)
		//重置某些数据
		this.api_func__edit = ''
		this.api_func__list = ''
		this.api_func__save = ''
		this.api_func__del = ''
		this.api_func__export = ''
		this.do_search = false //进行搜索
	}

	funcSetApiUrlList(url) {
		this.api_func__list = url
	}

	funcSetApiUrlSave(url) {
		this.api_func__save = url
	}

	funcSetApiUrlEdit(url) {
		this.api_func__edit = url
	}

	funcSetApiUrlDel(url) {
		this.api_func__del = url
	}

	funcSetApiUrlExport(url) {
		this.api_func__export = url
	}

	/**
	 * 设置当前页
	 * @param int page_size
	 */
	funcSetPageIndex(page_index) {
		if (page_index) {
			this.g_vue.page_index = parseInt(page_index)
		}
	}

	/**
	 * 获取页码
	 * @returns {int}
	 */
	funcGetPageIndex() {
		return this.g_vue.page_index
	}

	/**
	 * 设置页码
	 * @param int page_size
	 */
	funcSetPageSize(page_size) {
		this.g_vue.page_size = page_size
		//初始化当前页
		this.g_vue.page_show = false
		this.funcSetPageIndex(this.g_vue.$route.query.page)
		this.g_vue.$nextTick(() => {
			this.g_vue.page_show = true
		})
	}

	/**
	 * 获取页码
	 * @returns {int}
	 */
	funcGetPageSize() {
		let page_size = 10 //初始化
		if (this.g_vue.page_size) {
			page_size = this.g_vue.page_size
		}

		return page_size
	}

	/**
	 * 搜索
	 */
	funcSearch() {
		this.funcSetPageIndex(1)
		this.do_search = true
		this.funcPageChange(1)
	}

	/**
	 * 列表
	 */
	funcGetList() {
		if (!this.api_func__list) {
			const errmsg = '请设置list请求url，提示：funcSetApiUrlList()'
			console.error(errmsg)
			// this.g_cc.func_alert(errmsg, 'error');
			return
		}

		let query_data = {}
		query_data = Object.assign(query_data, this.g_vue.form_q)
		query_data = Object.assign(query_data, this.g_vue.$route.query)
		this.g_vue.form_q = query_data
		//
		query_data.page = this.funcGetPageIndex()
		query_data.page_size = this.funcGetPageSize()
		//
		let page = this
		page.g_cc.func_axios({
			url: this.api_func__list,
			data: query_data,
			success: (res) => {
				page.funcGetListCommon__success(res)
				//
			}
		})
	}

	/**
	 * 列表-成功
	 * @param res
	 */
	funcGetListCommon__success(res) {
		let g_vue = this.g_vue
		if (res.data.errcode == 0) {
			g_vue.page_info = res['page_info']
			g_vue.list_data = res['list']
			g_vue.page_total = res['count']

			// console.log('list_data', g_vue.list_data)

			g_vue.form_q = Object.assign(g_vue.form_q, res['page_form'])
			// console.log('form_q', g_vue.form_q)

			if (typeof (g_vue.funcGetListCommonSuccessAfter) != 'undefined') {
				g_vue.funcGetListCommonSuccessAfter(res)
			} else {
				if (g_vue.list_data.length <= 0) {
					this.g_cc.func_message('数据列表为空', 'info')
				}
			}

		} else {
			this.g_cc.func_alert(res.data.errmsg, 'error')
		}
	}

	/**
	 * 选择复选框事件
	 * @param vals
	 */
	funcTableSelectionChange(vals) {
		console.log('funcTableSelectionChange')
		//
		this.g_vue.selected_data = []
		for (var key in vals) {
			let val = vals[key]
			this.g_vue.selected_data.push(val.id)
		}

		console.log(this.g_vue.selected_data)
	}

	/**
	 * 点击页码事件
	 * @param page_index
	 */
	funcPageChange(page_index) {
		// console.log('funcPageChange')
		//
		let query_data = this.g_vue.$route.query
		//保存查询字段
		for (let key in this.g_vue.form_q) {
			if (key == 'page_size' || key == 'page_index' || key == 'token') continue
			let val = this.g_vue.form_q[key]
			query_data[key] = val
		}

		let url = `${this.g_vue.$route.path}`
		let query = ''
		for (let key in query_data) {
			if (key == 'page') continue //防止重置page参数
			let val = query_data[key]
			if (!val) continue //值为空不保存
			query += `${key}=${val}&`
		}
		//增加页码
		query = `${query}page=${page_index}`
		url = `${url}?${query}`
		// console.log('funcPageChange', url)
		this.funcReload(url)
	}

	/**
	 * 添加操作
	 * @returns {boolean}
	 */
	funcIsAdminAdd() {
		if (!this.g_vue) {
			return false
		}

		if (this.g_vue.$route.query.id) {
			return false
		}

		return this.g_vue.form_dialog_index == -1
	}

	/**
	 * 显示编辑弹框
	 * @param row
	 */
	funcEdit(row) {
		console.log('funcEdit')
		// console.log(row);
		//
		//
		this.g_vue.form_dialog_index = -1 //-1表示添加，非-1编辑
		this.g_vue.form = {}
		if (row) {
			//记录坐标
			this.g_vue.form_dialog_index = this.g_vue.list_data.indexOf(row)
		}
		console.log('坐标=' + this.g_vue.form_dialog_index)
		console.log(this.funcIsAdminAdd())
		//
		if (!this.api_func__edit) {
			this.funcShowDialog(row)
		} else {
			if (!this.funcIsAdminAdd()) {
				if (!row.id) {
					console.error('id is null')
				}
			}
			let data = {}
			data = Object.assign(row, data)
			data = Object.assign(this.g_vue.$route.query, data)
			//
			let page = this
			this.g_cc.func_axios({
				url: this.api_func__edit,
				data: data,
				success: function(res) {
					row = {}
					row = Object.assign(row, res.data)
					page.g_vue.page_info = res['page_info']
					// console.log('funcEdit:success', row)
					page.funcShowDialog(row)
				}
			})
		}
		//
	}

	funcShowDialog(row) {
		console.log('funcShowDialog')
		// console.log(row)
		//
		let g_vue = this.g_vue
		//复制对象
		this.g_vue.form = Object.assign({}, row)
		if (g_vue.$refs.form) {
			g_vue.$refs.form.clearValidate()
		}
		//
		//显示加工方法
		if (typeof (g_vue.funcShowDialogAfter) != 'undefined') {
			g_vue.funcShowDialogAfter()
		}
		//
		g_vue.form_dialog_visible = true
		//
	}

	/**
	 * 保存之前，前端验证
	 */
	funcSave() {
		console.log('funcSave')
		if (!this.api_func__save) {
			const errmsg = '请设置save请求url，提示：funcSetApiUrlSave()'
			console.error(errmsg)
			this.g_cc.func_alert(errmsg, 'error')
			return
		}
		//
		let page = this
		// debugger
		page.g_vue.$refs['form'].validate((valid) => {
			if (valid) {
				page.__funcSave()
			} else {
				console.log('error submit!!')
				return false
			}
		})
		//
	}

	/**
	 * 保存
	 * @private
	 */
	__funcSave() {
		//
		let page = this
		let g_vue = page.g_vue
		//
		let data = Object.assign({}, g_vue.form)
		// debugger
		if (typeof (g_vue.funcSaveBefore) != 'undefined') {
			//g_vue.pp.form_dialog
			data = g_vue.funcSaveBefore(data)
			// console.log(data)
		}
		//
		page.g_cc.func_axios({
			method: 'post',
			url: this.api_func__save,
			data: data,
			g_vue_key: g_vue.g_vue_key,
			success: (res) => {
				if (typeof (g_vue.funcSave__success) != 'undefined') {
					g_vue.funcSave__success(res)
				} else {
					page.funcSave__success(res)
				}
			}
		})
	}

	/**
	 * 保存-成功
	 * @param res
	 */
	funcSave__success(res) {
		let page = this
		let g_vue = page.g_vue
		//
		if (res.errcode == 0) {
			let errmsg = '保存成功'
			if (res.errmsg) {
				errmsg = res.errmsg
			}

			page.g_cc.func_alert(errmsg, 'success', function() {
				if (g_vue.checked) {
					console.log('保存后停留')
					return
				}
				//走back逻辑
				page.funcBack()

				//更新列表信息
				page.funcGetList()
			})
		} else {
			page.g_cc.func_alert(res.data.errmsg, 'error')
		}
	}

	/**
	 * 删除
	 * @param api_url *api链接
	 */
	funcDel(ids) {
		if (!this.api_func__del) {
			const errmsg = '请设置del请求url，提示：funcSetApiUrlDel'
			console.error(errmsg)
			this.g_cc.func_alert(errmsg, 'error')
			return
		}

		let page = this
		let g_vue = page.g_vue
		if (ids) {
			//pass
		} else {
			let data = g_vue.selected_data
			if (data.length <= 0) {
				page.g_cc.func_alert('至少选择一项', 'info')
				return
			}
			ids = data.join(',')
		}

		page.g_cc.func_confirm('删除确认吗', function() {
			//
			console.log(ids)
			//
			page.g_cc.func_axios({
				method: 'post',
				url: page.api_func__del,
				data: {
					ids: ids
				},
				success: function(res) {
					if (typeof (g_vue.funcDel__success) != 'undefined') {
						//优先调用自定义删除成功事件
						g_vue.funcDel__success(res)
					} else {
						//默认删除成功事件
						if (res.data.errcode == 0) {
							page.g_cc.func_alert('成功', 'success', function() {
								page.funcGetList()
							})
						} else {
							page.g_cc.func_alert(res.data.errmsg, 'error')
						}
					}//end if
				}//end success
			})
		}, null, 'error')
	}

	/**
	 * 获取列表勾选所有ID
	 * 并处理成a1,a2,b1,b2
	 *
	 * @returns {string}
	 */
	funcGetIds() {
		let g_vue = this.g_vue
		let data = g_vue.selected_data
		let ids = ''
		if (data) {
			ids = data.join(',')
		}

		return ids
	}

	/**
	 * 返回
	 */
	funcBack() {
		console.log('funcBack')
		//
		let callback_url = this.g_vue.$route.query.callback_url
		if (typeof (callback_url) != 'undefined') {
			this.g_cc.func_redirect(callback_url)
		} else {
			this.g_vue.form_dialog_visible = false
		}
	}

	funcExport() {
		console.log('funcExport')
		if (!this.api_func__export) {
			const errmsg = '请设置exprot请求url，提示：funcSetApiUrlExport()'
			console.error(errmsg)
			this.g_cc.func_alert(errmsg, 'error')
			return
		}
		//
		let page = this
		let g_vue = page.g_vue
		//
		let query_data = {}
		for (var key in this.g_vue.form_q) {
			let val = this.g_vue.form_q[key]
			if (val && val != null) {
				query_data[key] = val
			}
		}
		//
		// debugger
		//
		page.g_cc.func_axios({
			method: 'post',
			url: this.api_func__export,
			data: query_data,
			success: (res) => {
				if (res.errcode == 0) {
					page.g_cc.func_alert('正在进行导出操作，请前往导出列表进行下载', 'success', function() {
						console.log('跳转导出')
						page.g_cc.func_redirect('/export/export__list', {
							callback_url: page.g_vue.$route.fullPath
						})
					})
				} else {
					page.g_cc.func_alert(res.errmsg, 'error')
				}
			}
		})
	}

	/**
	 * 上传图片func，
	 * 返回说明，false:不通过；file:通过；
	 *
	 * @param file
	 * @returns {Promise<*>}
	 */
	async funcUpdateImgBefore(file) {
		console.log('funcUpdateImgBefore')
		console.log(file)
		//
		let max_mb = this.g_cc.oneMB * 2
		// max_mb = this.g_cc.oneKB * 10;
		if (file.size > max_mb) {
			const errmsg = '文件大小不能超过2M'
			console.error(errmsg)
			console.error(`file_size=${file.size}、max=${max_mb}`)
			this.g_cc.func_alert(errmsg, 'error')
			return false
		}

		return file
	}

	/**
	 * 图片上传
	 * @param file
	 * @param func
	 */
	funcUpdateImg(file, func) {
		console.log('funcUpdateImg')
		//
		let page = this
		page.g_cc.func_axios({
			url: '/xadmin/z_common/file/uploadImg',
			method: 'post',
			data: {
				file0: file
			},
			success: function(res) {
				console.log('funcUpdateImg:success')
				if (res.errcode == 0) {
					console.log(res.img)
					func(res.img)
				} else {
					func(false)
					page.g_cc.func_alert(res.errmsg, 'error')
				}
			},
			error: function(res) {
				console.log('funcUpdateImg:error')
				var errmsg = res.message
				page.g_cc.func_alert(errmsg, 'error')
				//
				func(false)
			}
		})
	}

	/**
	 * 获取上传图片控件值，转成保存字符串
	 * @param imgs
	 * @returns {string}
	 */
	funcImgArrToStr(imgs) {
		if (!imgs) {
			return ''
		}
		if (imgs.length <= 0) {
			return ''
		}

		let str = ''
		imgs.forEach((item, index) => {
			if (str == '') {
				str = item.imgId
			} else {
				str += `,${item.imgId}`
			}
		})

		return str
	}

	/**
	 * 跳转到应用配置
	 * @param key
	 */
	funcRedirectAppEdit(app_id, key) {
		console.log('funcRedirectAppEdit', app_id)
		let data = {
			id: app_id,
			callback_url: this.g_vue.$route.fullPath
		}
		if (typeof (key) != 'undefined') {
			data.key = key
		}

		this.g_cc.func_redirect('/app_admin/edit', data)
	}

	/**
	 * 跳编辑页
	 * @param url
	 */
	funcRedirectEdit(url, row, callback_url) {
		let id = ''
		if (row) {
			id = row.id
		}
		if (!callback_url) {
			// callback_url = encodeURIComponent(this.g_vue.$route.fullPath)
			callback_url = this.g_vue.$route.fullPath
		}
		console.log('callback_url', callback_url)
		this.g_cc.func_redirect(url, {
			id: id,
			callback_url: callback_url
		})
	}

	/**
	 * 刷新页面
	 */
	funcReload(redicect_url) {
		if (!redicect_url) {
			redicect_url = this.g_vue.$route.fullPath
		}
		let url = `/302?callback_url=${encodeURIComponent(redicect_url)}`
		console.log('funcReload', url)
		this.g_cc.func_redirect(url)
	}

	////////////////////
	////////////////////
	////////////////////
}

export default Page
