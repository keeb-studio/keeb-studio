import { Key } from "@/models/KeysetLayout/Key";
import axios from "axios";
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

export async function gistExists(
  name: string,
  token: string
): Promise<boolean | string> {
  // const token = localStorage.getItem("token") || "";
  // const config = {
  //   method: "get",

  //   withCredentials: true,
  //   crossdomain: true
  // } as any;
  try {
    const path = "https://api.github.com/gists";
    const resp = await axios.get(path, {
      withCredentials: true,
      headers: {
        Authorizaion: `Bearer ${token}`
      }
    });

    let isFound = false;
    if (resp.status === 200) {
      const matching = resp.data.find(
        (gist: any) => gist.files[`${name}.keeb.json`] !== undefined
      );
      if (matching !== undefined) {
        isFound = matching.id;
      }
    }
    return new Promise(resolve => {
      return resolve(isFound);
    });
  } catch (error) {
    return new Promise(resolve => {
      return resolve(false);
    });
  }
}
