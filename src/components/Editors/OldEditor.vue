<template>
  <div class="row">
    <div class="col-sm-6">
      <KeyEditor v-if="theKey" :the-key="theKey" />
    </div>
    <div class="col-sm-3">
      <div class="row">
        <div class="col-8 col-sm-6">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="rotateKeys"
          >
            rotate
          </button>
        </div>
        <div class="col-4 col-sm-6">
          <SchematicMeta v-if="theKey" :the-key="theKey" />
        </div>
      </div>

      <div class="row">
        <div class="col-8 col-sm-6"></div>
        <div class="col-4 col-sm-6"></div>
      </div>
    </div>
    <div class="col-sm-3">
      <PcbCalc v-if="theKey" :the-key="theKey" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
import { Action, Getter } from "vuex-class";
import KeyEditor from "../KeyEditor.vue";
import PcbCalc from "../PcbCalc.vue";
import SchematicMeta from "../SchematicMeta.vue";

@Component({ components: { KeyEditor, PcbCalc, SchematicMeta } })
export default class OldEditor extends Vue {
  name: string = "OldEditor";
  @Action("rotateKeys") rotateKeys!: Function;
  @Getter("lastSelectedKey") lastSelectedKey!: SimpleKey;
  get theKey() {
    return this.lastSelectedKey || new SimpleKey();
  }
}
</script>
