import { KeebKey } from "@/models/KeysetLayout/KeebKey";
import { Key } from "@/models/KeysetLayout/Key";
import KeysetLayout from "@/models/KeysetLayout/KeysetLayout";
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
    state.allkeys = new KeysetLayout({ raw }).allRows.flatMap((k: KeebKey[]) =>
      k.map((k2: KeebKey, index: number) => {
        const params = {
          ...k2,
          ...k2.kleKey,
          x: k2.x,
          y: k2.y,
          schematic_index: index,
          schematic_x: k2.gridIndex.col,
          schematic_y: k2.gridIndex.row,
          width: k2.kleKey.width,
          height: k2.kleKey.height,
          rotation_angle: k2.kleKey.rotation_angle,
          rotation_x: k2.kleKey.rotation_x,
          rotation_y: k2.kleKey.rotation_y,
          t1: k2.kleKey.labels[0] || "",
          t2: k2.kleKey.labels[1] || "",
          t3: k2.kleKey.labels[2] || "",
          t4: k2.kleKey.labels[3] || "",
          t5: k2.kleKey.labels[4] || "",
          t6: k2.kleKey.labels[5] || "",
          t7: k2.kleKey.labels[6] || "",
          t8: k2.kleKey.labels[7] || "",
          t9: k2.kleKey.labels[8] || "",
          backgroundHex: k2.kleKey.color
        };
        return new Key(params);
      })
    );
    // writeKeys(state);
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
  pickKey(state: LayoutState, key: Key) {
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
