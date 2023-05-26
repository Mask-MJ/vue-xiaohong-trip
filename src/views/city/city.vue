<template>
  <div class="city top-page">
    <!-- 1. 搜索框 -->
    <van-search
      v-model="searchValue"
      shape="round"
      placeholder="城市/区域/位置"
      show-action
      clearable
      @cancel="cancelClick"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 1. 搜索框
const searchValue = ref("");
const cancelClick = () => {
  router.back();
};
</script>

<style lang="less" scoped>
// .city {
//   position: relative;
//   z-index: 2; //z-index:2代表比tabber的1大,所以会覆盖tabber
//   height: 100vh; //100vh代表100%的视口高度
//   background-color: #fff;
//   overflow-y: auto; //overflow-y: auto;代表超出部分会出现滚动条
// }
</style>
