import {system} from '@/lib/config';
export default (function (w) {
  const api = (method, url, ops) => {
    let { data, header, responseType, success, error, complete } = ops;
    // 判断当前URL是否包含域名，包含则忽略baseUrl
    url = url.indexOf('://') === -1 ? system.baseUrl + url : url;
    // 设置请求的 header，header 中不能设置 Referer。
    header = Object.assign({
      'content-type': 'application/json; charset=UTF-8',
    }, header ? header : {});
    
    return uni.request({
      method: method,
      url: url,
      // GET情况会自动将json格式化成a=1&b=2类型字符串拼接在url后
      data: data || {},
      header: header,
      // 设置响应的数据类型。合法值：text、arraybuffer
      responseType: responseType ? responseType : "text",
      // 成功回调
      success: (response) => {
        success && success(response);
      },
      // 失败回调
      fail: (err) => {
      	error && error(err)
      },
      // 失败成功都会执行
      complete: (res) => {
        complete && complete(res)
        if (res.statusCode !== 200) {
          w._toast("网络请求失败")
          w._closeLoading() //关闭loading
        }
      }
    });
    
  }
  // 注册http请求
  w._http = {
    get: (url, ops) => api('GET', url, ops),
    post: (url, ops) => api('POST', url, ops),
//     file: (url, ops, method = 'GET') => {
//       opt.responseType = "arraybuffer";
//       return api(method, url, ops);
//     },
  }
})