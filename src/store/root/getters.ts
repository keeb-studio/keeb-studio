import { ISchematicKey } from "@/models/KeysetLayout/IGrid";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
import GridPlacer from "@/models/KicadSchematic/GridPlacer";
import MathHelper from "@/models/MathHelper";
import { GetterTree } from "vuex";
import { MutationActions, RootState } from "./RootState";

function enableAxisNudge(state: RootState): boolean {
  return state.enableAxisNudge;
}

const allKeys = (state: RootState): Array<SimpleKey> => state.allkeys;
const cursor = (state: RootState): string => state.cursor;
const done = (state: RootState): MutationActions[] => state.done;
const enableAutoSave = (state: RootState): boolean => state.enableAutoSave;
const hasChanges = (state: RootState): boolean => state.hasChanges;
const multiSelect = (state: RootState): boolean => state.multiSelect;
const singleKey = (state: RootState): boolean => state.selected.length === 1;
const timeSinceChanged = (state: RootState): number => state.timeSinceChange;
const name = (state: RootState): string => state.name.replace(".keeb.json", "");
function totalGridKeys(state: RootState) {
  let rowMax = -1;
  let colMax = -1;
  let rowTotals = {} as any;
  let colTotals = {} as any;
  const totals = state.allkeys
    .filter((key: SimpleKey) => key.optionFor === null)
    .map((key: SimpleKey) => {
      if (rowMax < key.schematic_y) {
        rowMax = key.schematic_y;
      }

      if (colMax < key.schematic_x) {
        colMax = key.schematic_x;
      }

      if (colTotals[key.schematic_x] === undefined) {
        colTotals[key.schematic_x] = 1;
      } else {
        colTotals[key.schematic_x] = colTotals[key.schematic_x] + 1;
      }

      if (rowTotals[key.schematic_y] === undefined) {
        rowTotals[key.schematic_y] = 1;
      } else {
        rowTotals[key.schematic_y] = rowTotals[key.schematic_y] + 1;
      }

      return { row: key.schematic_y, col: key.schematic_x };
    });

  const rowResults = [];
  const colResults = [];
  for (var row in rowTotals) {
    rowResults.push(`${row}: ${rowTotals[row]} `);
  }

  for (var col in colTotals) {
    colResults.push(`${col}: ${colTotals[col]} `);
  }
  return { cols: colResults, rows: rowResults };
}

function calculatedPositions(state: RootState): Array<ISchematicKey> {
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

function selectedKeys(state: RootState): Array<SimpleKey> {
  return state.selected
    .map(
      (id: string | number) =>
        state.allkeys.find(x => x.id === id) || new SimpleKey()
    )
    .filter((x: SimpleKey) => x.id !== "");
}

function unSelectedKeys(state: RootState): Array<SimpleKey> {
  return state.allkeys.filter((x: SimpleKey) => !state.selected.includes(x.id));
}

function isSelectedGetter(state: RootState): Function {
  return function(id: string): boolean {
    return selectedKeys(state).find(x => x.id === id) !== undefined;
  };
}

function lastSelectedKey(state: RootState): SimpleKey {
  const selected = selectedKeys(state);
  return selected[selected.length - 1];
}

function thePoints(state: RootState): any {
  const lastKey = lastSelectedKey(state);
  if (lastKey) {
    const {
      x,
      y,
      width,
      height,
      rotation_angle,
      rotation_x,
      rotation_y
    } = lastKey;
    return MathHelper.rotateKey(
      x,
      y,
      width,
      height,
      rotation_angle,
      rotation_x,
      rotation_y
    );
  }
  return {
    a: { x: 0, y: 0 },
    b: { x: 0, y: 0 },
    c: { x: 0, y: 0 },
    d: { x: 0, y: 0 }
  };
}
export const getters: GetterTree<RootState, RootState> = {
  selectedKeys,
  calculatedPositions,
  done,
  unSelectedKeys,
  enableAxisNudge,
  allKeys,
  cursor,
  enableAutoSave,
  hasChanges,
  multiSelect,
  singleKey,
  timeSinceChanged,
  name,
  totalGridKeys,
  isSelectedGetter,
  thePoints,
  lastSelectedKey
};
