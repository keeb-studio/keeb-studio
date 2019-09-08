import Vue from "vue";
import VueApollo from "vue-apollo";
import getApolloProvider from "./ApolloProvider";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueApollo);
new Vue({
  router,
  store,
  apolloProvider: getApolloProvider(),
  render: h => h(App)
}).$mount("#app");
