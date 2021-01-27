import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

App.mpType = 'app';

Vue.prototype.$imgSuffix = '?imageView&thumbnail=369x0&quality=75&tostatic=0';

const app = new Vue({
  ...App,
});
app.$mount();
