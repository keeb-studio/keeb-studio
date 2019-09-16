<template>
  <header>
    <div id="nav" class="navbar navbar-dark bg-dark">
      <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/saved">Saved</router-link> |
      <router-link to="/about"About</router-link>
    </div> -->
      <router-link class="navbar-brand" to="/">Keeb Studio</router-link>
      <router-link to="/saved">Saved</router-link>
      <!-- <router-link to="/about">About</router-link> -->
      <button
        type="button"
        class="btn btn-outline-primary"
        @click="toggleMultiSelect"
      >
        Multi: {{ multiSelect ? "on" : "off" }}
      </button>

      <button
        type="button"
        class="btn btn-outline-primary"
        @click="toggleGridMode"
      >
        Grid Mode: {{ gridMode ? "on" : "off" }}
      </button>
      <WriteGist />
    </div>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WriteGist from "./SavedGists/WriteGist.vue";
import { Getter, Mutation } from "vuex-class";
@Component({ components: { WriteGist } })
export default class Nav extends Vue {
  @Getter("multiSelect", { namespace: "layout" })
  multiSelect: any;

  @Getter("gridMode", { namespace: "layout" })
  gridMode: any;

  @Mutation("toggleMultiSelect", { namespace: "layout" })
  toggleMultiSelect: any;

  @Mutation("toggleGridMode", { namespace: "layout" })
  toggleGridMode: any;
}
</script>
<style lang="scss" scoped></style>
