<template>
  <g class="keycap" @click="handleClick">
    <g>
      <rect
        :style="`stroke: ${outlineColor}; stroke-width: 1;`"
        :x="calcX"
        :y="calcY"
        :width="calcWidth"
        :height="calcHeight"
        :transform="calcTransform"
        :fill="color"
      ></rect>
      <text
        :transform="calcTransform"
        class="keytext"
        v-for="(t, i) in texts"
        :key="i"
        :x="t.x"
        :y="t.y"
        :fill="textColor"
        :text-anchor="t.align"
        >{{ getText(i) }}</text
      >
    </g>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation, Action } from "vuex-class";

const BASEUNIT = 54;
@Component({})
export default class KeyCapV2 extends Vue {
  @Prop() private schematic_x!: number;
  @Prop() private schematic_y!: number;
  @Prop() private schematic_index!: number;
  @Prop() private x!: number;
  @Prop() private y!: number;
  @Prop() private width!: number;
  @Prop() private height!: number;
  @Prop() private rotation_angle!: number;
  @Prop() private rotation_x!: number;
  @Prop() private rotation_y!: number;
  @Prop() private color!: number;
  @Prop() private t1!: string;
  @Prop() private t2!: string;
  @Prop() private t3!: string;
  @Prop() private t4!: string;
  @Prop() private t5!: string;
  @Prop() private t6!: string;
  @Prop() private t7!: string;
  @Prop() private t8!: string;
  @Prop() private t9!: string;
  @Prop() private id!: string;
  @Prop() private optionFor!: string;
  @Prop() private default!: IDefaultText;

  @Action("selectKey") selectKey: any;

  @Getter("isSelectedGetter")
  isSelectedGetter: any;

  @Getter("gridMode", { namespace: "layout" })
  gridMode: any;

  get isSelected(): boolean {
    return this.isSelectedGetter(this.id);
  }

  getText(index: number): string {
    if (this.gridMode) {
      if (index === 0) {
        return this.schematic_x.toString();
      } else if (index === 8) {
        return this.schematic_y.toString();
      }
      return "";
    } else {
      if (this.optionFor) {
        const prop = `t${index + 1}` as any;
        const str = this.optionFor[prop];
        return str ? `(${str})` : "";
      }
      const foo = this.texts[index];
      return foo.text;
    }
  }
  get outlineColor(): string {
    return this.isSelected ? "red" : "black";
  }
  // @Prop() private outlineColor!: string;
  handleClick() {
    // this.selected = !this.selected;
    this.selectKey(this.id);
  }

  get calcTransform(): string {
    return `rotate(${this.rotation_angle} ${this.rotation_x * BASEUNIT} ${this
      .rotation_y * BASEUNIT})`;
  }

  get calcWidth(): number {
    return this.width * BASEUNIT;
  }

  get calcHeight(): number {
    return this.height * BASEUNIT;
  }

  get calcX(): number {
    return this.x * BASEUNIT;
  }

  get calcY(): number {
    return this.y * BASEUNIT;
  }

  get textColor(): string {
    return this.default ? this.default.textColor : "black";
  }
  get texts(): Array<IText> {
    const tw = 17;
    const ty = 17;
    const xa = 6;
    const ya = 13;
    return [
      {
        x: 0 * tw + this.calcX + xa,
        y: 0 * ty + this.calcY + ya,
        text: this.t1,
        align: "left"
      },
      {
        x: 1 * tw + this.calcX + xa,
        y: 0 * ty + this.calcY + ya,
        text: this.t2,
        align: "left"
      },
      {
        x: 2 * tw + this.calcX + xa,
        y: 0 * ty + this.calcY + ya,
        text: this.t3,
        align: "left"
      },
      {
        x: 0 * tw + this.calcX + xa,
        y: 1 * ty + this.calcY + ya,
        text: this.t4,
        align: "left"
      },
      {
        x: 1 * tw + this.calcX + xa,
        y: 1 * ty + this.calcY + ya,
        text: this.t5,
        align: "left"
      },
      {
        x: 2 * tw + this.calcX + xa,
        y: 1 * ty + this.calcY + ya,
        text: this.t6,
        align: "left"
      },
      {
        x: 0 * tw + this.calcX + xa,
        y: 2 * ty + this.calcY + ya,
        text: this.t7,
        align: "right"
      },
      {
        x: 1 * tw + this.calcX + xa,
        y: 2 * ty + this.calcY + ya,
        text: this.t8,
        align: "right"
      },
      {
        x: 2 * tw + this.calcX + xa,
        y: 2 * ty + this.calcY + ya,
        text: this.t9,
        align: "right"
      }
    ];
  }
}

interface IText {
  x: number;
  y: number;
  text: string;
  align: string;
}

interface IDefaultText {
  textColor: string;
  textSize: number;
}
</script>

<style>
.keycap .border {
  stroke: black;
  stroke-width: 1;
}
.keycap .inner.border {
  stroke: rgba(0, 0, 0, 0.1);
}

.keytext {
  font-family: "Arial";
  font-size: 12px;
  text-align: center;
}
</style>
