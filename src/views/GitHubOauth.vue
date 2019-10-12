<template>
  <div>
    {{ status }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";
import Keyset from "./Keyset.vue";
import axios from "axios";
@Component({})
export default class GitHubOauth extends Vue {
  status: string = "Authenticating...";
  async mounted() {
    const { code, state } = this.$route.query;
    const clientId = process.env.VUE_APP_GITHUB_CLIENT_ID;
    if (localStorage["github_state"] === state) {
      const resp = await axios.get(
        `https://api.keeb-studio.com/auth?code=${code}&clientId=${clientId}&type=dev`
      );
      if (resp.status === 200) {
        if (resp.data.access_token) {
          localStorage.token = resp.data.access_token;
          this.$router.push({ name: "saved" });
          return;
        }
      }
    }

    this.status =
      "Something went wrong authenticating with github. Please try again.";
  }
}
</script>

<style></style>
