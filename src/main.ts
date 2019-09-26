import "bootstrap/dist/css/bootstrap.min.css";
import Vue from "vue";
import VueApollo from "vue-apollo";
import { mapActions } from "vuex";
import getApolloProvider from "./ApolloProvider";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueApollo);
new Vue({
  el: "#app",
  router,
  store,
  apolloProvider: getApolloProvider(),
  render: h => h(App),
  methods: {
    ...mapActions({ handleKeydown: "layout/handleKeydown" }),
    keydownListener: function(event: KeyboardEvent) {
      (this as any).handleKeydown(event);
    }
  },
  created: function() {
    document.addEventListener("keydown", this.keydownListener);
  },
  destroyed: function() {
    document.removeEventListener("keydown", this.keydownListener);
  }
});
