<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData?.image?.url" alt="" />
      </div>
      <div class="info">
        <div class="location">
          <img src="@/assets/img/home/location.png" alt="" />
          <span>{{ itemData.location }}</span>
        </div>
        <div class="name">
          {{ itemData.houseName }}
        </div>
        <div class="summary">{{ itemData.summaryText }}</div>

        <div class="price">
          <div class="new">¥{{ itemData.finalPrice }}</div>
          <div class="old">¥{{ itemData.productPrice }}</div>
          <div class="tip">{{ itemData?.priceTipBadge?.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  itemData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="less" scoped>
.house-item {
  width: 50%;

  .item-inner {
    background: #fff;
    padding: 5px;
    overflow: hidden;
    .cover {
      img {
        width: 100%;
        border-radius: 6px;
      }
    }
    .info {
      padding: 10px 10px 0 10px;
      font-size: 12px;
      .location {
        display: flex;
        align-items: center;
        color: #666;
        padding-bottom: 8px;
        img {
          width: 12px;
          height: 12px;
        }
      }

      .summary {
        font-size: 12px;
        color: #666;
        padding: 8px 0;
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
        align-items: center;
        .new {
          color: #ff9645;
          height: 16px;
          font-size: 14px;
        }
        .old {
          color: #999;
          font-size: 12px;
          text-decoration: line-through;
          margin: 0 5px;
          line-height: 16px;
        }
        .tip {
          background-image: linear-gradient(270deg, #f66, #ff9f9f);
          color: #fff;
          padding: 0 6px;
          border-radius: 8px;
          height: 16px;
          line-height: 16px;
        }
      }
    }
  }
}
</style>
