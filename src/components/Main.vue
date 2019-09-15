<template>
  <div>
    <Keyset />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import Keyset from "./Keyset.vue";
@Component({ components: { Keyset } })
export default class Main extends Vue {
  @Getter("keyset", { namespace: "layout" }) keyset: any;
}
</script>

<style></style>
