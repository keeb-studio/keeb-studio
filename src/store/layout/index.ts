import { Module } from "vuex";
import { RootState } from "../RootState";
// import { actions } from "./actions";
import { getters } from "./getters";
import { LayoutState } from "./LayoutState";
import { mutations } from "./mutations";

export const state: LayoutState = {
  raw: "[]",
  error: false
};

const namespaced: boolean = true;

export const layout: Module<LayoutState, RootState> = {
  namespaced,
  state,
  getters,
  // actions,
  mutations
};
