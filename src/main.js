import Vue from 'vue'
import ElementUI from 'element-ui';
import '../theme/index.css';
import App from './App'
import router from './router'
import store from './store/index'

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
