<template>
  <div class="notice">
    <DetailSection title="预定须知">
      <div class="notice-inner">
        <template v-for="(item, index) in orderRules" :key="index">
          <div class="item">
            <span class="title">{{ item.title }}</span>
            <span class="intro">{{ item.introduction }}</span>
            <span class="tip" v-if="item.tips">查看说明</span>
          </div>
        </template>
      </div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue";

const props = defineProps({
  orderRules: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="less" scoped>
.notice {
  .notice-inner {
    .item {
      margin: 10px 0 20px;
      font-size: 12px;
      display: flex;
      .title {
        width: 70px;
        color: #666;
      }
      .intro {
        color: #333;
        flex: 1;
      }
    }
  }
}
</style>
