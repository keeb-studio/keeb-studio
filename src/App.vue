<template>
  <div id="app">
    <Nav />
    <div class="container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";

@Component({
  components: {
    Nav,
    Footer
  }
})
export default class App extends Vue {}
</script>
