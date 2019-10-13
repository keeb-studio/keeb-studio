import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
import { MutationTree } from "vuex";
import { LayoutState } from "./LayoutState";

export const mutations: MutationTree<LayoutState> = {
  selectAll(state: LayoutState) {
    state.multiSelect = true;
    state.pickingFor = null;
    state.selected = state.allkeys.map((key: SimpleKey) => key.id);
  },

  toggleMultiSelect(state: LayoutState) {
    state.multiSelect = !state.multiSelect;
  },

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

  pickKey(state: LayoutState, key: SimpleKey) {
    state.cursor = "crosshair";
    state.pickingFor = key;
  },

  updateMousePos(state: LayoutState, { x, y }) {
    state.mouseX = x;
    state.mouseY = y;
  },

  setTab(state: LayoutState, tab: string) {
    state.showToolbar = ["Keys", "Grid"].includes(tab);
    state.gridMode = tab === "Grid";
    state.mainView = tab;
  }
};

export function writeKeys(state: LayoutState): any {
  localStorage[state.name] = JSON.stringify(state.allkeys);
}
