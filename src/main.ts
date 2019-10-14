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

store.subscribe((mutation: any, state: any) => {
  if (mutation.type !== "layout/updateMousePos") {
    // console.log(mutation.type);
    // console.log(mutation.payload);
    // console.log(state);
  }
});
store.subscribeAction((action: any, state: any) => {
  // console.log(action.type);
  // console.log(action.payload);
  // console.log(state);
});

new Vue({
  el: "#app",
  router,
  store,
  apolloProvider: getApolloProvider(),
  render: h => h(App),
  methods: {
    ...mapActions({ handleKeydown: "handleKeydown" }),
    keydownListener: function(event: KeyboardEvent) {
      (this as any).handleKeydown(event);
    }
  },
  beforeCreate() {
    this.$store.commit(
      "layout/setAuthenticated",
      localStorage.token !== undefined
    );
    this.$store.dispatch("layout/loadAllKeys");
  },
  created: function() {
    document.addEventListener("keydown", this.keydownListener);
  },
  destroyed: function() {
    document.removeEventListener("keydown", this.keydownListener);
  }
});
