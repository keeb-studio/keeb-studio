<template>
  <form action="" class="form-inline">
    <legend class="col-form-label  col-form-label-sm pb-0">Legends</legend>
    <div class="row m-1">
      <template v-for="t in textInputs">
        <input
          :key="t"
          type="text"
          :name="t"
          :value="theKey[t]"
          @input="x => changeValue(x, t)"
          :placeholder="t"
          class="form-control col-4"
        />
      </template>
    </div>

    <legend class="col-form-label  col-form-label-sm pb-0">Position</legend>
    <div class="row m-1">
      <div class="input-group col-6">
        <div class="input-group-prepend">
          <div class="input-group-text p-1">x</div>
        </div>
        <input
          :key="'x'"
          type="number"
          :name="'x'"
          :value="theKey['x']"
          @input="x => changeValue(x, 'x')"
          :placeholder="'x'"
          class="form-control"
        />

        <div class="input-group-prepend">
          <div class="input-group-text p-1">y</div>
        </div>
        <input
          :key="'y'"
          type="text"
          :name="'y'"
          :value="theKey['y']"
          @input="x => changeValue(x, 'y')"
          :placeholder="'y'"
          class="form-control"
        />
      </div>

      <div class="input-group col-6">
        <div class="input-group-prepend">
          <div class="input-group-text p-1 tiny-t">width</div>
        </div>
        <input
          :key="'width'"
          type="text"
          :name="'width'"
          :value="theKey['width']"
          @input="x => changeValue(x, 'width')"
          :placeholder="'width'"
          class="form-control"
        />
        <div class="input-group-prepend">
          <div class="input-group-text p-1 tiny-t">height</div>
        </div>
        <input
          :key="'height'"
          type="text"
          :name="'height'"
          :value="theKey['height']"
          @input="x => changeValue(x, 'height')"
          :placeholder="'height'"
          class="form-control"
        />
      </div>
    </div>

    <legend class="col-form-label  col-form-label-sm pb-0">Rotation</legend>
    <div class="row m-1">
      <div class="input-group col">
        <div class="input-group-prepend">
          <div class="input-group-text p-1 tiny-t">angle °</div>
        </div>
        <input
          :key="'rotation_angle'"
          type="text"
          :name="'rotation_angle'"
          :value="theKey['rotation_angle']"
          @input="x => changeValue(x, 'rotation_angle')"
          :placeholder="'rotation_angle'"
          class="form-control"
        />
        <div class="input-group-prepend">
          <div class="input-group-text p-1">x</div>
        </div>
        <input
          :key="'rotation_x'"
          type="number"
          :name="'rotation_x'"
          :value="theKey['rotation_x']"
          @input="x => changeValue(x, 'rotation_x')"
          :placeholder="'rotation_x'"
          class="form-control"
        />

        <div class="input-group-prepend">
          <div class="input-group-text p-1">y</div>
        </div>
        <input
          :key="'rotation_y'"
          type="text"
          :name="'rotation_y'"
          :value="theKey['rotation_y']"
          @input="x => changeValue(x, 'rotation_y')"
          :placeholder="'rotation_y'"
          class="form-control"
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation, Action } from "vuex-class";
import { Key } from "@/models/KeysetLayout/Key";
@Component({})
export default class KeyEditor extends Vue {
  @Action("changeKeyValue", { namespace: "layout" }) changeKeyValue: any;
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
