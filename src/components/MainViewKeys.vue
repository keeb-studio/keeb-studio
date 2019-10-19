<template>
  <div>
    <div class="row p-3">
      <svg
        ref="theSvg"
        width="1200"
        height="500"
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
    <div class="row" v-if="lastSelectedKey">
      <div class="col-sm-6">
        <KeyEditor v-if="lastSelectedKey" :the-key="lastSelectedKey" />
      </div>
      <div class="col-sm-3">
        <div class="row">
          <div class="col-8 col-sm-6">
            <div>x: {{ mouseInfo.x }}</div>
            <div>y: {{ mouseInfo.y }}</div>

            <div>ax: {{ thePoints.a.x }}</div>
            <div>ay: {{ thePoints.a.y }}</div>
            <div>bx: {{ thePoints.b.x }}</div>
            <div>by: {{ thePoints.b.y }}</div>
            <div>cx: {{ thePoints.c.x }}</div>
            <div>cy: {{ thePoints.c.y }}</div>
            <div>dx: {{ thePoints.d.x }}</div>
            <div>dy: {{ thePoints.d.y }}</div>

            <button
              type="button"
              class="btn btn-outline-primary"
              @click="rotateKeys"
            >
              rotate
            </button>
          </div>
          <div class="col-4 col-sm-6">
            <SchematicMeta v-if="lastSelectedKey" :the-key="lastSelectedKey" />
          </div>
        </div>

        <div class="row">
          <div class="col-8 col-sm-6"></div>
          <div class="col-4 col-sm-6"></div>
        </div>
      </div>
      <div class="col-sm-3">
        <PcbCalc v-if="lastSelectedKey" :the-key="lastSelectedKey" />
      </div>
    </div>
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

@Component({
  components: {
    KeyCap,
    KeyEditor,
    PcbCalc,
    SchematicMeta,
    KeyTabs,
    MainViewKeys
  }
})
export default class MainViewKeys extends Vue {
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
  @Action("rotateKeys") rotateKeys: any;
  @Getter("allKeys") allKeys: any;
  @Getter("lastSelectedKey") lastSelectedKey: any;
  @Getter("mouseInfo", { namespace: "layout" }) mouseInfo: any;
  @Getter("name") name: any;
  @Getter("selectedKeys") selectedKeys: any;
  @Getter("thePoints") thePoints: any;
  @Getter("unSelectedKeys") unSelectedKeys: any;
  @Mutation("updateMousePos", { namespace: "layout" }) updateMousePos: any;
}
</script>

<style></style>
