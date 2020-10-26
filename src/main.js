import Vue from 'vue';
import App from './App.vue';
import Function from './modules/function';
import {msgHello, msgStart} from './modules/messages'

Vue.config.productionTip = false;

new Function (msgHello);
new Function (msgStart);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
