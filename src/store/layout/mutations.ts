import { MutationTree } from "vuex";
import { LayoutState, TabAndType } from "./LayoutState";

export const mutations: MutationTree<LayoutState> = {
  hideToolbar(state: LayoutState) {
    state.showToolbar = false;
  },

  setAuthenticated(state: LayoutState, authenticated: boolean) {
    state.authenticated = authenticated;
  },

  toggleGridMode(state: LayoutState) {
    state.gridMode = !state.gridMode;
  },

  layoutError(state: LayoutState) {
    state.error = true;
    state.raw = "{}";
  },

  updateMousePos(state: LayoutState, { x, y }) {
    state.mouseX = x;
    state.mouseY = y;
  },

  setTab(state: LayoutState, payload: TabAndType) {
    const { tab, type } = payload;
    if (type === "Top") {
      state.showToolbar = ["Keys", "Grid"].includes(tab);
      state.gridMode = tab === "Grid";
    }
    state.activeTabs = state.activeTabs.filter(
      (tab: TabAndType) => tab.type !== payload.type
    );
    state.activeTabs.push(payload);
  }
};
