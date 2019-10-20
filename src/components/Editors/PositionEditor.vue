<template>
  <div class="row">
    <form action class="form-inline col-sm-6">
      <!-- position -->
      <legend class="col-form-label col-form-label-sm pb-0">Position</legend>
      <div class="row m-1">
        <div class="input-group col-6">
          <div class="input-group-prepend">
            <div class="input-group-text p-1">x</div>
          </div>
          <EditorInput :the-key="theKey" property="x" type="number" />
          <div class="input-group-prepend">
            <div class="input-group-text p-1">y</div>
          </div>
          <EditorInput :the-key="theKey" property="y" type="number" />
        </div>
        <div class="input-group col-6">
          <div class="input-group-prepend">
            <div class="input-group-text p-1 tiny-t">width</div>
          </div>
          <EditorInput :the-key="theKey" property="width" type="number" />
          <div class="input-group-prepend">
            <div class="input-group-text p-1 tiny-t">height</div>
          </div>
          <EditorInput :the-key="theKey" property="height" type="number" />
        </div>
      </div>

      <!-- rotation -->
      <legend class="col-form-label col-form-label-sm pb-0">Rotation</legend>
      <div class="row m-1">
        <div class="input-group col">
          <div class="input-group-prepend">
            <div class="input-group-text p-1 tiny-t">angle °</div>
          </div>
          <EditorInput
            :the-key="theKey"
            property="rotation_angle"
            type="number"
          />
          <div class="input-group-prepend">
            <div class="input-group-text p-1">x</div>
          </div>
          <EditorInput :the-key="theKey" property="rotation_x" type="number" />

          <div class="input-group-prepend">
            <div class="input-group-text p-1">y</div>
          </div>
          <EditorInput :the-key="theKey" property="rotation_y" type="number" />
        </div>

        <button
          type="button"
          class="btn btn-outline-primary"
          @click="rotateKeys"
        >
          rotate 90
        </button>
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
    </form>

    <form action class="form-inline col-sm-6">
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
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, Mutation, Getter } from "vuex-class";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
import EditorInput from "./EditorInput.vue";
@Component({
  components: {
    EditorInput
  }
})
export default class PositionEditor extends Vue {
  @Action("changeKeyValue") changeKeyValue!: Function;
  @Action("nudge") nudge!: Function;
  @Action("rotateKeys") rotateKeys!: Function;
  @Action("toggleAxisNudge") toggleAxisNudge!: Function;
  @Getter("allKeys") allKeys!: SimpleKey[];
  @Getter("enableAxisNudge") enableAxisNudge!: boolean;
  @Mutation("pickKey") pickKey!: Function;
  @Prop() private theKey!: SimpleKey;
  name: string = "PositionEditor";
  nudgeAmount: number = 1;
  textInputs: string[] = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"];

  handleNudge(direction: string) {
    const nudge = parseFloat(this.nudgeAmount as any) || 1;
    this.nudge({ direction, nudge });
  }

  setOption() {
    this.pickKey(this.theKey);
  }

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
}
</script>
