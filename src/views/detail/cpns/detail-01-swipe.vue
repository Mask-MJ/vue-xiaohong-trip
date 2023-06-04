<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" alt="" />
        </van-swipe-item>
      </template>

      <!-- 插槽: 自定义指示器 -->
      <template #indicator="{ active, total }">
        <!-- <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div> -->
        <div class="custom-indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
            <span
              class="item"
              :class="{ active: swipeData[active]?.enumPictureCategory == key }"
            >
              <span class="text">{{ getName(value[0].title) }}</span>
              <span
                class="count"
                v-if="swipeData[active]?.enumPictureCategory == key"
              >
                {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
//接收父组件传递过来的数据 房屋详情的数据mainPart
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => [],
    // required: true,
  },
});

//对数据进行转换处理
//定义swipeGroup 用于存储转换后的数据
const swipeGroup = {};

// 第三种方式:
for (const item of props.swipeData) {
  //1.先拿到所有的enumPictureCategory
  let valueArray = swipeGroup[item.enumPictureCategory];
  if (!valueArray) {
    //2.如果变量valueArray没有值,就创建一个空数组
    valueArray = [];
    //3.将这个变量valueArray存储到swipeGroup中,这样swipeGroup就一定不会是空值
    swipeGroup[item.enumPictureCategory] = valueArray;
  }
  //4.将这个item push到对应的数组中
  valueArray.push(item);
}
console.log(swipeGroup);

// 第二种方式:
// 1.先拿到所有的enmunPictureCategory
// for (const item of props.swipeData) {
//   //拿到每个item的enmunPictureCategory
//   const enmunPictureCategory = item.enmunPictureCategory;
//   // 2.判断swipeGroup中是否有这个enmunPictureCategory
//   if (swipeGroup[enmunPictureCategory]) {
//     // 3.如果有,将这个item push到对应的数组中
//     swipeGroup[enmunPictureCategory].push(item);
//   } else {
//     // 4.如果没有,就创建一个数组,将这个item push到对应的数组中
//     swipeGroup[enmunPictureCategory] = [item];
//   }
// }

// 第一种方式:
// for (const item of props.swipeData) {
//   //拿到每个item的enmunPictureCategory
//   swipeGroup[item.enmunPictureCategory] = [];
// }
// for (const item of props.swipeData) {
//   //拿到每个item的enmunPictureCategory之后,将这个数据 push到对应的数组中
//   const valueArray = swipeGroup[item.enmunPictureCategory];
//   valueArray.push(item);
// }

//定义转换数据的方法
const getName = (name) => {
  return name.replace("：", "");
};

//定义获取当前 index 的方法
const getCategoryIndex = (item) => {
  //1.先拿到当前item的enumPictureCategory
  //2.根据这个enumPictureCategory去swipeGroup中找到对应的数组
  //3.在这个数组中找到当前item的index
  const valueArray = swipeGroup[item.enumPictureCategory];
  //4.找到当前item的index,返回
  return valueArray.findIndex((data) => data === item) + 1;
};
</script>

<style lang="less" scoped>
.swipe {
  .swipe-list {
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.5);
      margin: 0 3px;
      color: #fff;
      // margin: 0 3px;
      .span {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .item {
      img {
        width: 100%;
      }
      &.active {
        padding: 0 3px;
        border-radius: 5px;
        background-color: #fff;
        color: #333;
      }
    }
  }
}
</style>
