import common from '@/utils/common'


//页面通用字段
const page_data = {
	//变量
	data: {
		form: {
			compKw: '',
		},
		form_dialog_index: 0, //操作项下标，-1表示添加，非-1编辑
		form_dialog: {
			compKw: '',
		},
		form_dialog_visible: false, //弹框显示隐藏
		form_rules: {}, //
		form_rules_422: [],
		list_func_name: '',
		list_query: {},
		list_data: [],
		selected_data: [], //table checkbox
		page_current: 1,
		page_size: 10,
		page_total: 0,
		checked: false,
	},
	//
	//方法
	//初始化
	funcGetList() {
		//
		// debugger
		let g_vue = common.func_get_vue()
		//
		console.log(g_vue.pp.list_func_name)
		let query_data = g_vue.pp.list_query
		//		
		query_data.page_index = g_vue.pp.page_current
		query_data.page_size = g_vue.pp.page_size
		//
		common.func_axios({
			url: '/x_app_system/account/admin/account__list',
			data: query_data,
			success: function(res) {
				if (res.data.errcode == 0) {
					g_vue.pp.list_data = res.data.data['list']
					g_vue.pp.page_total = res.data.data['count']
				} else {
					common.func_alert(res.data.errmsg)
				}
				//
			}
		})
	},
	//选择复选框事件
	funcTableSelectionChange(val) {
		console.log('funcTableSelectionChange')
		console.log(val)
		//
		common.func_get_vue().pp.selected_data = val
	},
	//点击页码事件
	funcPageChange(page_index) {
		console.log('funcPageChange')
		console.log(page_index)
		//
		this.funcGetList()
	},
	//显示编辑弹框
	funcShowDialog(row) {
		console.log('funcShowDialog.123')
		console.log(row)
		//		
		let g_vue = common.func_get_vue()
		//
		g_vue.pp.form_dialog_index = -1; //-1表示添加，非-1编辑
		g_vue.pp.form_dialog = {}
		if (row) {
			//记录坐标
			g_vue.pp.form_dialog_index = g_vue.pp.list_data.indexOf(row)
			//复制对象
			g_vue.pp.form_dialog = Object.assign({}, row)
		}
		console.log('坐标=' + g_vue.pp.form_dialog_index)
		//
		g_vue.pp.form_dialog_visible = true
	},
	//保存
	funcSave() {
		console.log('funcSave')
		//
		let g_vue = common.func_get_vue()
		//
		console.log(g_vue.pp.form_dialog)
		if (g_vue.pp.form_dialog_index != -1) {
			//edit
			g_vue.pp.list_data.splice(g_vue.pp.form_dialog_index, 1, g_vue.pp.form_dialog)
		} else {
			//add
			g_vue.pp.list_data.unshift(g_vue.pp.form_dialog)
		}
		//
		g_vue.pp.form_dialog_visible = false
	},
	//返回
	funcBack() {
		console.log('funcBack')
		//
		common.func_get_vue().pp.form_dialog_visible = false
	},
}

export default page_data
