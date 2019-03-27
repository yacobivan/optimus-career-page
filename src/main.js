import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'; // Ant Design
import 'ant-design-vue/dist/antd.css'; // Ant Design CSS
import { http } from './utils/Axios'; //Axios Config
import { library } from '@fortawesome/fontawesome-svg-core'; // Font Awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // Font Awesome
import FontAwesomeIcons from './utils/FontAwesome'; // Font Awesome Config
import router from './utils/Router' // Vue Router
import store from './utils/Store' // Vuex Store

// Ant Design
Vue.use(Antd);

// Axios
Vue.prototype.$http = http;

// Font Awesome
library.add(...FontAwesomeIcons.icons);
Vue.component('fa', FontAwesomeIcon);
Vue.config.productionTip = false;

// Filter Currency
Vue.filter('toCurrency', function(value) {
  if (typeof value !== 'number') {
    return value;
  }
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });
  return formatter.format(value);
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
