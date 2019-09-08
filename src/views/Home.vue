<template>
  <div class="home">
    <ApolloExample />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApolloExample from "../components/ApolloExample.vue";

@Component({
  components: {
    ApolloExample
  }
})
export default class Home extends Vue {}
</script>
