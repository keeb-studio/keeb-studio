<template>
  <div>
    <a
      :href="pcbData"
      :download="`${name}.kicad_pcb`"
      class="btn btn-outline-primary col-form-label pt-0 pb-0 mb-2"
    >
      PCB
    </a>
    <div class="row">
      <ul class="pl-3">
        <li>x: {{ x }}</li>
        <li>y: {{ y }}</li>
        <li>r: {{ rotation }}</li>
        <input type="file" id="pcb-input" @change="attachFile" />
        <input :value="inputPcb" />
        <textarea v-model="calcString"> </textarea>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
import MathHelper from "../models/MathHelper";
import KicadPCB from "@/models/KicadPCB/KicadPCB";
import { ISchematicKey } from "../models/KeysetLayout/IGrid";
@Component({})
export default class PcbCalc extends Vue {
  inputPcb: any = null;

  @Getter("calculatedPositions")
  calculatedPositions: any;
  @Getter("allKeys") allKeys: any;
  @Getter("name") name: any;
  @Prop() private theKey!: SimpleKey;

  get calcString() {
    return JSON.stringify(this.calculatedPositions);
  }
  get pcbPosition() {
    const positions = this.calculatedPositions as ISchematicKey[];
    const thisPosition = positions.find(
      (key: ISchematicKey) => key.id === this.theKey.id
    );
    return thisPosition;
  }

  attachFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      const component = this;
      reader.onload = function(evt: any) {
        component.inputPcb = evt.target.result;
      };
    } else {
      this.inputPcb = null;
    }
  }

  get pcbData() {
    var text = this.pcbRender;
    var data = new Blob([text], { type: "application/octet-stream" });
    return window.URL.createObjectURL(data);
  }

  get pcbRender() {
    if (this.inputPcb !== null) {
      const pcb = new KicadPCB({ raw: this.inputPcb } as any);

      const positions = this.calculatedPositions as ISchematicKey[];
      positions.forEach((key: ISchematicKey) => {
        const includeDiode = key.optionFor === null;
        pcb.position(
          key.index,
          key.pcbX,
          key.pcbY,
          key.pcbRotation,
          includeDiode
        );
      });
      return pcb.render();
    }
    return "nope";
  }

  get schematicUpload() {
    // var file = document.getElementById("schematicUpload").files[0];
    // if() {

    // }
    return "none";
  }
  get rotation() {
    return MathHelper.roundResult(
      this.pcbPosition ? this.pcbPosition.pcbRotation : 0
    );
  }

  get x() {
    return MathHelper.roundResult(this.pcbPosition ? this.pcbPosition.pcbX : 0);
  }

  get y() {
    return MathHelper.roundResult(this.pcbPosition ? this.pcbPosition.pcbY : 0);
  }
}
</script>

<style scoped>
ul li {
  display: block;
  text-align: left;
}
</style>
