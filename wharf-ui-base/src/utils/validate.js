/**
 * 是否是外链
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 是否是IP
 * @param {String} ip
 * @return {Boolean}
 */
export function isIP (ip) {
  if (!ip) {
    return false
  }

  const re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/

  return re.test(ip)
}

/**
 * 是否是IPv6
 * @param {String} ip
 * @return {Boolean}
 */
export function isIPv6 (ip) {
  if (!ip) {
    return false
  }

  return /^([0-9A-F]{1,4}::?){1,7}([0-9A-F]{1,4})$/i.test(ip)
}

/**
 * 是否是域名
 * @param {String} domain
 * @return {Boolean}
 */
export function isDomain (domain) {
  if (domain === undefined) {
    return false
  }

  const re = /^(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?$/i

  return re.test(domain)
}

/**
 * 是否是URL
 * @param {String} url
 * @return {Boolean}
 */
export function isUrl (url) {
  if (url === undefined) {
    return false
  }

  const re = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i

  return re.test(url)
}