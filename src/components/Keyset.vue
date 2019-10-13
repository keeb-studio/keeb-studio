<template>
  <div>
    <KeyTabs />

    <div class="container">
      <div
        class="btn-toolbar justify-content-between m-3"
        role="toolbar"
        aria-label="Toolbar with button groups"
        v-if="showToolbar"
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
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text" id="btnGroupAddon2">@</div>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Input group example"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon2"
          />
        </div>
      </div>
    </div>
    <MainViewKeys iv v-if="mainView === 'Keys'" />
    <MainViewKeys iv v-if="mainView === 'Grid'" />
    <MainViewPlate iv v-if="mainView === 'Plate'" />
    <Kicad iv v-if="mainView === 'Kicad'" />
    <!-- <div class="row">
      {{ allKeys.length }}
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, Mutation } from "vuex-class";
import KeyTabs from "./KeyTabs.vue";
import MainViewKeys from "./MainViewKeys.vue";
import MainViewPlate from "./MainViewPlate.vue";
import Kicad from "./Kicad.vue";
@Component({
  components: {
    KeyTabs,
    MainViewKeys,
    MainViewPlate,
    Kicad
  }
})
export default class Keyset extends Vue {
  @Getter("multiSelect", { namespace: "layout" }) multiSelect: any;
  @Getter("showToolbar", { namespace: "layout" }) showToolbar: any;
  @Getter("gridMode", { namespace: "layout" }) gridMode: any;

  @Mutation("toggleMultiSelect", { namespace: "layout" })
  toggleMultiSelect: any;

  @Mutation("toggleGridMode", { namespace: "layout" }) toggleGridMode: any;

  @Action("addMxSwitch", { namespace: "layout" }) addMxSwitch: any;
  @Action("removeMxSwitch", { namespace: "layout" }) removeMxSwitch: any;
  @Action("addMxSwitch", { namespace: "layout" }) addMxSwitch: any;
  @Action("removeMxSwitch", { namespace: "layout" }) removeMxSwitch: any;
  @Getter("mainView", { namespace: "layout" }) mainView!: string;
  @Getter("showToolbar", { namespace: "layout" }) showToolbar: any;

  @Mutation("selectAll", { namespace: "layout" }) selectAll: any;
  @Getter("allKeys", { namespace: "layout" }) allKeys!: Array<SimpleKey>;
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

<style></style>
