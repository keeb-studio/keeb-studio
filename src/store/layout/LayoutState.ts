import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";

export interface LayoutState {
  allkeys: SimpleKey[];
  cursor: string;
  enableAutoSave: boolean;
  enableAxisNudge: boolean;
  error: boolean;
  gridMode: boolean;
  hasChanges: boolean;
  keebGistId: string | null;
  mainView: string;
  matchingLocation: SimpleKey | null;
  mouseX: number;
  mouseY: number;
  multiSelect: boolean;
  name: string;
  pickingFor: SimpleKey | null;
  raw: string;
  selected: string[];
  timer: any;
  timeSinceChange: number;
  showToolbar: boolean;
  authenticated: boolean;
  done: any[];
  redo: any[];
}

export const state: LayoutState = {
  allkeys: [],
  authenticated: false,
  cursor: "default",
  enableAutoSave: false,
  enableAxisNudge: false,
  error: false,
  gridMode: false,
  hasChanges: false,
  keebGistId: null,
  mainView: "Keys",
  matchingLocation: null,
  mouseX: 0,
  mouseY: 0,
  multiSelect: false,
  name: "",
  pickingFor: null,
  raw: "[]",
  selected: [],
  showToolbar: false,
  timer: null,
  timeSinceChange: -1,
  done: [],
  redo: []
};
