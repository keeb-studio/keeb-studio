import { MutationTree } from "vuex";
import { LayoutState } from "./LayoutState";

export const mutations: MutationTree<LayoutState> = {
  // skip
  hideToolbar(state: LayoutState) {
    state.showToolbar = false;
  },

  // skip
  setAuthenticated(state: LayoutState, authenticated: boolean) {
    state.authenticated = authenticated;
  },

  // skip
  toggleGridMode(state: LayoutState) {
    state.gridMode = !state.gridMode;
  },

  // skip
  layoutError(state: LayoutState) {
    state.error = true;
    state.raw = "{}";
  },

  // skip
  updateMousePos(state: LayoutState, { x, y }) {
    state.mouseX = x;
    state.mouseY = y;
  },

  // skip
  setTab(state: LayoutState, tab: string) {
    state.showToolbar = ["Keys", "Grid"].includes(tab);
    state.gridMode = tab === "Grid";
    state.mainView = tab;
  }
};
