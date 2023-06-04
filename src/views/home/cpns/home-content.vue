<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="(item, index) in houseList" :key="item.data.houseId">
        <!-- <h3>{{ item.data.houseName }}</h3> -->
        <HouseItemV9
          v-if="item.discoveryContentType === 9"
          :item-data="item.data"
          @click="itemClick(item.data)"
        ></HouseItemV9>
        <HouseItemV3
          v-if="item.discoveryContentType === 3"
          :item-data="item.data"
          @click="itemClick(item.data)"
        ></HouseItemV3>
      </template>
    </div>
  </div>
</template>

<script setup>
import HouseItemV9 from "@/components/house-item-v9/house-item-v9.vue";
import HouseItemV3 from "@/components/house-item-v3/house-item-v3.vue";
import useHomeStore from "@/stores/modules/home.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const homeStore = useHomeStore();
const { houseList } = storeToRefs(homeStore);
// console.log(houseList);

// 监听点击房源-->跳转到详情页
const router = useRouter();
const itemClick = (item) => {
  console.log("itemClick:", item.houseId);
  // router.push("/detail/" + item.houseId);
  router.push("/detail-practice/" + item.houseId);
};
</script>

<style lang="less" scoped>
.content {
  padding: 10px 8px;
  .title {
    font-size: 22px;
    padding: 10px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
