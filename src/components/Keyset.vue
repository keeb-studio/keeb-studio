<template>
  <div>
    <KeyTabs />

    <Toolbar iv v-if="mainView === 'Keys'" />
    <MainViewKeys iv v-if="mainView === 'Keys'" />

    <Toolbar iv v-if="mainView === 'Grid'" />
    <MainViewKeys iv v-if="mainView === 'Grid'" />

    <MainViewPlate iv v-if="mainView === 'Plate'" />
    <Kicad iv v-if="mainView === 'Kicad'" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, Mutation } from "vuex-class";
import KeyTabs from "./KeyTabs.vue";
import MainViewKeys from "./MainViewKeys.vue";
import MainViewPlate from "./MainViewPlate.vue";
import Kicad from "./Kicad.vue";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
import Toolbar from "./Toolbar.vue";
@Component({
  components: {
    KeyTabs,
    MainViewKeys,
    MainViewPlate,
    Kicad,
    Toolbar
  }
})
export default class Keyset extends Vue {
  @Getter("mainView", { namespace: "layout" }) mainView!: string;
}
</script>

<style></style>
