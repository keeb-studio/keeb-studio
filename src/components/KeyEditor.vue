<template>
  <form action="" class="editor-form">
    <input
      v-for="t in textInputs"
      :key="t"
      class="key-text"
      type="text"
      :name="t"
      :value="theKey[t]"
      @input="x => changeValue(x, t)"
      :placeholder="t"
    />
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";
import { Key } from "@/models/KeysetLayout/Key";
@Component({})
export default class KeyEditor extends Vue {
  @Mutation("changeKeyValue", { namespace: "layout" }) changeKeyValue: any;
  @Prop() private theKey!: Key;
  textInputs: string[] = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"];
  changeValue(x: any, property: string) {
    this.changeKeyValue({
      id: this.theKey.id,
      property,
      value: x.target.value
    });
  }
}
</script>

<style lang="scss" scoped>
.editor-form {
  width: 150px;
}
.key-text {
  width: 50px;
}
</style>
