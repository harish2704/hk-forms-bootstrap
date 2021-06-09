import Vue from 'vue';
import Example from './Example.vue';
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "Vue.use" call
// import HkFormBootstrap from '@/entry.esm';
// Vue.use(HkFormBootstrap);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Example),
}).$mount('#app');
