<template>
  <!-- 顶部 标签页 -->
  <div class="tab-control">
    <template v-for="(item, index) in titles" :key="item">
      <div
        class="tab-control-item"
        :class="{ active: index === currentIndex }"
        @click="itemClick(index)"
      >
        <span>{{ item }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

// 向父组件发送事件
const emits = defineEmits(["tabItemClick"]);
// 接收父组件传递过来的数据
const props = defineProps({
  titles: {
    type: Array,
    default: () => [],
  },
});
// data数据 currentIndex
const currentIndex = ref(0);

// 点击事件
const itemClick = (index) => {
  // console.log(index);
  // 将currentIndex的值发送给父组件
  emits("tabItemClick", index);
  // 将currentIndex的值赋值给data数据currentIndex
  currentIndex.value = index;
  // setCurrentIndex(index);
};

// 设置currentIndex的值
const setCurrentIndex = (index) => {
  //  console.log(index);// 0 1 2 3 4
  currentIndex.value = index;
};

// setCurrentIndex(index){
//   this.currentIndex = index
// }
defineExpose({
  setCurrentIndex,
});
</script>

<style lang="less" scoped>
.tab-control {
  display: flex;
  // justify-content: center;
  text-align: center;

  height: 35px;
  line-height: 35ppx;
  background-color: #fff;
  padding: 10px 5px 5px 5px;
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item.active {
    color: var(--primary-color);
    font-weight: 700;
    span {
      border-bottom: 3px solid var(--primary-color);
      padding: 8px;
    }
  }
}
</style>
