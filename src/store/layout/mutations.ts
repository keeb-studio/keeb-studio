import { MutationTree } from "vuex";
import { LayoutState } from "./LayoutState";

export const mutations: MutationTree<LayoutState> = {
  layoutLoaded(state, payload: string) {
    console.log("payload", payload);
    state.error = false;
    state.raw = payload;
  },
  layoutError(state) {
    state.error = true;
    state.raw = "{}";
  }
};
