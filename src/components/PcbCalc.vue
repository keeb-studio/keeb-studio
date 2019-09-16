<template>
  <div>
    <legend class="col-form-label  col-form-label-sm pb-0">PCB</legend>
    <div class="row">
      <ul class="pl-3">
        <li>x: {{ x }}</li>
        <li>y: {{ y }}</li>
        <li>r: {{ rotation }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";
import { Key } from "@/models/KeysetLayout/Key";
import MathHelper from "../models/MathHelper";
@Component({})
export default class PcbCalc extends Vue {
  @Prop() private theKey!: Key;
  pcbPosition() {
    const {
      x,
      y,
      width,
      height,
      rotation_angle,
      rotation_x,
      rotation_y
    } = this.theKey;
    return MathHelper.rotatedKicad(
      x,
      y,
      width,
      height,
      0,
      0,
      rotation_x,
      rotation_y,
      rotation_angle
    );
  }

  get rotation() {
    return MathHelper.roundResult(this.pcbPosition().rotation);
  }

  get x() {
    return MathHelper.roundResult(this.pcbPosition().x);
  }

  get y() {
    return MathHelper.roundResult(this.pcbPosition().y);
  }
}
</script>

<style scoped>
ul li {
  display: block;
  text-align: left;
}
</style>
