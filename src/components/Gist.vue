<template>
<div>
<h2>{{ file.name }}</h2>
<h5>{{ file.id }}</h5>
<div>
{{ selectContent }}
</div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "vue-apollo"
import GIST from "../graphql/Gist.graphql";

@Component({
  apollo: {
    node: {
      query: GIST,
      variables() { return { id: this.file.id } },
    }
  }
})
export default class Gist extends Vue {
  node: any = null;
  @Prop() private file!: any;
  created() {
  }
  get selectContent() {
    if(this.file  && this.node) {
      return this.node.files.find((file: any) => file.name === this.file.name ).text
    }
    return ''
  }
}
</script>

<style>
</style>
