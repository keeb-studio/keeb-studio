<template>
  <div class="row">
    <form action class="form-inline col-sm-6">
      <!-- legends -->
      <legend
        class="col-form-label col-form-label-sm pb-0"
        @click="togglePanel('Legends')"
      >
        Legends
      </legend>
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
    </form>
    <form action="" class="form-inline col-sm-6">
      <legend class="col-form-label col-form-label-sm pb-0">Color</legend>
      <div class="row">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text p-1 tiny-t">color</div>
          </div>
          <input
            :key="'color'"
            :name="'color'"
            :value="theKey['kColor']"
            @input="x => changeValue(x, 'color')"
            :placeholder="'color'"
            class="form-control"
          />
        </div>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text p-1 tiny-t">text color</div>
          </div>
          <input
            :value="theKey['kTextColor']"
            @input="x => changeValue(x, 'color')"
            placeholder="text"
            class="form-control"
          />
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation, Action } from "vuex-class";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
@Component({})
export default class AppearanceEditor extends Vue {
  @Action("changeKeyValue") changeKeyValue!: Function;
  @Getter("allKeys") allKeys!: SimpleKey[];
  @Mutation("pickKey") pickKey!: Function;
  @Prop() private theKey!: SimpleKey;
  textInputs: string[] = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"];
  name: string = "AppearanceEditor";
}
</script>
