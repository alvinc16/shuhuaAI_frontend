import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getCookie } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// 请求拦截器
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.cookie) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getCookie()
      config.headers['Fake-Cookie'] = getCookie()
    }
    console.log('this is 请求拦截器的请求')
    console.log(config)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log('response的内容')
    console.log(response)
    var resTemp = response
    // 把头像写死
    resTemp.data.avatar = 'http://pic.616pic.com/ys_bnew_img/00/38/53/FxFjPVgKhQ.jpg'
    resTemp.data.cookie = 'dontmoveit'
    resTemp.data.name = 'just a name ok?'
    resTemp.data.role = 'admin'
    if (resTemp.data.role) {
      var roles = [resTemp.data.role]
      // console.log(roles)
      // console.log(resTemp.data)
      resTemp.data.roles = roles
    }
    const res = resTemp
    console.log('this is response data')
    // console.log(resHeaders)
    console.log(res)
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
