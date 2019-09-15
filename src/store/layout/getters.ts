import { Key } from "@/models/KeysetLayout/Key";
import { GetterTree } from "vuex";
import KeysetLayout from "../../models/KeysetLayout/KeysetLayout";
import { RootState } from "../RootState";
import { LayoutState } from "./LayoutState";

export const getters: GetterTree<LayoutState, RootState> = {
  allKeys,
  isSelectedGetter,
  keyset,
  selectedKeys,
  singleKey,
  unSelectedKeys
};

function allKeys(state: LayoutState): Key[] {
  // writeKeys(state);
  return state.allkeys;
}

function isSelectedGetter(state: LayoutState): Function {
  return function(id: string): boolean {
    return selectedKeys(state).find(x => x.id === id) !== undefined;
  };
}

function keyset(state: LayoutState): KeysetLayout {
  return state.keyset;
}

function selectedKeys(state: LayoutState): Array<Key> {
  return state.selected
    .map((id: string) => state.allkeys.find(x => x.id === id) || new Key())
    .filter((x: Key) => x.id !== "");
}

function singleKey(state: LayoutState): boolean {
  return state.selected.length === 1;
}

function unSelectedKeys(state: LayoutState): Array<Key> {
  return state.allkeys.filter((x: Key) => !state.selected.includes(x.id));
}
