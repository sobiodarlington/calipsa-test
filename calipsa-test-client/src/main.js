import Vue from 'vue';
import VModal from 'vue-js-modal';
import Notifications from 'vue-notification';
import VPopover from 'vue-js-popover';
import VueProgressBar from 'vue-progressbar';
import { ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import Fragment from 'vue-fragment';
import { Loading } from 'element-ui';
import store from './store';
import App from './App.vue';
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueSocketIO from 'vue-socket.io';
import 'element-ui/lib/theme-chalk/index.css';
import '../public/styles/style.scss';


// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

//Vue.use(VeeValidate);
Vue.use(Fragment.Plugin);
Vue.use(VModal, {
  dialog: true,
  dynamic: true,
});

Vue.use(Notifications);
Vue.use(VPopover, { tooltip: true });
Vue.use(Loading);

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px',
});

Vue.config.productionTip = false;

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

Vue.component('ValidationProvider', ValidationProvider);


Vue.use(
  new VueSocketIO({
    debug: true,
    connection: process.env.VUE_APP_WEB_SOCKET_URL,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_',
    },
  }),
);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
