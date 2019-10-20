<template>
  <footer class="footer">
    <div class="container text-muted">
      <span>key points (ax: {{ thePoints.a.x }}</span>
      <span>ay: {{ thePoints.a.y }})</span>

      <span>(bx: {{ thePoints.b.x }} </span>
      <span>by: {{ thePoints.b.y }})</span>

      <span>(cx: {{ thePoints.c.x }} </span>
      <span>cy: {{ thePoints.c.y }})</span>

      <span>(dx: {{ thePoints.d.x }} </span>
      <span>dy: {{ thePoints.d.y }})</span>

      <span>(mouse x: {{ mouseInfo.x }} </span>
      <span>y: {{ mouseInfo.y }}) </span>
    </div>
  </footer>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
@Component({})
export default class Footer extends Vue {
  name: string = "Footer";
  @Getter("mouseInfo", { namespace: "layout" }) mouseInfo: any;
  @Getter("thePoints") thePoints: any;
}
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #f5f5f5;
}
</style>
