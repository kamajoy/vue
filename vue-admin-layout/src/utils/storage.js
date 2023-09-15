import storage from 'good-storage'

/**
 * @description: 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const Local = {
  set(key, val) {
    storage.set(key, val)
  },
  get(key) {
    return storage.get(key)
  },
  remove(key) {
    storage.remove(key)
  },
  clear() {
    storage.clear()
  }
}

/**
 * @description: 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
  set(key, val) {
    storage.session.set(key, val)
  },
  get(key) {
    return storage.session.get(key)
  },
  remove(key) {
    storage.session.remove(key)
  },
  clear() {
    storage.session.clear()
  }
}
