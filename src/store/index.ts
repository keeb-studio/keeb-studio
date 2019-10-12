import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { layout } from "./layout";
import { RootState } from "./RootState";
Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: "1.0.0" // a simple property
  },
  modules: {
    layout
  }
};

export default new Vuex.Store<RootState>(store);
