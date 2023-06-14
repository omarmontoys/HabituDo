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

    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
      disable-pagination
      hide-default-footer
    >
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

          <!-- AGREGAR HABITO -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nuevo habito
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h5 lighten-2">
                <span class="text-h5"> Crear Nuevo Habito</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        outlined
                        v-model="habitInput.title"
                        label="Nombre del habito"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        outlined
                        v-model="habitInput.description"
                        label="Descripcion del habito"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        v-model="habitInput.priority"
                        aria-required="true"
                        :items="prioritySelect"
                        label="Prioridad"
                        outlined
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        v-model="habitInput.days"
                        :items="diasSemana"
                        chips
                        label="Dias de realizacion"
                        multiple
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
                          <v-text-field
                            outlined
                            label="Fecha Limite"
                            hint="YYYY/MM/DD format"
                            persistent-hint
                            v-bind="attrs"
                            v-on="on"
                            v-model="habitInput.finishDate"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="habitInput.finishDate"
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
                <v-btn color="red" text @click="dialog = false">
                  Cancelar
                </v-btn>
                <v-btn color="success" text @click="handleCreateHabit()">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- AGREGAR SNACKBAR -->

          <!-- ELIMINAR HABITO -->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Seguro que deseas eliminar este habito?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="dialogDelete = false"
                  >Cancelar</v-btn
                >
                <v-btn color="success" text @click="handleDeleteHabit()"
                  >Aceptar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- EDITAR HABITO -->
          <v-dialog v-model="dialogEdit" max-width="500px">
            <v-card>
              <v-card-title class="text-h5 lighten-2">
                <span class="text-h5"> Editar Habito</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        outlined
                        v-model="cloneHabit.title"
                        label="Nombre del habito"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        outlined
                        v-model="cloneHabit.description"
                        label="Descripcion del habito"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        v-model="cloneHabit.priority"
                        aria-required="true"
                        :items="prioritySelect"
                        label="Prioridad"
                        outlined
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        v-model="cloneHabit.days"
                        :items="diasSemana"
                        chips
                        label="Dias de realizacion"
                        multiple
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
                          <v-text-field
                            outlined
                            label="Fecha Limite"
                            hint="YYYY/MM/DD format"
                            persistent-hint
                            v-bind="attrs"
                            v-on="on"
                            v-model="cloneHabit.finishDate"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="cloneHabit.finishDate"
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
                <v-btn color="red" text @click="dialogEdit = false">
                  Cancelar
                </v-btn>
                <v-btn color="success" text @click="handleUpdateHabit()">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- VER HABITO -->
          <v-dialog v-model="dialogSee" max-width="800px">
            <v-card>
              <v-card-title class="text-h5"
                >Detalles de habito: {{ cloneHabit.title }}</v-card-title
              >
              <v-col cols="6">
                <v-card-text>
                  <h4>Titulo:</h4>
                  <p>{{ cloneHabit.title }}</p>

                  <v-divider></v-divider>

                  <h4>Descripcion:</h4>
                  <p>{{ cloneHabit.description }}</p>

                  <v-divider></v-divider>

                  <h4>Prioridad:</h4>
                  <p>
                    {{
                      cloneHabit.priority == "1"
                        ? "Baja"
                        : cloneHabit.priority == "2"
                        ? "Media"
                        : "Alta"
                    }}
                  </p>

                  <v-divider></v-divider>

                  <h4>Dias de realizacion:</h4>
                  <p>{{ getDayText(cloneHabit.days).join(", ") }}</p>

                  <v-divider></v-divider>

                  <h4>Fecha limite:</h4>
                  <p>{{ formatDate(cloneHabit.finishDate) }}</p>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <!--                 <pie-chart :data="data" :options="options" :width="400" :height="400"></pie-chart>
 -->
              </v-col>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="dialogSee = false"
                  >Cerrar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- BOTONES DE EDITAR Y ELIMINAR -->
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="seeItem(item)"> mdi-eye </v-icon>
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> No tienes habitos registrados </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { CreateHabitInput, Habit, User, UpdateHabitInput } from "~/gql/graphql";

