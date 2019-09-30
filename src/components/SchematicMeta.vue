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
      <ul class="col-6">
        <li>
          <b>
            row
          </b>
        </li>
        <li v-for="(info, index) in totalGridKeys.rows" :key="index">
          {{ info }}
        </li>
      </ul>
      <ul class="col-6">
        <li>
          <b>
            cols
          </b>
        </li>
        <li v-for="(info, index) in totalGridKeys.cols" :key="index">
          {{ info }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation, Action } from "vuex-class";
import { SimpleKey } from "@/models/KeysetLayout/SimpleKey";
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
$Comp
L keebio:ProMicro U0
U 1 1 5DA927A7
P 2100 8600
F 0 "U0" H 2100 9437 60  0000 C CNN
F 1 "ProMicro" H 2100 9331 60  0000 C CNN
F 2 "Keebio-Parts:ArduinoProMicro" V 3150 6100 60  0001 C CNN
F 3 "" V 3150 6100 60  0001 C CNN
	1    2100 8600
	1    0    0    -1  
$EndComp
Text GLabel 2800 8450 2    50   Input ~ 0
col0
Text GLabel 2800 8550 2    50   Input ~ 0
col1
Text GLabel 2800 8650 2    50   Input ~ 0
col2
Text GLabel 2800 8750 2    50   Input ~ 0
col3
Text GLabel 2800 8850 2    50   Input ~ 0
col4
Text GLabel 2800 8950 2    50   Input ~ 0
col5
Text GLabel 2800 9050 2    50   Input ~ 0
col6
Text GLabel 2800 9150 2    50   Input ~ 0
col7
Text GLabel 1400 8950 0    50   Input ~ 0
row7
Text GLabel 1400 8850 0    50   Input ~ 0
row6
Text GLabel 1400 8750 0    50   Input ~ 0
row5
Text GLabel 1400 8650 0    50   Input ~ 0
row4
Text GLabel 1400 8550 0    50   Input ~ 0
row3
Text GLabel 1400 8450 0    50   Input ~ 0
row2
Text GLabel 1400 8050 0    50   Input ~ 0
row0
Text GLabel 1400 8150 0    50   Input ~ 0
row1
Text GLabel 1400 9050 0    50   Input ~ 0
row8
Text GLabel 1400 9150 0    50   Input ~ 0
row9
$Comp
L power:VCC #PWR0101
U 1 1 5D8F060B
P 2800 8350
F 0 "#PWR0101" H 2800 8200 50  0001 C CNN
F 1 "VCC" V 2817 8478 50  0000 L CNN
F 2 "" H 2800 8350 50  0001 C CNN
F 3 "" H 2800 8350 50  0001 C CNN
	1    2800 8350
	0    1    1    0   
$EndComp
$Comp
L power:GND #PWR0102
U 1 1 5D909AD2
P 2800 8150
F 0 "#PWR0102" H 2800 7900 50  0001 C CNN
F 1 "GND" V 2805 8022 50  0000 R CNN
F 2 "" H 2800 8150 50  0001 C CNN
F 3 "" H 2800 8150 50  0001 C CNN
	1    2800 8150
	0    -1   -1   0   
$EndComp
$Comp
L power:GND #PWR0103
U 1 1 5D90A7AE
P 1400 8250
F 0 "#PWR0103" H 1400 8000 50  0001 C CNN
F 1 "GND" V 1405 8122 50  0000 R CNN
F 2 "" H 1400 8250 50  0001 C CNN
F 3 "" H 1400 8250 50  0001 C CNN
	1    1400 8250
	0    1    1    0   
$EndComp
$Comp
L power:GND #PWR0104
U 1 1 5D90B04A
P 1400 8350
F 0 "#PWR0104" H 1400 8100 50  0001 C CNN
F 1 "GND" V 1405 8222 50  0000 R CNN
F 2 "" H 1400 8350 50  0001 C CNN
F 3 "" H 1400 8350 50  0001 C CNN
	1    1400 8350
	0    1    1    0   
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

Text GLabel 2800 8250 2    50   Input ~ 0
RESET
$EndSCHEMATC
`;

@Component({})
export default class SchematicMeta extends Vue {
  footPrintType: string = "MX_PCB_XXXH";
  @Action("changeKeyValue", { namespace: "layout" }) changeKeyValue: any;

  @Getter("totalGridKeys", { namespace: "layout" }) totalGridKeys: any;
  @Getter("allKeys", { namespace: "layout" }) allKeys: any;
  @Getter("name", { namespace: "layout" }) name: any;
  @Getter("calculatedPositions", { namespace: "layout" })
  calculatedPositions: any;
  @Prop() private theKey!: SimpleKey;

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
    return thisPosition || { index: 0 };
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
