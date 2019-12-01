class Page
{
  constructor()
  {
    //绑定方法this为page对象
    this.funcEdit = this.funcEdit.bind(this);
    this.funcShowDialog = this.funcShowDialog.bind(this);
    this.funcSearch = this.funcSearch.bind(this);
    this.funcGetList = this.funcGetList.bind(this);

    this.funcBack = this.funcBack.bind(this);
    this.funcDel = this.funcDel.bind(this);
    this.funcExport = this.funcExport.bind(this);
    this.funcSave = this.funcSave.bind(this);

    this.funcTableSelectionChange = this.funcTableSelectionChange.bind(this);
    this.funcPageChange = this.funcPageChange.bind(this);
    this.funcIsAdminAdd = this.funcIsAdminAdd.bind(this);
    this.funcUpdateImg = this.funcUpdateImg.bind(this);
    this.funcUpdateImgBefore = this.funcUpdateImgBefore.bind(this);
    this.funcRedirectAppEdit = this.funcRedirectAppEdit.bind(this);
  }

  funcTest()
  {
    console.log('funcTest');
    console.log(this);
    console.log(this.g_vue);
  }

  /**
   * common类
   */
  get g_cc()
  {
    return this.g_vue.g_cc;
  }

  /**
   * 初始化
   * @param v vue对象
   */
  funcSetVue(v)
  {
    console.log('funcInit');
    this.g_vue = v;
    //将对象保存到vuex
    this.g_vue.g_cc.func_set_vue(v);
    //重置某些数据
    this.api_func__edit = '';
    this.api_func__list = '';
    this.api_func__save = '';
    this.api_func__del = '';
  }

  funcSetApiUrlList(url)
  {
    this.api_func__list = url;
  }

  funcSetApiUrlSave(url)
  {
    this.api_func__save = url;
  }

  funcSetApiUrlEdit(url)
  {
    this.api_func__edit = url;
  }

  funcSetApiUrlDel(url)
  {
    this.api_func__del = url;
  }


  /**
   * 设置当前页
   * @param int page_size
   */
  funcSetPageIndex(page_index)
  {
    this.g_vue.page_index = page_index;
  }

  /**
   * 获取页码
   * @returns {int}
   */
  funcGetPageIndex()
  {
    console.log('funcGetPageIndex');
    let page_index = 1;
    if (this.g_vue.page_index)
    {
      page_index = this.g_vue.page_index;
    }

    return page_index;
  }

  /**
   * 设置页码
   * @param int page_size
   */
  funcSetPageSize(page_size)
  {
    this.g_vue.page_size = page_size;
  }

  /**
   * 获取页码
   * @returns {int}
   */
  funcGetPageSize()
  {
    let page_size = 10; //初始化
    if (this.g_vue.page_size)
    {
      page_size = this.g_vue.page_size;
    }

    return page_size;
  }

  /**
   * 搜索
   */
  funcSearch()
  {
    this.funcSetPageIndex(1);

    this.funcGetList();
  }

  /**
   * 列表
   */
  funcGetList()
  {
    if (!this.api_func__list)
    {
      const errmsg = '请设置list请求url，提示：funcSetApiUrlList()';
      console.error(errmsg);
      // this.g_cc.func_alert(errmsg, 'error');
      return;
    }

    let query_data = this.g_vue.form_q;
    //
    query_data.page_index = this.funcGetPageIndex();
    query_data.page_size = this.funcGetPageSize();
    //
    let p = this;
    p.g_vue.g_cc.func_axios({
      url: this.api_func__list,
      data: query_data,
      success: function (res)
      {
        p.funcGetListCommon__success(res)
        //
      }
    })
  }

  /**
   * 列表-成功
   * @param res
   */
  funcGetListCommon__success(res)
  {
    let g_vue = this.g_vue;
    if (res.data.errcode == 0)
    {
      g_vue.page_info = res.return_data['page_info'];
      g_vue.list_data = res.return_data['list'];
      g_vue.page_total = res.return_data['count']
      console.log('list_data', g_vue.list_data);

      if (typeof (g_vue.funcGetListCommonSuccessAfter) != "undefined")
      {
        g_vue.funcGetListCommonSuccessAfter(res);
      }
    }
    else
    {
      g_vue.g_cc.func_alert(res.data.errmsg, 'error')
    }
  }


  /**
   * 选择复选框事件
   * @param vals
   */
  funcTableSelectionChange(vals)
  {
    console.log('funcTableSelectionChange');
    //
    this.g_vue.selected_data = [];
    for (var key in vals)
    {
      let val = vals[key];
      this.g_vue.selected_data.push(val.id);
    }

    console.log(this.g_vue.selected_data);
  }

  /**
   * 点击页码事件
   * @param page_index
   */
  funcPageChange(page_index)
  {
    console.log('funcPageChange');
    console.log(page_index);
    //
    this.funcSetPageIndex(page_index);
    this.funcGetList()
  }


  /**
   * 添加操作
   * @returns {boolean}
   */
  funcIsAdminAdd()
  {
    if (!this.g_vue)
    {
      return false;
    }

    if (this.g_vue.$route.query.id)
    {
      return false;
    }

    return this.g_vue.form_dialog_index == -1
  }

  /**
   * 显示编辑弹框
   * @param row
   */
  funcEdit(row)
  {
    console.log('funcEdit');
    // console.log(row);
    //
    //
    this.g_vue.form_dialog_index = -1; //-1表示添加，非-1编辑
    this.g_vue.form = {};
    if (row)
    {
      //记录坐标
      this.g_vue.form_dialog_index = this.g_vue.list_data.indexOf(row);
    }
    console.log('坐标=' + this.g_vue.form_dialog_index);
    console.log(this.funcIsAdminAdd());
    //
    if (!this.api_func__edit)
    {
      this.funcShowDialog(row);
    }
    else
    {
      if (!this.funcIsAdminAdd())
      {
        if (!row.id)
        {
          console.error('id is null');
        }
      }
      let data = {};
      data = Object.assign(row, data);
      //
      let page = this;
      this.g_cc.func_axios({
        url: this.api_func__edit,
        data: data,
        success: function (res)
        {
          row = {};
          row = Object.assign(row, res.return_data);
          page.g_vue.page_info = res.return_data['page_info'];
          console.log('funcEdit:success', row);
          page.funcShowDialog(row);
        }
      })
    }
    //
  }

  funcShowDialog(row)
  {
    console.log('funcShowDialog');
    console.log(row);
    //
    let g_vue = this.g_vue;
    //复制对象
    this.g_vue.form = Object.assign({}, row);
    if (g_vue.$refs.form)
    {
      g_vue.$refs.form.clearValidate();
    }
    //
    //显示加工方法
    if (typeof (g_vue.funcShowDialogAfter) != "undefined")
    {
      g_vue.funcShowDialogAfter();
    }
    //
    g_vue.form_dialog_visible = true;
    //
  }


  /**
   * 保存之前，前端验证
   */
  funcSave()
  {
    console.log('funcSave');
    if (!this.api_func__save)
    {
      const errmsg = '请设置save请求url，提示：funcSetApiUrlSave()';
      console.error(errmsg);
      this.g_cc.func_alert(errmsg, 'error');
      return;
    }
    //
    let page = this;
    page.g_vue.$refs['form'].validate((valid) =>
    {
      if (valid)
      {
        page.__funcSave();
      }
      else
      {
        console.log('error submit!!');
        return false;
      }
    });
    //
  }

  /**
   * 保存
   * @private
   */
  __funcSave()
  {
    //
    let g_vue = this.g_vue;
    let page = this;
    //
    let data = Object.assign({}, g_vue.form);
    if (typeof (g_vue.funcSaveBefore) != "undefined")
    {
      //g_vue.pp.form_dialog
      data = g_vue.funcSaveBefore(data);
      console.log(data);
    }
    //
    g_vue.g_cc.func_axios({
      method: 'post',
      url: this.api_func__save,
      data: data,
      success: function (res)
      {
        if (typeof (g_vue.funcSave__success) != "undefined")
        {
          g_vue.funcSave__success(res);
        }
        else
        {
          page.funcSave__success(res);
        }
      }
    })
  }

  /**
   * 保存-成功
   * @param res
   */
  funcSave__success(res)
  {
    let page = this;
    let g_vue = page.g_vue;
    //
    if (res.errcode == 0)
    {
      let errmsg = '保存成功';
      if (res.errmsg)
      {
        errmsg = res.errmsg;
      }

      g_vue.g_cc.func_alert(errmsg, 'success', function ()
      {
        if (g_vue.checked)
        {
          console.log('保存后停留');
          return;
        }
        //走back逻辑
        page.funcBack();

        //更新列表信息
        page.funcGetList();
      });
    }
    else
    {
      g_vue.g_cc.func_alert(res.data.errmsg, 'error')
    }
  }

  /**
   * 删除
   * @param api_url *api链接
   */
  funcDel()
  {
    if (!this.api_func__del)
    {
      const errmsg = '请设置del请求url，提示：funcSetApiUrlDel';
      console.error(errmsg);
      this.g_cc.func_alert(errmsg, 'error');
      return;
    }

    let page = this;
    let g_vue = page.g_vue;
    g_vue.g_cc.func_confirm('删除确认吗', function ()
    {
      //
      let data = g_vue.selected_data;
      if (data.length <= 0)
      {
        g_vue.g_cc.func_alert('至少选择一项', 'info');
        return;
      }
      let ids = data.join(',');
      console.log(ids);
      //
      g_vue.g_cc.func_axios({
        method: 'post',
        url: page.api_func__del,
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
              g_vue.g_cc.func_alert('成功', 'success', function ()
              {
                page.funcGetList();
              });
            }
            else
            {
              g_vue.g_cc.func_alert(res.data.errmsg, 'error');
            }
          }//end if
        }//end success
      })
    }, null, 'error');
  }

  /**
   * 返回
   */
  funcBack()
  {
    console.log('funcBack');
    //
    if (typeof (this.g_vue.funcBack) != "undefined")
    {
      this.g_vue.funcBack();
    }
    else
    {
      this.g_vue.form_dialog_visible = false
    }
  }

  funcExport(api_url)
  {
    console.log('funcExport');
    //
    let query = '';
    let data = Object.assign({}, this.g_vue.form_q);
    for (let key in data)
    {
      let val = data[key];
      query += `&${key}=${val}`;
    }
    //
    let url = process.env.BASE_API + `${api_url}?__export__=1${query}`;
    console.log(url);
    location.href = url;
  }

  /**
   * 上传图片func，
   * 返回说明，false:不通过；file:通过；
   *
   * @param file
   * @returns {Promise<*>}
   */
  async funcUpdateImgBefore(file)
  {
    console.log('funcUpdateImgBefore');
    console.log(file);
    //
    let max_mb = this.g_cc.oneMB * 2;
    // max_mb = this.g_cc.oneKB * 10;
    if (file.size > max_mb)
    {
      const errmsg = '文件大小不能超过2M';
      console.error(errmsg);
      console.error(`file_size=${file.size}、max=${max_mb}`);
      this.g_cc.func_alert(errmsg, 'error');
      return false;
    }

    return file;
  }

  /**
   * 图片上传
   * @param file
   * @param func
   */
  funcUpdateImg(file, func)
  {
    console.log('funcUpdateImg');
    //
    let page = this;
    page.g_cc.func_axios({
      url: '/a_common/admin/file/uploadImg',
      method: 'post',
      data: {
        file0: file,
      },
      success: function (res)
      {
        console.log('funcUpdateImg:success');
        if (res.errcode == 0)
        {
          console.log(res.return_data.img);
          func(res.return_data.img);
        }
        else
        {
          func(false);
          page.g_cc.func_alert(res.errmsg, 'error');
        }
      },
      error: function (res)
      {
        console.log('funcUpdateImg:error');
        var errmsg = res.message;
        page.g_cc.func_alert(errmsg, 'error');
        //
        func(false);
      }
    });
  }

  /**
   * 获取上传图片控件值，转成保存字符串
   * @param imgs
   * @returns {string}
   */
  funcImgArrToStr(imgs)
  {
    if (imgs.length <= 0)
    {
      return '';
    }

    let str = '';
    imgs.forEach((item, index) =>
    {
      if (str == '')
      {
        str = item.imgId;
      }
      else
      {
        str += `,${item.imgId}`;
      }
    })

    return str;
  }

  /**
   * 跳转到应用配置
   * @param key
   */
  funcRedirectAppEdit(key)
  {
    console.log('funcRedirectAppEdit', this.g_vue.$route.name);
    let data = {
      id: this.g_vue.$route.name,
      callback_url: this.g_vue.$route.path,
    };
    if (typeof (key) != "undefined")
    {
      data.key = key;
    }

    this.g_cc.func_redirect('/app_admin/edit', data);
  }

  ////////////////////
  ////////////////////
  ////////////////////
}

export default Page;
