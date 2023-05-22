<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center">
          <img src="../../static/login.png" />
        </div>
      </v-col>
    </v-row>

    <!-- TABLA HABITOS -->

    <v-data-table :headers="headers" :items="habits" class="elevation-1">
      <v-checkbox hide-details class="shrink mr-2 mt-0"></v-checkbox>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Mi seguidor de Habitos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <!-- SELECCIONAR VISTA -->
          <div class="text-center">
            <v-menu>
              <template v-slot:activator="{ on: menu, attrs }">
                <v-btn
                  color="primary"
                  outlined
                  class="mb-2 mr-4"
                  v-bind="attrs"
                  v-on="{ ...menu }"
                >
                  Elegir vista
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title>Semana</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Mes</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <!-- AGREGAR Y EDITAR HABITO -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nuevo habito
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nombre del habito"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="close"> Cancelar </v-btn>
                <v-btn color="success" text @click="save"> GUardar </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- ELIMINAR HABITO -->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Seguro que deseas eliminar este habito?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="success" text @click="deleteItemConfirm"
                  >Aceptar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- BOTONES DE EDITAR Y ELIMINAR -->
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>

    <!-- CREAR TAREA -->

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
              <v-radio-group row>
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
import { Vue, Component } from "vue-property-decorator";
interface Habit {
  name: string;
}
@Component({
  layout(context) {
    return "dashboard";
  },
})
export default class Habits extends Vue {
  public menu1 = false;
  public dialog = false;
  public dialog4 = false;
  public dialogDelete = false;
  public headers = [
    {
      text: "HABITO",
      align: "start",
      sortable: true,
      value: "name",
    },
    { text: "Lunes", value: "Lunes", sortable: false },
    { text: "Martes", value: "Martes", sortable: false },
    { text: "Miercoles", value: "Miercoles", sortable: false },
    { text: "Jueves", value: "Jueves", sortable: false },
    { text: "Viernes", value: "Viernes", sortable: false },
    { text: "Sabado", value: "Sabado", sortable: false },
    { text: "Domingo", value: "Domingo", sortable: false },
    { text: "Actions", value: "actions", sortable: false },
  ];
  public habits: Habit[] = [];
  public editedIndex = -1;
  public editedItem: Habit = {
    name: "",
  };
  public defaultItem: Habit = {
    name: "",
  };

  public get formTitle(): string {
    return this.editedIndex === -1 ? "Nuevo habito" : "Editar habito";
  }

  public created(): void {
    this.initialize();
  }

  public initialize(): void {
    this.habits = [
      {
        name: "Hacer ejercicio",
      },
      {
        name: "Tocar guitarra",
      },
      {
        name: "Aprender ingles",
      },
      {
        name: "Jugar genshin",
      },
      {
        name: "Skincare",
      },
      {
        name: "Leer",
      },
      {
        name: "Limpiar",
      },
      {
        name: "Correr",
      },
    ];
  }

  public editItem(item: Habit): void {
    this.editedIndex = this.habits.indexOf(item);
    this.editedItem = { ...item };
    this.dialog = true;
  }

  public deleteItem(item: Habit): void {
    this.editedIndex = this.habits.indexOf(item);
    this.editedItem = { ...item };
    this.dialogDelete = true;
  }

  public deleteItemConfirm(): void {
    this.habits.splice(this.editedIndex, 1);
    this.closeDelete();
  }

  public close(): void {
    this.dialog = false;
    this.$nextTick(() => {
      this.editedItem = { ...this.defaultItem };
      this.editedIndex = -1;
    });
  }

  public closeDelete(): void {
    this.dialogDelete = false;
    this.$nextTick(() => {
      this.editedItem = { ...this.defaultItem };
      this.editedIndex = -1;
    });
  }

  public save(): void {
    if (this.editedIndex > -1) {
      Object.assign(this.habits[this.editedIndex], this.editedItem);
    } else {
      this.habits.push(this.editedItem);
    }
    this.close();
  }
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
