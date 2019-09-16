<template>
  <div>
    <h1>Load a Saved KLE 3</h1>
    <label for="gh_token" v-if="token === null">
      <span>Enter you token:</span>
      <input v-model="inputToken" type="text" name="gh_token" id="gh_token" />
      <button @click="token = inputToken">Ok</button>
    </label>
    <div v-else>
      <button type="button" class="mr-2 btn btn-primary" @click="load">
        Load Keeb Gist
      </button>
      <button type="button" class="mr-2 btn btn-secondary" @click="importKle">
        Import KLE Gist
      </button>
    </div>
    <List v-if="loadOrImport === 'load'" key="l" :gist-type="loadOrImport" />
    <List v-if="loadOrImport === 'import'" key="i" :gist-type="loadOrImport" />
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
  loadOrImport: string | null = null;
  load() {
    this.loadOrImport = "load";
  }

  importKle() {
    this.loadOrImport = "import";
  }
  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
  }
}
</script>

<style></style>
