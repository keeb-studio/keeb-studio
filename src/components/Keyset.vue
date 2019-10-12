<template>
  <div>
    <KeyTabs />
    <MainViewKeys iv v-if="mainView === 'Keys'" />
    <MainViewKeys iv v-if="mainView === 'Grid'" />
    <MainViewPlate iv v-if="mainView === 'Plate'" />
    <!-- <div class="row">
      {{ allKeys.length }}
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import KeyTabs from "./KeyTabs.vue";
import MainViewKeys from "./MainViewKeys.vue";
import MainViewPlate from "./MainViewPlate.vue";
@Component({
  components: {
    KeyTabs,
    MainViewKeys,
    MainViewPlate
  }
})
export default class Keyset extends Vue {
  @Getter("mainView", { namespace: "layout" }) mainView!: string;
}
</script>

<style></style>
