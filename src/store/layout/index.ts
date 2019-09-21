import { Key } from "@/models/KeysetLayout/Key";
import { Module } from "vuex";
import { RootState } from "../RootState";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";

export interface LayoutState {
  raw: string;
  error: boolean;
  selected: string[];
  allkeys: Key[];
  name: string;
  hasChanges: boolean;
  timeSinceChange: number;
  timer: any;
  keebGistId: string | null;
  multiSelect: boolean;
  gridMode: boolean;
  pickingFor: Key | null;
  cursor: string;
}

export const state: LayoutState = {
  allkeys: [],
  error: false,
  hasChanges: false,
  keebGistId: null,
  name: "",
  raw: "[]",
  selected: [],
  timer: null,
  timeSinceChange: -1,
  multiSelect: false,
  gridMode: false,
  pickingFor: null,
  cursor: "default"
};

const namespaced: boolean = true;

export const layout: Module<LayoutState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
