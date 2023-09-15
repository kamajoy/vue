import request from '@/utils/request'

export const getMenuListAPI = () => {
  /*return request({
    url: '/system/menu/list',
    method: 'GET'
  })*/

  return {
    "code": 0,
    "message": "获取成功",
    "data": [
      {
        "id": 1,
        "parentId": null,
        "menuName": "首页-A",
        "menuType": 2,
        "icon": "icon-guest",
        "menuCode": null,
        "orderNum": 1,
        "path": "home",
        "component": "home/index",
        "createTime": "2022-02-28 14:50:31",
        "isHide": 0,
        "isKeepAlive": 1,
        "isAffix": 1,
        "isLink": ""
      },
      {
        "id": 2,
        "parentId": null,
        "menuName": "系统管理-A",
        "menuType": 1,
        "icon": "system",
        "menuCode": null,
        "orderNum": 1,
        "path": "system",
        "component": "",
        "createTime": "2022-02-28 15:03:54",
        "isHide": 0,
        "isKeepAlive": 1,
        "isAffix": 1,
        "isLink": ""
      },
      {
        "id": 3,
        "parentId": 2,
        "menuName": "用户管理-A1",
        "menuType": 2,
        "icon": "user",
        "menuCode": null,
        "orderNum": 1,
        "path": "user",
        "component": "system/user/index",
        "createTime": "2022-02-28 15:03:54",
        "isHide": 0,
        "isKeepAlive": 1,
        "isAffix": 1,
        "isLink": ""
      },
      {
        "id": 4,
        "parentId": 2,
        "menuName": "角色管理-A2",
        "menuType": 2,
        "icon": "role",
        "menuCode": null,
        "orderNum": 4,
        "path": "role",
        "component": "system/role/index",
        "createTime": "2022-02-28 15:03:54",
        "isHide": 0,
        "isKeepAlive": 1,
        "isAffix": 1,
        "isLink": ""
      },
      {
        "id": 5,
        "parentId": 3,
        "menuName": "添加",
        "menuType": 3,
        "icon": "",
        "menuCode": "system:user:add",
        "orderNum": 4,
        "path": "",
        "component": "",
        "createTime": "2022-02-28 15:03:54",
        "isHide": 0,
        "isKeepAlive": 1,
        "isAffix": 1,
        "isLink": ""
      },
      {
        "id": 6,
        "parentId": 3,
        "menuName": "修改",
        "menuType": 3,
        "icon": "",
        "menuCode": "system:user:update",
        "orderNum": 4,
        "path": "",
        "component": "",
        "createTime": "2022-02-28 15:03:54",
        "isHide": 0,
        "isKeepAlive": 1,
        "isAffix": 1,
        "isLink": ""
      },
      {
        "id": 7,
        "parentId": null,
        "menuName": "闻讯官网",
        "menuType": 2,
        "icon": "role",
        "menuCode": null,
        "orderNum": 4,
        "path": "http://doc.ruoyi.vip/",
        "component": "",
        "createTime": "2022-02-28 15:03:54",
        "isHide": 0,
        "isKeepAlive": 1,
        "isAffix": 1,
        "isLink": "http://doc.ruoyi.vip/"
      }
    ]
  }
}
