import {
  Message,
  MessageBox,
  Loading
} from 'element-ui'
import request from '@/utils/request'

import store from '../store'
import router from '../router'
import de from "element-ui/src/locale/lang/de";


const common = {
  isAndroid: (/android/gi).test(navigator.appVersion),
  isIDevice: (/iphone|ipad/gi).test(navigator.appVersion),
  isPlaybook: (/playbook/gi).test(navigator.appVersion),
  isTouchPad: (/android/gi).test(navigator.appVersion),
  isWX: (/MicroMessenger/gi).test(navigator.appVersion),
  loading: null,
  //func
  func_alert: function (msg, type, func_ok)
  {
    if (typeof (type) == 'undefined')
    {
      type = 'success'
    }

    if (typeof (func_ok) == 'undefined')
    {
      func_ok = function ()
      {
        console.log('ok')
      }
    }
    //
    MessageBox({
      title: '消息',
      message: msg,
      type: type,
      dangerouslyUseHTMLString: true,
      showClose: false,
    }).then(func_ok)
  },
  /**
   * 确认提示框
   * @param msg
   * @param func_ok
   * @param func_cancel
   */
  func_confirm: function (msg, func_ok, func_cancel, type)
  {
    if (typeof (func_ok) == 'undefined')
    {
      func_ok = function ()
      {
        console.log('ok');
      }
    }

    if (typeof (func_canel) == 'undefined')
    {
      func_cancel = function (e)
      {
        console.log('cancel');
        console.log(e);
      }
    }
    if (typeof (type) == 'undefined')
    {
      type = 'warning';
    }

    MessageBox({
      title: '提示',
      message: msg,
      type: type,
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true,
    }).then(func_ok).catch(func_cancel)
  },
  func_loading: function (close)
  {
    if (close)
    {
      if (common.loading != null)
      {
        common.loading.close();
      }
    }
    else
    {
      common.loading = Loading.service({
        lock: true,
        text: '加载中',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    }
  },
  /**
   * 刷新页面
   */
  func_reload()
  {
    location.reload();
  },
  func_test: function ()
  {
    console.log(this)
  },
}

common.isMobile = common.isAndroid || common.isIDevice

//设置页面的vue组件对象
common.func_set_vue = function (page_vue)
{
  store.commit('PageVue', page_vue);
}
//获取页面的vue组件对象
common.func_get_vue = function ()
{
  return store.getters.page_vue
}
//跳转
common.func_redirect = function (path, query)
{
  //
  router.push({
    path: path,
    query: query
  })
}
//获取token
common.func_get_token = function ()
{
  if (store.getters.token)
  {
    //pass
  }
  else
  {
    store.commit('Token')
  }
  //
  return store.getters.token;
}
//axios
common.func_axios = function (axios_data)
{
  //自定义error事件
  if (typeof (axios_data.error) == "undefined")
  {
    axios_data.error = function (data)
    {
      console.log('error');
      console.log(data.response);

      var errmsg = data.message;

      common.func_alert(errmsg, 'error');
    }
  }
  //
  request(axios_data)
    .then(function (res)
    {
      if (typeof (res.data) != "undefined")
      {
        //返回参数优化，如：res.data.errcode 变 res.errcode
        Object.assign(res, res.data);
      }

      axios_data.success(res);
    })
    .catch(function (obj)
    {
      if (obj.response && obj.response.status == 422)
      {
        // 422错误信息处理
        let g_vue = common.func_get_vue()
        //
        g_vue.$refs.form.clearValidate()
        //
        let errs = obj.response.data.return_data.errors
        for (var key in errs)
        {
          // debugger
          let err = errs[key]
          let err_field = key
          //
          let form_rules = g_vue.form_rules[err_field]
          // console.log(form_rules)
          if (form_rules)
          {
            //删除已存在validator规则
            for (var index in form_rules)
            {
              var r = form_rules[index];
              if (r['validator'])
              {
                form_rules.splice(index, 1);
              }
            }
          }
          else
          {
            g_vue.form_rules[err_field] = []
          }
          //
          g_vue.form_rules_422[err_field] = false; //作用：不让错误出现第二次
          //
          // debugger
          g_vue.form_rules[err_field].push({
            validator: function (rule, value, callback)
            {
              if (g_vue.form_rules_422[err_field] == false)
              {
                g_vue.form_rules_422[err_field] = true;
                // debugger
                callback(new Error(err.errmsg));
              }
              else
              {
                callback();
              }
            },
            trigger: 'blur'
          });
          //
          g_vue.$refs.form.validateField(err_field)
        }
        //
        console.log(g_vue.form_rules);
        //
        common.func_alert('提交的数据不正确，请重新输入', 'error');
        //
      }
      else
      {
        axios_data.error(obj);
      }
    });
}
//日期快捷项
common.picker_options = {
  disabledDate(time)
  {
    return time.getTime() > Date.now();
  },
  shortcuts: [{
    text: '今天',
    onClick(picker)
    {
      picker.$emit('pick', new Date());
    }
  }, {
    text: '昨天',
    onClick(picker)
    {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      picker.$emit('pick', date);
    }
  }, {
    text: '一周前',
    onClick(picker)
    {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', date);
    }
  }, {
    text: '30天前',
    onClick(picker)
    {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', date);
    }
  }]
}

export default common
