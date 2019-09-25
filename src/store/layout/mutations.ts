import KeysetLayout from "@/models/KeysetLayout/KeysetLayout";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
import { MutationTree } from "vuex";
import { LayoutState } from "./index";

export const mutations: MutationTree<LayoutState> = {
  toggleMultiSelect(state: LayoutState) {
    state.multiSelect = !state.multiSelect;
  },

  toggleGridMode(state: LayoutState) {
    state.gridMode = !state.gridMode;
  },
  loadGist(state: LayoutState, { raw, name, id }) {
    state.selected = [];
    state.error = false;
    state.hasChanges = false;
    state.name = name;
    const parsed = JSON.parse(raw) as any;
    state.keebGistId = id;
    state.allkeys = parsed.content;
  },
  importKle(state: LayoutState, { raw, name }) {
    state.error = false;
    state.hasChanges = false;
    state.name = name;
    state.allkeys = KeysetLayout.getAll(raw);
  },
  loadFromStorage(state: LayoutState, name) {
    const parsed = JSON.parse(localStorage[name]);
    state.name = name;
    state.allkeys = parsed;
    state.hasChanges = false;
    state.timeSinceChange = -1;
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
  }
};

export function writeKeys(state: LayoutState): any {
  localStorage[state.name] = JSON.stringify(state.allkeys);
}
