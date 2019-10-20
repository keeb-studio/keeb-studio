<template>
  <form action class="form-inline">
    <!-- legends -->

    <legend class="col-form-label col-form-label-sm pb-0">Info</legend>
    <div class="row m-1">Totat: {{ allKeys.length }}</div>
    <legend
      class="col-form-label col-form-label-sm pb-0"
      @click="togglePanel('Legends')"
    >
      Legends
      <a v-if="isPanelCollapsed('Legends')">
        <Octicon name="triangle-right" class="text-primary"></Octicon>
      </a>

      <a v-else>
        <Octicon name="triangle-down" class="text-primary"></Octicon>
      </a>
    </legend>
    <div class="row m-1" v-if="!isPanelCollapsed('Legends')">
      <template v-for="t in textInputs">
        <input
          :key="t"
          type="text"
          :name="t"
          :value="theKey[t]"
          @input="x => changeValue(x, t)"
          :placeholder="t"
          class="form-control col-4"
        />
      </template>
    </div>

    <!-- position -->
    <legend class="col-form-label col-form-label-sm pb-0">Position</legend>
    <div class="row m-1">
      <div class="input-group col-6">
        <div class="input-group-prepend">
          <div class="input-group-text p-1">x</div>
        </div>
        <input
          :key="'x'"
          type="number"
          :name="'x'"
          :value="theKey['x']"
          @input="x => changeValue(x, 'x')"
          :placeholder="'x'"
          class="form-control"
        />

        <div class="input-group-prepend">
          <div class="input-group-text p-1">y</div>
        </div>
        <input
          :key="'y'"
          type="number"
          :name="'y'"
          :value="theKey['y']"
          @input="x => changeValue(x, 'y')"
          :placeholder="'y'"
          class="form-control"
        />
      </div>

      <div class="input-group col-6">
        <div class="input-group-prepend">
          <div class="input-group-text p-1 tiny-t">width</div>
        </div>
        <input
          :key="'width'"
          type="number"
          :name="'width'"
          :value="theKey['width']"
          @input="x => changeValue(x, 'width')"
          :placeholder="'width'"
          class="form-control"
        />
        <div class="input-group-prepend">
          <div class="input-group-text p-1 tiny-t">height</div>
        </div>
        <input
          :key="'height'"
          type="number"
          :name="'height'"
          :value="theKey['height']"
          @input="x => changeValue(x, 'height')"
          :placeholder="'height'"
          class="form-control"
        />
      </div>
    </div>

    <!-- rotation -->
    <legend class="col-form-label col-form-label-sm pb-0">Rotation</legend>
    <div class="row m-1">
      <div class="input-group col">
        <div class="input-group-prepend">
          <div class="input-group-text p-1 tiny-t">angle °</div>
        </div>
        <input
          :key="'rotation_angle'"
          type="number"
          :name="'rotation_angle'"
          :value="theKey['rotation_angle']"
          @input="x => changeValue(x, 'rotation_angle')"
          :placeholder="'rotation_angle'"
          class="form-control"
        />
        <div class="input-group-prepend">
          <div class="input-group-text p-1">x</div>
        </div>
        <input
          :key="'rotation_x'"
          type="number"
          :name="'rotation_x'"
          :value="theKey['rotation_x']"
          @input="x => changeValue(x, 'rotation_x')"
          :placeholder="'rotation_x'"
          class="form-control"
        />

        <div class="input-group-prepend">
          <div class="input-group-text p-1">y</div>
        </div>
        <input
          :key="'rotation_y'"
          type="number"
          :name="'rotation_y'"
          :value="theKey['rotation_y']"
          @input="x => changeValue(x, 'rotation_y')"
          :placeholder="'rotation_y'"
          class="form-control"
        />
      </div>
    </div>

    <!-- color -->
    <legend class="col-form-label col-form-label-sm pb-0">Color</legend>
    <div class="row m-1">
      <div class="input-group-prepend">
        <div class="input-group-text p-1 tiny-t">color</div>
      </div>
      <input
        :key="'color'"
        :name="'color'"
        :value="theKey['kColor']"
        @input="x => changeValue(x, 'color')"
        :placeholder="'color'"
        class="form-control"
      />
      <div class="input-group-prepend">
        <div class="input-group-text p-1 tiny-t">text color</div>
      </div>
      <input
        :value="theKey['kTextColor']"
        @input="x => changeValue(x, 'color')"
        placeholder="text"
        class="form-control"
      />
    </div>

    <!-- option for -->
    <legend class="col-form-label col-form-label-sm pb-0">Option For</legend>
    <div class="row m-1">
      <input
        readonly
        :key="'optionFor'"
        :name="'optionFor'"
        :value="
          theKey['optionFor']
            ? getHumanLabelForKey(theKey['optionFor'])
            : 'none'
        "
        :placeholder="'optionFor'"
        class="form-control"
        @click="setOption"
      />

      <button
        type="button"
        class="btn btn-outline-primary"
        @click="clearOption"
      >
        Clear
      </button>

      <div class="form-check ml-4">
        <label for="one" class="form-check-label">left</label>
        <input
          type="radio"
          id="left"
          value="left"
          :checked="'left' === theKey.targetAlign"
          @change="changeAlign($event.target.value)"
          class="form-check-input"
        />
      </div>

      <div class="form-check ml-2">
        <label for="two" class="form-check-label">right</label>
        <input
          type="radio"
          id="right"
          value="right"
          :checked="'right' === theKey.targetAlign"
          @change="changeAlign($event.target.value)"
          class="form-check-input"
        />
      </div>
      <br />
    </div>

    <!-- nudge for -->
    <legend class="col-form-label col-form-label-sm pb-0">Nudge</legend>

    <div class="row">
      <div class="col-4">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">amount</div>
          </div>
          <input type="number" v-model="nudgeAmount" class="form-control" />
          <label for="">
            <span class="p-2">include axis</span>
            <input
              type="checkbox"
              name="axis_nudge"
              id="axis_nudge"
              :checked="enableAxisNudge"
              @change="toggleAxisNudge"
            />
          </label>
        </div>
      </div>
      <div class="col-7">
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="handleNudge('up')"
          style="margin-right: 197px; margin-left: 40px;"
        >
          ↑
        </button>
        <button
          type="button"
          class="btn btn-outline-primary ml-10"
          @click="handleNudge('left')"
        >
          ←
        </button>

        <button
          type="button"
          class="btn btn-outline-primary"
          @click="handleNudge('down')"
        >
          ↓
        </button>
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="handleNudge('right')"
        >
          →
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation, Action } from "vuex-class";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
import "vue-octicon/icons";
import Octicon from "vue-octicon/components/Octicon.vue";
@Component({ components: { Octicon } })
export default class KeyEditor extends Vue {
  @Action("changeKeyValue") changeKeyValue: any;
  @Action("nudge") nudge: any;
  @Mutation("pickKey") pickKey: any;
  @Getter("allKeys") allKeys: any;
  @Action("toggleAxisNudge") toggleAxisNudge: any;
  @Getter("enableAxisNudge") enableAxisNudge: any;
  @Prop() private theKey!: SimpleKey;

