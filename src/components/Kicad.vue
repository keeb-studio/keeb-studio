<template>
  <div class="row">
    <div class="col-sm-6">
      <button class="btn btn-outline-primary col-form-label pt-0 pb-0 mb-2">
        Download Schematic
      </button>
      <br />
      <div>Schematic Grid Preview</div>
      <svg
        version="1.1"
        id="schematic_svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0"
        y="0"
        viewBox="0 0 400 200"
        width="400mm"
        height="200mm"
        xml:space="preserve"
      >
        <rect
          v-for="k in allKeys"
          :key="k.id"
          :x="k.schematic_x * width"
          :y="k.schematic_y * height"
          :width="width"
          :height="height"
          fill="white"
        />
      </svg>
    </div>
    <div class="col-sm-6">
      <button class="btn btn-outline-primary col-form-label pt-0 pb-0 mb-2">
        Download Schematic
      </button>
      <br />
      <div>Schematic Grid Preview</div>
      <svg
        version="1.1"
        id="schematic_svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0"
        y="0"
        viewBox="0 0 400 200"
        width="400mm"
        height="200mm"
        xml:space="preserve"
      >
        <rect
          v-for="k in allKeys"
          :key="k.id"
          :x="k.schematic_x * width"
          :y="k.schematic_y * height"
          :width="width"
          :height="height"
          fill="white"
        />
      </svg>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
@Component({})
export default class Kicad extends Vue {
  @Getter("allKeys") allKeys!: Array<SimpleKey>;
  name: string = "Kicad";
  baseHeight: number = 10;
  baseWidth: number = 14;

  get height() {
    return this.baseHeight * this.multiplier;
  }
  get width() {
    return this.baseWidth * this.multiplier;
  }
  get multiplier() {
    const maxX = Math.max.apply(
      Math,
      this.allKeys.map(function(o: SimpleKey) {
        return o.schematic_x;
      })
    );

    const maxY = Math.max.apply(
      Math,
      this.allKeys.map(function(o: SimpleKey) {
        return o.schematic_y;
      })
    );
    const max = maxX > maxY ? maxX : maxY;
    return 9 / max;
  }
}
</script>
<style lang="scss" scoped>
rect {
  stroke: black;
  stroke-width: 0.3;
}
</style>
