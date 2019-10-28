import axios from 'axios'
import {
  Loading
} from 'element-ui';

import Cookies from 'js-cookie'
import common from '@/utils/common'


// 创建axios实例
let service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 1500,
  transformRequest: [
    // function (data)
    // {
    //   // 将数据转换为表单数据
    //   let f = new FormData();
    //   for (let k in data)
    //   {
    //     f.append(k, data[k]);
    //   }
    //
    //   return f;
    // }
  ],
})

let loading //定义loading变量

// request拦截器
service.interceptors.request.use(
  request =>
  {
    console.log('loading-show')
    //
    loading = Loading.service({
      lock: true,
      text: '加载中',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    //
    request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    //
    if (typeof (request.url) == "undefined")
    {
      console.error('url is undefined');
      return;
    }
    //
    if (typeof (request.method) == "undefined")
    {
      request.method = 'get';
    }
    //
    request.responseType = "json";
    //
    if (typeof (request.data) == "undefined")
    {
      request.data = {};
    }
    // token
    let token = common.func_get_token()
    if (token)
    {
      request.data['token'] = token
    }
    //
    if (typeof (request.data.__d) == "undefined")
    {
      request.data.__d = (new Date()).valueOf();
    }
    //
    if (request.method.toLowerCase() == 'get')
    {
      request.params = request.data;
    }
    //
    // console.log(request)
    //
    return request
  },
  error =>
  {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response =>
  {
    console.log('response')

    console.log('loading-close')
    loading.close()

    return Promise.resolve(response)
  },
  error =>
  {
    console.log('response.error')
    console.log(error)
    //
    loading.close()

    return Promise.reject(error)
  }
)

export default service
