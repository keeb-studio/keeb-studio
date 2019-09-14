import { KeebKey } from "@/models/KeysetLayout/KeebKey";
import { Key } from "@/models/KeysetLayout/Key";
import KeysetLayout from "@/models/KeysetLayout/KeysetLayout";
import { MutationTree } from "vuex";
import { LayoutState } from "./LayoutState";

export const mutations: MutationTree<LayoutState> = {
  layoutLoaded(state: LayoutState, { raw, name }) {
    state.error = false;
    state.name = name;
    state.keyset = new KeysetLayout({ raw });
    state.allkeys = state.keyset.allRows.flatMap((k: KeebKey[]) =>
      k.map((k2: KeebKey) => {
        const params = {
          ...k2,
          ...k2.kleKey,
          x: k2.x,
          y: k2.y,
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
    writeKeys(state);
  },
  loadFromStorage(state: LayoutState, name) {
    const parsed = JSON.parse(localStorage[name]);
    state.allkeys = parsed;
  },
  layoutError(state: LayoutState) {
    state.error = true;
    state.raw = "{}";
  },
  changeKeyValue(state: LayoutState, { id, property, value }) {
    const key = state.allkeys.find((k: Key) => k.id === id) as any;
    key[property] = value;
    writeKeys(state);
  },
  selectKey(state, selectedKey: string) {
    // const { selected } = state;
    // if (selected.includes(selectedKey)) {
    //   state.selected = selected.filter((id: string) => selectedKey !== id);
    // } else {
    //   selected.push(selectedKey);
    // }
    state.selected = [selectedKey];
  }
};

export function writeKeys(state: LayoutState): any {
  const json = JSON.stringify(state.allkeys);
  const parsed = state.keyset.kleParsed[0] as any;
  if (parsed) {
    localStorage[state.name] = json;
  }
  return null;
}
