
const cookies = {
  superadmin: {
    cookie: 'superadmin-cookie'
  },
  admin: {
    cookie: 'admin-cookie'
  },
  client: {
    cookie: 'client-cookie'
  }
}

const users = {
  'superadmin-cookie': {
    role: 'superadmin',
    introduction: 'I am a super administrator',
    avatar: 'http://pic.616pic.com/ys_bnew_img/00/38/53/FxFjPVgKhQ.jpg',
    name: 'Super Admin'
  },
  'admin-cookie': {
    role: 'admin',
    introduction: 'I am an superadmin',
    avatar: 'http://pic.616pic.com/ys_bnew_img/00/38/53/FxFjPVgKhQ.jpg',
    name: 'Normal Admin'
  },
  'client-cookie': {
    role: 'client',
    introduction: 'I am an client',
    avatar: 'http://pic.616pic.com/ys_bnew_img/00/38/53/FxFjPVgKhQ.jpg',
    name: 'Normal Client'
  }
}
const usersDataOne = [
  {
    id: '1',
    username: 'clientone1',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  }
]

const usersData = [
  {
    id: '1',
    username: 'clientone1',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '2',
    username: 'clienttwo2',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '3',
    username: 'clientthree',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '4',
    username: 'clientfour',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '5',
    username: 'clientfour',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '6',
    username: 'clientfour',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '7',
    username: 'clientfour',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '8',
    username: 'clientfour',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '9',
    username: 'clientfour',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '10',
    username: 'clientfour',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '11',
    username: 'clientfour',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '12',
    username: 'clientfour',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '13',
    username: 'clientfour',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '14',
    username: 'clientfour',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '15',
    username: 'clientfour',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '16',
    username: 'clientfour',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '17',
    username: 'clientfour',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '18',
    username: 'clientfour',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  },
  {
    id: '19',
    username: 'clientfour',
    role: 'client',
    email: '123@qq.com',
    mobile: 15553655635
  }
]

module.exports = [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const cookie = cookies[username]

      // mock error
      if (!cookie) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: cookie
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      // console.log(config)
      // const { cookie } = config.query
      const cookie = 'admin-cookie'
      const info = users[cookie]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },
  // 查询用户数据列表
  {
    url: '/user/all',
    type: 'get',
    response: config => {
      const info = usersData
      return {
        code: 20000,
        data: info
      }
    }
  },
  // 查询指定用户
  {
    url: '/user/[0-9]',
    type: 'get',
    response: config => {
      const info = usersDataOne
      return {
        code: 20000,
        data: info
      }
    }
  },
  // 添加用户
  {
    url: '/user',
    type: 'post',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  // 更新用户
  {
    url: '/user/[0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  // 删除用户
  {
    url: '/user/[0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 200
      }
    }
  },
  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
