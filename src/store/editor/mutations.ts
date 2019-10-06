import { MutationTree } from "vuex";
import { EditorState } from "./EditorState";

const setTab = (state: EditorState, tab: string) => {
  state.mainView = tab;
};

export const mutations: MutationTree<EditorState> = {
  setTab
};
