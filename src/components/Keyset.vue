<template>
  <div>
    <div class="row p-3">
      <svg
        width="1200"
        height="400"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <KeyCap
          v-for="k in unSelectedKeys"
          :key="k.id"
          v-bind="k"
          :model-key="k"
          outlineColor="black"
        ></KeyCap>
        <KeyCap
          v-for="k in selectedKeys"
          :key="k.id"
          v-bind="k"
          :model-key="k"
          outlineColor="black"
        ></KeyCap>
      </svg>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <KeyEditor
          v-for="(id, index) in selectedKeys"
          :key="index"
          :theKey="id"
        />
      </div>
      <div class="col-sm-3">
        <div class="row">
          <div class="col-8 col-sm-6">
            <!-- <ColorPicker id="background-color" name="Background Color" />
            <ColorPicker id="alpa-color" name="Alpha Color" /> -->
          </div>
          <div class="col-4 col-sm-6">more</div>
        </div>

        <div class="row">
          <div class="col-8 col-sm-6"></div>
          <div class="col-4 col-sm-6"></div>
        </div>
      </div>
      <div class="col-sm-3">
        <PcbCalc
          v-for="(id, index) in selectedKeys"
          :key="index"
          :theKey="id"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";
import KeyCap from "./Keyset/KeyCapV2.vue";
import KeyEditor from "./KeyEditor.vue";
import PcbCalc from "./PcbCalc.vue";
@Component({
  components: {
    KeyCap,
    KeyEditor,
    PcbCalc
  }
})
export default class Keyset extends Vue {
  @Getter("selectedKeys", { namespace: "layout" }) selectedKeys: any;
  @Getter("unSelectedKeys", { namespace: "layout" }) unSelectedKeys: any;
}
</script>

<style></style>
