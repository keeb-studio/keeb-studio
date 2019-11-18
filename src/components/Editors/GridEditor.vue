<template>
  <div class="row">
    <div class="col-4">
      <ul class="pl-3">
        <li>
          column:
          <input
            :key="'schematic_x'"
            type="number"
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
            type="number"
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
            type="number"
            :name="'schematic_index'"
            :value="pcbPosition.index"
            :placeholder="'schematic_index'"
            class="form-control"
          />
        </li>
      </ul>
    </div>
    <div class="col-4">
      <ul>
        <li>
          <b>
            cols
          </b>
        </li>
        <li v-for="(info, index) in totalGridKeys.cols" :key="index">
          {{ info }}
        </li>
      </ul>
    </div>

    <div class="col-4">
      <ul>
        <li>
          <b>
            rows
          </b>
        </li>
        <li v-for="(info, index) in totalGridKeys.rows" :key="index">
          {{ info }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
import { Action, Getter } from "vuex-class";
import { ISchematicKey } from "@/models/KeysetLayout/IGrid";
@Component({})
export default class GridEditor extends Vue {
  name: string = "GridEditor";

  @Getter("totalGridKeys") totalGridKeys: any;
  @Getter("calculatedPositions") calculatedPositions: any;
  @Prop({ required: true }) readonly theKey!: SimpleKey;
  @Action("changeKeyValue") changeKeyValue: any;

  get pcbPosition() {
    const positions = this.calculatedPositions as ISchematicKey[];
    const thisPosition = positions.find(
      (key: ISchematicKey) => key.id === this.theKey.id
    );
    return thisPosition || { index: 0 };
  }

  changeValue(x: any, property: string) {
    let value = x.target.value;
    if (x.target.type === "number") {
      if (value.indexOf(".") > -1) {
        value = parseFloat(value);
      } else {
        value = parseInt(value);
      }
    }
    this.changeKeyValue({
      id: this.theKey.id,
      property,
      value
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
