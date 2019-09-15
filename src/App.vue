<template>
  <div id="app">
    <Nav />
    <div class="container">
      <router-view />
    </div>
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
