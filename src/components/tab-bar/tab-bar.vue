<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon="props">
            <!-- {{ props.active }} -->
            <img
              :src="getAssetURL(props.active ? item.imageActive : item.image)"
            />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>

  <!-- <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <img
              v-if="currentIndex == index"
              :src="getAssetURL(item.imageActive)"
              alt=""
            />
            <img v-else :src="getAssetURL(item.image)" alt="" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div> -->

  <!-- <div class="tab-bar">
    <template v-for="(item, index) in tabbarData">
      <div
        class="tab-bar-item"
        :class="{ active: currentIndex === index }"
        @click="itemClick(item, index)"
      >
        <img
          v-if="currentIndex !== index"
          :src="getAssetURL(item.image)"
          alt=""
        />
        <img v-else :src="getAssetURL(item.imageActive)" alt="" />
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
  </div> -->
</template>

<script setup>
import tabbarData from "@/assets/data/tabbar.js";
import { getAssetURL } from "@/utils/load_assets.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const currentIndex = ref(0);
const router = useRouter();
const itemClick = (item, index) => {
  currentIndex.value = index;
  router.push(item.path);
};
</script>

<style lang="less" scoped>
.tab-bar {
  //改变图标的大小
  // :deep(.van-tabbar-item__icon) {
  //   font-size: 50px;
  // }
  .van-tabbar-item--active {
    .van-tabbar-item__text span {
      color: var(--primary-color);
    }
  }

  .van-tabbar-item__icon img {
    height: 28px;
  }
}

// .tab-bar {
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   height: 50px;
//   display: flex;
//   border-top: 1px solid #f3f3f3;

//   .tab-bar-item {
//     flex: 1;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     &.active {
//       color: var(--primary-color);
//     }
//     img {
//       vertical-align: top;
//       width: 34px;
//     }
//     .text {
//       font-size: 12px;
//       margin-top: 2px;
//     }
//   }
// }
</style>
