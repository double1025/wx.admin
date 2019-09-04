import common from '@/utils/common'


//页面通用字段
const page_data = {
  //变量
  data: {
    app_id: '', //当前应用ID
    api_func__list: '',
    api_func__save: '',
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
    // list_func_name: '',
    list_query: {}, //列表附加搜索条件
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
  funcGetList()
  {
    //
    // debugger
    let g_vue = common.func_get_vue()
    //
    let query_data = g_vue.pp.form
    //
    query_data.page_index = g_vue.pp.page_current
    query_data.page_size = g_vue.pp.page_size
    //
    common.func_axios({
      url: g_vue.pp.api_func__list,
      data: query_data,
      success: function (res)
      {
        page_data.funcGetListCommon__success(res)
        //
      }
    })
  },
  funcGetListCommon__success(res)
  {
    let g_vue = common.func_get_vue()
    //
    if (res.data.errcode == 0)
    {
      g_vue.pp.list_data = res.data.return_data['list']
      g_vue.pp.page_total = res.data.return_data['count']
    }
    else
    {
      common.func_alert(res.data.errmsg, 'error')
    }
  },
  /**
   * 选择复选框事件
   * @param val
   */
  funcTableSelectionChange(vals)
  {
    console.log('funcTableSelectionChange');
    //
    // common.func_get_vue().pp.selected_data = val
    common.func_get_vue().pp.selected_data = [];
    for (var key in vals)
    {
      let val = vals[key];
      common.func_get_vue().pp.selected_data.push(val.id);
    }

    console.log(common.func_get_vue().pp.selected_data);
  },
  /**
   * 点击页码事件
   * @param page_index
   */
  funcPageChange(page_index)
  {
    console.log('funcPageChange')
    console.log(page_index)
    //
    common.func_get_vue().pp.page_current = page_index
    common.func_get_vue().p_data.funcGetList()
  },
  /**
   * 添加操作
   * @returns {boolean}
   */
  funcIsAdminAdd()
  {
    return common.func_get_vue().pp.form_dialog_index == -1
  },
  /**
   * 显示编辑弹框
   * @param row
   */
  funcShowDialog(row)
  {
    console.log('funcShowDialog')
    console.log(row)
    //
    let g_vue = common.func_get_vue()
    // console.log(g_vue.$refs.form)
    if (g_vue.$refs.form)
    {
      g_vue.$refs.form.clearValidate()
    }
    //
    g_vue.pp.form_dialog_index = -1; //-1表示添加，非-1编辑
    g_vue.pp.form_dialog = {}
    if (row)
    {
      //记录坐标
      g_vue.pp.form_dialog_index = g_vue.pp.list_data.indexOf(row)
      //复制对象
      g_vue.pp.form_dialog = Object.assign({}, row)
    }
    console.log('坐标=' + g_vue.pp.form_dialog_index)
    //
    //显示加工方法
    if (typeof (g_vue.funcShowDialogAfter) != "undefined")
    {
      //g_vue.pp.form_dialog
      g_vue.funcShowDialogAfter()
    }
    //
    g_vue.pp.form_dialog_visible = true
    //
  },
  //保存
  funcSave()
  {
    console.log('funcSave')
    //
    let g_vue = common.func_get_vue()
    //
    g_vue.$refs['form'].validate((valid) =>
    {
      if (valid)
      {
        page_data.__funcSave()
      }
      else
      {
        console.log('error submit!!');
        return false;
      }
    });
    //
  },
  __funcSave()
  {
    //
    let g_vue = common.func_get_vue()
    //
    let data = Object.assign({}, g_vue.pp.form_dialog)
    if (typeof (g_vue.funcSaveBefore) != "undefined")
    {
      //g_vue.pp.form_dialog
      data = g_vue.funcSaveBefore(data)
      console.log(data)
    }
    //
    common.func_axios({
      method: 'post',
      url: g_vue.pp.api_func__save,
      data: data,
      success: function (res)
      {
        page_data.funcSave__success(res)
      }
    })
  },
  funcSave__success(res)
  {
    let g_vue = common.func_get_vue()
    //
    if (res.data.errcode == 0)
    {
      //更新列表信息
      page_data.funcGetList();
      g_vue.pp.form_dialog_visible = false;
    }
    else
    {
      common.func_alert(res.data.errmsg, 'error')
    }
  },
  /**
   * 删除
   * @param api_url *api链接
   */
  funcDel(api_url)
  {
    common.func_confirm('删除确认吗', function ()
    {
      let g_vue = common.func_get_vue();
      //
      let data = common.func_get_vue().pp.selected_data;
      if (data.length <= 0)
      {
        common.func_alert('至少选择一项', 'info');
        return;
      }
      let ids = data.join(',');
      console.log(ids);
      //
      common.func_axios({
        method: 'post',
        url: api_url,
        data: {
          ids: ids,
        },
        success: function (res)
        {
          if (typeof (g_vue.funcDel__success) != "undefined")
          {
            //优先调用自定义删除成功事件
            g_vue.funcDel__success(res);
          }
          else
          {
            //默认删除成功事件
            if (res.data.errcode == 0)
            {
              common.func_alert('成功', 'success', function ()
              {
                page_data.funcGetList();
              });
            }
            else
            {
              common.func_alert(res.data.errmsg, 'error');
            }
          }
        }
      })
    }, null, 'error');
  },
  //返回
  funcBack()
  {
    console.log('funcBack')
    //
    common.func_get_vue().pp.form_dialog_visible = false
  },
}

export default page_data
