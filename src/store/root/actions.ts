import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
import MathHelper from "@/models/MathHelper";
import { ActionContext, ActionTree } from "vuex";
import { gistCreate, gistExists, gistUpdate } from "../layout/gistHelpers";
import { RootState } from "./RootState";

//todo make mutation
export const actions: ActionTree<RootState, RootState> = {
  toggleAxisNudge(store: ActionContext<RootState, RootState>) {
    store.state.enableAxisNudge = !store.state.enableAxisNudge;
  },

  handleKeydown(
    store: ActionContext<RootState, RootState>,
    keyevent: KeyboardEvent
  ) {
    // if (store.state.keebGistId !== null) {
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
      // store.dispatch('nudge', )
      nudge(store, { nudge: 1, direction });
    }
    // }
  },
  addMxSwitch,
  changeKeyValue,
  nudge,
  removeMxSwitch,
  rotateKeys,
  selectKey
};

// include

// include
async function selectKey(
  store: ActionContext<RootState, RootState>,
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

// include
async function removeMxSwitch(store: ActionContext<RootState, RootState>) {
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

// include
async function addMxSwitch(
  store: ActionContext<RootState, RootState>,
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

// include
async function rotateKeys(store: ActionContext<RootState, RootState>) {
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

// include
async function changeKeyValue(
  store: ActionContext<RootState, RootState>,
  { id, property, value }: any
) {
  const keysToChange = store.state.multiSelect ? store.state.selected : [id];
  let atLeastOneChange = false;
  keysToChange.forEach((id: string) => {
    const key = store.state.allkeys.find((k: SimpleKey) => {
      return k.id === id;
    }) as any;
    const currentValue = key[property];
    if (
      isNaN(currentValue) ||
      currentValue === "" ||
      property === "optionFor"
    ) {
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

// include
async function nudge(
  store: ActionContext<RootState, RootState>,
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

// skip
async function triggerChanges(store: ActionContext<RootState, RootState>) {
  const state = store.state;
  state.hasChanges = true;
  state.timeSinceChange = 0;
  if (state.timer === null) {
    state.timer = await countDownTimer(store);
  }
}

// skip
async function countDownTimer(store: ActionContext<RootState, RootState>) {
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

// skip
async function persist(state: RootState): Promise<boolean> {
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

export interface AllKeysChange {
  changeType: string;
  allkeys: SimpleKey[];
}

function changeAllkeys(
  store: ActionContext<RootState, RootState>,
  changes: AllKeysChange
) {
  //this ensures we save current allkeys state to vuex
  //so if vuex reloads it doesn't loose that state
  const { state } = store;
  localStorage["allKeys"] = JSON.stringify(state.allkeys);
}
