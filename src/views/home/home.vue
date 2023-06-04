<template>
  <!-- 首页 -->
  <div class="home">
    <!-- 首页-导航栏 -->
    <HomeNavBar />
    <!-- 首页-轮播图 -->
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <!-- 首页-搜索模块 -->
    <!-- <HomeSearchBox :hotSuggests="hotSuggests" /> -->
    <HomeSearchBox />
    <!-- 首页-分类列表 -->
    <HomeCategories />
    <!-- 首页-搜索框(当滚动到热门推荐时显示) -->
    <div class="search-bar" v-if="isShowSearchBar">
      <SearchBar />
    </div>
    <!-- 首页-热门推荐 -->
    <HomeContent />
    <!-- <button @click="moreBtnClick">加载更多</button> -->
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import HomeNavBar from "./cpns/home-nav-bar.vue";
import HomeSearchBox from "./cpns/home-search-box.vue";
import HomeCategories from "./cpns/home-categories.vue";
import HomeContent from "./cpns/home-content.vue";
import SearchBar from "@/components/search-bar/search-bar.vue";
import useHomeStore from "@/stores/modules/home.js";
import { onMounted, onUnmounted } from "vue";
// import hyRequest from "@/services/request/index.js";
import useScroll from "@/hooks/useScroll.js";

//发送网络请求 (封装到stores/modules/home.js)
const homeStore = useHomeStore();
homeStore.fetchHotSuggestData();
homeStore.fetchCategoriesData();
// let currentPage = 1;
// homeStore.fetchHouseListDate(currentPage);
homeStore.fetchHouseListDate();

//热门推荐 : 默认加载更多
// const moreBtnClick = () => {
//   console.log("加载更多");
//   //当前页码 currentPage + 1
//   // currentPage++;
//   // homeStore.fetchHouseListDate(currentPage);
//   homeStore.fetchHouseListDate();
// };

// 监听window窗口滚动然后加载更多, 第一种方式
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

//监听window窗口滚动然后加载更多, 第二种方式 -->直接调用回调函数
// useScroll(() => {
//   homeStore.fetchHouseListDate();
// });

//监听window窗口滚动然后加载更多, 第三种方式 -->直接传变量
const { isReachBottom, scrollTop } = useScroll();
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouseListDate().then(() => {
      isReachBottom.value = false;
    });
  }
});

//监听滚动高度, 控制显示搜索框
// const isShowSearchBar = ref(false);
// watch(scrollTop, (newValue) => {
//   isShowSearchBar.value = newValue >= 100;
// });
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360;
});

//1. 热门建议
//热门数据接口: http://123.207.32.32:1888/api/home/hotSuggests
// const hotSuggests = ref([]);
// hyRequest
//   .get({
//     url: "/home/hotSuggests",
//   })
//   .then((res) => {
//     console.log(res);
//     hotSuggests.value = res.data;
//   });

//2. 热门推荐
//热门数据接口: http://123.207.32.32:1888/api/home/categories
// const categories = ref([]);
// hyRequest
//   .get({
//     url: "/home/categories",
//   })
//   .then((res) => {
//     console.log(res);
//     categories.value = res.data;
//   });
</script>

<style lang="less" scoped>
.home {
  .banner {
    img {
      width: 100%;
    }
  }
}
</style>
