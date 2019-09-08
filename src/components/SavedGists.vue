<template>
  <div>
    <h1>Load a Saved KLE 3</h1>
    <label for="gh_token" v-if="token === null">
      <span>Enter you token:</span>
      <input v-model="inputToken" type="text" name="gh_token" id="gh_token" />
      <button @click="token = inputToken">Ok</button>
    </label>
    <List v-else />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import List from "./SavedGists/List.vue";

@Component({
  components: { List },
  watch: {
    token(newName) {
      localStorage.token = newName;
    }
  }
})
export default class Saved extends Vue {
  token: string | null = null;
  inputToken: string = "";

  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
  }
}
</script>

<style></style>
