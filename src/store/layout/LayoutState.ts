import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";

export interface LayoutState {
  error: boolean;
  gridMode: boolean;
  matchingLocation: SimpleKey | null;
  mouseX: number;
  mouseY: number;
  raw: string;
  showToolbar: boolean;
  authenticated: boolean;
  done: any[];
  redo: any[];
  activeTabs: TabAndType[];
}

export interface TabAndType {
  tab: string;
  type: string;
}
export const state: LayoutState = {
  authenticated: false,
  error: false,
  gridMode: false,
  matchingLocation: null,
  mouseX: 0,
  mouseY: 0,
  raw: "[]",
  showToolbar: false,
  done: [],
  redo: [],
  activeTabs: []
};
