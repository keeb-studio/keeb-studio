<template>
  <div class="container">
    <div
      class="btn-toolbar justify-content-between m-3"
      role="toolbar"
      aria-label="Toolbar with button groups"
      v-if="toolbarVisible"
    >
      <div class="btn-group" role="group" aria-label="First group">
        <button type="button" class="btn btn-outline-primary" @click="addMx">
          Add
        </button>

        <button
          type="button"
          class="btn btn-outline-primary mr-2"
          @click="removeMxSwitch"
        >
          Remove
        </button>

        <button
          type="button"
          class="btn btn-outline-primary"
          @click="selectAll"
        >
          Select All
        </button>

        <button
          type="button"
          class="btn btn-outline-primary"
          @click="toggleMultiSelect"
        >
          Multi: {{ multiSelect ? "on" : "off" }}
        </button>
      </div>

      <div class="btn-group" role="group" aria-label="Second group">
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="undo"
          :disabled="done.length <= 1"
        >
          Undo
        </button>
        <!-- <button type="button" class="btn btn-outline-primary" @click="redo">
          Redo
        </button> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, Getter, Mutation } from "vuex-class";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
import { AllKeysChange } from "../store/layout/actions";
@Component({})
export default class Toolbar extends Vue {
  name: string = "Toolbar";

  @Action("addMxSwitch", { namespace: "layout" }) addMxSwitch: any;
  @Action("removeMxSwitch", { namespace: "layout" }) removeMxSwitch: any;
  @Action("undo", { namespace: "layout" }) undo: any;
  @Getter("allKeys", { namespace: "layout" }) allKeys!: Array<SimpleKey>;
  @Getter("done", { namespace: "layout" }) done!: AllKeysChange[];
  @Getter("gridMode", { namespace: "layout" }) gridMode: any;
  @Getter("mainView", { namespace: "layout" }) mainView!: string;
  @Getter("multiSelect", { namespace: "layout" }) multiSelect: any;
  @Mutation("selectAll", { namespace: "layout" }) selectAll: any;
  @Mutation("toggleGridMode", { namespace: "layout" }) toggleGridMode: any;

  @Mutation("toggleMultiSelect", { namespace: "layout" })
  toggleMultiSelect: any;

  get toolbarVisible() {
    return ["Grid", "Keys"].includes(this.mainView);
  }

  redo() {}

  addMx() {
    const maxY =
      this.allKeys.reduce((previosKey: SimpleKey, key: SimpleKey) => {
        const biggerKey = key.y > previosKey.y ? key : previosKey;
        return biggerKey;
      }).y + 1;

    this.addMxSwitch({ x: 0, y: maxY });
  }
}
</script>
