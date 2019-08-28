import Vue from 'vue'
import VueResource from 'vue-resource';
import App from './App.vue'

Vue.use(VueResource);
Vue.filter('product-search');

Vue.http.interceptors.push((request, next) => {
  console.log(request);
  if (request.method == 'POST') {
    request.method = 'PUT';
  }
  next(response => {
    response.json = () => { return {messages: response.body} }
  });
});

new Vue({
  el: '#app',
  render: h => h(App)
})
