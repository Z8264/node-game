import Vue from 'vue';
import App from './app.vue';

import './main.css';
import 'animate.css';
import store from './store/index';

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
});
