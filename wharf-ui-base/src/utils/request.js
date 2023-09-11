import axios from 'axios'
import appConfig from '~/config/app'
import { ElMessage } from 'element-plus'
import qs from 'qs'

/**
 * 拼接URL.
 */
export function joinURL(path, params, baseUrl = null) {
  let url = baseUrl
  if (!url) {
    url = appConfig.baseUrl
  }
  if (path) {
    if (path[0] == '/') {
      url += path
    } else {
      url += '/' + path
    }
  }
  if (params) {
    url += '?' + qs.stringify(params)
  }
  return url
}

/**
 * 适配axios的fetch函数.
 * @param {Object} config 
 * @returns 
 */
export function requestFetch(config) {
  // 拼接URL
  const url = joinURL(config.url, config.params)

  const req = {
    method: config.method?.toUpperCase() || 'GET',
    headers: config.headers || {},
    mode: 'cors',
    credentials: 'include',
    cache: 'default',
    redirect: 'follow',
    signal: config.signal || null,
  }
  // 设置body
  if (config.data instanceof FormData || config.data instanceof Blob) {
    req.data = config.data
  } else if (config.data) {
    req.data = JSON.stringify(config.data)
    req.headers['Content-Type'] = 'application/json'
  }
  try {
    return fetch(url, req)
  } catch (e) {
    return Promise.reject(e)
  }
}

// 从fetch read数据
export function readFromFetch(response, cb) {
  const decoder = new TextDecoder()
  const reader = response.body.getReader()
  readChunkFromFetch(reader, decoder, cb)
}

function readChunkFromFetch(reader, decoder, cb) {
  reader.read().then(({ value, done }) => {
    const chunk = decoder.decode(value || new Uint8Array, { stream: !done })
    cb(chunk, done)
    if (!done) {
      return readChunkFromFetch(reader, decoder, cb)
    }
  })
}

// create an axios instance
const service = axios.create({
  baseURL: appConfig.baseUrl, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: appConfig.requestTimeout // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

export const interceptRespRaw = (response) => {
  const data = response.data

  if (response.headers['content-disposition']) {
    const tests = /filename=(.*?)(;|$)/.exec(response.headers['content-disposition'])
    if (tests && tests[1]) {
      data.filename = tests[1]
    }
  }

  return data
}

export const interceptRespJson = (response, auto = true) => {
  const res = response.data
  // let res = response.data
  // if (response.data instanceof Blob) {
  //   res = JSON.parse(response.data.text())
  // }

  if (res.errorCode != 0) {
    // 登录
    if (res.errorCode === 401) {
      ElMessage({
        message: '未登录',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('未登录')
    }

    if (auto) {
      ElMessage({
        message: res.errorMsg,
        type: 'error',
        duration: 5 * 1000
      })
  
      return Promise.reject(res.errorMsg || '网络开了点小差，请稍后再试~')
    }
    return Promise.reject({ code: res.errorCode || -1, msg: res.errorMsg || '网络开了点小差，请稍后再试~', data: res.responseData || {} })
  }
  return { code: res.errorCode, msg: res.errorMsg || 'success', data: res.responseData || {} }
}

export const interceptResp = (response) => {
  if (response.headers['content-type'].indexOf('json') === -1) {
    return interceptRespRaw(response)
  }

  return interceptRespJson(response)
}

export const interceptRespError = (error) => {
  if (error.response) {
    if (error.response.data && error.response.data.errorMsg) {
      console.error(error.response)
      error.message = error.response.data.errorMsg
    }
    // 登录
    if (error.response.status === 401) {
      ElMessage({
        message: '未登录',
        type: 'error',
        duration: 5 * 1000
      })
      return
    }
  }

  // 取消请求的error不弹异常信息
  if (!(error instanceof axios.CanceledError)) {
    ElMessage({
      message: error.message || '网络开了点小差，请稍后再试~',
      type: 'error',
      duration: 5 * 1000
    })
  }
  
  return Promise.reject(error)
}

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    return response
  },
  error => {
    return interceptRespError(error)
  }
)

export default service
