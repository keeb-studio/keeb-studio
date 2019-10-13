import KeysetLayout from "@/models/KeysetLayout/KeysetLayout";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey.ts";
import MathHelper from "@/models/MathHelper";
import cryptoRandomString from "crypto-random-string";
import { ActionContext, ActionTree } from "vuex";
import { RootState } from "../RootState";
import { gistCreate, gistExists, gistUpdate } from "./gistHelpers";
import { LayoutState } from "./LayoutState";

export interface AllKeysChange {
  changeType: string;
  allkeys: SimpleKey[];
}

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
  addMxSwitch,
  removeMxSwitch,
  changeKeyValue,
  nudge,
  rotateKeys,
  selectKey,
  handleKeydown,
  toggleAutoSave,
  toggleAxisNudge,
  ensureAuthenticated,
  loadGist,
  importKle,
  loadAllKeys,

  undo(store: ActionContext<LayoutState, RootState>) {
    const { state } = store;
    state.done.pop();
    // for (let index = 0; index < state.allkeys.length; index++) {
    //   state.allkeys.pop();
    // }
    state.allkeys = [];
    const currentChanges = state.done.pop();
    console.log(currentChanges.allkeys);
    state.done.push(currentChanges);
    currentChanges.allkeys.forEach((key: SimpleKey) => state.allkeys.push(key));
  }
};

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

function toggleAutoSave(store: ActionContext<LayoutState, RootState>) {
  store.state.enableAutoSave = !store.state.enableAutoSave;
}

function toggleAxisNudge(store: ActionContext<LayoutState, RootState>) {
  store.state.enableAxisNudge = !store.state.enableAxisNudge;
}

function handleKeydown(
  store: ActionContext<LayoutState, RootState>,
  keyevent: KeyboardEvent
) {
  if (store.state.keebGistId !== null) {
    if (keyevent.code === "KeyS") {
      store.commit("toggleMultiSelect");
    }

    if (store.state.selected.length > 0) {
      let direction;
      const up = ["ArrowUp"];
      const down = ["ArrowDown"];
      const left = ["ArrowLeft"];
      const right = ["ArrowRight"];
      if (up.includes(keyevent.code)) {
        direction = "up";
      } else if (down.includes(keyevent.code)) {
        direction = "down";
      } else if (left.includes(keyevent.code)) {
        direction = "left";
      } else if (right.includes(keyevent.code)) {
        direction = "right";
      }
      nudge(store, { nudge: 1, direction });
    }
  }
}

async function selectKey(
  store: ActionContext<LayoutState, RootState>,
  selectedKey: string
) {
  const state = store.state;
  if (state.pickingFor !== null) {
    if (selectedKey !== state.pickingFor.id) {
      const theKey =
        state.allkeys.find((key: SimpleKey) => key.id === selectedKey) || null;
      await changeKeyValue(store, {
        id: state.pickingFor.id,
        property: "optionFor",
        value: theKey
      });
      state.cursor = "default";
      state.pickingFor = null;
    }
  } else {
    if (state.multiSelect) {
      const { selected } = state;
      if (selected.includes(selectedKey)) {
        state.selected = selected.filter((id: string) => selectedKey !== id);
      } else {
        selected.push(selectedKey);
      }
    } else {
      state.selected = [selectedKey];
    }
  }
}

async function removeMxSwitch(store: ActionContext<LayoutState, RootState>) {
  const selected = store.state.selected;
  const { state } = store;
  state.allkeys = state.allkeys.filter(
    (key: SimpleKey) => !selected.includes(key.id)
  );
  changeAllkeys(store, {
    changeType: "removeMxSwitch",
    allkeys: state.allkeys
  });
  state.selected = [];
  state.hasChanges = true;
  state.timeSinceChange = 0;
  if (state.timer === null) {
    state.timer = await countDownTimer(store);
  }
}

async function addMxSwitch(
  store: ActionContext<LayoutState, RootState>,
  params: any
) {
  const { state } = store;
  const key = new SimpleKey(params);
  state.allkeys.push(key);
  changeAllkeys(store, {
    changeType: "addMxSwitch",
    allkeys: state.allkeys
  });
  state.hasChanges = true;
  state.timeSinceChange = 0;
  if (state.timer === null) {
    state.timer = await countDownTimer(store);
  }
}

async function rotateKeys(store: ActionContext<LayoutState, RootState>) {
  const selected = store.state.selected;
  selected.forEach((keyId: string) => {
    const theKey = store.state.allkeys.find(
      (key: SimpleKey) => key.id === keyId
    ) as SimpleKey;

    const {
      x,
      y,
      width,
      height,
      rotation_angle,
      rotation_x,
      rotation_y
    } = theKey;

    const { d: pointD } = MathHelper.rotateKey(
      x,
      y,
      width,
      height,
      rotation_angle,
      rotation_x,
      rotation_y
    );

    theKey.rotation_angle = theKey.rotation_angle - 90;
    theKey.rotation_x = pointD.x;
    theKey.x = pointD.x;
    theKey.rotation_y = pointD.y;
    theKey.y = pointD.y;
    theKey.width = height;
    theKey.height = width;
  });
  changeAllkeys(store, {
    changeType: "rotateKeys",
    allkeys: store.state.allkeys
  });
}

