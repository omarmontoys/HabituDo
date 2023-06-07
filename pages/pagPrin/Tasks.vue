<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center">
          <img src="../../static/login.png" />
        </div>
        <v-row class="pt-7" v-if="me && me.tasks">
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="(task, index) in me.tasks"
            :key="index"
          >
            <CardTask :task="task" />
          </v-col>
        </v-row>
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
              <v-text-field
                label="Titulo"
                outlined
                v-model="taskInput.title"
              ></v-text-field>
              <v-textarea
                label="Descripcion"
                auto-grow
                outlined
                v-model="taskInput.description"
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
                    label="Fecha Limite"
                    hint="YYYY/MM/DD format"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    v-model="taskInput.finishDate"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="taskInput.finishDate"
                  no-title
                  scrollable
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="dialog4 = false">
                Cancelar
              </v-btn>
              <v-btn color="primary" text @click="handleCreateTask()">
                Crear
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-fab-transition>
    </v-card-text>
    <v-snackbar v-model="snackbarSucessCreateTask">
      {{ snackbarSucessMessageCreateTask }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="green"
          text
          v-bind="attrs"
          @click="changeStatusSnackbarCreateTask()"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import CardTask from "~/components/CardTask.vue";
import { namespace } from "vuex-class";
import { CreateTaskInput, Task, User } from "~/gql/graphql";
const Auth = namespace("AuthModule");
const TaskModule = namespace("TaskModule");
const AuthModule = namespace("AuthModule");
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
  public taskInput: CreateTaskInput = {
    finishDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    status: false,
    title: "",
    description: "",
  };
  public menu = false;
  date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);

  @TaskModule.Action
  private CreateTask!: (data: CreateTaskInput) => Promise<void>;
  async handleCreateTask() {
    const data = {
      title: this.taskInput.title,
      description: this.taskInput.description,
      finishDate: this.taskInput.finishDate,
      status: this.taskInput.status,
    };
    await this.CreateTask(data);
    this.taskInput = {
      finishDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      status: false,
      title: "",
      description: "",
    };
    this.dialog4 = false;
  }

  @TaskModule.State("snackbarSucessCreateTask")
  public snackbarSucessCreateTask?: boolean;
  @TaskModule.State("snackbarSucessMessageCreateTask")
  public snackbarSucessMessageCreateTask?: string;
  @TaskModule.Action
  private changeStatusSnackbarCreateTask!: () => void;
  @Auth.State("me")
  private me!: User;
  @Auth.Action
  private fetchMe!: () => Promise<void>;
  @TaskModule.State("tasks")
  public task!: Task[];
  @TaskModule.Action
  private fetchTasks!: () => Promise<void>;
  @AuthModule.Action
  fetchUsers!: () => Promise<void>;
  async created() {
    await this.fetchMe();
    await this.fetchUsers();
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
