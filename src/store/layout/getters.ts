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
  const schematicKeys = state.allkeys.map((key: any) => {
    key.schematic_x = parseFloat(key.schematic_x);
    key.schematic_y = parseFloat(key.schematic_y);
    const iSchematicKey = {
      height: key.height,
      id: key.id,
      rotation_angle: key.rotation_angle,
      rotation_x: key.rotation_x,
      rotation_y: key.rotation_y,
      width: key.width,
      x: key.x,
      y: key.y,
      // normalX: key.normalX,
      // normalY: key.normalY,
      // pcbX: key.pcbX,
      // pcbY: key.pcbY,
      // pcbRotation: key.pcbRotation,
      schematic_x: key.schematic_x,
      schematic_y: key.schematic_y,
      schematic_index: key.schematic_index,
      optionFor: key.optionFor,
      targetAlign: key.targetAlign
    } as any;
    return {
      ...iSchematicKey,
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
