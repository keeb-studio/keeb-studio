import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";

export interface LayoutState {
  error: boolean;
  gridMode: boolean;
  mainView: string;
  matchingLocation: SimpleKey | null;
  mouseX: number;
  mouseY: number;
  raw: string;
  showToolbar: boolean;
  authenticated: boolean;
  done: any[];
  redo: any[];
}

export const state: LayoutState = {
  authenticated: false,
  error: false,
  gridMode: false,
  mainView: "Keys",
  matchingLocation: null,
  mouseX: 0,
  mouseY: 0,
  raw: "[]",
  showToolbar: false,
  done: [],
  redo: []
};
