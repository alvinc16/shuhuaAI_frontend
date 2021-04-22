import request from '@/utils/request'

// 登录
export function login(data) {
  // const formdata = new FormData()
  // const username = data.username
  // const password = data.password
  // formdata.append('username', username)
  // formdata.append('password', password)
  const transformRequest = [
    function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substring(0, ret.lastIndexOf('&'))
      return ret
    }
  ]
  return request({
    url: '/login',
    method: 'post',
    transformRequest: transformRequest,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      'username': data.username,
      'password': data.password
    }
  })
}

// 获取用户个人信息
export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
    // params: { cookie }
  })
}

// 退出登陆
export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

// 查询用户数据列表
export function getAllUser() {
  return request({
    url: '/user/all',
    method: 'get'
  })
}

// 查询指定用户
export function getUser(id) {
  return request({
    url: `/user/${id}`,
    method: 'get'
  })
}

// 添加用户
export function addUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

// 更新用户
export function updateUser(data) {
  return request({
    url: `/user/update`,
    method: 'post',
    data
  })
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: `/user/${id}`,
    method: 'delete'
  })
}
