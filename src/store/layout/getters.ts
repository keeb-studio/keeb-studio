import { Key } from "@/models/KeysetLayout/Key";
import { GetterTree } from "vuex";
import { LayoutState } from ".";
import { RootState } from "../RootState";

export const getters: GetterTree<LayoutState, RootState> = {
  allKeys,
  hasChanges,
  isSelectedGetter,
  multiSelect,
  selectedKeys,
  singleKey,
  timeSinceChanged,
  unSelectedKeys,
  lastSelectedKey,
  gridMode
};

function allKeys(state: LayoutState): Array<Key> {
  return state.allkeys;
}

function timeSinceChanged(state: LayoutState): number {
  return state.timeSinceChange;
}

function multiSelect(state: LayoutState): boolean {
  return state.multiSelect;
}

function gridMode(state: LayoutState): boolean {
  return state.gridMode;
}

function hasChanges(state: LayoutState): boolean {
  return state.hasChanges;
}

function isSelectedGetter(state: LayoutState): Function {
  return function(id: string): boolean {
    return selectedKeys(state).find(x => x.id === id) !== undefined;
  };
}

function lastSelectedKey(state: LayoutState): Key {
  const selected = selectedKeys(state);
  return selected[selected.length - 1];
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
