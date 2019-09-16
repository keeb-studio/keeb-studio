import { Key } from "@/models/KeysetLayout/Key";
import { ActionContext, ActionTree } from "vuex";
import { LayoutState } from ".";
import { RootState } from "../RootState";
import { gistCreate, gistExists, gistUpdate } from "./gistHelpers";
export const actions: ActionTree<LayoutState, RootState> = {
  changeKeyValue
};

async function changeKeyValue(
  store: ActionContext<LayoutState, RootState>,
  { id, property, value }: any
) {
  const key = store.state.allkeys.find((k: Key) => k.id === id) as any;
  key[property] = value;

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
