<template>
  <header>
    <div id="nav" class="navbar navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">
        Keeb Studio
      </router-link>
      <router-link to="/projects" class="btn btn-outline-primary">
        Projects
      </router-link>
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
