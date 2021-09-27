class PageBase {
	constructor() {

	}

	/**
	 * 页面通用参数
	 * @returns {{selected_data: [], page_total: number, form_dialog_index: number, form_dialog_visible: boolean, list_data: [], form_rules: {}, form: {compKw: string}, list_query: {}, page_index: number, form_dialog: {compKw: string}, form_rules_422: [], checked: boolean, page_size: number}}
	 */
	get page_data() {
		const data = {
			g_vue_key: 'main',
			g_page: {},
			page_info: {}, //页面信息，如页面标题
			form_q: {
				compKw: ''
			},
			form_dialog_index: 0, //操作项下标，-1表示添加，非-1编辑
			form: {},
			form_dialog_visible: false, //弹框显示隐藏
			form_rules: {}, //
			form_rules_422: [],
			// list_func_name: '',
			list_query: {}, //列表附加搜索条件
			list_data: [],
			selected_data: [], //table checkbox
			page_show: true,
			page_index: 1,
			page_size: 10,
			page_total: 0,
			page_tag: '1',
			checked: false
		}

		return data
	}
}

export default PageBase