  textInputs: string[] = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"];
  nudgeAmount: number = 1;
  collapsedPanels: string[] = ["Legends"];
  clearOption() {
    this.changeKeyValue({
      id: this.theKey.id,
      property: "optionFor",
      value: null
    });
  }
  changeAlign(value: string) {
    this.changeKeyValue({
      id: this.theKey.id,
      property: "targetAlign",
      value
    });
  }
  getHumanLabelForKey(key: SimpleKey) {
    if (key.t1) return key.t1;
    if (key.t2) return key.t2;
    if (key.t3) return key.t3;
    if (key.t4) return key.t4;
    if (key.t5) return key.t5;
    if (key.t6) return key.t6;
    if (key.t7) return key.t7;
    if (key.t8) return key.t8;
    if (key.t9) return key.t9;
    if (key.schematic_x > -1 && key.schematic_y > -1) {
      return `${key.schematic_x}, ${key.schematic_y}`;
    } else {
      return `${key.x}, ${key.y}`;
    }
  }
  handleNudge(direction: string) {
    const nudge = parseFloat(this.nudgeAmount as any) || 1;
    this.nudge({ direction, nudge });
  }
  isPanelCollapsed(panel: string) {
    return this.collapsedPanels.includes(panel);
  }
  togglePanel(panel: string) {
    if (this.isPanelCollapsed(panel)) {
      this.collapsedPanels = this.collapsedPanels.filter(
        (p: string) => p !== panel
      );
    } else {
      this.collapsedPanels.push(panel);
    }
  }
  changeValue(x: any, property: string) {
    let value = x.target.value;
    if (x.target.type === "number") {
      if (value.indexOf(".") > -1) {
        value = parseFloat(value);
      } else {
        value = parseInt(value);
      }
    }
    this.changeKeyValue({
      id: this.theKey.id,
      property,
      value
    });
  }
  setOption() {
    this.pickKey(this.theKey);
  }
}
</script>

<style lang="scss" scoped>
.editor-form {
  width: 150px;
}
.key-text {
  width: 50px;
}
</style>
