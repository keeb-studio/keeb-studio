import { GetterTree } from "vuex";
import { AllKeysChange } from "../root/actions";
import { RootState } from "../root/RootState";
import { LayoutState, TabAndType } from "./LayoutState";

const authenticated = (state: LayoutState): boolean => state.authenticated;
const redo = (state: LayoutState): AllKeysChange[] => state.redo;
const gridMode = (state: LayoutState): boolean => state.gridMode;
const showToolbar = (state: LayoutState) => state.showToolbar;

const isTabSelected = (state: LayoutState): Function => {
  return function(tab: string, type: string): boolean {
    return state.activeTabs.some(
      (tabAndType: TabAndType) =>
        tabAndType.type === type && tabAndType.tab === tab
    );
  };
};

const mainView = (state: LayoutState): string => {
  const tab = state.activeTabs.find(
    (tabAndType: TabAndType) => tabAndType.type === "Top"
  );
  if (tab) {
    return (tab as TabAndType).tab;
  }
  return "";
};

function mouseInfo(state: LayoutState): Object {
  return {
    x: state.mouseX,
    y: state.mouseY
  };
}

export const getters: GetterTree<LayoutState, RootState> = {
  authenticated,
  gridMode,
  isTabSelected,
  mainView,
  mouseInfo,
  redo,
  showToolbar
};
