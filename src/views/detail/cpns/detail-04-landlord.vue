<template>
  <div class="landlord" v-if="Object.keys(landlord).length">
    <!-- 房屋介绍 组件 -->
    <DetailSection title="房屋介绍" more-text="查看房东主页">
      <div class="intro">
        <div class="top">
          <img :src="landlord.topScroll" alt="" />
        </div>
        <div class="header">
          <div class="left">
            <div class="avatar">
              <img :src="landlord.hotelLogo" alt="" />
            </div>
            <div class="info">
              <div class="name">{{ landlord.hotelName }}</div>
              <div class="tags">
                <template
                  v-for="(item, index) in landlord.hotelTags"
                  :key="index"
                >
                  <div class="item" :style="{ color: item.tagText.color }">
                    <span>{{ item.tagText.text }}</span>
                    <span
                      v-if="index !== landlord.hotelTags.length - 1"
                      class="divider"
                    >
                      |
                    </span>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="contact">联系房东</div>
          </div>
        </div>
        <div class="bottom">
          <template v-for="(i, list) in landlord.hotelSummary" :key="list">
            <div class="item">
              <div class="title">{{ i.title }}</div>
              <div class="score">{{ i.introduction }}</div>
              <div class="desc">{{ i.tip }}</div>
            </div>
          </template>
        </div>
      </div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue";

const props = defineProps({
  landlord: {
    type: Object,
    default: () => ({}),
  },
});
console.log(props.landlord);
</script>

<style lang="less" scoped>
.landlord {
  .intro {
    .top {
      img {
        width: 100%;
        border-radius: 3px;
      }
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .left {
      display: flex;

      .avatar {
        img {
          width: 54px;
          height: 54px;
          margin-right: 5px;
        }
      }
      .info {
        width: 195px;
        .name {
          font-size: 16px;
          font-weight: 600;
          margin-top: 8px;
        }
        .tags {
          display: flex;
          margin-top: 5px;
          font-size: 12px;
          .divider {
            margin: 0 5px;
          }
        }
      }
    }
    .right {
      .contact {
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        padding: 0 10px;
        border-radius: 5px;
        background-image: linear-gradient(90deg, #fa8c1d, #fcaf3f);
        color: #fff;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 50px 10px 10px;
    .item {
      font-size: 12px;
      .title {
        color: #999;
      }
      .score {
        margin: 5px 0;
        font-size: 18px;
        font-weight: 700;
        color: #333;
      }
      .desc {
        color: #666;
      }
    }
  }
}
</style>
