<template>
  <div>
    <h2>{{ file.name }}</h2>
    <h5>{{ file.id }}</h5>
    <h6>{{ keyset }}</h6>
    <div>
      {{ selectContent }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "vue-apollo";
import GIST from "../../graphql/Gist.gql";
import KeysetLayout from "../../models/KeysetLayout/KeysetLayout";
import { mapMutations } from "vuex";
import { Mutation, Getter } from "vuex-class";
const namespace = "layout";
@Component({
  apollo: {
    node: {
      query: GIST,
      variables() {
        return { id: this.file.id };
      }
    }
  }
})
export default class Gist extends Vue {
  public node: any = null;
  @Prop() private file!: any;
  keysetLayout: KeysetLayout | null = null;
  @Mutation("layoutLoaded", { namespace }) layoutLoaded: any;
  @Getter("keyset", { namespace }) keyset: any;
  get selectContent() {
    if (this.file && this.node) {
      const raw = this.node.files.find(
        (file: any) => file.name === this.file.name
      ).text;
      this.layoutLoaded(raw);
      this.$router.push({ name: "home" });
      return raw;
    }
    return "";
  }
}
</script>

<style></style>
