<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置 </span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="data-range" @click="showCalendar = true">
      <div class="date">
        <span class="tip">入住</span>
        <span class="time">{{ startDateStr }}</span>
      </div>
      <div class="stay">共{{ stayCount }}晚</div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>
    </div>

    <!-- 日历组件 -->
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      color="var(--primary-color)"
      :round="false"
      @confirm="onConfirm"
    />

    <!-- 价格/人数 -->
    <div class="price-counter">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="keyword">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div
          class="item"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 搜索按钮 -->
    <div class="search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import useCityStore from "@/stores/modules/city";
import { formatMonthDay, getDiffDays } from "@/utils/format_date.js";
import useHomeStore from "@/stores/modules/home";
import uesMainStore from "@/stores/modules/main";

//定义props
const props = defineProps({
  hotSuggests: {
    type: Array,
    default: () => [],
  },
});

//useRouter() 用于获取当前活跃的路由对象
const router = useRouter();

//位置/城市点击事件
const cityClick = () => {
  router.push("/city");
};
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log("获取位置成功", res);
    },
    (err) => {
      console.log("获取位置失败", err);
    },
    {
      enableHighAccuracy: true,
      timeout: 3000,
      maximumAge: 0,
    }
  );
};

//获取当前城市
const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore);

//日期范围的处理
// const nowDate = new Date();
// const newDate = new Date();
// newDate.setDate(nowDate.getDate() + 1);
const mainStore = uesMainStore();
const { startDate, endDate } = storeToRefs(mainStore);
console.log(startDate, endDate);

const startDateStr = computed(() => {
  return formatMonthDay(startDate.value);
});
const endDateStr = computed(() => {
  return formatMonthDay(endDate.value);
});

const stayCount = ref(getDiffDays(startDate.value, endDate.value));

//日期区间选择
const showCalendar = ref(false); //是否显示日历
const onConfirm = (value) => {
  //console.log(value);
  const selectStartDate = value[0];
  const selectEndDate = value[1];
  //console.log(selectStartDate, selectEndDate);
  // startDate.value = formatMonthDay(selectStartDate);
  // endDate.value = formatMonthDay(selectEndDate);
  mainStore.startDate = selectStartDate;
  mainStore.endDate = selectEndDate;
  stayCount.value = getDiffDays(selectStartDate, selectEndDate);

  showCalendar.value = false; //关闭日历
};

//热门建议(直接获取store中的数据)
const homeStore = useHomeStore();
const { hotSuggests } = storeToRefs(homeStore);

//开始搜索按钮
const searchBtnClick = () => {
  router.push({
    path: "/search",
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName,
      // stayCount: stayCount.value,
      // cityName: currentCity.value.cityName,
    },
  });
};

//
</script>

<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%;

  .location {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    padding: 0 20px;
    .city {
      flex: 1;
      color: #333;
      font-size: 15px;
    }
    .position {
      display: flex;
      width: 74px;

      .text {
        font-size: 12px;
        color: #666;
        text-align: center;
        line-height: 18px;
      }
      img {
        position: relative;
        top: -1px;
        margin-left: 3px;
        width: 18px;
        height: 18px;
      }
    }
  }

  .data-range {
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .date {
      display: flex;
      flex-direction: column;
    }
    .stay {
      color: #666;
      font-size: 12px;
      text-align: center;
    }
    .tip {
      font-size: 12px;
      color: #666;
      text-align: center;
      line-height: 18px;
    }
    .time {
      font-size: 15px;
      color: #333;
      text-align: center;
      margin-top: 3px;
    }
    .end .date {
      min-width: 30%;
      padding-right: 50px;
    }
  }

  .price-counter {
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .start {
      border-right: 1px solid #f8f9f9;
      color: #666;
    }
    .end {
      color: #666;
      padding-right: 50px;
    }
  }
  .keyword {
    color: #666;
    padding: 10px 20px 20px 20px;
  }

  .hot-suggests {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
    .item {
      font-size: 12px;
      color: #333;
      text-align: center;
      padding: 5px 8px;
      margin: 5px 7px;
      line-height: 1;
      border-radius: 14px;
    }
  }

  .search-btn {
    display: flex;
    justify-content: center;
    margin: 10px 0;
    .btn {
      width: 342px;
      height: 38px;
      max-height: 50px;
      font-size: 18px;
      font-weight: 500;
      color: #fff;
      text-align: center;
      line-height: 38px;
      border-radius: 20px;
      background-image: var(--theme-linear-gradient);
    }
  }
}
</style>
