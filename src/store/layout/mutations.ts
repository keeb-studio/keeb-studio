import KeysetLayout from "@/models/KeysetLayout/KeysetLayout";
import { MutationTree } from "vuex";
import { LayoutState } from "./LayoutState";

export const mutations: MutationTree<LayoutState> = {
  layoutLoaded(state, payload: string) {
    localStorage.kleraw = payload;
    state.error = false;
    state.raw = payload;
    state.keyset = new KeysetLayout({ raw: payload });
  },
  layoutError(state) {
    state.error = true;
    state.raw = "{}";
  }
};
