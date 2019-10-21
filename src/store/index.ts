import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { layout } from "./layout";
import { actions } from "./root/actions";
import { getters } from "./root/getters";
import { mutations } from "./root/mutations";
import { RootState, state } from "./root/RootState";
Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state,
  modules: {
    layout
  },
  actions,
  getters,
  mutations
};

export default new Vuex.Store<RootState>(store);
