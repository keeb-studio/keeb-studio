<template>
  <div>
    <div v-if="selectedFile !== null">
      <Gist :file="selectedFile" :gist-type="gistType" />
    </div>
    <div v-else>
      <form>
        <div class="form-group mt-4">
          <input
            class="form-control"
            aria-describedby="filter"
            placeholder="Filter Name"
            @input="filter"
          />
        </div>
      </form>
      <div v-for="file of filteredFiles" :key="file.id" class="m-1">
        <button class="btn btn-outline-primary" @click="selectGist(file)">
          {{ file.name }}
        </button>
        <button class="btn btn-danger btn-sm m-1" v-if="isKeeb">
          <Octicon name="trashcan"></Octicon>
        </button>
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
import "vue-octicon/icons";
import Octicon from "vue-octicon/components/Octicon.vue";
const namespace = "layout";
@Component({
  components: {
    Gist,
    Octicon
  },
  apollo: {
    viewer: {
      fetchPolicy: "no-cache",
      query: GISTS
    }
  }
})
export default class Saved extends Vue {
  @Mutation("loadFromStorage", { namespace }) loadFromStorage: any;

  @Prop({ required: true })
  public gistType!: string;

  searchTerm: string = "";
  gistId: string = "";
  selectedFile: any = null;
  viewer: any = null;

  selectGist(file: any) {
    this.selectedFile = file;
  }

  filter(event: any) {
    this.searchTerm = event.target.value;
  }

  get isKeeb() {
    return this.gistType === "load";
  }

  get extension() {
    return this.gistType === "load" ? ".keeb.json" : ".kbd.json";
  }

  get filteredFiles() {
    return this.files.filter((file: IGist) =>
      this.searchTerm.length > 0
        ? file.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
        : true
    );
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
        .filter((file: IGist) => file.name.indexOf(this.extension) > -1)
        .map((file: IGist) => ({ name: file.name, id: file.gistId }));
    }
    return [];
  }
}

interface IGist {
  name: string;
  id: string;
  gistId: string;
}
</script>

<style></style>
