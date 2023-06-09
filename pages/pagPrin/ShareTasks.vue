<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center">
          <img src="../../static/login.png" />
        </div>

        <v-row class="pt-7" v-if="me && me.sharesUser">
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="task in me.sharesUser"
            :key="task.id"
          >
            <CardshareTask :task="task.sharesTask" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import CardshareTask from "~/components/CardShareTask.vue";
import { namespace } from "vuex-class";
import { CreateTaskInput, Task, User } from "~/gql/graphql";
const Auth = namespace("AuthModule");
const TaskModule = namespace("TaskModule");
const AuthModule = namespace("AuthModule");
@Component({
  components: { CardshareTask },
  layout(context) {
    return "dashboard";
  },
})
export default class ShareTasks extends Vue {
  public dialog4 = false;
  public menu1 = false;
  public column = null;
  public row = null;
  public menu = false;
  date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);
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
