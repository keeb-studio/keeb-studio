<template>
  <div>
    <Octicon v-if="hasChanges" name="alert" class="text-primary"></Octicon>
    <Octicon v-else name="check" class="text-primary"></Octicon>
    <span class="text-primary p-4" v-if="timerWatcher > -1">{{
      timeSinceChanged
    }}</span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";
import "vue-octicon/icons";
import Octicon from "vue-octicon/components/Octicon.vue";
@Component({ components: { Octicon } })
export default class WriteGist extends Vue {
  @Getter("hasChanges", { namespace: "layout" }) hasChanges: any;
  @Getter("timeSinceChanged", { namespace: "layout" }) timeSinceChanged: any;

  // timer: any = null;
  get timerWatcher() {
    // if (this.hasChanges) {
    //   if (this.timeSinceChange === -1) {
    //     this.timeSinceChange = 0;
    //   } else if (this.timeSinceChange > 10) {
    //     this.timeSinceChange = 0;
    //   }
    // } else {
    //   this.timeSinceChange = -1;
    // }
    return this.timeSinceChanged;
  }

  // created() {
  //   this.countDownTimer();
  // }

  // countDownTimer() {
  //   this.timer = setTimeout(() => {
  //     if (this.timeSinceChange > -1) {
  //       this.timeSinceChange += 1;
  //     }
  //     this.countDownTimer();
  //   }, 1000);
  // }
}
</script>