async function changeKeyValue(
  store: ActionContext<LayoutState, RootState>,
  { id, property, value }: any
) {
  const keysToChange = store.state.multiSelect ? store.state.selected : [id];
  let atLeastOneChange = false;
  keysToChange.forEach((id: string) => {
    const key = store.state.allkeys.find((k: SimpleKey) => k.id === id) as any;
    const currentValue = key[property];
    if (isNaN(currentValue) || currentValue === "") {
      key[property] = value;
      atLeastOneChange = true;
    } else {
      if (!isNaN(value)) {
        atLeastOneChange = true;
        key[property] = value;
      }
    }
  });

  if (atLeastOneChange) {
    changeAllkeys(store, {
      changeType: `changeKeyValue ${id} - ${property} - ${value}`,
      allkeys: store.state.allkeys
    });
  }

  triggerChanges(store);
}

function loadGist(
  store: ActionContext<LayoutState, RootState>,
  { raw, name, id }: RawNameId
) {
  const { state } = store;
  state.selected = [];
  state.error = false;
  state.hasChanges = false;
  state.name = name;
  const parsed = JSON.parse(raw) as KeebGist;
  state.keebGistId = id;
  state.allkeys = parsed.content;
  state.done = [];
  changeAllkeys(store, {
    changeType: "loadGist",
    allkeys: state.allkeys
  });
}

function loadAllKeys(store: ActionContext<LayoutState, RootState>) {
  const allKeys = localStorage.allKeys || false;
  if (allKeys) {
    store.state.allkeys = JSON.parse(allKeys);
  }

  const done = localStorage.done || false;
  if (done) {
    store.state.done = JSON.parse(done);
  }
}

function changeAllkeys(
  store: ActionContext<LayoutState, RootState>,
  changes: AllKeysChange
) {
  const { state } = store;
  state.done.push(changes);
  localStorage["done"] = JSON.stringify(state.done);
  localStorage["allKeys"] = JSON.stringify(state.allkeys);
}

function undo(store: ActionContext<LayoutState, RootState>) {
  const { state } = store;
  state.done.pop();
  const currentAllKeys = state.done[state.done.length - 1];
  console.log(currentAllKeys);
  // state.allkeys = currentAllKeys;
}

function importKle(
  store: ActionContext<LayoutState, RootState>,
  { raw, name, id }: RawNameId
) {
  const { state } = store;
  state.error = false;
  state.hasChanges = false;
  state.name = name;
  state.allkeys = KeysetLayout.getAll(raw);

  changeAllkeys(store, {
    changeType: "importKle",
    allkeys: state.allkeys
  });
}

// TODO move to actions
// function loadFromStorage(
//   store: ActionContext<LayoutState, RootState>,
//   name: string
// ) {
//   const { state } = store;
//   const parsed = JSON.parse(localStorage[name]);
//   state.name = name;
//   state.allkeys = parsed;
//   state.hasChanges = false;
//   state.timeSinceChange = -1;
// }

async function triggerChanges(store: ActionContext<LayoutState, RootState>) {
  const state = store.state;
  state.hasChanges = true;
  state.timeSinceChange = 0;
  if (state.timer === null) {
    state.timer = await countDownTimer(store);
  }
}

async function countDownTimer(store: ActionContext<LayoutState, RootState>) {
  return new Promise(resolve => {
    setTimeout(async () => {
      if (store.state.timeSinceChange > -1) {
        if (store.state.timeSinceChange > 3 && store.state.enableAutoSave) {
          await persist(store.state);
        } else {
          store.state.timeSinceChange += 1;
        }
      }
      countDownTimer(store);
    }, 1000);
    resolve("resolved");
  });
}

async function nudge(
  store: ActionContext<LayoutState, RootState>,
  { nudge, direction }: any
): Promise<boolean> {
  const { state } = store;
  const keysToChange = state.selected;
  const includeAxis = state.enableAxisNudge;

  keysToChange.forEach((id: string) => {
    const theKey = state.allkeys.find((k: SimpleKey) => k.id === id) as any;

    if (direction === "up") {
      if (includeAxis) theKey.rotation_y = theKey.rotation_y - nudge;
      theKey.y = theKey.y - nudge;
    } else if (direction === "down") {
      if (includeAxis) theKey.rotation_y = theKey.rotation_y + nudge;
      theKey.y = theKey.y + nudge;
    } else if (direction === "right") {
      if (includeAxis) theKey.rotation_x = theKey.rotation_x + nudge;
      theKey.x = theKey.x + nudge;
    } else if (direction === "left") {
      if (includeAxis) theKey.rotation_x = theKey.rotation_x - nudge;
      theKey.x = theKey.x - nudge;
    }
  });

  if (direction) {
    changeAllkeys(store, {
      changeType: `nudge - ${direction}`,
      allkeys: state.allkeys
    });
  }

  triggerChanges(store);
  return new Promise(resolve => {
    return resolve(true);
  });
}

async function persist(state: LayoutState): Promise<boolean> {
  //todo move to vuex
  if (!state.enableAutoSave) {
    return new Promise(resolve => {
      return resolve(true);
    });
  }
  const token = localStorage.token;
  const { keebGistId: id, name: kbdName } = state;
  const name = kbdName.replace(".kbd.json", "").replace(".keeb.json", "");
  const content = {
    meta: { name: name },
    content: state.allkeys
  };

  let success = false;
  const possibleId = await gistExists(name, token);
  if (possibleId !== false) {
    const keebGistId = possibleId as string;
    state.keebGistId = keebGistId;
    const id = possibleId as string;
    success = await gistUpdate(id, name, content, token);
    state.timeSinceChange = -1;
    state.hasChanges = false;
  }

  if (success === false) {
    const createdId = await gistCreate(name, content, token);
    if (createdId !== false) {
      const keebGistId = createdId as string;
      state.keebGistId = keebGistId;
      state.timeSinceChange = -1;
      state.hasChanges = false;
    }
  }
  return new Promise(resolve => {
    return resolve(true);
  });
}
