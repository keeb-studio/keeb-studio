<template>
  <header>
    <div id="nav" class="navbar navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">Keeb Studio</router-link>
      <router-link to="/projects" class="btn btn-outline-primary"
        >Projects</router-link
      >
      <WriteGist />
    </div>
    <div class="container">
      <div
        class="btn-toolbar justify-content-between m-3"
        role="toolbar"
        aria-label="Toolbar with button groups"
        v-if="showToolbar"
      >
        <div class="btn-group" role="group" aria-label="First group">
          <button type="button" class="btn btn-outline-primary" @click="addMx">
            Add
          </button>

          <button
            type="button"
            class="btn btn-outline-primary mr-2"
            @click="removeMxSwitch"
          >
            Remove
          </button>

          <button
            type="button"
            class="btn btn-outline-primary"
            @click="selectAll"
          >
            Select All
          </button>

          <button
            type="button"
            class="btn btn-outline-primary"
            @click="toggleMultiSelect"
          >
            Multi: {{ multiSelect ? "on" : "off" }}
          </button>
        </div>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text" id="btnGroupAddon2">@</div>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Input group example"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon2"
          />
        </div>
      </div>
      <div v-else id="spaceholder"><div></div></div>
    </div>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WriteGist from "./SavedGists/WriteGist.vue";
import { Getter, Mutation, Action } from "vuex-class";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
@Component({ components: { WriteGist } })
export default class Nav extends Vue {
  @Getter("multiSelect", { namespace: "layout" }) multiSelect: any;
  @Getter("showToolbar", { namespace: "layout" }) showToolbar: any;
  @Getter("gridMode", { namespace: "layout" }) gridMode: any;

  @Mutation("selectAll", { namespace: "layout" }) selectAll: any;

  @Mutation("toggleMultiSelect", { namespace: "layout" })
  toggleMultiSelect: any;

  @Mutation("toggleGridMode", { namespace: "layout" }) toggleGridMode: any;

  @Action("addMxSwitch", { namespace: "layout" }) addMxSwitch: any;
  @Action("removeMxSwitch", { namespace: "layout" }) removeMxSwitch: any;

  @Getter("allKeys", { namespace: "layout" }) allKeys!: Array<SimpleKey>;
  addMx() {
    const maxY =
      this.allKeys.reduce((previosKey: SimpleKey, key: SimpleKey) => {
        const biggerKey = key.y > previosKey.y ? key : previosKey;
        return biggerKey;
      }).y + 1;

    this.addMxSwitch({ x: 0, y: maxY });
  }
}
</script>
<style lang="scss" scoped>
#spaceholder {
  margin: 16px;
  div {
    height: 38px;
  }
}
</style>
