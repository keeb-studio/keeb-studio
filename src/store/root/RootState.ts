import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
import { ActionPayload, MutationPayload } from "vuex";

export interface MutationActions {
  type: string;
  mutationAction: MutationPayload | ActionPayload;
}
export interface RootState {
  allkeys: SimpleKey[];
  cursor: string;
  enableAxisNudge: boolean;
  multiSelect: boolean;
  pickingFor: SimpleKey | null;
  selected: string[];
  version: string;
  timer: any;
  hasChanges: boolean;
  timeSinceChange: number;
  enableAutoSave: boolean;
  keebGistId: string | null;
  name: string;
  done: MutationActions[];
}

export const state: RootState = {
  name: "",
  keebGistId: null,
  enableAutoSave: false,
  allkeys: [],
  cursor: "default",
  enableAxisNudge: false,
  multiSelect: false,
  pickingFor: null,
  selected: [],
  hasChanges: false,
  timer: null,
  timeSinceChange: -1,
  version: "1.0",
  done: []
};
