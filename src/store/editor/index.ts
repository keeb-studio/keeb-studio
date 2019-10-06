import { Module } from "vuex";
import { RootState } from "../RootState";
import { actions } from "./actions";
import { EditorState, state } from "./EditorState";
import { getters } from "./getters";
import { mutations } from "./mutations";
const namespaced: boolean = true;

export const editor: Module<EditorState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
