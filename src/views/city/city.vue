<template>
  <div class="city top-page">
    <div class="top">
      <!-- 1. 搜索框 -->
      <van-search
        v-model="searchValue"
        shape="round"
        placeholder="城市/区域/位置"
        show-action
        clearable
        @cancel="cancelClick"
      />
      <!-- 2. tab切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9864">
        <!-- <template v-for="(value, key, index) in allCity" :key="key">
        <van-tab :title="value.title">内容</van-tab>
      </template> -->
        <!-- 使用store里的allCities -->
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <!-- <cityGroup :group-data="currentGroup" /> -->
      <template v-for="(value, key, index) in allCities">
        <!-- <h2 v-show="tabActive === key" :group-data="currentGroup"> {{ value.title }} </h2> -->
        <cityGroup v-show="tabActive === key" :group-data="value" />
      </template>
      <!--抽取到子组件views/city/cpns/city-group.vue中, 并通过import引入和组件挂载来使用, 父子传递数据通过props,通过v-bind绑定数据;
        遍历通过计算属性获取到的城市数据currentGroup,在currentGroup对象中获取cities数据 -->
      <!-- <template v-for="(group, index) in currentGroup?.cities" :key="index">
        <div class="group-item">
          <h2 class="title">标题:{{ group.group }}</h2>
          <div class="list">
            <template v-for="(city, indey) in group.cities" :key="indey">
              <div class="city">{{ city.cityName }}</div>
            </template>
          </div>
        </div>
      </template> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
// import { getCityAll } from "@/services/modules/city";
import { getCityAll } from "@/services";
import useCityStore from "@/stores/modules/city";

import cityGroup from "./cpns/city-group.vue";

const router = useRouter();

// 1. 搜索框
const searchValue = ref("");
const cancelClick = () => {
  router.back();
};

// 2. tab切换
const tabActive = ref();

// 3. 网络请求: 获取城市列表
// const allCity = ref({});
// getCityAll().then((res) => {
//   allCity.value = res.data;
// });
//3. 从pinia的store中获取数据
const cityStore = useCityStore();
cityStore.fetchAllCitiesData();
const { allCities } = storeToRefs(cityStore);

// 4. 获取选中标签后的城市数据:国内 港澳台 / 海外
//获取当前选中的tab标签,将tabs的name属性绑定到tabActive上
//根据key获取allCities中的数据,默认直接获取的数据不是响应式的,所以要用computed计算属性
//计算属性: 当tabActive改变时,会重新计算currentGroup的值
const currentGroup = computed(() => allCities.value[tabActive.value]);
</script>

<style lang="less" scoped>
// .city {
//   position: relative;
//   z-index: 2; //z-index:2代表比tabber的1大,所以会覆盖tabber
//   height: 100vh; //100vh代表100%的视口高度
//   background-color: #fff;
//   overflow-y: auto; //overflow-y: auto;代表超出部分会出现滚动条
// }
.city {
  .top {
    position: relative;
    z-index: 3; //z-index:3代表比tabber的1大,所以会覆盖tabber
  }
  .content {
    //布局滚动条: 只滚动内容区域,不滚动头部 ; overflow-y: auto 代表超出部分会出现滚动条
    height: calc(100vh - 54px - 44px);
    overflow-y: auto;
  }
}
</style>
