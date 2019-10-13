import Cookies from 'js-cookie'
import common from '@/utils/common'
import {asyncRouterMap} from '@/router/index';

const oa_user = {
  state: {
    token: null,
    page_vue: null, //页面的vue组件对象
    //用户信息
    page_user: {
      acc: null,
      routes: [],
    },
  },

  mutations: {
    PageUser: (state, page_user) =>
    {
      state.page_user = page_user
    },
    PageVue: (state, page_vue) =>
    {
      state.page_vue = page_vue
    },
    Token: (state) =>
    {
      let token = Cookies.get('token')
      state.token = token
    }
  },
  //
  actions: {
    //获取用户权限
    funcGetPageRole({commit})
    {
      console.log('funcGetPageRole')
      return new Promise((resolve, reject) =>
      {
        //
        common.func_axios({
          url: '/oa/center/init',
          data: {},
          success: function (obj)
          {
            // console.log(obj)
            if (obj.errcode == 0)
            {
              console.log('获取用户权限：成功')
              let apps = obj.return_data.apps;
              const routers = asyncRouterMap.filter(v =>
              {
                if (v.children && v.children.length > 0)
                {
                  // console.log(v.children)
                  v.children = v.children.filter(child =>
                  {
                    console.log(child.name)
                    if (apps[child.name])
                    {
                      return true;
                    }
                    return false;
                  });
                }

                return true;
              });

              let r = routers.concat([
                {
                  path: '*',
                  redirect: '/404',
                  hidden: true
                }
              ]);

              console.log(r);
              let page_user = {
                'acc': obj.return_data.acc,
                'routes': r,
              };
              commit('PageUser', page_user);
              //
              resolve(obj)
            }
            else
            {
              obj.message = obj.data.errmsg
              reject(obj)
            }
          },
          error: function (obj)
          {
            reject(obj)
          }
        })
        //
      })
    },
    //退出登陆
    funcLogout({commit, state})
    {
      console.log('funcLogout')
      //
      common.func_axios({
        url: '/oa/logout',
        data: {},
        success: function (obj)
        {
          let data = {
            token: '',
            OA__acc_name: '',
            OA__acc_role: '',
          }
          //删除cookie
          for (let key in data)
          {
            Cookies.remove(key)
          }
          //
          state.token = null
          commit('PageUser', {})
        }
      })
      //
    },
    //
  }
}

export default oa_user
