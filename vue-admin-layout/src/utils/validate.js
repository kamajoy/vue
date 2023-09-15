/**
 * @description: 路径校验
 * @param {string} path
 * @return {boolean}
 */
 export const isExternal = path => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
