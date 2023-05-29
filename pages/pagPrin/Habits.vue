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

      <template v-slot:item.Lunes="{ item }" >
        <v-simple-checkbox
          v-model="item.Lunes"
        ></v-simple-checkbox>
      </template>

      <template v-slot:item.Martes="{ item }" >
        <v-simple-checkbox
          v-model="item.Martes"
        ></v-simple-checkbox>
      </template>

      <template v-slot:item.Miercoles="{ item }" >
        <v-simple-checkbox
          v-model="item.Miercoles"
        ></v-simple-checkbox>
      </template>

      <template v-slot:item.Jueves="{ item }" >
        <v-simple-checkbox
          v-model="item.Jueves"
        ></v-simple-checkbox>
      </template>

      <template v-slot:item.Viernes="{ item }" >
        <v-simple-checkbox
          v-model="item.Viernes"
        ></v-simple-checkbox>
      </template>

      <template v-slot:item.Sabado="{ item }" >
        <v-simple-checkbox
          v-model="item.Sabado"
        ></v-simple-checkbox>
      </template>

      <template v-slot:item.Domingo="{ item }" >
        <v-simple-checkbox
          v-model="item.Domingo"
        ></v-simple-checkbox>
      </template>

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
              <v-card-title class="text-h5 lighten-2">
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field outlined
                        v-model="editedItem.name"
                        label="Nombre del habito"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field outlined
                        v-model="editedItem.description"
                        label="Descripcion del habito"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        :items="prioritySelect"
                        label="Prioridad"
                        outlined
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field outlined
                            label="Fecha Limite"
                            hint="YYYY/MM/DD format"
                            persistent-hint
                            v-bind="attrs"
                            v-on="on"
                            v-model="date"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          no-title
                          scrollable
                          @input="menu = false"
                        ></v-date-picker>
                      </v-menu>
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
  public prioritySelect = [
    {text: "Alta", value: 1},
    {text: "Media", value: 2},
    {text: "Baja", value: 3}
  ];
  
  public habits: Habit[] = [];

  public editedIndex = -1;
  public editedItem: Habit = {
    name: "",
  };
  public defaultItem: Habit = {
    name: "",
  };
  public menu = false;
  date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);

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
