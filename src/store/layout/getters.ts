import { Key } from "@/models/KeysetLayout/Key";
import { GetterTree } from "vuex";
import KeysetLayout from "../../models/KeysetLayout/KeysetLayout";
import { RootState } from "../RootState";
import { LayoutState } from "./LayoutState";

export const getters: GetterTree<LayoutState, RootState> = {
  singleKey(state): boolean {
    return state.selected.length === 1;
  },

  selectedKeys(state): Array<Key> {
    return state.selected
      .map((id: string) => state.allkeys.find(x => x.id === id) || new Key())
      .filter((x: Key) => x.id !== "");
  },

  keyset(state): KeysetLayout {
    return state.keyset;
  },

  allKeys(state, getters): Key[] {
    // writeKeys(state);
    return state.allkeys;
  }
};
