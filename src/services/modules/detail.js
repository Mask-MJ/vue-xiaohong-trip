import hyRequest from '../request'

//定义请求houseDetail数据的方法
export function getDetailInfos(houseId) {
  return hyRequest.get({
    url: '/detail/infos',
    params: { houseId }
  })
}