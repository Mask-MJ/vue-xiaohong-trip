<template>
  <div class="detail top-page" ref="detailRef">
    <!-- <h2>detail{{ $route.params.id }}</h2> -->
    <!-- 顶部 标签页 滚动显示 -->
    <TabControl
      class="tabs"
      v-if="showTabControl"
      :titles="names"
      @tabItemClick="tabClick"
      ref="tabControlRef"
    />
    <!-- 头部栏 -->
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 组件 ; 当mainPart有值才渲染 -->
    <div class="main" v-if="mainPart">
      <!-- 轮播图 传入数据swipe-data -->
      <!-- :swipe-data="mainPart.topModule.housePicture.housePics" 传递给子组件的数据       -->
      <DetailSwipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <!-- 房屋信息 组件 传入数据top-infos -->
      <DetailInfos
        name="描述"
        :ref="getSectionRef"
        :top-infos="mainPart.topModule"
      />
      <!-- 房屋设施 组件的组件 传入数据house-facility -->
      <DetailFacility
        name="设施"
        :ref="getSectionRef"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <!-- 房东介绍 组件  传入数据landlord -->
      <DetailLandlord
        name="房东"
        :ref="getSectionRef"
        :landlord="mainPart.dynamicModule.landlordModule"
      />
      <!-- 热门评论 组件 传入数据comment -->
      <DetailComment
        name="评论"
        :ref="getSectionRef"
        :comment="mainPart.dynamicModule.commentModule"
      />
      <!-- 预定须知 组件 传入数据order-rules -->
      <DetailNotice
        name="须知"
        :ref="getSectionRef"
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      />
      <!-- 地图 组件 传入数据position -->
      <DetailMap
        name="地图"
        :ref="getSectionRef"
        :position="mainPart.dynamicModule.positionModule"
      />
      <!--价格说明 组件 传入数据price-intro -->
      <DetailIntro
        name="说明"
        :ref="getSectionRef"
        :price-intro="mainPart.introductionModule"
      />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">学习之路 , 永无止境 !</div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { getDetailInfos } from "@/services";
import { ref, computed, watch } from "vue";
import useScroll from "@/hooks/useScroll";

import TabControl from "@/components/tab-control/tab-control.vue";
import DetailSwipe from "./cpns/detail-01-swipe.vue";
import DetailInfos from "./cpns/detail-02-infos.vue";
import DetailFacility from "./cpns/detail-03-facility.vue";
import DetailLandlord from "./cpns/detail-04-landlord.vue";
import DetailComment from "./cpns/detail-05-comment.vue";
import DetailNotice from "./cpns/detail-06-notice.vue";
import DetailMap from "./cpns/detail-07-map.vue";
import DetailIntro from "./cpns/detail-08-intro.vue";

//思路一: 定义detail store,在detail store中定义一个变量,用于存储房屋详情的数据
//思路二: 在services定义一个函数,在detail页面中调用这个函数,获取房屋详情的数据

const route = useRoute();
const router = useRouter();
// console.log(route.params.id);
const houseId = route.params.id;

// 发送网络请求, 获取房屋详情的数据.mainPart
const detailInfos = ref({});
// mainPart 代表房屋详情的数据
const mainPart = computed(() => {
  return detailInfos.value.mainPart;
});
getDetailInfos(houseId).then((res) => {
  console.log(res);
  detailInfos.value = res.data;
});

// 监听点击返回按钮-->返回到上一页
const onClickLeft = () => {
  router.back();
};

//TabControl组件的显示和隐藏 相关操作
//showTabControl: 是否显示TabControl组件, 通过计算属性来实现, 当scrollTop滚动 >= 300时,显示TabControl组件
//给元素添加ref属性, 通过ref属性获取元素的dom对象, 通过dom对象获取元素的scrollTop值,
const detailRef = ref();
//从useScroll中获取scrollTop的值
const { scrollTop } = useScroll(detailRef);
//定义showTabControl事件, 通过计算属性来实现 showTabControl 的显示和隐藏
const showTabControl = computed(() => {
  // console.log(scrollTop.value);
  return scrollTop.value >= 300;
});

//sectionEls 用于存储所有的section元素
const sectionEls = ref({});
//names 用于存储所有的section元素的name属性值
const names = computed(() => {
  //通过Object.keys()方法获取sectionEls对象的所有属性名, 返回一个数组
  return Object.keys(sectionEls.value);
});
//getSectionRef 用于获取section元素的ref属性值
// $refs  :  访问子组件实例或子元素（操作DOM元素）
const getSectionRef = (value) => {
  //value.$el : 获取元素的dom对象
  //通过getAttribute方法获取元素的name属性值
  if (!value) return;
  const name = value.$el.getAttribute("name");
  // console.log(value.$el);
  //把元素存储到sectionEls对象中
  sectionEls.value[name] = value.$el;
};
//TabControl组件的点击事件: 当点击某个item时, 让页面滚动到对应的位置
const tabClick = (index) => {
  //获取sectionEls对象的所有属性名, 返回一个数组, 数组的下标就是索引
  //通过索引获取对应的属性名, 属性名就是section元素的name属性值
  //console.log(sectionEls.value);  //{描述: div, 设施: div, 房东: div, 评论: div, 须知: div, …}
  //console.log(Object.keys(sectionEls.value)); //["描述", "设施", "房东", "评论", "须知", "地图", "说明"]
  const key = Object.keys(sectionEls.value)[index];
  // console.log(key);
  //通过属性名获取对应的真实dom元素
  const el = sectionEls.value[key];
  //获取元素距离顶部的距离
  let instance = el.offsetTop;
  if (index === 0) {
    instance = 0;
  } else {
    instance = instance - 40;
  }
  //通过ref属性获取元素的dom对象, 通过dom对象调用scrollTop方法, 让页面滚动到对应的位置
  detailRef.value.scrollTo({
    // top: 0, //滚动到顶部
    top: instance, //滚动到对应的位置
    behavior: "smooth", //平滑滚动
  });
  // console.log("tabClick");
};

//页面混动时匹配对应的tabControl的index
//3.拿到对应的索引后, 将索引赋值给TabControl
const tabControlRef = ref();
watch(scrollTop, (newValue) => {
  //1.获取所有的section元素的offsetTop值(距离顶部的距离)
  const els = Object.values(sectionEls.value);
  const values = els.map((el) => el.offsetTop);
  // console.log(values); //(7) [306, 557, 926, 1268, 1694, 1957, 2335]
  //2.根据newValue匹配对应的index
  //2.1定义一个变量index, 用于存储匹配到的index值, 默认值为values.length
  let index = values.length - 1;
  //2.2.遍历values数组, 获取每个元素的值, 与newValue进行比较
  //2.3.如果newValue >= values[i] && newValue < values[i + 1], index = i
  for (let i = 0; i < values.length; i++) {
    if (values[i] > newValue + 40) {
      index = i - 1;
      break;
    }
  }
  //console.log(index); // -1 0 1 2 3 4
  // tabControlRef.value?.currentIndex = index;
  tabControlRef.value?.setCurrentIndex(index);
});
</script>

<style lang="less" scoped>
.detail {
  .tabs {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
  .footer {
    height: 100px;
    background-color: #fff;
    // margin: 12px 0 34px 0;
    border-top: 5px solid #f2f3f4;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 123px;
    }
    .text {
      margin-top: 12px;
      font-size: 12px;
      color: #7688a7;
    }
  }
}
</style>
