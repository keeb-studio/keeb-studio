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
      <WriteGist />
    </div>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WriteGist from "./SavedGists/WriteGist.vue";
@Component({ components: { WriteGist } })
export default class Nav extends Vue {}
</script>
<style lang="scss" scoped></style>
