<template>
  <div class="intro">
    <DetailSection :title="`${props.priceIntro.title}`">
      <div class="intro-inner">{{ props.priceIntro.introduction }}</div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue";

const props = defineProps({
  priceIntro: {
    type: Object,
    default: () => ({}),
  },
});
console.log(props.priceIntro);
</script>

<style lang="less" scoped>
.intro {
  .intro-inner {
    margin-top: 10px;
    font-size: 12px;
    line-height: 1.5;
    color: #666;
  }
}
</style>
