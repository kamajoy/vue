export const UUID_REGEX = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$/

/**
 * 角色.
 * 以下 {label: '标签描述', type: '标签类型：info|primary|danger|success|warning', effect: '效果：light|dark|空字符串或者不填'} 可以使用组件 UniversalTag 自动渲染标签.
 */
export const ROLE_VIEWER = 0 // 观察者
export const ROLE_QA = 1 // 测试
export const ROLE_DEV = 3 // 开发
export const ROLE_ADMIN = 5 // 管理员
export const ROLES = {
  [ROLE_VIEWER]: {
    label: '观察者',
    type: 'info',
    effect: 'dark',
  },
  [ROLE_DEV]: {
    label: '开发',
    type: 'primary',
    effect: 'dark',
  },
  [ROLE_QA]: {
    label: '测试',
    type: 'success',
    effect: 'dark',
  },
  [ROLE_ADMIN]: {
    label: '管理员',
    type: '',
    effect: 'dark',
  },
}
