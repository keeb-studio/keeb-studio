<template>
  <div>
    <a
      :href="schData"
      :download="`${name}.sch`"
      class="btn btn-outline-primary col-form-label pt-0 pb-0 mb-2"
    >
      Schematic
    </a>
    <div class="row">
      <ul class="pl-3">
        <li>
          column:
          <input
            :key="'schematic_x'"
            type="number"
            :name="'schematic_x'"
            :value="theKey['schematic_x']"
            @input="x => changeValue(x, 'schematic_x')"
            :placeholder="'schematic_x'"
            class="form-control"
          />
        </li>
        <li>
          row:
          <input
            :key="'schematic_y'"
            type="number"
            :name="'schematic_y'"
            :value="theKey['schematic_y']"
            @input="x => changeValue(x, 'schematic_y')"
            :placeholder="'schematic_y'"
            class="form-control"
          />
        </li>
        <li>
          index:
          <input
            readonly
            :key="'schematic_index'"
            type="number"
            :name="'schematic_index'"
            :value="pcbPosition.index"
            :placeholder="'schematic_index'"
            class="form-control"
          />
        </li>

        <li>
          foot print type:
          <select v-model="footPrintType" class="form-control">
            <option>MX_PCB_XXXH</option>
            <option>Hybrid_PCB_XXXH</option>
          </select>
        </li>
        <!-- MX_PCB_100H -->
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation, Action } from "vuex-class";
import { Key } from "@/models/KeysetLayout/Key";
import GridPlacer from "@/models/KicadSchematic/GridPlacer";
import KicadSchematic from "@/models/KicadSchematic/KicadSchematic";
import { ISchematicKey } from "@/models/KeysetLayout/IGrid";
const SCHEMA_TEMPLATE = `EESchema Schematic File Version 4
LIBS:1U-cache
EELAYER 29 0
EELAYER END
$Descr User 17000 11000
encoding utf-8
Sheet 1 1
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L Device:D_Small D?
U 1 1 5D5F5496
P 950 1050
F 0 "D?" V 1125 1000 50  0000 L CNN
F 1 "D_Small" H 775 1200 50  0000 L CNN
F 2 "Keebio-Parts:Diode-dual" V 950 1050 50  0001 C CNN
F 3 "~" V 950 1050 50  0001 C CNN
	1    950  1050
	0    -1   -1   0
$EndComp
$Comp
L MX_Alps_Hybrid:MX-NoLED MX0
U 1 1 5D5FEB52
P 1275 1100
F 0 "MX0" H 1200 800 60  0000 C CNN
F 1 "MX-NoLED" H 1200 850 20  0000 C CNN
F 2 "Keebio-Parts:SCHEMAFOOTPRINT" H 650 1075 60  0001 C CNN
F 3 "" H 650 1075 60  0001 C CNN
	1    1275 1100
	-1   0    0    1
$EndComp
$Comp
L MX_Alps_Hybrid:MX-NoLED MX2
U 1 1 5D57639E
P 2150 1650
F 0 "MX2" H 2183 1873 60  0000 C CNN
F 1 "MX-NoLED" H 2183 1799 20  0000 C CNN
F 2 "" H 1525 1625 60  0001 C CNN
F 3 "" H 1525 1625 60  0001 C CNN
	1    2150 1650
	1    0    0    -1
$EndComp
Wire Wire Line
	1325  950  950  950
Wire Wire Line
	950  1150 950  1275
Wire Wire Line
	950  1275 1825 1275
Wire Wire Line
	1825 1275 1825 1150
Wire Wire Line
	1125 1150 1125 1700
$EndSCHEMATC
`;

@Component({})
export default class SchematicMeta extends Vue {
  footPrintType: string = "MX_PCB_XXXH";
  @Action("changeKeyValue", { namespace: "layout" })
  changeKeyValue: any;

  @Getter("allKeys", { namespace: "layout" })
  allKeys: any;

  @Getter("name", { namespace: "layout" })
  name: any;

  @Getter("calculatedPositions", { namespace: "layout" })
  calculatedPositions: any;

  @Prop()
  private theKey!: Key;

  get schemaFootPrint() {
    return this.footPrintType.replace("XXX", this.theKey.width.toString());
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

  get pcbPosition() {
    const positions = this.calculatedPositions as ISchematicKey[];
    const thisPosition = positions.find(
      (key: ISchematicKey) => key.id === this.theKey.id
    );
    return thisPosition;
  }

  get schData() {
    var text = this.schematicRender;
    var data = new Blob([text], { type: "application/octet-stream" });
    return window.URL.createObjectURL(data);
  }

  get schematicRender() {
    const widthNumber = parseInt(
      (this.theKey.width * 100).toString()
    ).toString();
    const fp = this.footPrintType.replace("XXX", "XMXFOOTPRINTX");
    const schema = SCHEMA_TEMPLATE.replace("SCHEMAFOOTPRINT", fp);
    return new KicadSchematic(schema).getWithKeeb(this.calculatedPositions);
  }
}
</script>

<style scoped>
ul li {
  display: block;
  text-align: left;
}
</style>
