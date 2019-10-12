<template>
  <div>
    <h1>Projects</h1>
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
          <button
            type="button"
            class="mr-2 btn btn-primary"
            @click="goto('open')"
          >
            Open
          </button>
          <p class="card-text" v-if="!authenticated">
            * requires signing into Github
          </p>
        </div>
      </div>
      <div class="card col-sm m-2">
        <div class="card-body">
          <h5 class="card-title">keyboard-layout-editor.com</h5>

          <button
            type="button"
            class="mr-2 btn btn-primary"
            @click="goto('import')"
          >
            Import
          </button>

          <p class="card-text" v-if="!authenticated">
            * requires signing into Github
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";
@Component({})
export default class Saved extends Vue {
  @Getter("authenticated", { namespace: "layout" })
  authenticated: any;

  goto(name: string) {
    this.$router.push({ name });
  }
}
</script>

<style></style>
