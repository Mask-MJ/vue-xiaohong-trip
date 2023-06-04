<template>
  <div class="infos" v-if="Object.keys(topInfos).length">
    <div class="name">{{ topInfos.houseName }}</div>
    <div class="tags">
      <template v-for="(item, index) in topInfos.houseTags" :key="index">
        <span
          class="item"
          v-if="item.tagText"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </span>
      </template>
    </div>
    <div class="comment extra">
      <div class="left">
        <span class="score">{{ topInfos.commentBrief.overall }}</span>
        <span class="text">{{ topInfos.commentBrief.scoreTitle }}</span>
        <span class="brief">{{ topInfos.commentBrief.commentBrief }}</span>
      </div>
      <div class="right">
        <span class="count">
          {{ topInfos.commentBrief.totalCount }}条评论
        </span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="position extra">
      <div class="left">{{ topInfos.nearByPosition.address }}</div>
      <div class="right">地图·周边 <van-icon name="arrow" /></div>
    </div>
  </div>
</template>

<script setup>
// const props =
defineProps({
  topInfos: {
    type: Object,
    default: () => ({}),
  },
});
// console.log(props.topInfos);
</script>

<style lang="less" scoped>
.infos {
  padding: 16px;
  background-color: #fff;
  .name {
    line-height: 24px;
    font-size: 20px;
    font-weight: 700;
    color: #333;
    text-align: justify;
    margin-bottom: 6px;
    overflow: hidden;
  }
  .tags {
    margin: 10px 0;
    .item {
      padding: 1px 3px;
      line-height: 20px;
      font-size: 12px;
      border-radius: 2px;
      margin: 0 2px;
    }
  }
  .extra {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f7fa;
    margin: 12px 0;
    padding: 8px 12px;
    border-radius: 5px;
  }
  .comment {
    .left {
      .score {
        font-weight: 700;
        font-size: 18px;
        color: #333;
      }
      .text {
        font-weight: 700;
        color: #333;
        margin: 0 3px;
      }
      .brief {
        color: #666;
      }
    }

    .right {
      color: #ff9645;
    }
  }
  .position {
    .left {
      font-size: 14px;
      font-weight: 700;
      color: #333;
    }
    .right {
      color: #ff9645;
    }
  }
}
</style>
