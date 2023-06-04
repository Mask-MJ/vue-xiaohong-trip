<template>
  <div class="categories">
    <template v-for="(item, index) in categories" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl" alt="" />
        <div class="text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
//导入useHomeStore -> homeStore, storeToRefs -> categories
import uesHomeStore from "@/stores/modules/home";
import { storeToRefs } from "pinia";

//使用useHomeStore()获取homeStore
const homeStore = uesHomeStore();
//使用storeToRefs()获取categories
const { categories } = storeToRefs(homeStore);
</script>

<style lang="less" scoped>
.categories {
  display: flex;
  overflow-x: auto;
  height: 80px;
  padding: 0 10px;
  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 70px;
    padding: 10px;

    img {
      width: 32px;
      height: 32px;
      margin-bottom: 3px;
    }
    .text {
      font-size: 12px;
    }
  }
}
</style>
