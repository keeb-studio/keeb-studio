<template>
  <div>
    <h1>Load a Saved KLE 3</h1>
    <label for="gh_token" v-if="token === null">
      <span>Enter you token:</span>
      <input v-model="inputToken" type="text" name="gh_token" id="gh_token" />
      <button @click="token = inputToken">Ok</button>
    </label>
    <h6 v-else>Token:{{ token }}</h6>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  // All component options are allowed in here
  watch: {
    token(newName) {
      localStorage.token = newName;
    }
  }
})
export default class Saved extends Vue {
  token: string | null = null;
  tokenInputToken: string = "";
  // data() {
  //   return {
  //     inputToken: "",
  //     token: ""
  //   };
  // }

  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
  }
}
</script>

<style></style>
