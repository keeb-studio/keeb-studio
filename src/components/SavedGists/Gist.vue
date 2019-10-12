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
import "vue-apollo";
import GIST from "../../graphql/Gist.gql";
import { mapMutations } from "vuex";
import { Mutation, Getter } from "vuex-class";
const namespace = "layout";
@Component({
  apollo: {
    node: {
      fetchPolicy: "no-cache",
      query: GIST,
      variables() {
        return { id: this.file.id };
      }
    }
  }
})
export default class Gist extends Vue {
  @Mutation("importKle", { namespace }) importKle: any;
  @Mutation("loadGist", { namespace }) loadGist: any;

  @Prop()
  public file!: any;

  @Prop({ required: true })
  public gistType!: string;

  public node: any = null;

  get selectContent() {
    if (this.file && this.node) {
      const raw = this.node.files.find(
        (file: any) => file.name === this.file.name
      ).text;

      if (this.gistType === "open") {
        this.loadGist({ raw, name: this.file.name, id: this.file.id });
        this.$router.push({ name: "home" });
      } else {
        this.importKle({ raw, name: this.file.name });
        this.$router.push({ name: "home" });
      }
      return raw;
    }
    return "";
  }
}
</script>

<style></style>
