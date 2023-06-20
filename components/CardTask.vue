<template>
  <v-card v-if="task" class="mx-4 my-4 rounded-xl" max-width="280" outlined>
    <v-list-item>
      <v-list-item-content>
        <div class="d-flex justify-center">
          <v-checkbox
            class="ml-3"
            @change="prueba"
            :input-value="task.status"
          ></v-checkbox>
          <!--    <v-checkbox
            class="ml-3"
            @change="prueba"
            v-if="!task.status"
          ></v-checkbox> -->
          <!--       <v-checkbox
            class="ml-3"
            :input-value="task.status"
            disabled
            v-else-if="task.status"
          ></v-checkbox> -->
          <v-list-item-title v-if="task.title" class="text-h7">
            {{ task.title }}</v-list-item-title
          >
        </div>
        <v-list-item-subtitle class="ml-3">
          {{ formatDate(task.finishDate) }}</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>

    <v-card-actions class="d-flex justify-center flex-wrap">
      <div class="text-center">
        <v-btn
          class="ma-2"
          color="primary"
          dark
          small
          rounded
          @click="openDialogEdit"
        >
          <v-icon dark> mdi-file-edit </v-icon>
        </v-btn>
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="text-h5 green lighten-9">
              Editar Tarea </v-card-title
            ><br />
            <v-card-text>
              <v-text-field
                label="Título"
                outlined
                v-model="cloneTask.title"
              ></v-text-field>
              <v-textarea
                :label="'Descripción'"
                name="input-7-1"
                filled
                auto-grow
                outlined
                v-model="cloneTask.description"
              ></v-textarea>
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
                    label="Fecha Límite"
                    hint="YYYY/MM/DD format"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    v-model="cloneTask.finishDate"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="cloneTask.finishDate"
                  no-title
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="dialog = false"> Cancelar </v-btn>
              <v-btn color="green" text @click="handleUpdateTasks()">
                Guardar
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
              small
              rounded
              v-model="dialog3"
            >
              <v-icon white> mdi-eye </v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 purple lighten-9">
              {{ task.title }}
              <v-spacer></v-spacer>
              <v-btn icon @click="dialog3 = false">
                <v-icon>mdi-alpha-x-circle-outline</v-icon>
              </v-btn>
            </v-card-title>
            <br />

            <v-card-text>
              <h4>Descripción</h4>
              {{ task.description }}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <h4>Fecha límite</h4>
              {{ formatDate(task.finishDate) }}
            </v-card-text>
            <v-divider></v-divider>
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
              small
              rounded
              v-model="dialog2"
            >
              <v-icon white> mdi-delete-empty </v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 red lighten-9"
              >¿Está seguro que quiere eliminar la tarea?</v-card-title
            ><br />
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog2 = false">
                Cancelar
              </v-btn>
              <v-btn color="red" text @click="handleDeleteTask(task.id)">
                Confirmar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div class="text-center">
        <v-dialog v-model="dialog4" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-2"
              v-bind="attrs"
              v-on="on"
              color="blue"
              dark
              small
              rounded
              v-model="dialog4"
            >
              <v-icon white> mdi-share </v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 blue lighten-9"
              >Compartir con: </v-card-title
            ><br />

            <v-card-text>
              <br />

              <v-autocomplete
                v-model="selectedTasks"
                :items="users"
                filled
                chips
                label="Select"
                item-text="names"
                item-value="id"
                multiple
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="removee(data.item)"
                  >
                    {{ data.item.names + " " + data.item.lastNames }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content
                      v-text="data.item"
                    ></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="data.item.names + ' ' + data.item.lastNames"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-html="data.item.email"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="
                  dialog4 = false;
                  selectedTasks = [];
                "
              >
                Cancelar
              </v-btn>
              <v-btn color="green" text @click="handleShareTasks()">
                Confirmar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import {
  Task,
  UpdateShareTaskInput,
  UpdateTaskInput,
  User,
} from "~/gql/graphql";
import { Prop } from "vue-property-decorator";
import { format } from "date-fns";
const Auth = namespace("AuthModule");
const AuthModule = namespace("AuthModule");
const TaskModule = namespace("TaskModule");
@Component
export default class CardTask extends Vue {
  vText(vText: any) {
    throw new Error("Method not implemented.");
  }
  vHtml(vHtml: any) {
    throw new Error("Method not implemented.");
  }
  public dialog = false;
  public dialog2 = false;
  public dialog3 = false;
  public dialog4 = false;
  public checkbox = false;
  public menu2 = false;
  public selectedTasks: number[] = [];
  public column = null;
  public row = null;
  @Prop({
    required: false,
  })
  public task!: Task;
  // Decorador @Prop para indicar a Vue que la propiedad existe en la clase
  public dataRegister = {
    name: "",
    lastname: "",
    email: "",
    password: "",
  };

  public cloneTask: Task = {
    finishDate: "",
    title: "",
    authorId: "",
    cratedAt: undefined,
    id: "",
    status: false,
  };
  public ShareInput2: UpdateShareTaskInput = {
    usersId: [],
    idTask: "",
  };
  public UpdateInput2: UpdateTaskInput = {
    id: "",
    description: "",
    title: "",
    status: false,
    finishDate: "",
  };
  date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);
  public menu = false;

  openDialogEdit() {
    this.dialog = true;
    const fecha = new Date(this.task.finishDate);

    const fechaTransformada = fecha.toISOString().slice(0, 10);
    this.cloneTask = {
      ...this.task,
      finishDate: fechaTransformada,
    };
  }
  formatDate(dateString: any) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); // Agregar un día a la fecha
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  @Auth.State("me")
  private me!: User;
  @Auth.Action
  private fetchMe!: () => Promise<void>;
  @TaskModule.Action
  private deleteTask!: (data: { id: string }) => Promise<void>;
  async handleDeleteTask(Task: { id: string }) {
    await this.deleteTask(Task);
    this.dialog2 = false;
  }
  async removee(item: { id: number; type: number }) {
    console.log(item);

    const index = this.selectedTasks.indexOf(item.id);
    if (index >= 0) this.selectedTasks.splice(index, 1);
  }
  @TaskModule.Action
  private shareTasks!: (data: UpdateShareTaskInput) => Promise<void>;
  async handleShareTasks() {
    for (let i = 0; i < this.selectedTasks.length; i++) {
      this.selectedTasks[i] = Number(this.selectedTasks[i]);
    }
    await this.shareTasks({
      usersId: this.selectedTasks,
      idTask: this.task.id,
    });
    console.log(this.task.id);
    this.dialog4 = false;
    this.selectedTasks = [];
  }
  @TaskModule.Action
  private updateTasks!: (data: UpdateTaskInput) => Promise<void>;
  async handleUpdateTasks() {
    await this.updateTasks({
      description: this.cloneTask.description,
      title: this.cloneTask.title,
      status: this.cloneTask.status,
      finishDate: this.cloneTask.finishDate,
      id: this.cloneTask.id,
    });
    this.dialog = false;
  }
  @AuthModule.State("users")
  private users!: User[];

  public async prueba(event: Boolean) {
    await this.updateTasks({
      status: event ? true : false,

      id: this.task.id,
    });
  }

  /* 
  async mounted() {
 

    console.log(this.users);
  } */
}
</script>
