import request from '@/utils/request'

export const getRouters = () => {
  /*return request({
    url: '/getRouters',
    method: 'GET'
  })*/

  return {
    "code": 0,
    "msg": "获取成功",
    "data": [
      {
        "name": "System",
        "path": "/system",
        "hidden": false,
        "redirect": "noRedirect",
        "component": "Layout",
        "alwaysShow": true,
        "meta": {
          "title": "系统管理",
          "icon": "icon-guest",
          "noCache": false,
          "link": null
        },
        "children": [
          {
            "name": "User",
            "path": "user",
            "hidden": false,
            "component": "system/user/index",
            "meta": {
              "title": "用户管理xxxx",
              "icon": "user",
              "noCache": false,
              "link": null
            }
          },
          {
            "name": "Role",
            "path": "role",
            "hidden": false,
            "component": "system/role/index",
            "meta": {
              "title": "角色管理",
              "icon": "peoples",
              "noCache": false,
              "link": null
            }
          },
          {
            "name": "Menu",
            "path": "menu",
            "hidden": false,
            "component": "system/menu/index",
            "meta": {
              "title": "菜单管理",
              "icon": "tree-table",
              "noCache": false,
              "link": null
            }
          },
          {
            "name": "Dept",
            "path": "dept",
            "hidden": false,
            "component": "system/dept/index",
            "meta": {
              "title": "部门管理",
              "icon": "tree",
              "noCache": false,
              "link": null
            }
          },
          {
            "name": "Log",
            "path": "log",
            "hidden": false,
            "redirect": "noRedirect",
            "component": "ParentView",
            "alwaysShow": true,
            "meta": {
              "title": "日志管理",
              "icon": "log",
              "noCache": false,
              "link": null
            },
            "children": [
              {
                "name": "log",
                "path": "log",
                "hidden": false,
                "component": "system/menu/index",
                "meta": {
                  "title": "操作日志",
                  "icon": "form",
                  "noCache": false,
                  "link": null
                }
              },
              {
                "name": "list",
                "path": "list",
                "hidden": false,
                "component": "system/menu/index",
                "meta": {
                  "title": "登录日志",
                  "icon": "logininfor",
                  "noCache": false,
                  "link": null
                }
              }
            ]
          }
        ]
      },
      {
        "name": "Monitor",
        "path": "/monitor",
        "hidden": false,
        "redirect": "noRedirect",
        "component": "Layout",
        "alwaysShow": true,
        "meta": {
          "title": "系统监控",
          "icon": "icon-guest",
          "noCache": false,
          "link": null
        },
        "children": [
          {
            "name": "Online",
            "path": "online",
            "hidden": false,
            "component": "monitor/online/index",
            "meta": {
              "title": "在线用户",
              "icon": "online",
              "noCache": false,
              "link": null
            }
          },
          {
            "name": "Job",
            "path": "job",
            "hidden": false,
            "component": "monitor/job/index",
            "meta": {
              "title": "定时任务",
              "icon": "job",
              "noCache": false,
              "link": null
            }
          },
          {
            "name": "Druid",
            "path": "druid",
            "hidden": false,
            "component": "monitor/druid/index",
            "meta": {
              "title": "数据监控",
              "icon": "druid",
              "noCache": false,
              "link": null
            }
          },
          {
            "name": "Server",
            "path": "server",
            "hidden": false,
            "component": "monitor/server/index",
            "meta": {
              "title": "服务监控",
              "icon": "server",
              "noCache": false,
              "link": null
            }
          },
          {
            "name": "Cache",
            "path": "cache",
            "hidden": false,
            "component": "monitor/cache/index",
            "meta": {
              "title": "缓存监控",
              "icon": "redis",
              "noCache": false,
              "link": null
            }
          }
        ]
      },
      {
        "name": "Tool",
        "path": "/tool",
        "hidden": false,
        "redirect": "noRedirect",
        "component": "Layout",
        "alwaysShow": true,
        "meta": {
          "title": "系统工具",
          "icon": "icon-employee",
          "noCache": false,
          "link": null
        },
        "children": [
          {
            "name": "Build",
            "path": "build",
            "hidden": false,
            "component": "tool/build/index",
            "meta": {
              "title": "表单构建",
              "icon": "build",
              "noCache": false,
              "link": null
            }
          },
          {
            "name": "Gen",
            "path": "gen",
            "isHide": true,
            "component": "tool/gen/index",
            "meta": {
              "title": "代码生成",
              "icon": "code",
              "noCache": false,
              "link": null
            }
          },
          {
            "name": "Swagger",
            "path": "swagger",
            "isHide": true,
            "component": "tool/swagger/index",
            "meta": {
              "title": "系统接口",
              "icon": "swagger",
              "noCache": false,
              "link": null
            }
          },
          {
            "name": "Echarts",
            "path": "echarts",
            "isHide": false,
            "component": "tools/echarts/index",
            "meta": {
              "title": "Echarts 管理"
            }
          }
        ]
      },
      {
        "path": "/icon",
        "component": "Layout",
        "alwaysShow": false,
        "children": [
          {
            "path": "index",
            "component": "icons/index",
            "name": "Icons",
            "meta": {
              "title": "图标管理",
              "icon": "icon-device1",
              "noCache": true
            }
          }
        ]
      },
      {
        "path": "/map",
        "component": "Layout",
        "alwaysShow": false,
        "children": [
          {
            "path": "index",
            "component": "map/index",
            "name": "Map",
            "meta": {
              "title": "高德地图",
              "icon": "icon-device1",
              "noCache": true
            }
          }
        ]
      },
      {
        "name": "Http://ruoyi.vip",
        "path": "http://ruoyi.vip",
        "hidden": false,
        "component": "Layout",
        "meta": {
          "title": "若依官网",
          "icon": "icon-attendance",
          "noCache": false,
          "link": "http://ruoyi.vip"
        }
      }
    ]
  }
}
