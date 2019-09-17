<template>
  <div>
    <a :href="doIt" download="something.kicad_pcb">demo</a>
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
        />
        <KeyCap
          v-for="k in selectedKeys"
          :key="k.id"
          v-bind="k"
          :model-key="k"
          outlineColor="black"
        />
      </svg>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <KeyEditor v-if="lastSelectedKey" :the-key="lastSelectedKey" />
      </div>
      <div class="col-sm-3">
        <div class="row">
          <div class="col-8 col-sm-6">
            <!-- <ColorPicker id="background-color" name="Background Color" />
            <ColorPicker id="alpa-color" name="Alpha Color" />-->
          </div>
          <div class="col-4 col-sm-6">
            <SchematicMeta v-if="lastSelectedKey" :the-key="lastSelectedKey" />
          </div>
        </div>

        <div class="row">
          <div class="col-8 col-sm-6"></div>
          <div class="col-4 col-sm-6"></div>
        </div>
      </div>
      <div class="col-sm-3">
        <PcbCalc v-if="lastSelectedKey" :the-key="lastSelectedKey" />
      </div>
    </div>
    <div class="row">
      {{ schematicRender }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";
import KeyCap from "./Keyset/KeyCapV2.vue";
import KeyEditor from "./KeyEditor.vue";
import PcbCalc from "./PcbCalc.vue";
import SchematicMeta from "./SchematicMeta.vue";
@Component({
  components: {
    KeyCap,
    KeyEditor,
    PcbCalc,
    SchematicMeta
  }
})
export default class Keyset extends Vue {
  @Getter("lastSelectedKey", { namespace: "layout" }) lastSelectedKey: any;
  @Getter("selectedKeys", { namespace: "layout" }) selectedKeys: any;
  @Getter("unSelectedKeys", { namespace: "layout" }) unSelectedKeys: any;
  @Getter("allKeys", { namespace: "layout" }) allKeys: any;

  get doIt() {
    var text = "Some data I want to export";
    var data = new Blob([text], { type: "application/octet-stream" });

    return window.URL.createObjectURL(data);
  }

  get schematicRender() {
    const foo = this.allKeys.map((a: any) => {
      return {
        x: a.x,
        y: a.y
      };
    });
    console.log(foo);
    return "this is a schematic 2";
  }
}
</script>

<style></style>
