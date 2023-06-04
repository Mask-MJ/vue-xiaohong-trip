import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "underscore";

export default function useScroll(elRef) {
  // 监听window窗口滚动然后加载更多
  // const scrollListenerHandler = () => {
  //   const clientHeight = document.documentElement.clientHeight; //可视区域高度
  //   const scrollTop = document.documentElement.scrollTop; //scrollTop 滚动高度
  //   const scrollHeight = document.documentElement.scrollHeight; //总共可滚动内容高度
  //   // console.log(clientHeight, scrollTop, scrollHeight);
  //   //判断是否滚动到底部
  //   const isBottom = clientHeight + scrollTop >= scrollHeight;
  //   // console.log(isBottom);
  //   if (isBottom) {
  //     // console.log("滚动到底部");
  //     homeStore.fetchHouseListDate();
  //   }
  // };
  // //挂载时监听scroll->window的事件 并 执行scrollListenerHandler->参数为滚动事件
  // onMounted(() => {
  //   window.addEventListener("scroll", scrollListenerHandler);
  // });
  // //卸载时移除scroll->window的事件 并 执行scrollListenerHandler->参数为滚动事件
  // onUnmounted(() => {
  //   window.removeEventListener("scroll", scrollListenerHandler);
  // });

  //第二种方式:传入回调函数reachBottomCallBack
  // const scrollListenerHandler = (reachBottomCallBack) => {
  //   const clientHeight = document.documentElement.clientHeight; //可视区域高度
  //   const scrollTop = document.documentElement.scrollTop; //scrollTop 滚动高度
  //   const scrollHeight = document.documentElement.scrollHeight; //总共可滚动内容高度
  //   // console.log(clientHeight, scrollTop, scrollHeight);
  //   //判断是否滚动到底部
  //   if (clientHeight + scrollTop >= scrollHeight) {
  //     // console.log("滚动到底部");
  //     if (reachBottomCallBack) reachBottomCallBack()
  //   }
  // };
  // //挂载时监听scroll->window的事件 并 执行scrollListenerHandler->参数为滚动事件
  // onMounted(() => {
  //   window.addEventListener("scroll", scrollListenerHandler);
  // });
  // //卸载时移除scroll->window的事件 并 执行scrollListenerHandler->参数为滚动事件
  // onUnmounted(() => {
  //   window.removeEventListener("scroll", scrollListenerHandler);
  // });

  //第三种方式: 传入变量
  // const isReachBottom = ref(false);
  // const clientHeight = ref(0)
  // const scrollTop = ref(0)
  // const scrollHeight = ref(0)

  // //throttle节流函数
  // const scrollListenerHandler = throttle(() => {
  //   clientHeight.value = document.documentElement.clientHeight; //可视区域高度
  //   scrollTop.value = document.documentElement.scrollTop; //scrollTop 滚动高度
  //   scrollHeight.value = document.documentElement.scrollHeight; //总共可滚动内容高度
  //   // console.log(clientHeight, scrollTop, scrollHeight);
  //   //判断是否滚动到底部
  //   if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
  //     // console.log("滚动到底部");
  //     isReachBottom.value = true
  //   }
  // }, 100)

  // //挂载时监听scroll->window的事件 并 执行scrollListenerHandler->参数为滚动事件
  // onMounted(() => {
  //   window.addEventListener("scroll", scrollListenerHandler);
  // });
  // //卸载时移除scroll->window的事件 并 执行scrollListenerHandler->参数为滚动事件
  // onUnmounted(() => {
  //   window.removeEventListener("scroll", scrollListenerHandler);
  // });

  // return { isReachBottom, clientHeight, scrollTop, scrollHeight }


  // 进一步封装 `既能监听 window窗口 的滚动,又能监听 其他元素 的滚动事件` 的useScroll
  // 在第三种方式: 传入变量  的基础上进一步封装
  // 1. elRef: 传入的元素. 如果不传,则默认为window,如果传入,则为传入的元素. 这样就可以监听window窗口的滚动,也可以监听其他元素的滚动
  // 2. 将windeow赋值给el
  let el = window

  // isReachBottom : 是否滚动到底部
  const isReachBottom = ref(false);
  //clientHeight 可视区域高度 scrollTop 滚动高度 scrollHeight 总共可滚动内容高度 
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  //throttle节流函数
  const scrollListenerHandler = throttle(() => {
    // console.log("正在进行滚动~~");
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight; //可视区域高度
      scrollTop.value = document.documentElement.scrollTop; //scrollTop 滚动高度
      scrollHeight.value = document.documentElement.scrollHeight; //总共可滚动内容高度
      // console.log(clientHeight, scrollTop, scrollHeight);
    } else {
      clientHeight.value = el.clientHeight; //可视区域高度
      scrollTop.value = el.scrollTop; //scrollTop 滚动高度
      scrollHeight.value = el.scrollHeight; //总共可滚动内容高度
    }
    //判断是否滚动到底部
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      // console.log("滚动到底部");
      isReachBottom.value = true
    }
  }, 100)

  //挂载时监听scroll->window的事件 并 执行scrollListenerHandler->参数为滚动事件
  onMounted(() => {
    //3. 在挂载后,如果elRef存在,则将elRef.value赋值给el,如果elRef不存在,则将window赋值给el
    if (elRef) { el = elRef.value }
    el.addEventListener("scroll", scrollListenerHandler);
  });
  //卸载时移除scroll->window的事件 并 执行scrollListenerHandler->参数为滚动事件
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler);
  });

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}