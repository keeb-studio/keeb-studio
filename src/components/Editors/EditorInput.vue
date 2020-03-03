<template>
  <input
    :key="property"
    :type="type"
    :name="property"
    :value="theKey[property]"
    @input="value => changeValue(value, property)"
    :placeholder="property"
    class="form-control"
  />
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
import { Action } from "vuex-class";
@Component({})
export default class EditorInput extends Vue {
  name: string = "EditorInput";

  @Action("changeKeyValue") changeKeyValue!: Function;

  @Prop({ required: true }) readonly type!: string;
  @Prop({ required: true }) readonly property!: string;
  @Prop({ required: true }) readonly theKey!: SimpleKey;

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
