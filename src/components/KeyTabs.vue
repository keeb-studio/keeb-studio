<template>
  <ul class="nav nav-tabs m-2">
    <li class="nav-item" v-for="tab in tabs" :key="tab">
      <a
        :class="[navLink, isActive(tab) ? activeClass : '']"
        @click="handleClick(tab)"
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
  @Mutation("setTab", { namespace: "layout" }) setTab!: Function;
  @Getter("isTabSelected", { namespace: "layout" }) isTabSelected!: Function;
  @Prop() type!: string;
  @Prop() tabs!: string[];
  navLink: string = "nav-link";
  activeClass: string = "active";
  created() {
    // set the first tab selected
    this.handleClick(this.tabs[0]);
  }
  handleClick(tab: string) {
    this.setTab({
      tab,
      type: this.type
    });
  }
  isActive(tab: string): boolean {
    return this.isTabSelected(tab, this.type);
  }
}
</script>

<style></style>
