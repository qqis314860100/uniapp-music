<script>
export default {
  onLaunch: function() {
    console.log('App Launch');
  },
  onShow: function(e) {
    // 监听 visibilityChange事件
    console.log('App Show', e);
  },
  onHide: function() {
    console.log('App Hide');
  },
};
</script>

<style lang="scss">
@import '@/common/css/common.scss';
@import '@/common/css/basic.scss';
</style>
