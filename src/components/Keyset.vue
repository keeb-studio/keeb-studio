<template>
  <div class="container-fluid">
    <div class="row p-3">
      <svg
        width="1200"
        height="400"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <KeyCap
          v-for="k in keys"
          :key="k.id"
          v-bind="k"
          :model-key="k"
          outlineColor="black"
        ></KeyCap>
        <!-- <div v-for="k in keys" :key="k.id" :model-key="k" :id="k.id"></div> -->
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
        One of three columns
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";
import KeyCap from "./Keyset/KeyCapV2.vue";
import KeyEditor from "./KeyEditor.vue";
// import KeyCap from "./Keyset/Keycap.vue";
// import Keyset from "./Keyset.vue";
@Component({
  components: {
    KeyCap,
    KeyEditor
  }
})
export default class Keyset extends Vue {
  @Getter("keyset", { namespace: "layout" }) keyset: any;
  @Getter("allKeys", { namespace: "layout" }) allKeys: any;
  @Getter("selectedKeys", { namespace: "layout" }) selectedKeys: any;

  get keys() {
    return this.allKeys;
  }

  //todo move to vuex getter
  get display() {
    return this.keyset.kleParsed.length > 0
      ? this.keyset.kleParsed[0].name
      : "Nothing Loaded";
  }

  // todo move into model
  get maxHeight() {
    if (this.keys.length < 1) return 0;
    const maxKey = this.keys.reduce((prev: any, current: any) =>
      prev.y + prev.height > current.y + current.height ? prev : current
    );
    return (maxKey.y + maxKey.height) * 56 + 16 + 100;
  }

  // todo move into model
  get maxWidth() {
    if (this.keys.length < 1) return 0;
    const maxKey = this.keys.reduce((prev: any, current: any) =>
      prev.x + prev.width > current.x + current.width ? prev : current
    );
    return (maxKey.x + maxKey.width) * 56 + 16 + 100;
  }
}
</script>

<style></style>
