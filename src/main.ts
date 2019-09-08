import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import Vue from "vue";
import VueApollo from "vue-apollo";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const link = new HttpLink({
  uri: `https://api.github.com/graphql`
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem("ghtoken");
  const token = `cc13bb1740ddb341163fc64c96b51f9b6b47f980`;
  console.log("ghtoken", token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});
const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

// Install the vue plugin
Vue.use(VueApollo);
new Vue({
  router,
  store,
  apolloProvider,
  // tslint:disable-next-line:arrow-parens
  render: h => h(App)
}).$mount("#app");
