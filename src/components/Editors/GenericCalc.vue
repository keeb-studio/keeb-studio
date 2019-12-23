<template>
  <div>GenericCalc x: {{ x }} y: {{ y }}</div>
</template>
<script lang="ts">
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class GenericCalc extends Vue {
  @Prop({ required: true }) readonly theKey!: SimpleKey;
  name: string = "GenericCalc";
  get x() {
    return this.theKey.x * 1.905;
  }

  get y() {
    return this.theKey.y * 1.905;
  }
}
</script>
