<template>
  <div>
    Plate
    <div>
      <a
        :href="downloadData"
        :download="downloadName"
        class="btn btn-outline-primary col-form-label pt-0 pb-0 mb-2"
      >
        {{ downloadName }}
      </a>
    </div>
    <div ref="theSvg" id="svg_holder">
      <svg
        version="1.1"
        :id="divId"
        class="svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0"
        y="0"
        viewBox="-2.5 -2.5 400 200"
        width="400mm"
        height="200mm"
        xml:space="preserve"
      >
        <astyle type="text/css">
          .st0{fill:none;stroke:#000000;stroke-width:0.1417;}
        </astyle>
        <template v-if="top">
          <rect
            class="st0"
            :x="plateSize(key).x"
            :y="plateSize(key).y"
            :width="plateSize(key).width"
            :height="plateSize(key).height"
            v-for="key in nonOptionKeys"
            :key="`${key.id}-top`"
            :transform="calcTransform(key)"
          />
        </template>
        <template v-else>
          <rect
            :x="key.pcbX"
            class="st0"
            :y="key.pcbY"
            width="14"
            height="14"
            v-for="key in nonOptionKeys"
            :key="`${key.id}-plate`"
            :transform="calcTransform(key)"
          />

          <rect
            :x="plateStab(key, false).x"
            :y="plateStab(key, false).y"
            :width="plateStab(key, false).width"
            :height="plateStab(key, false).height"
            class="st0"
            v-for="key in needStabs"
            :key="`${key.id}-stab1`"
            :transform="calcTransform(key)"
          />
          <rect
            :x="plateStab(key, true).x"
            :y="plateStab(key, true).y"
            :width="plateStab(key, true).width"
            :height="plateStab(key, true).height"
            class="st0"
            v-for="key in needStabs"
            :key="`${key.id}-stab2`"
            :transform="calcTransform(key)"
          />
        </template>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation, Action } from "vuex-class";
import { SimpleKey } from "../models/KeysetLayout/SimpleKey";
import { ISchematicKey } from "@/models/KeysetLayout/IGrid";

const multiP = 1;
@Component({})
export default class MainViewPlate extends Vue {
  @Prop({ required: true }) readonly top!: boolean;

  @Getter("allKeys") allKeys: any;

  @Getter("calculatedPositions")
  calculatedPositions: any;

  @Getter("name")
  name: any;

  svgString: string = "";

  get divId() {
    return this.top ? "top" : "plate";
  }

  updateSvg(): void {
    const svg = this.$refs.theSvg as any;
    console.log(svg);
    this.svgString = svg.innerHTML;
  }

  get downloadName() {
    return `${this.name}_${this.top ? "top" : "plate"}.svg`;
  }

  get nonOptionKeys(): ISchematicKey[] {
    return this.calculatedPositions;
  }

  get needStabs(): ISchematicKey[] {
    return this.calculatedPositions.filter((key: SimpleKey) => key.width >= 2);
  }

  get svgWithStyle(): string {
    return this.svgString.replace("astyle", "style").replace("astyle", "style");
  }

  updated(): void {
    console.log("updated");
    this.updateSvg();
  }

  calcTransform(key: ISchematicKey): string {
    const adjustX = 7;
    const adjustY = 7;
    const xx = (key.pcbX + adjustX) * multiP;
    const yy = (key.pcbY + adjustY) * multiP;
    const rotation =
      key.optionFor === null
        ? key.rotation_angle
        : key.optionFor.rotation_angle;
    return `rotate(${rotation} ${xx} ${yy})`;
  }

  plateStab(key: ISchematicKey, firstStab: boolean): any {
    const x_adjust = firstStab ? 8.46 : -15.53;
    const x = key.pcbX - x_adjust;
    const y = key.pcbY - 1.41 - 0.59;
    const width = 7.05;
    const height = 18.69 + 0.59 - 1.28;
    return { x, y, width, height };
  }

  plateSize(key: ISchematicKey): any {
    const extra_w = key.width - 1;
    const extra_h = key.height - 1;
    const x_adjust = 2.5025 + 19.05 * extra_w * 0.5;
    const y_adjust = 2.5025 + 19.05 * extra_h * 0.5;
    const width = key.width * 19.05;
    const height = key.height * 19.05;
    return {
      x: key.pcbX - x_adjust,
      y: key.pcbY - y_adjust,
      width,
      height
    };
  }

  get downloadData() {
    var text = this.svgWithStyle;
    var data = new Blob([text], { type: "application/octet-stream" });
    return window.URL.createObjectURL(data);
  }
}
</script>

<style>
.st0 {
  fill: none;
  stroke: #000000;
  stroke-width: 0.1417;
}
#svg_holder {
  overflow: hidden;
}

.svg {
  width: 1000px;
  top: -150px;
  position: relative;
}
</style>
