<template>
  <div class="map">
    <DetailSection title="位置周边" more-text="查看更多周边信息">
      <div class="baidu" ref="mapRef"></div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue";
import { onMounted, ref } from "vue";

//接收父组件传递过来的数据
const props = defineProps({
  position: {
    type: Object,
    default: () => {},
  },
});
console.log(props.position);

const mapRef = ref();

// 百度地图API功能: 创建Map地图实例,并初始化设置中心点坐标和地图级别,并将地图显示在地图容器baidu的div中,最后创建地图标注
// 使用mapRef.value获取DOM元素,并将其作为参数传递给BMapGL.Map()构造函数,创建地图map实例
// Point()构造函数创建点坐标,并将服务器返回的数据作为参数传递给map.centerAndZoom()方法,设置地图中心点坐标和地图级别
onMounted(() => {
  // 创建地图实例
  const map = new BMapGL.Map(mapRef.value);
  // 创建点坐标
  const point = new BMapGL.Point(
    props.position.longitude, // 经度
    props.position.latitude // 纬度
  );
  // 初始化地图，设置中心点坐标和地图级别
  map.centerAndZoom(point, 15);

  // 创建地图标注
  const marker = new BMapGL.Marker(point); // 创建标注
  map.addOverlay(marker); // 将标注添加到地图中
});
</script>

<style lang="less" scoped>
.baidu {
  height: 250px;
}
</style>
