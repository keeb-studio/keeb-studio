import { Module } from "vuex";
import { RootState } from "../root/RootState";
import { actions } from "./actions";
import { getters } from "./getters";
import { LayoutState, state } from "./LayoutState";
import { mutations } from "./mutations";

const namespaced: boolean = true;

export const layout: Module<LayoutState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
