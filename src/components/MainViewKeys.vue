<template>
  <div>
    <div class="row p-3">
      <!-- <input v-model="svgHeight" type="number" /> -->
      <svg
        ref="theSvg"
        width="1200"
        :height="svgHeight"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        v-on:mousemove="updateCoordinates"
      >
        <KeyCap
          v-for="k in unSelectedKeys"
          :key="k.id"
          v-bind="k"
          :model-key="k"
          outlineColor="black"
        />
        <KeyCap
          v-for="k in selectedKeys"
          :key="k.id"
          v-bind="k"
          :model-key="k"
          outlineColor="black"
        />

        <circle
          v-if="lastSelectedKey"
          :cx="axisPoint.x"
          :cy="axisPoint.y"
          r="2"
          fill="red"
        />
      </svg>
    </div>

    <KeyTabs
      type="Editor"
      :tabs="['Position', 'Appearence', 'Grid', 'History', 'Old']"
    />

    <OldEditor v-if="isTabSelected('Old', 'Editor')" :the-key="theKey" />

    <PositionEditor
      v-if="isTabSelected('Position', 'Editor')"
      :the-key="theKey"
    />

    <AppearanceEditor
      v-if="isTabSelected('Appearence', 'Editor')"
      :the-key="theKey"
    />
    <GridEditor v-if="isTabSelected('Grid', 'Editor')" :the-key="theKey" />
    <HistoryEditor v-if="isTabSelected('History', 'Editor')" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation, Action } from "vuex-class";
import KeyCap from "./Keyset/KeyCapV2.vue";
import KeyEditor from "./KeyEditor.vue";
import PcbCalc from "./PcbCalc.vue";
import SchematicMeta from "./SchematicMeta.vue";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
import GridPlacer from "@/models/KicadSchematic/GridPlacer";
import KicadSchematic from "@/models/KicadSchematic/KicadSchematic";
import MathHelper from "../models/MathHelper";
import KeyTabs from "./KeyTabs.vue";

import AppearanceEditor from "./Editors/AppearanceEditor.vue";
import GridEditor from "./Editors/GridEditor.vue";
import HistoryEditor from "./Editors/HistoryEditor.vue";
import OldEditor from "./Editors/OldEditor.vue";
import PositionEditor from "./Editors/PositionEditor.vue";
import { ISchematicKey } from "@/models/KeysetLayout/IGrid";

@Component({
  components: {
    AppearanceEditor,
    GridEditor,
    HistoryEditor,
    OldEditor,
    PositionEditor,
    KeyCap,
    KeyEditor,
    PcbCalc,
    SchematicMeta,
    KeyTabs,
    MainViewKeys
  }
})
export default class MainViewKeys extends Vue {
  svgHeight: number = 650;
  updateCoordinates(event: any) {
    const svg = this.$refs.theSvg as any;
    const box = svg.getBoundingClientRect();
    const x = MathHelper.roundResult((event.clientX - box.left) / 54);
    const y = MathHelper.roundResult((event.clientY - box.top) / 54);
    this.updateMousePos({ x, y });
  }

  get axisPoint() {
    const key = this.lastSelectedKey as SimpleKey;
    const x = key.rotation_x * 54;
    const y = key.rotation_y * 54;
    return { x, y };
  }

  get theKey() {
    return this.lastSelectedKey || new SimpleKey();
  }

  @Action("rotateKeys") rotateKeys: any;
  @Getter("allKeys") allKeys: any;
  @Getter("lastSelectedKey") lastSelectedKey: any;
  @Getter("name") name: any;
  @Getter("selectedKeys") selectedKeys: any;
  @Getter("isTabSelected", { namespace: "layout" }) isTabSelected!: Function;
  @Getter("mouseInfo", { namespace: "layout" }) mouseInfo: any;
  @Getter("thePoints") thePoints: any;
  @Getter("unSelectedKeys") unSelectedKeys: any;
  @Mutation("updateMousePos", { namespace: "layout" }) updateMousePos: any;
}
</script>

<style></style>
