<template>
  <div>
    <label for="" class="text-primary"
      >autosave
      <input
        type="checkbox"
        name=""
        id=""
        class="m-2"
        :checked="enableAutoSave"
        @change="toggleAutoSave"
      />
    </label>
    <Octicon v-if="hasChanges" name="alert" class="text-primary"></Octicon>
    <Octicon v-else name="check" class="text-primary"></Octicon>
    <span class="text-primary p-4" v-if="timeSinceChanged > -1">{{
      timeSinceChanged
    }}</span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import "vue-octicon/icons";
import Octicon from "vue-octicon/components/Octicon.vue";
@Component({ components: { Octicon } })
export default class WriteGist extends Vue {
  @Getter("hasChanges") hasChanges: any;
  @Getter("enableAutoSave") enableAutoSave: any;
  @Getter("timeSinceChanged") timeSinceChanged: any;
  @Action("toggleAutoSave", { namespace: "layout" }) toggleAutoSave: any;
}
</script>
