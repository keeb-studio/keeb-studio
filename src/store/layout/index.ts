import { Key } from "@/models/KeysetLayout/Key";
import { Module } from "vuex";
import KeysetLayout from "../../models/KeysetLayout/KeysetLayout";
import { RootState } from "../RootState";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";

export interface LayoutState {
  raw: string;
  error: boolean;
  keyset: KeysetLayout;
  selected: string[];
  allkeys: Key[];
  name: string;
  hasChanges: boolean;
  timeSinceChange: number;
  timer: any;
}

export const state: LayoutState = {
  raw: "[]",
  error: false,
  keyset: new KeysetLayout({ raw: "[]" }),
  selected: [],
  allkeys: [],
  name: "",
  hasChanges: false,
  timeSinceChange: -1,
  timer: null
};

const namespaced: boolean = true;

export const layout: Module<LayoutState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
