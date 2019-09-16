<template>
  <div>
    <legend class="col-form-label  col-form-label-sm pb-0">Schematic</legend>
    <div class="row">
      <ul>
        <li>x:</li>
        <li>y:</li>
        <li>label:</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";
@Component({})
export default class SchematicMeta extends Vue {}
</script>

<style scoped>
ul li {
  display: block;
  text-align: left;
}
</style>
