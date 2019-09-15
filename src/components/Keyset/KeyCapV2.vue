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
      >
      </rect>
      <text
        :transform="calcTransform"
        class="keytext"
        v-for="(t, i) in texts"
        :key="i"
        :x="t.x"
        :y="t.y"
        :fill="textColor"
        :text-anchor="t.align"
        >{{ t.text }}</text
      >
    </g>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";

const BASEUNIT = 54;
@Component({})
export default class KeyCapV2 extends Vue {
  @Prop() private x!: number;
  @Prop() private y!: number;
  @Prop() private width!: number;
  @Prop() private height!: number;
  @Prop() private rotation_angle!: number;
  @Prop() private rotation_x!: number;
  @Prop() private rotation_y!: number;
  @Prop() private color!: number;
  @Prop() private t1!: number;
  @Prop() private t2!: number;
  @Prop() private t3!: number;
  @Prop() private t4!: number;
  @Prop() private t5!: number;
  @Prop() private t6!: number;
  @Prop() private t7!: number;
  @Prop() private t8!: number;
  @Prop() private t9!: number;
  @Prop() private id!: string;
  @Prop() private default!: IDefaultText;

  @Mutation("selectKey", { namespace: "layout" }) selectKey: any;
  @Getter("isSelectedGetter", { namespace: "layout" }) isSelectedGetter: any;

  get isSelected(): boolean {
    return this.isSelectedGetter(this.id);
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
  text: number;
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
