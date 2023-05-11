<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center">
          <img src="../../static/login.png" />
        </div>
        <v-row class="pt-7">
          <CardTask />
        </v-row>
      </v-col>
    </v-row>

    <v-card-text style="height: 100px; position: unset" class="card_text">
      <v-fab-transition>
        <v-dialog v-model="dialog4" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              fixed
              bottom
              right
              fab
              v-bind="attrs"
              v-on="on"
              class="ma-2"
              dark
              rounded
              v-model="dialog4"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 lighten-2">
              Crear nueva tarea
            </v-card-title>
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
                <v-date-picker no-title @input="menu1 = false"></v-date-picker>
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
              <v-btn color="red" text @click="dialog4 = false">
                Cancelar
              </v-btn>
              <v-btn color="primary" text @click="dialog4 = false">
                Crear
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-fab-transition>
    </v-card-text>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import CardTask from "~/components/CardTask.vue";
import { namespace } from "vuex-class";
const Auth = namespace("AuthModule");
@Component({
  components: { CardTask },
  layout(context) {
    return "dashboard";
  },
})
export default class Tasks extends Vue {
  public dialog4 = false;
  public menu1 = false;
  public column = null;
  public row = null;
}
</script>

<style>
.card_text {
  width: 150px;
  height: 150px;
  border-radius: 80%;
  margin: 30%;
  display: block;
}
</style>
