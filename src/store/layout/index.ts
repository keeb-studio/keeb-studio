import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
import { Module } from "vuex";
import { RootState } from "../RootState";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";

export interface LayoutState {
  raw: string;
  error: boolean;
  selected: string[];
  allkeys: SimpleKey[];
  name: string;
  hasChanges: boolean;
  timeSinceChange: number;
  timer: any;
  keebGistId: string | null;
  multiSelect: boolean;
  gridMode: boolean;
  pickingFor: SimpleKey | null;
  cursor: string;
  mouseX: number;
  mouseY: number;
  enableAutoSave: boolean;
  enableAxisNudge: boolean;
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
  cursor: "default",
  mouseX: 0,
  mouseY: 0,
  enableAutoSave: false,
  enableAxisNudge: false
};

const namespaced: boolean = true;

export const layout: Module<LayoutState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
