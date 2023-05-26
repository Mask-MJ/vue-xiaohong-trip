//动态加载图片
export const getAssetURL = (image) => {
  //参数一:图片相对路径: ../assets/img/  +  ${image}
  //参数二:当前路径的url
  //返回值

  return new URL(`../assets/img/${image}`, import.meta.url).href
}


