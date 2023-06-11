<template>
  <v-card v-if="task" class="mx-4 my-4 rounded-xl" max-width="280" outlined>
    <v-list-item>
      <v-list-item-content>
        <div class="d-flex justify-center">
          <v-list-item-title v-if="task.title" class="text-h7">
            {{ task.title }}</v-list-item-title
          >
        </div>
        <br />
        <br />
        <v-list-item-subtitle class="ml-3">
          Fecha Limite: {{ formatDate(task.finishDate) }}</v-list-item-subtitle
        >

        <v-list-item-subtitle class="ml-3" v-if="userShared">
          Autor: {{ userShared.names }} {{ userShared.lastNames }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions class="d-flex justify-center flex-wrap">
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
              <h4>Descripcion</h4>
              {{ task.description }}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <h4>Fecha limite</h4>
              {{ formatDate(task.finishDate) }}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <h4>Autor</h4>
              {{ userShared.names }} {{ userShared.lastNames }}
            </v-card-text>
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
export default class CardShareTask extends Vue {
  userSharedComputed(authorId: string) {
    throw new Error("Method not implemented.");
  }
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
  date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);
  public menu = false;
  public userShared: User = {
    email: "",
    habits: [],
    id: "",
    lastNames: "",
    names: "",
    sharesUser: [],
    tasks: [],
    length: 0,
  };
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
  @AuthModule.State("users")
  private users!: User[];
  @AuthModule.Action
  private consultUser!: (authorId: string) => Promise<User>;
  /*   @AuthModule.State("userShared")
  private userShared!: User[]; */

  async mounted() {
    this.consultUser(this.task.authorId).then((data: User) => {
      console.log("aaaa");
      this.userShared = data;
    });
  }
}
</script>
