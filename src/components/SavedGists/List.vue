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
@Component({
  components: {
    Gist
  },
  apollo: {
    viewer: {
      query: GISTS
    }
  },
  methods: {
    selectGist(file) {
      this.selectedFile = file;
    }
  },
  computed: {
    files() {
      const thing = "";
      if (this.viewer) {
        const x = this.viewer.gists.edges
          .map(x => x.repository)
          .flatMap(x => {
            return x.files.map(y => {
              return { ...y, gistId: x.id };
            });
          })
          .filter(x => x.name.indexOf(".kbd.") > -1)
          .map(x => ({ name: x.name, id: x.gistId }));
        return x;
      }
      return [];
    }
  }
})
export default class Saved extends Vue {
  viewer: null;
  data() {
    return {
      newMessage: "",
      gistId: "",
      selectedFile: null
    };
  }
}
</script>

<style></style>
