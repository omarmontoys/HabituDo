<template>
  <v-card class="mx-4 my-4 rounded-xl" max-width="380" outlined>
    <v-list-item>
      <v-list-item-content>
        <div class="d-flex justify-center">
          <v-checkbox class="ml-3" v-model="checkbox"></v-checkbox>

          <v-list-item-title class="text-h7"> Titulo </v-list-item-title>
        </div>
        <v-list-item-subtitle class="ml-3"> Fecha limite </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <div class="d-flex justify-center">
      <v-card-actions>
        <div class="text-center">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="ma-2"
                color="primary"
                dark
                rounded
                v-model="dialog"
              >
                <v-icon dark> mdi-file-edit </v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5 green lighten-9">
                El Titulo de la Tarea </v-card-title
              ><br />
              <v-card-text>
                <v-text-field label="Titulo" outlined></v-text-field>
                <v-textarea
                  label="Descripcion"
                  name="input-7-1"
                  filled
                  auto-grow
                  outlined
                ></v-textarea>
                <v-menu
                  ref="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      label="Fecha Limite"
                      hint="YYYY/MM/DD format"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    no-title
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-card-text>
              <v-container fluid>
                <p>Prioridad</p>
                <v-radio-group v-model="row" row>
                  <v-radio label="Baja" value="radio-1"></v-radio>
                  <v-radio label="Media" value="radio-2"></v-radio>
                  <v-radio label="Alta" value="radio-3"></v-radio>
                </v-radio-group>
              </v-container>
              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="dialog = false">
                  Cancelar
                </v-btn>
                <v-btn color="primary" text @click="dialog = false">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div class="text-center">
          <v-dialog v-model="dialog2" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ma-2"
                v-bind="attrs"
                v-on="on"
                color="red"
                dark
                rounded
                v-model="dialog2"
              >
                <v-icon white> mdi-delete-empty </v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5 red lighten-9">
                Titulo de la Tarea </v-card-title
              ><br />

              <v-card-text>
                <h2>¿Esta seguro que quiere eliminar la tarea?</h2>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog2 = false">
                  Cancelar
                </v-btn>
                <v-btn color="red" text @click="dialog2 = false">
                  Confirmar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div class="text-center">
          <v-dialog v-model="dialog3" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ma-2"
                v-bind="attrs"
                v-on="on"
                color="purple"
                dark
                rounded
                v-model="dialog3"
              >
                <v-icon white> mdi-eye </v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5 purple lighten-9">
                Titulo de la Tarea
                <v-spacer></v-spacer>
                <v-btn icon @click="dialog3 = false">
                  <v-icon>mdi-alpha-x-circle-outline</v-icon>
                </v-btn>
              </v-card-title>
              <br />

              <v-card-text>
                <h4>Descripcion</h4>
                Secondary line text Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text>
                <h4>Fecha limite</h4>
                2023/05/15
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text>
                <h4>Prioridad</h4>
                Alta
              </v-card-text>

              <v-divider></v-divider>
            </v-card>
          </v-dialog>
        </div>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { Prop } from "vue-property-decorator";
@Component
export default class CardTask extends Vue {
  public dialog = false;
  public dialog2 = false;
  public dialog3 = false;
  public dialog4 = false;
  public checkbox = false;
  public menu1 = false;
  public column = null;
  public row = null;

  // Decorador @Prop para indicar a Vue que la propiedad existe en la clase
  @Prop({ default: null }) public dateFormatted!: string | null;
  public date: string = new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .substr(0, 10);

  public get computedDateFormatted(): string | null {
    return this.formatDate(this.date);
  }

  public formatDate(date: string | null): string {
    if (!date) {
      return "";
    }

    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  }

  public parseDate(date: string): string | null {
    if (!date) return null;
    const [month, day, year] = date.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
}
</script>