const Auth = namespace("AuthModule");
const HabitModule = namespace("HabitModule");

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
  public dialogEdit = false;
  public dialogSee = false;
  public habitInput: CreateHabitInput = {
    title: "",
    description: "",
    priority: 0,
    days: [],
    finishDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  };

  public headers = [
    {
      text: "HABITO",
      align: "start",
      sortable: true,
      value: "title",
    },
    { text: "Actions", value: "actions", sortable: false },
  ];
  public prioritySelect = [
    { text: "Alta", value: 3 },
    { text: "Media", value: 2 },
    { text: "Baja", value: 1 },
  ];

  public diasSemana = [
    { text: "Domingo", value: 0 },
    { text: "Lunes", value: 1 },
    { text: "Martes", value: 2 },
    { text: "Miercoles", value: 3 },
    { text: "Jueves", value: 4 },
    { text: "Viernes", value: 5 },
    { text: "Sabado", value: 6 },
  ];
  @Prop({
    required: false,
  })
  public items: any[] = [];

  public menu = false;
  date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);

  @HabitModule.Action
  public CreateHabit!: (habit: CreateHabitInput) => Promise<void>;
  async handleCreateHabit() {
    const data = {
      title: this.habitInput.title,
      description: this.habitInput.description,
      priority: this.habitInput.priority,
      days: this.habitInput.days,
      finishDate: this.habitInput.finishDate,
    };
    await this.CreateHabit(data);
    this.habitInput = {
      title: "",
      description: "",
      priority: 0,
      days: [],
      finishDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
    this.dialog = false;
    this.initialize();
  }

  /*   @HabitModule.State("snackbarSuccessCreateHabit")
  public snackbarSuccessCreateHabit?: boolean;
  @HabitModule.State("snackbarSuccessMessageCreateHabit")
  public snackbarSuccessMessageCreateHabit?: string; */
  @HabitModule.Action
  private changeStatusSnackbarCreateHabit!: () => void;
  @Auth.State("me")
  private me!: User;
  @Auth.Action
  public fetchMe!: () => Promise<void>;
  @HabitModule.State("habits")
  public habit!: Habit[];
  @HabitModule.Action
  private fetchHabits!: () => Promise<void>;
  @HabitModule.Action
  private deleteHabit!: (id: string) => Promise<void>;
  async handleDeleteHabit() {
    console.log("handle", Habit);
    await this.deleteHabit(this.idHabit);
    this.dialogDelete = false;
    this.initialize();
  }

  public idHabit = "";

  async created() {
    await this.fetchMe();
    this.initialize();
  }
  @HabitModule.Action
  private updateHabit!: (data: UpdateHabitInput) => Promise<void>;
  async handleUpdateHabit() {
    await this.updateHabit({
      title: this.cloneHabit.title,
      description: this.cloneHabit.description,
      priority: this.cloneHabit.priority,
      days: this.cloneHabit.days,
      finishDate: this.cloneHabit.finishDate,
      id: this.cloneHabit.id,
    });
    this.dialogEdit = false;
    this.initialize();
  }

  formatDate(dateString: any) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); // Agregar un día a la fecha

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  initialize(): void {
    this.items = this.me.habits;
    console.log(this.items);
  }

  public cloneHabit: Habit = {
    id: "",
    title: "",
    description: "",
    priority: 0,
    days: [],
    finishDate: "",
    authorId: "",
    createdAt: undefined,
    dates: [],
    done: [],
    updatedAt: undefined,
  };

  public updateInput: UpdateHabitInput = {
    id: "",
    title: "",
    description: "",
    priority: 0,
    days: [],
    finishDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  };

  public deleteItem(item: string): void {
    console.log("lo que trae del boton", item);
    const deleteHabitId = item;
    this.idHabit = item;
    console.log("const", deleteHabitId);
    /*   this.handleDeleteHabit(deleteHabitId); */
    this.dialogDelete = true;
  }

  public editItem(item: Habit): void {
    console.log("lo que trae del boton", item);
    this.dialogEdit = true;
    const fecha = new Date(item.finishDate);
    const fechaTransformada = fecha.toISOString().slice(0, 10);
    console.log("fecha", fechaTransformada);
    this.cloneHabit = {
      ...item,
      finishDate: fechaTransformada,
    };
  }

  public getDayText(dayValue: any) {
    const diasSemana = [
      { text: "Domingo", value: 0 },
      { text: "Lunes", value: 1 },
      { text: "Martes", value: 2 },
      { text: "Miércoles", value: 3 },
      { text: "Jueves", value: 4 },
      { text: "Viernes", value: 5 },
      { text: "Sábado", value: 6 },
    ];

    if (Array.isArray(dayValue)) {
      return dayValue.map((value) => {
        const day = diasSemana.find((dia) => dia.value === value);
        return day ? day.text : "";
      });
    } else {
      const day = diasSemana.find((dia) => dia.value === dayValue);
      return day ? day.text : "";
    }
  }

  public seeItem(item: Habit): void {
    console.log("lo que trae del boton", item);
    const fecha = new Date(item.finishDate);
    const fechaTransformada = fecha.toISOString().slice(0, 10);
    this.dialogSee = true;

    this.cloneHabit = {
      ...item,
      finishDate: fechaTransformada,
    };
    /*     this.getChartData(item);
     */
  }

  /* public getChartData(habit: Habit) {
    const completedCount = Object.values(progress).filter((value) => value === true).length;
    const notCompletedCount = Object.values(progress).filter((value) => value === false).length;
    return {
      labels: ['Completado', 'No completado'],
      datasets: [
        {
          backgroundColor: ['#42b983', '#e0e0e0'],
          data: [completedCount, notCompletedCount],
        },
      ],
    };
  }; */

  public close(): void {
    this.dialog = false;
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
