<template>
  <div>
    <legend class="col-form-label  col-form-label-sm pb-0">PCB</legend>
    <div class="row">
      <ul>
        <li>x: {{ x }}</li>
        <li>y: {{ y }}1</li>
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
    const { x, y, width, height } = this.theKey;
    return MathHelper.keyPcbPosition(x, y, width, height, 0, 0);
  }
  get x() {
    const { x } = this.pcbPosition();
    return x;
  }

  get y() {
    const { y } = this.pcbPosition();
    return y;
  }
}
</script>

<style scoped>
ul li {
  display: block;
  text-align: left;
}
</style>
