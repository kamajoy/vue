import request from '~/utils/request'

// 用户信息
// export function userProfile() {
//   return request({
//     url: 'user/profile',
//     method: 'get',
//     params: {},
//   })
// }

// 以下为模拟数据
export function userProfile() {
  return new Promise(resolve => {
    resolve({
      "data": {
        "errorCode": 0,
        "errorMsg": "ok",
        "responseData": {
          "uid": "tianpian",
          "name": "行者（田片）",
          "email": "tianpian@soyoung.com",
          "avatar": "https://s1-imfile.feishucdn.com/static-resource/v1/v2_f015f572-cd57-4650-84c2-eaebe5a1fdbg~?image_size=72x72\u0026cut_type=\u0026quality=\u0026format=image\u0026sticker_format=.webp",
          "open_id": "ou_25b0eb4007cc8defa8867a8457aa05a6",
          "role": 9
        }
      }
    })
  })
}
