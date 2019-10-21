<template>
  <div>
    Plate
    <div>
      <!-- {{ svgWithStyle }} -->
      <!-- <input type="text" :value="svgWithStyle" /> -->
      <a
        :href="downloadData"
        :download="`${name}_plate.svg`"
        class="btn btn-outline-primary col-form-label pt-0 pb-0 mb-2"
      >
        {{ name }}_plate.svg
      </a>
    </div>
    <div ref="theSvg" id="svg_holder">
      <svg
        version="1.1"
        id="plate_svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0"
        y="0"
        viewBox="0 0 400 200"
        width="400mm"
        height="200mm"
        xml:space="preserve"
      >
        <astyle type="text/css">
          .st0{fill:none;stroke:#000000;stroke-width:0.1417;}
        </astyle>
        <rect
          :x="key.pcbX"
          :y="key.pcbY"
          class="st0"
          width="14"
          height="14"
          v-for="key in nonOptionKeys"
          :key="key.id"
          :transform="calcTransform(key)"
        />
        <!-- <rect x="29mm" y="10mm" class="st0" width="14mm" height="14mm" />
        <rect x="48mm" y="10mm" class="st0" width="14mm" height="14mm" /> -->
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation, Action } from "vuex-class";
import { SimpleKey } from "../models/KeysetLayout/SimpleKey";

const multiP = 1;
@Component({})
export default class MainViewPlate extends Vue {
  @Getter("allKeys") allKeys: any;

  @Getter("calculatedPositions")
  calculatedPositions: any;

  @Getter("name")
  name: any;

  svgString: string = "";
  updateSvg(): void {
    const svg = this.$refs.theSvg as any;
    this.svgString = svg.innerHTML;
  }
  get nonOptionKeys(): SimpleKey[] {
    return this.calculatedPositions.filter(
      (key: SimpleKey) => key.optionFor === null
    );
  }
  get svgWithStyle(): string {
    return this.svgString.replace("astyle", "style").replace("astyle", "style");
  }
  mounted(): void {
    this.updateSvg();
  }
  calcTransform(key: any): string {
    const adjustX = 7;
    const adjustY = 7;
    const xx = (key.pcbX + adjustX) * multiP;
    const yy = (key.pcbY + adjustY) * multiP;
    return `rotate(${key.rotation_angle} ${xx} ${yy})`;
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

#plate_svg {
  width: 1000px;
  top: -150px;
  position: relative;
}
</style>
