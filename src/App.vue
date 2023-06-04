<template>
  <div class="app">
    <router-view></router-view>

    <!-- 底部的标签栏 -->
    <!--关键点v-if: v-if只有在true时才会展示 ;  v-if在false时会隐藏;
    city的hideTabBar定义为true,代表隐藏tabber;
    route.meta.hideTabBar获取到的是原本定义好的true ->代表隐藏;
    因此route.meta.hideTabBar的值要改为false时才能隐藏tabber;
    所以要取反将route.meta.hideTabBar原本定义好的true改为false-->
    <TabBar v-if="!route.meta.hideTabBar" />
    <!-- <TabBar /> -->
    <Loading />
  </div>
</template>

<script setup>
import TabBar from "@/components/tab-bar/tab-bar.vue";
import { useRoute } from "vue-router";
import Loading from "@/components/loading/loading.vue";

//useRouter() 用于获取当前活跃的路由对象
const route = useRoute();
// v-if="(这里面的东西为true的时候才会展示)"
// !route.meta.hideTabBar == true 展示 -> route.meta.hideTabBar == false 展示
// !route.meta.hideTabBar == false 隐藏 -> route.meta.hideTabBar == true 隐藏
// console.log(route.meta.hideTabBar);
</script>

<style scoped></style>
