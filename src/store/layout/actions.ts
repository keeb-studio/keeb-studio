import KeysetLayout from "@/models/KeysetLayout/KeysetLayout";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey.ts";
import cryptoRandomString from "crypto-random-string";
import { ActionContext, ActionTree } from "vuex";
import { AllKeysChange } from "../root/actions";
import { RootState } from "../root/RootState";
import { LayoutState } from "./LayoutState";

interface RawNameId {
  raw: string;
  name: string;
  id: string;
}

interface ThingWithName {
  name: string;
}
interface KeebGist {
  meta: ThingWithName;
  content: SimpleKey[];
}
export const actions: ActionTree<LayoutState, RootState> = {
  ensureAuthenticated,
  importKle,
  loadAllKeys,
  loadGist,
  toggleAutoSave,
  undo
};

function changeAllkeys(
  store: ActionContext<LayoutState, RootState>,
  changes: AllKeysChange
) {
  //this ensures we save current allkeys state to vuex
  //so if vuex reloads it doesn't loose that state
  localStorage["allKeys"] = JSON.stringify(store.rootState.allkeys);
}
// skip
function loadGist(
  store: ActionContext<LayoutState, RootState>,
  { raw, name, id }: RawNameId
) {
  const { state, rootState } = store;
  rootState.selected = [];
  state.error = false;
  rootState.hasChanges = false;
  rootState.name = name;
  const parsed = JSON.parse(raw) as KeebGist;
  rootState.keebGistId = id;
  rootState.allkeys = parsed.content;
  state.done = [];
  changeAllkeys(store, {
    changeType: "loadGist",
    allkeys: rootState.allkeys
  });
}

// skip
function loadAllKeys(store: ActionContext<LayoutState, RootState>) {
  const allKeys = localStorage.allKeys || false;
  if (allKeys) {
    store.rootState.allkeys = JSON.parse(allKeys);
  }

  const done = localStorage.done || false;
  if (done) {
    store.state.done = JSON.parse(done);
  }
}

// skip
function importKle(
  store: ActionContext<LayoutState, RootState>,
  { raw, name, id }: RawNameId
) {
  const { state, rootState } = store;
  state.error = false;
  rootState.hasChanges = false;
  rootState.name = name;
  rootState.allkeys = KeysetLayout.getAll(raw);

  changeAllkeys(store, {
    changeType: "importKle",
    allkeys: rootState.allkeys
  });
}

// skip
function undo(store: ActionContext<LayoutState, RootState>) {
  // console.log("undo has been called");
}

// skip
function ensureAuthenticated(
  store: ActionContext<LayoutState, RootState>,
  destination: string
) {
  if (localStorage.token === undefined) {
    const github = "https://github.com/login/oauth/authorize";
    const client_id = process.env.VUE_APP_GITHUB_CLIENT_ID || "";
    const scope = "gist";
    const state = cryptoRandomString({ length: 12 });
    localStorage["github_state"] = state;
    localStorage["destinationPage"] = destination;
    const url = `${github}/?client_id=${client_id}&scope=${scope}&state=${state}`;
    window.location.assign(url);
  }
}

// skip
function toggleAutoSave(store: ActionContext<LayoutState, RootState>) {
  store.rootState.enableAutoSave = !store.rootState.enableAutoSave;
}
