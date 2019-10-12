<template>
  <div>
    <h1>File</h1>

    <!-- <button type="button" class="mr-2 btn btn-primary">
      New
    </button>

    <button type="button" class="mr-2 btn btn-primary" @click="load">
      Open
    </button>
     -->
    <div class="row">
      <div class="card col-sm m-2">
        <div class="card-body">
          <h5 class="card-title">Create New Keyboard Project</h5>
          <a href="#" class="btn btn-primary">New</a>
        </div>
      </div>
      <div class="card col-sm m-2">
        <div class="card-body">
          <h5 class="card-title">Open Existing Keyboard Project</h5>
          <button type="button" class="mr-2 btn btn-primary" @click="load">
            Open
          </button>
          <p class="card-text" v-if="token === null">
            * requires signing into Github
          </p>
        </div>
      </div>
      <div class="card col-sm m-2">
        <div class="card-body">
          <h5 class="card-title">keyboard-layout-editor.com</h5>

          <button type="button" class="mr-2 btn btn-primary" @click="importKle">
            Import
          </button>

          <p class="card-text" v-if="token === null">
            * requires signing into Github
          </p>
        </div>
      </div>
    </div>
    <label for="gh_token" v-if="token === null">
      <a :href="githubUrl">Sign In with Github</a>
    </label>
    <List v-if="loadOrImport === 'load'" key="l" :gist-type="loadOrImport" />
    <List v-if="loadOrImport === 'import'" key="i" :gist-type="loadOrImport" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import List from "./SavedGists/List.vue";
import cryptoRandomString from "crypto-random-string";
// this.hexPrefix =
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
  url: string = "https://github.com/login/oauth/authorize";
  client_id: string = process.env.VUE_APP_GITHUB_CLIENT_ID || "";
  redirect_uri: string = "http://localhost:8082/github-oauth";
  scope: string = "gist";
  state: string = cryptoRandomString({ length: 12 });

  get githubUrl() {
    localStorage["github_state"] = this.state;
    return `${this.url}/?client_id=${this.client_id}&scope=${this.scope}&state=${this.state}`;
  }

  load() {
    if (this.token === null) {
      window.location.assign(this.githubUrl);
    }
    this.$router.push({ name: "open" });
  }

  importKle() {
    if (this.token === null) {
      window.location.assign(this.githubUrl);
    }
    this.$router.push({ name: "import" });
  }
  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
  }
}
</script>

<style></style>
