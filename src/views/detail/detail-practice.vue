<template>
  <div class="detail">
    <van-tabs v-model:active="active" scrollspy sticky>
      <van-tab v-for="list in componentsMap" :title="list.name" :key="list.key">
        <component
          :is="list.component"
          v-bind="getBindValue(list.key)"
        ></component>
        <!-- <DetailSwipe
          :swipe-data="mainPart.topModule.housePicture.housePics"
        ></DetailSwipe>
        <DetailSwipe
          v-bind="{ swipeData: mainPart.topModule.housePicture.housePics }"
        ></DetailSwipe> -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { getDetailInfos } from "@/services";
import { useRoute, useRouter } from "vue-router";

import DetailSwipe from "./cpns/detail-01-swipe.vue";
import DetailInfos from "./cpns/detail-02-infos.vue";
import DetailFacility from "./cpns/detail-03-facility.vue";
import DetailLandlord from "./cpns/detail-04-landlord.vue";
import DetailComment from "./cpns/detail-05-comment.vue";
import DetailNotice from "./cpns/detail-06-notice.vue";
import DetailMap from "./cpns/detail-07-map.vue";
import DetailIntro from "./cpns/detail-08-intro.vue";

const route = useRoute();
// const router = useRouter();
// console.log(route.params.id);
const houseId = route.params.id;
const active = ref(0);
// 发送网络请求, 获取房屋详情的数据.mainPart
const detailInfos = ref({});
// mainPart 代表房屋详情的数据
const mainPart = computed(() => {
  return detailInfos.value.mainPart;
});
console.log(mainPart);

const componentsMap = [
  { name: "", component: DetailSwipe, key: "swipeData" },
  { name: "描述", component: DetailInfos, key: "topInfos" },
  { name: "设施", component: DetailFacility, key: "houseFacility" },
  { name: "房东", component: DetailLandlord, key: "landlord" },
  { name: "评论", component: DetailComment, key: "comment" },
  { name: "须知", component: DetailNotice, key: "orderRules" },
  { name: "地图", component: DetailMap, key: "position" },
  { name: "说明", component: DetailIntro, key: "priceIntro" },
];

const getBindValue = (key) => {
  const obj = {};
  if (key === "swipeData") {
    obj[key] = mainPart.value?.topModule.housePicture.housePics;
  } else if (key === "topInfos") {
    obj[key] = mainPart.value?.topModule;
  } else if (key === "houseFacility") {
    obj[key] = mainPart.value?.dynamicModule.facilityModule.houseFacility;
  } else if (key === "landlord") {
    obj[key] = mainPart.value?.dynamicModule.landlordModule;
  } else if (key === "comment") {
    obj[key] = mainPart.value?.dynamicModule.commentModule;
  } else if (key === "orderRules") {
    obj[key] = mainPart.value?.dynamicModule.rulesModule.orderRules;
  } else if (key === "position") {
    obj[key] = mainPart.value?.dynamicModule.positionModule;
  } else if (key === "priceIntro") {
    obj[key] = mainPart.value?.introductionModule;
  }
  return obj;
};

getDetailInfos(houseId).then((res) => {
  detailInfos.value = res.data;
});
</script>

<style lang="less" scoped></style>
