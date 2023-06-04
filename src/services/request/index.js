import axios from 'axios'

import { BASE_URL, TIMEOUT } from './config' //引入config.js中的BASE_URL和TIMEOUT

import useMainStore from '@/stores/modules/main' //引入main.js中的useMainStore

const mainStore = useMainStore() //实例化main.js中的useMainStore

class hyRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    // Axios的请求request和响应response拦截器
    //请求拦截器 
    this.instance.interceptors.request.use(config => {
      mainStore.isLoading = true //请求数据时，isLoading为true
      return config
    }, err => {
      return err
    })

    //响应拦截
    this.instance.interceptors.response.use(res => {
      mainStore.isLoading = false //请求数据完成后，isLoading为false
      return res
    }, err => {
      mainStore.isLoading = false //请求数据失败，isLoading为false
      return err
    })
  }

  request(config) {

    // mainStore.isLoading = true //请求数据时，isLoading为true

    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)

        // mainStore.isLoading = false //请求数据完成后，isLoading为false

      }).catch(err => {
        reject(err)

        // mainStore.isLoading = false //请求数据失败，isLoading为false

      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new hyRequest(BASE_URL, TIMEOUT)


