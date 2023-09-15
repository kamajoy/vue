import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })

  return {
    "code": 0,
    "message": "登录成功",
    "token": "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImZlMzMxODIxLTIxNTItNDBlZS04MmQ4LWE1ZWU1YjhiZTUxOSJ9.efbC-fXWTRgmepDZ8W6POnezwKC1eXDSHTaROvn234igayTwVRE-8UaZ34spVR9oOJCaiT-n4aH54Gm8alwA7Q"
  }
}

// 获取用户信息
export const getUserInfo = () => {
  /*return request({
    url: '/getUserInfo',
    method: 'GET'
  })*/

  return {
    "code": 0,
    "message": "获取成功",
    "permissions": [
      "sys:user:add",
      "sys:user:update",
      "sys:user:delete",
      "sys:role:add",
      "sys:role:update",
      "sys:role:delete"
    ],
    "user": {
      "userId": 1,
      "username": "admin"
    }
  }
}
