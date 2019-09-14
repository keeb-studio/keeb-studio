import { Key } from "@/models/KeysetLayout/Key";
import KeysetLayout from "../../models/KeysetLayout/KeysetLayout";
export interface LayoutState {
  raw: string;
  error: boolean;
  keyset: KeysetLayout;
  selected: string[];
  allkeys: Key[];
  name: string;
}
