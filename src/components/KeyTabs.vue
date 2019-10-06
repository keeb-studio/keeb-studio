<template>
  <ul class="nav nav-tabs m-2">
    <li class="nav-item" v-for="tab in tabs" :key="tab">
      <a
        :class="[navLink, isActive(tab) ? activeClass : '']"
        @click="setTab(tab)"
        >{{ tab }}</a
      >
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";
@Component({})
export default class KeyTabs extends Vue {
  @Getter("mainView", { namespace: "editor" }) mainView!: string;
  @Mutation("setTab", { namespace: "editor" }) setTab!: void;
  navLink: string = "nav-link";
  activeClass: string = "active";
  tabs: string[] = ["Keys", "Plate", "Top"];
  isActive(tab: string): boolean {
    return this.mainView === tab;
  }
}
</script>

<style></style>
