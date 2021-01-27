<template>
  <view>
    <view class="banner">
      <swiper
        class="swiper"
        :autoplay="false"
        :indicator-dots="true"
        indicator-active-color="#ff372b"
        indicator-color="rgba(255,255,255, .5)"
        duration="500"
        :circular="true"
      >
        <swiper-item v-for="(item, index) in swiper" :key="index">
          <view class="item">
            <!-- image元素是一个组件，在渲染到设备上会自带样式(默认宽度300,高度225) -->
            <image :src="item.imageUrl" class="img" />
            <view class="tag">
              {{ item.typeTitle }}
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="main-bar flex-box">
      <view v-for="(item, index) in contentBar" :key="index" class="flex-item">
        <image :src="'/static/image/index/t_' + (index + 1) + '.png'" class="img" />
        <view> {{ item.name }} </view>
        <view v-if="index == 0" class="date">
          {{ curDate }}
        </view>
      </view>
    </view>
    <!-- 纵向歌单分类块 -->
    <view class="song-list">
      <songList title="推荐歌单" link="/pages/songSquare/index?limit=30" :list="recommendSongs" />
    </view>

    <!-- 横向滚动歌单分类块 -->
    <view class="song-list">
      <songList title="推荐歌单" :vertical="false" :list="recommendSongs" />
    </view>

    <!-- 新碟、新歌 -->
    <view class="song-list">
      <view class="switch-line flex-box">
        <view class="flex-box">
          <view class="switch-item" :class="{ on: newType == 1 }" @click="switchTab(1)">新碟</view>|
          <view class="switch-item" :class="{ on: newType == 2 }" @click="switchTab(2)">新歌</view>
        </view>
        <template v-if="newType == 1">
          <view class="more">更多新碟</view>
        </template>
        <template v-if="newType == 2">
          <view class="more">新歌推荐</view>
        </template>
      </view>
      <scroll-view class="scroll-view" scroll-x>
        <view class="item" v-for="(item, index) in latestAlbum" :key="'album' + index">
          <image class="img" :src="item.picUrl + $imgSuffix"></image>
          <view class="desc ellipsis">{{ item.name }}</view>
          <view class="desc ellipsis c9">{{ item.artist.name }}</view>
        </view>
      </scroll-view>
    </view>
    <!-- 视频歌单列表 -->
    <view class="video-list song-list">
      <view class="tit-bar">
        精选视频
        <view class="more fr">更多</view>
      </view>
      <view class="video-item" v-for="(item, index) in relatedVideo" :key="index">
        <image class="img" :src="item.coverUrl + $imgSuffix"></image>
        <view class="desc ellipsis">{{ item.title }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  apiGetBanner,
  apiGetTopAlbum,
  apiGetRelatedVideo,
  apiGetRecommendSongs,
  apiGetHotList,
} from '../../apis/index';
import songList from '../../components/songList';
export default {
  name: 'Index',
  components: {
    songList,
  },
  data() {
    return {
      swiper: [],
      loading: false,
      recommendSongs: [],
      latestTempAlbum: [],
      latestAlbum: [],
      relatedVideo: [],
      hotList: [],
      curDate: '',
      newType: 1,
      contentBar: [
        { name: '每日推荐' },
        { name: '歌单' },
        { name: '排行版' },
        { name: '电台' },
        { name: '直播' },
      ],
    };
  },
  onLoad() {
    // 只有页面才有onload
    this.curDate = new Date().getDate();
    this.getBanner();
    this.getRecommendSongs();
    this.getLatestAlbum();
    this.getRelateVideo();
    this.getHotList();
  },
  methods: {
    // 获取轮播图数据
    getBanner() {
      this.loading = true;
      apiGetBanner().then((res) => {
        if (res.code === 200) {
          this.swiper = res.banners;
        }
      });
    },
    // 获取推荐列表
    getRecommendSongs() {
      apiGetRecommendSongs().then((res) => {
        if (res.code === 200) {
          this.recommendSongs = res.result;
        }
      });
    },
    // 切换新歌新碟
    switchTab(type) {
      if (type === this.newType) return;
      this.newType = type;
      let temp = {
        s: type == 1 ? 0 : 3,
        e: type == 1 ? 3 : 6,
      };
      this.latestAlbum = this.latestTempAlbum.slice(temp.s, temp.e);
    },
    // 获取新碟
    getLatestAlbum() {
      apiGetTopAlbum().then((res) => {
        this.latestTempAlbum = res.albums;
        this.latestAlbum = res.albums.slice(0, 3);
      });
    },
    // 获取视频
    getRelateVideo() {
      const params = {
        id: 6524,
      };
      apiGetRelatedVideo(params).then((res) => {
        this.relatedVideo = res.data;
      });
    },
    // 获取热门列表
    getHotList() {
      const params = {
        limit: 10,
        order: 'hot',
      };
      apiGetHotList(params).then((res) => {
        this.hotList = res.palylists;
      });
    },
  },
};
</script>

<style lang="scss">
page {
  color: #1a1a1a;
  font-size: 24rpx;
}

// 轮播图
.banner {
  width: 100%;
  height: 268rpx;
  margin: 30rpx auto 44rpx;
  .swiper {
    height: 268rpx;
    .item {
      position: relative;
      display: block;
      width: 686rpx;
      height: 268rpx;
      margin: 0 auto;
      border-radius: 14rpx;
      overflow: hidden;
      .img {
        width: 100%;
        display: block;
        height: 100%;
      }
    }
  }
}

// 菜单按钮
.main-bar {
  text-align: center;
  padding-bottom: 22rpx;
  text-align: center;
  line-height: 70rpx;
  color: #666;
  border-bottom: 1rpx solid #e6e6e6;
  .img {
    display: block;
    width: 92rpx;
    height: 92rpx;
    margin: 0 auto;
  }
  .flex-item {
    position: relative;
    .date {
      position: absolute;
      left: 60rpx;
      top: 40rpx;
      line-height: 1;
      font-size: 24rpx;
      color: #ff392d;
      transform: scale(0.8);
    }
  }
}

// 个单列表
.song-list {
  padding-left: 32rpx;

  .switch-line {
    justify-content: space-between;
    color: #999;
    .flex-box {
      line-height: 110rpx;
      width: 300rpx;
    }
    .switch-item {
      font-weight: 600;
      &:first-child {
        width: 80rpx;
      }
      &:last-child {
        padding-left: 22rpx;
      }
      &.on {
        color: #333;
        font-size: 34rpx;
      }
    }
  }
  .item {
    position: relative;
    display: inline-block;
    width: 218rpx;
    padding-bottom: 16rpx;
    margin-right: 16rpx;
    line-height: 34rpx;
    &:before {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 40rpx;
      z-index: 2;
      background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.2), transparent);
    }
    &.video {
      width: 450rpx;
    }
    .img {
      display: block;
      width: 100%;
      height: 218rpx;
      margin-bottom: 16rpx;
      background: #eee;
      border-radius: 10rpx;
    }
  }
}

// 视频列表
.video-list {
  padding-left: 0;
  .tit-bar {
    padding-left: 32rpx;
  }
  .video-item {
    width: 686rpx;
    height: 490rpx;
    margin: 0 auto;
    background: #f8f8f8;
    border-radius: 10rpx;
    overflow: hidden;
    margin-bottom: 24rpx;
  }
  .img {
    display: block;
    width: 686rpx;
    height: 390rpx;
    background: #eee;
  }
  .desc {
    padding-left: 40rpx;
    font-size: 30rpx;
    font-weight: 600;
    line-height: 100rpx;
  }
}
</style>
