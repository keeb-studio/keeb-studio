import { GetterTree } from "vuex";
import { AllKeysChange } from "../root/actions";
import { RootState } from "../root/RootState";
import { LayoutState } from "./LayoutState";

const authenticated = (state: LayoutState): boolean => state.authenticated;
const done = (state: LayoutState): AllKeysChange[] => state.done;
const redo = (state: LayoutState): AllKeysChange[] => state.redo;
const gridMode = (state: LayoutState): boolean => state.gridMode;
const mainView = (state: LayoutState): string => state.mainView;
const showToolbar = (state: LayoutState) => state.showToolbar;

const isTabSelected = (state: LayoutState): Function => {
  return function(tab: string): boolean {
    return state.mainView === tab;
  };
};

function mouseInfo(state: LayoutState): Object {
  return {
    x: state.mouseX,
    y: state.mouseY
  };
}

export const getters: GetterTree<LayoutState, RootState> = {
  authenticated,
  done,
  gridMode,
  isTabSelected,
  mainView,
  mouseInfo,
  redo,
  showToolbar
};
