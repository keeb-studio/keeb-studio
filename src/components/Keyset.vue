<template>
  <div class="container-fluid">
    <div class="row p-3">
      <svg
        :width="maxWidth"
        :height="maxHeight"
        :viewBox="`0.000 0.000 ${maxWidth} ${maxHeight}`"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g transform="translate(10,10)">
          <g transform="translate(5,5)">
            <KeyCap v-for="k in keys" :key="k.id" :model-key="k"></KeyCap>
            <!-- <div v-for="k in keys" :key="k.id" :model-key="k" :id="k.id"></div> -->
          </g>
        </g>
      </svg>
    </div>
    <div class="row">
      <div class="col-sm">One of three columns</div>
      <div class="col-sm">
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
      <div class="col-sm">
        One of three columns
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";
import KeyCap from "./Keyset/Keycap.vue";
// import Keyset from "./Keyset.vue";
@Component({
  components: {
    KeyCap
  }
})
export default class Keyset extends Vue {
  @Getter("keyset", { namespace: "layout" }) keyset: any;
  @Getter("allKeys", { namespace: "layout" }) allKeys: any;
  @Mutation("layoutLoaded", { namespace: "layout" }) layoutLoaded: any;

  get keys() {
    // todo this better
    // add is loaded property to vuex
    if (this.allKeys.length < 1) {
      const raw = localStorage.getItem("kleraw");
      this.layoutLoaded(raw);
    }
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
    const maxKey = this.keys.reduce((prev, current) =>
      prev.y + prev.height > current.y + current.height ? prev : current
    );
    return (maxKey.y + maxKey.height) * 56 + 16;
  }

  // todo move into model
  get maxWidth() {
    if (this.keys.length < 1) return 0;
    const maxKey = this.keys.reduce((prev, current) =>
      prev.x + prev.width > current.x + current.width ? prev : current
    );
    return (maxKey.x + maxKey.width) * 56 + 16;
  }
}
</script>

<style></style>
