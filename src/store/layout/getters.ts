import { KeebKey } from "@/models/KeysetLayout/KeebKey";
import { Key } from "@/models/KeysetLayout/Key";
import { GetterTree } from "vuex";
import KeysetLayout from "../../models/KeysetLayout/KeysetLayout";
import { RootState } from "../RootState";
import { LayoutState } from "./LayoutState";

export const getters: GetterTree<LayoutState, RootState> = {
  singleKey(state): boolean {
    return state.selected.length === 1;
  },

  selectedKeys(state): Array<KeebKey> {
    // const ids = state.selected.map((id: string) => { return });
    return [];
  },
  keyset(state): KeysetLayout {
    return state.keyset;
  },

  allKeys(state, getters): Key[] {
    writeKeys(state);
    return state.allkeys;
  }
};

export function writeKeys(state: LayoutState): any {
  const json = JSON.stringify(state.allkeys);
  if (state.keyset.kleParsed[0]) {
    localStorage[state.keyset.kleParsed[0].name] = json;
  }
  return null;
}
