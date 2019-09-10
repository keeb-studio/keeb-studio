<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/saved">Saved</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <Nav />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Nav from "@/components/Nav.vue"; // @ is an alias to /src

@Component({
  components: {
    Nav
  }
})
export default class App extends Vue {}
</script>
