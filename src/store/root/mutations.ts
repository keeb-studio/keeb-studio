import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
import { MutationTree } from "vuex";
import { RootState, state } from "./RootState";

const originalState = { ...state };

export const mutations: MutationTree<RootState> = {
  emptyState(rootState: RootState) {
    Object.keys(originalState).forEach((key: any) => {
      (rootState as any)[key] = (originalState as any)[key];
    });
  },
  // include
  selectAll(state: RootState) {
    state.multiSelect = true;
    state.pickingFor = null;
    state.selected = state.allkeys.map((key: SimpleKey) => key.id);
  },

  // include
  toggleMultiSelect(state: RootState) {
    state.multiSelect = !state.multiSelect;
  },

  // include
  pickKey(state: RootState, key: SimpleKey) {
    state.cursor = "crosshair";
    state.pickingFor = key;
  }
};
