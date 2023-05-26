<template>
  <div class="search-box">
    <div class="location">
      <div class="city" @click="cityClick">广州</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置 </span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

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
</script>

<style lang="less" scoped>
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
</style>
