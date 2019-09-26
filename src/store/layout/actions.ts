import { SimpleKey } from "@/models/KeysetLayout/SimpleKey.ts";
import MathHelper from "@/models/MathHelper";
import { ActionContext, ActionTree } from "vuex";
import { LayoutState } from ".";
import { RootState } from "../RootState";
import { gistCreate, gistExists, gistUpdate } from "./gistHelpers";
export const actions: ActionTree<LayoutState, RootState> = {
  addMxSwitch,
  changeKeyValue,
  nudge,
  rotateKeys,
  selectKey
};

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

async function addMxSwitch(
  store: ActionContext<LayoutState, RootState>,
  params: any
) {
  const key = new SimpleKey(params);
  store.state.allkeys.push(key);
  store.state.hasChanges = true;
  store.state.timeSinceChange = 0;
  if (store.state.timer === null) {
    store.state.timer = await countDownTimer(store);
  }
  // writeKeys(state);
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
}

async function changeKeyValue(
  store: ActionContext<LayoutState, RootState>,
  { id, property, value }: any
) {
  const keysToChange = store.state.multiSelect ? store.state.selected : [id];
  keysToChange.forEach((id: string) => {
    const key = store.state.allkeys.find((k: SimpleKey) => k.id === id) as any;
    key[property] = value;
  });

  store.state.hasChanges = true;
  store.state.timeSinceChange = 0;
  if (store.state.timer === null) {
    store.state.timer = await countDownTimer(store);
  }
  // writeKeys(state);
}

async function countDownTimer(store: ActionContext<LayoutState, RootState>) {
  return new Promise(resolve => {
    setTimeout(async () => {
      if (store.state.timeSinceChange > -1) {
        if (store.state.timeSinceChange > 3) {
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
  const keysToChange = store.state.selected;

  keysToChange.forEach((id: string) => {
    const theKey = store.state.allkeys.find(
      (k: SimpleKey) => k.id === id
    ) as any;

    if (direction === "up") {
      theKey.rotation_y = theKey.rotation_y - nudge;
      theKey.y = theKey.y - nudge;
    } else if (direction === "down") {
      theKey.rotation_y = theKey.rotation_y + nudge;
      theKey.y = theKey.y + nudge;
    } else if (direction === "right") {
      theKey.rotation_x = theKey.rotation_x + nudge;
      theKey.x = theKey.x + nudge;
    } else if (direction === "left") {
      theKey.rotation_x = theKey.rotation_x - nudge;
      theKey.x = theKey.x - nudge;
    }
  });

  return new Promise(resolve => {
    return resolve(true);
  });
}
async function persist(state: LayoutState): Promise<boolean> {
  //todo move to vuex
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
