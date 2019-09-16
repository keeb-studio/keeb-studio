<template>
  <div>
    <legend class="col-form-label  col-form-label-sm pb-0">Schematic</legend>
    <div class="row">
      <ul class="pl-3">
        <li>
          column:
          <input
            :key="'schematic_x'"
            type="text"
            :name="'schematic_x'"
            :value="theKey['schematic_x']"
            @input="x => changeValue(x, 'schematic_x')"
            :placeholder="'schematic_x'"
            class="form-control"
          />
        </li>
        <li>
          row:
          <input
            :key="'schematic_y'"
            type="text"
            :name="'schematic_y'"
            :value="theKey['schematic_y']"
            @input="x => changeValue(x, 'schematic_y')"
            :placeholder="'schematic_y'"
            class="form-control"
          />
        </li>
        <li>
          index:
          <input
            readonly
            :key="'schematic_index'"
            type="text"
            :name="'schematic_index'"
            :value="theKey['schematic_index']"
            @input="x => changeValue(x, 'schematic_index')"
            :placeholder="'schematic_index'"
            class="form-control"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation, Action } from "vuex-class";
import { Key } from "@/models/KeysetLayout/Key";
@Component({})
export default class SchematicMeta extends Vue {
  @Action("changeKeyValue", { namespace: "layout" })
  changeKeyValue: any;

  @Prop()
  private theKey!: Key;
  changeValue(x: any, property: string) {
    this.changeKeyValue({
      id: this.theKey.id,
      property,
      value: x.target.value
    });
  }
}
</script>

<style scoped>
ul li {
  display: block;
  text-align: left;
}
</style>
