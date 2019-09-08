<template>
  <div class="apollo-example">
    <!-- <ApolloQuery v-if="gistId" :query="require('../graphql/Gist.gql')" :variables="{ id: gistId }">
      <template v-slot="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">Loading...</div>

        <div v-else-if="error" class="error apollo">An error occurred</div>

        <div v-else-if="data" class="result apollo">{{ data.node }}</div>

        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>-->
    <div v-if="selectedFile === null">
      <div v-for="file of files" :key="file.id">
        <a @click="selectGist(file)">{{ file.name }}</a>
      </div>
    </div>
    <div v-else>
      <a @click="selectedFile = null">Choose New</a>
      <Gist :file="selectedFile" />
    </div>
  </div>
</template>

<script>
import GISTS from "../graphql/Gists.gql";
import { mkdir } from "fs";
import Gist from "./Gist";
export default {
  components: {
    Gist
  },
  data() {
    return {
      newMessage: "",
      gistId: "",
      selectedFile: null
    };
  },

  apollo: {
    viewer: GISTS,

  },
  methods: {
    selectGist(file) {
      this.selectedFile = file;
    }
  },
  computed: {
    // selectedJson (){
    //   return
    // },
    files() {
      const thing = ''
      if (this.viewer) {
        const x = this.viewer.gists.edges
          .map(x => x.repository)
          .flatMap(x => {
            return x.files.map(y => {
              return { ...y, gistId: x.id };
            });
          })
          .filter(x => x.name.indexOf(".kbd.") > -1)
          .map(x => ({ name: x.name,id: x.gistId }));
        return x;
      }
      return [];
    }
  }
};
</script>

<style scoped>
</style>
