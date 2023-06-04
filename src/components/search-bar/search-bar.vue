<template>
  <div class="search">
    <div class="search-bar">
      <div class="select-time">
        <div class="item start">
          <div class="name">住</div>
          <div class="data">{{ startDateStr }}</div>
        </div>
        <div class="item end">
          <div class="name">离</div>
          <div class="data">{{ endDateStr }}</div>
        </div>
      </div>
      <div class="content">
        <div class="keyword">关键字/位置/民宿</div>
      </div>
      <div class="right">
        <i class="icon-search"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import useMainStore from "@/stores/modules/main";
import { storeToRefs } from "pinia";
// import { computed } from "@vue/reactivity";
import { formatMonthDay } from "@/utils/format_date";
import { computed } from "vue";

const mainStore = useMainStore();
const { startDate, endDate } = storeToRefs(mainStore);
const startDateStr = computed(() => {
  //format传入了自定义格式MM.DD
  return formatMonthDay(startDate.value, "MM.DD");
});
const endDateStr = computed(() => {
  return formatMonthDay(endDate.value, "MM.DD");
});
</script>

<style lang="less" scoped>
.search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  z-index: 10;
  background: #fff;

  .search-bar {
    display: flex;
    align-items: center;
    flex-direction: row;

    // padding: 0 10px;
    margin: 5px;
    color: #999;
    border-radius: 6px;
    background: #f2f4f6;

    .select-time {
      display: flex;
      flex-direction: column;

      .item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex: 1;

        font-size: 14px;
        padding: 0 10px;
        border-right: 1px solid #ebebeb;
        .name {
          font-size: 12px;
          color: #999;
          height: 18px;
          line-height: 18px;
          padding-right: 3px;
        }
        .data {
          font-size: 12px;
          color: #333;
          height: 18px;
          line-height: 18px;
        }
      }
    }
    .content {
      position: relative;
      flex: 1;
      padding: 0 6px;
      text-align: left;
      border-left: 1px solid #fff;

      .keyword {
        max-width: 155px;
        font-size: 12px;
      }
    }
    .icon-search {
      width: 24px;
      height: 24px;
      display: inline-block;

      background-image: url(../../assets/img/home/home-sprite.png);
      background-position: -29px -151px;
      background-size: 207px 192px;
    }
  }
}
</style>
