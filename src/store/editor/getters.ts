import { GetterTree } from "vuex";
import { RootState } from "../RootState";
import { EditorState } from "./EditorState";

const mainView = (state: EditorState): string => state.mainView;
const isTabSelected = (state: EditorState): Function => {
  return function(tab: string): boolean {
    return state.mainView === tab;
  };
};
export const getters: GetterTree<EditorState, RootState> = {
  mainView,
  isTabSelected
};
