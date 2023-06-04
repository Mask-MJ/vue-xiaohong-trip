<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData.image.url" alt="" />
      </div>
      <div class="info">
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="name">{{ itemData.houseName }}</div>
        <div class="price">
          <van-rate
            :model-value="itemScore"
            color="#fff"
            size="15px"
            allow-half
            readonly
          />
          <div class="new">¥ {{ itemData.finalPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";

//定义props, 用于接收父组件传递的数据
const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({}),
  },
});

//定义计算属性, 用于评分数据的处理
const itemScore = computed(() => {
  return Number(props.itemData.commentScore);
});
</script>

<style lang="less" scoped>
.house-item {
  width: 50%;
  .item-inner {
    position: relative;

    background: #fff;
    margin: 5px;
    .cover {
      img {
        width: 100%;
        border-radius: 6px;
      }
    }
    .info {
      position: absolute;
      bottom: 0;
      color: #fff;
      padding: 5px 8px;
      .summary {
        font-size: 12px;
        padding: 5px 0;
      }
      .name {
        font-size: 12px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .price {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
      }
    }
  }
}
</style>
