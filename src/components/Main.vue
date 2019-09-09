<template>
  <div>
    {{ display }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
@Component
export default class Main extends Vue {
  @Getter("keyset", { namespace: "layout" }) keyset: any;
  //todo move to vuex getter
  get display() {
    return this.keyset.kleParsed.length > 0
      ? this.keyset.kleParsed[0].name
      : "Nothing Loaded";
  }
}
</script>

<style></style>
