<template>
  <view class="">
    <view class="topbar">
      <view class="h86" />
      <scroll-view class="scroll-view" scroll-x :show-scrollbar="false">
        <view class="rel">
          <view
            v-for="(item, index) in navList"
            :key="'nav' + index"
            class="item"
            :class="{ active: curNav == item.id }"
            @click="switchNav(item.id, index)"
          >
            {{ item.name }}
          </view>
          <view
            class="slide"
            :style="`width:${sliderWidth}rpx;transform:translateX(${sliderOffset}rpx);`"
          />
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { apiGetNavList } from '../../apis/video.js';
import { apiGetRelatedVideo } from '../../apis/index.js';
export default {
  data() {
    return {
      navList: [],
      curNav: '',
      sliderOffset: 0,
      sliderWidth: 60,
      relatedVideo: [],
    };
  },
  onLoad() {
    this.getNavList();
  },
  methods: {
    //获取导航
    getNavList() {
      const params = {
        id: 124,
      };
      apiGetNavList(params).then((res) => {
        this.navList = res.mock.navList;
        this.curNav = this.navList[0].id;
        this.switchNav(this.curNav, 0);
      });
    },
    switchNav(id, index) {
      if (this.curNav === id) return;
      this.curNav = id;
      this.sliderWidth = index == 1 ? 136.5 : 60;
      // 获取slider偏移量 = 自身宽度(以两个字的为准96) +  从第三个开始要加上差(长宽-短宽)
      this.sliderOffset = 96 * index + (index > 1 ? 96.5 : 20);
      this.getList(
        1,
        1,
        (res) => (this.relatedVideo = res),
        (err) => console.log(err)
      );
    },

    // 获取相关视频
    getList(pageNum, pageSize, successCallback, errorCallback) {
      const params = {
        id: this.curNav,
        pageNum,
        pageSize,
      };
      apiGetRelatedVideo(params).then(
        (res) => {
          //联网成功的回调
          successCallback && successCallback(res.data);
        },
        (res) => {
          // 联网失败的回调
          errorCallback && errorCallback(res.data);
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.topbar {
  .h86 {
    height: 86rpx;
  }

  .scroll-view {
    position: fixed;
    top: 0;
    width: 100%;
    height: 86rpx;
    white-space: nowrap;
    text-align: center;
    line-height: 86rpx;
    color: #333;
    font-weight: 600;
    border-bottom: 1rpx solid #e6e6e6;
    z-index: 10;
    background: #fff;
    min-width: 126rpx;

    .item {
      position: relative;
      display: inline-block;
      height: 86rpx;
      line-height: 86rpx;
      padding: 0 20rpx;
      &.active {
        color: #f32628;
      }
    }
  }
}

.slide {
  position: absolute;
  width: 60rpx;
  height: 4rpx;
  left: 0;
  bottom: 0rpx;
  background: #f32628;
  transition: transform 0.3s;
  z-index: 2;
  /* #ifdef MP-WEIXIN */
  bottom: 2rpx;
  /* #endif */
}
</style>
