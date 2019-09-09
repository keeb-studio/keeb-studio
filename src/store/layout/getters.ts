import { GetterTree } from "vuex";
import KeysetLayout from "../../models/KeysetLayout/KeysetLayout";
import { RootState } from "../RootState";
import { LayoutState } from "./LayoutState";

export const getters: GetterTree<LayoutState, RootState> = {
  keyset(state): KeysetLayout {
    const { raw } = state;
    return new KeysetLayout({ raw });
  }
};
