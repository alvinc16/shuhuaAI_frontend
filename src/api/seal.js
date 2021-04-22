import request from '@/utils/request'

// 获取选项值
export function getOption() {
  return request({
    url: '/seal/option',
    method: 'get'
  })
}
// 给后端传输信息
export function sealUpload() {
  return request({
    url: '/seal/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 获取用户个人信息
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

// 退出登陆
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 查询用户数据列表
export function getAllUser(token) {
  return request({
    url: '/user/all',
    method: 'get',
    params: { token }
  })
}

// 查询指定用户
export function getUser(id, token) {
  return request({
    url: `/user/${id}`,
    method: 'get',
    params: { token }
  })
}

// 添加用户
export function addUser(data, token) {
  return request({
    url: '/user',
    method: 'post',
    data,
    params: { token }
  })
}

// 更新用户
export function updateUser(id, data, token) {
  return request({
    url: `/user/${id}`,
    method: 'put',
    data,
    params: { token }
  })
}

// 删除用户
export function deleteUser(id, token) {
  return request({
    url: `/vue-element-admin/user/${id}`,
    method: 'delete',
    params: { token }
  })
}
