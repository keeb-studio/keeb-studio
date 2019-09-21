import { ISchematicKey } from "@/models/KeysetLayout/IGrid";
import { Key } from "@/models/KeysetLayout/Key";
import GridPlacer from "@/models/KicadSchematic/GridPlacer";
import { GetterTree } from "vuex";
import { LayoutState } from ".";
import { RootState } from "../RootState";

const allKeys = (state: LayoutState): Array<Key> => state.allkeys;
const cursor = (state: LayoutState): string => state.cursor;
const gridMode = (state: LayoutState): boolean => state.gridMode;
const hasChanges = (state: LayoutState): boolean => state.hasChanges;
const multiSelect = (state: LayoutState): boolean => state.multiSelect;
const name = (state: LayoutState): string => state.name;
const singleKey = (state: LayoutState): boolean => state.selected.length === 1;
const timeSinceChanged = (state: LayoutState): number => state.timeSinceChange;

function calculatedPositions(state: LayoutState): Array<ISchematicKey> {
  const schematicKeys = state.allkeys.map((key: Key) => {
    return {
      ...key,
      index: -1
    };
  });

  return GridPlacer.pad(schematicKeys);
}

function unSelectedKeys(state: LayoutState): Array<Key> {
  return state.allkeys.filter((x: Key) => !state.selected.includes(x.id));
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

export const getters: GetterTree<LayoutState, RootState> = {
  allKeys,
  cursor,
  calculatedPositions,
  gridMode,
  hasChanges,
  isSelectedGetter,
  lastSelectedKey,
  multiSelect,
  name,
  selectedKeys,
  singleKey,
  timeSinceChanged,
  unSelectedKeys
};
