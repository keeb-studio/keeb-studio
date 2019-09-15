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
@Component({})
export default class PcbCalc extends Vue {
  @Prop() private theKey!: Key;
  get x() {
    return this.theKey.x;
  }

  get y() {
    return this.theKey.y;
  }
}
</script>

<style scoped>
ul li {
  display: block;
  text-align: left;
}
</style>
