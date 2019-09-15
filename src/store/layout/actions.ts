import { Key } from "@/models/KeysetLayout/Key";
import { ActionContext, ActionTree } from "vuex";
import { LayoutState } from ".";
import { RootState } from "../RootState";

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
    setTimeout(() => {
      if (store.state.timeSinceChange > -1) {
        store.state.timeSinceChange += 1;
      }
      countDownTimer(store);
    }, 1000);
    resolve("resolved");
  });
}
