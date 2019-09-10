import KeysetLayout from "../../models/KeysetLayout/KeysetLayout";
export interface LayoutState {
  raw: string;
  error: boolean;
  keyset: KeysetLayout;
}
