<template>
  <div class="city-group">
    <!-- 使用vant库 -->
    <!-- index-list索引字符列表 : 根据服务器返回数据自定义, 通过map把props里的groupData数据映射出来 -->
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(city, index) in groupData.hotCities">
          <div class="city" @click="cityClick(acity)">{{ city.cityName }}</div>
        </template>
      </div>

      <template v-for="(group, index) in groupData.cities" :key="index">
        <van-index-anchor :index="group.group" />

        <template v-for="(city, indey) in group.cities" :key="indey">
          <van-cell :title="city.cityName" @click="cityClick(city)" />
        </template>
      </template>
    </van-index-bar>

    <!-- 原生写法 -->
    <!-- <template v-for="(group, index) in groupData.cities" :key="index">
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
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import useCityStore from "@/stores/modules/city";

// 父向子传值 currentGroup, 通过props接收
const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({}), //设定默认值是一个空对象
  },
});

//自定义获取索引字符列表, 通过map把props里的groupData数据映射出来
const indexList = computed(() => {
  const list = props.groupData.cities.map((item) => item.group);
  list.unshift("#");
  return list;
});

//监听点击事件, 传递数据到父组件
const router = useRouter();
const cityStore = useCityStore();
const cityClick = (city) => {
  console.log(city);
  //选中当前城市
  cityStore.currentCity = city;

  // 1. 通过路由传参
  // router.push({
  //   path: "/search",
  //   query: {
  //     cityName: city.cityName,
  //   },
  // });
  // 2. 通过vuex传参
  // const cityStore = useCityStore();
  // cityStore.setCityName(city.cityName);
  // router.back();
  // 3. 通过localStorage传参
  // localStorage.setItem("cityName", city.cityName);

  //返回上一级
  router.back();
};
</script>

<style lang="less" scoped>
.list {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  padding-right: 25px;
  flex-wrap: wrap;
  .city {
    width: 72px;
    height: 28px;
    line-height: 28px;
    border-radius: 14px;
    background-color: #fff4ec;
    font-size: 12px;
    color: #000;
    text-align: center;
    margin: 6px 0;
  }
}
</style>
