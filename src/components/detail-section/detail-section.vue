<template>
  <div class="section">
    <div class="herder">
      <h2 class="title">{{ title }}</h2>
    </div>
    <div class="content">
      <slot>
        <h3>默认内容</h3>
      </slot>
    </div>
    <!-- v-if判断moreText是否有值,如果使用时有传进来值, 就渲染footer; 否则不渲染 -->
    <div class="footer" v-if="moreText.length">
      <span class="more">{{ moreText }} <van-icon name="arrow" /></span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "默认标题",
  },
  moreText: {
    type: String,
    default: "",
  },
});
</script>

<style lang="less" scoped>
.section {
  padding: 0 15px;
  background-color: #fff;
  margin-top: 12px;
  border-top: 5px solid #f2f3f4;
  .herder {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    .title {
      font-size: 20px;
      color: #333;
    }
  }
  .content {
    padding: 8px 0;
  }
  .footer {
    .more {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      font-weight: 600;
      color: #ff9645;
    }
  }
}
</style>
