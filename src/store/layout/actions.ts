import KeysetLayout from "@/models/KeysetLayout/KeysetLayout";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey.ts";
import cryptoRandomString from "crypto-random-string";
import { ActionContext, ActionTree } from "vuex";
import { AllKeysChange } from "../root/actions";
import { MutationActions, RootState } from "../root/RootState";
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
  loadAllKeysForUndo,
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
  localStorage["allKeysForUndo"] = JSON.stringify(rootState.allkeys);
  let loadedNonInt = false;
  rootState.allkeys.forEach((key: SimpleKey, index: number) => {
    if (isNaN(key.id as any)) {
      loadedNonInt = true;
      const keysThatReference = rootState.allkeys.filter((okey: SimpleKey) => {
        if (okey.optionFor !== null) {
          return okey.optionFor.id === key.id;
        }
        return false;
      });
      keysThatReference.forEach(
        (okey: SimpleKey) => ((okey.optionFor as SimpleKey).id = index)
      );
      key.id = index;
    }
  });
  console.clear();
  console.log(loadedNonInt, "loaded a non int");
}

// skip
function loadAllKeysForUndo(store: ActionContext<LayoutState, RootState>) {
  const allKeys = localStorage.allKeysForUndo || false;
  if (allKeys) {
    store.rootState.allkeys = JSON.parse(allKeys);
  }
}

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

  localStorage["allKeysAllKeysForUndo"] = JSON.stringify(rootState.allkeys);
}

// skip
function undo(store: ActionContext<LayoutState, RootState>) {
  store.rootState.done.pop();
  const replays = [...store.rootState.done];
  store.commit("emptyState", null, { root: true });
  store.commit("setAuthenticated", localStorage.token !== undefined);
  store.dispatch("loadAllKeysForUndo");

  replays.forEach((replay: MutationActions) => {
    if (replay.type === "mutation") {
      store.commit(
        `${replay.mutationAction.type}`,
        replay.mutationAction.payload,
        { root: true }
      );
    } else {
      store.dispatch(
        `${replay.mutationAction.type}`,
        replay.mutationAction.payload,
        { root: true }
      );
    }
    // remove the replay from done
    store.rootState.done.pop();
  });
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
