import { KeebKey } from "@/models/KeysetLayout/KeebKey";
import { Key } from "@/models/KeysetLayout/Key";
import { GetterTree } from "vuex";
import KeysetLayout from "../../models/KeysetLayout/KeysetLayout";
import { RootState } from "../RootState";
import { LayoutState } from "./LayoutState";

export const getters: GetterTree<LayoutState, RootState> = {
  keyset(state): KeysetLayout {
    return state.keyset;
  },

  allKeys(state): any {
    return state.keyset.allRows.flatMap((k: KeebKey[]) =>
      k.map((k2: KeebKey) => {
        const params = {
          x: k2.x,
          y: k2.y,
          width: k2.kleKey.width,
          height: k2.kleKey.height,
          label: k2.label,
          t1: k2.kleKey.labels[0] || "",
          t2: k2.kleKey.labels[1] || "",
          t3: k2.kleKey.labels[2] || "",
          t4: k2.kleKey.labels[3] || "",
          t5: k2.kleKey.labels[4] || "",
          t6: k2.kleKey.labels[5] || "",
          t7: k2.kleKey.labels[6] || "",
          t8: k2.kleKey.labels[7] || "",
          t9: k2.kleKey.labels[8] || "",
          backgroundHex: k2.kleKey.color
        };
        return new Key(params);
      })
    );
  }
};
