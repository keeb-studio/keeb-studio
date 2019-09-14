<template>
  <div>
    <div v-if="selectedFile !== null">
      <a @click="selectedFile = null">Change</a>
      <Gist :file="selectedFile" />
    </div>
    <div v-else>
      <div v-for="file of files" :key="file.id">
        <a @click="selectGist(file)">{{ file.name }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "vue-apollo";
import Gist from "./Gist.vue";
import GISTS from "../../graphql/Gists.gql";
import { Mutation, Getter } from "vuex-class";
const namespace = "layout";
@Component({
  components: {
    Gist
  },
  apollo: {
    viewer: {
      query: GISTS
    }
  }
})
export default class Saved extends Vue {
  @Mutation("loadFromStorage", { namespace }) loadFromStorage: any;
  newMessage: string = "";
  gistId: string = "";
  selectedFile: any = null;
  viewer: any = null;

  selectGist(file: any) {
    if (localStorage[file.name] === undefined) {
      this.selectedFile = file;
    } else {
      this.loadFromStorage(file.name);
      this.$router.push({ name: "home" });
    }
  }

  get files() {
    if (this.viewer) {
      return this.viewer.gists.edges
        .map((edge: any) => edge.repository)
        .flatMap((repository: any) => {
          return repository.files.map((file: any) => {
            return { ...file, gistId: repository.id };
          });
        })
        .filter((file: any) => file.name.indexOf(".kbd.") > -1)
        .map((file: any) => ({ name: file.name, id: file.gistId }));
    }
    return [];
  }
}
</script>

<style></style>
