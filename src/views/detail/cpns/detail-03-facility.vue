<template>
  <div class="facility">
    <!-- 房屋设施组件 -->
    <DetailSection title="房屋设施" more-text="查看全部设施">
      <div class="facility-inner">
        <template
          v-for="(item, index) in houseFacility.houseFacilitys"
          :key="index"
        >
          <div class="item" v-if="houseFacility.facilitySort?.includes(index)">
            <div class="head">
              <img :src="item.icon" alt="" />
              <div class="text">{{ item.groupName }}</div>
            </div>
            <div class="list">
              <template
                v-for="(i, list) in item.facilitys.slice(0, 4)"
                :key="list"
              >
                <div class="i">
                  <van-icon name="passed" />
                  <span class="text">{{ i.name }}</span>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue";

const props = defineProps({
  houseFacility: {
    type: Object,
    default: () => ({}),
  },
});
console.log(props.houseFacility);
</script>

<style lang="less" scoped>
.facility {
  .facility-inner {
    font-size: 12px;
    background-color: #f7f9fb;
    border-radius: 6px;
    padding: 5px 0;
    .item {
      display: flex;
      margin: 25px 0;
      .head {
        width: 90px;
        text-align: center;
        img {
          width: 20px;
          height: 20px;
        }
        .text {
          margin-top: 5px;
          color: #000;
        }
      }
      .list {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .i {
          display: flex;
          align-items: center;
          width: 50%;
          margin: 4px 0;
          .van-icon {
            color: #26f0db;
          }
          .text {
            margin: 0 3px;
          }
        }
      }
    }
  }
}
</style>
