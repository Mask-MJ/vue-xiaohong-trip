<template>
  <div class="comment" v-if="Object.keys(comment).length">
    <!-- 热门评论 组件 -->
    <DetailSection
      title="热门评论"
      :more-text="`查看全部${comment.totalCount}条评论`"
    >
      <div class="comment-inner">
        <div class="header">
          <div class="left">
            <div class="score">
              <div class="text">{{ comment.overall }}</div>
              <div class="line"></div>
            </div>
            <div class="info">
              <div class="title">{{ comment.scoreTitle }}</div>
              <div class="count">{{ comment.totalCount }}条评论</div>
              <div class="star">
                <van-rate
                  v-model="comment.overall"
                  color="#ff9645"
                  size="12"
                  readonly
                  allow-half
                />
              </div>
            </div>
          </div>

          <div class="right">
            <template v-for="(item, index) in comment.subScores" :key="item">
              <span class="item">{{ item }}</span>
            </template>
          </div>
        </div>

        <div class="tags">
          <template v-for="(item, index) in comment.commentTagVo" :key="index">
            <span
              class="item"
              :style="{ color: item.color, background: item.backgroundColor }"
            >
              {{ item.text }}
            </span>
          </template>
        </div>

        <div class="content">
          <div class="user">
            <div class="avatar">
              <img :src="comment.comment.userAvatars" alt="" />
            </div>
            <div class="profile">
              <div class="name">{{ comment.comment.userName }}</div>
              <div class="date">{{ comment.comment.checkInDate }}</div>
            </div>
          </div>
          <div class="text">
            {{ comment.comment.commentDetail }}
          </div>
        </div>
      </div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue";

const props = defineProps({
  comment: {
    type: Object,
    default: () => ({}),
  },
});
console.log(props.comment);
</script>

<style lang="less" scoped>
.comment {
  .comment-inner {
    padding: 10px 0;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;

        .score {
          .text {
            font-size: 48px;
            font-weight: bold;
          }
          .line {
            width: 66px;
            height: 6px;
            background: linear-gradient(90deg, #fa8c1d, #fcaf3f);
            border-radius: 3px;
          }
        }
        .info {
          font-size: 12px;
          color: #333;
          margin: 0 15px;
          padding: 10px 0;
          .title {
            font-size: 14px;
          }
          .count {
            color: #666;
            margin: 5px 0;
          }
          .star {
          }
        }
      }
      .right {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        flex: 1;
        .item {
          width: 70px;
          margin: 3px;
          font-size: 12px;
          color: #666;
        }
      }
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      margin: 10px 0;
      .item {
        padding: 3px 5px;
        margin: 5px 8px 0 0;
        border-radius: 8px;
        font-size: 12px;
      }
    }
    .content {
      background-color: #f7f9fb;
      padding: 10px;
      .user {
        display: flex;
        padding-bottom: 10px;
        .avatar {
          img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
          }
        }
        .profile {
          margin-left: 10px;

          .name {
            font-weight: 600;
          }
          .date {
            color: #666;
          }
        }
      }
      .text {
        line-height: 16px;
        color: #333;
        font-size: 12px;
      }
    }
  }
}
</style>
