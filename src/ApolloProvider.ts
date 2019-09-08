import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import VueApollo from "vue-apollo";

export default function getProvider() {
  const link = new HttpLink({
    uri: `https://api.github.com/graphql`
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token") || "";
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

  return new VueApollo({
    defaultClient: apolloClient
  });
}
