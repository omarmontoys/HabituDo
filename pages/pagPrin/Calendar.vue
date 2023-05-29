<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center">
          <img src="../../static/login.png" class="habitudo" />
        </div>
        <v-row class="pt-7">
          <v-row class="fill-height">
            <!-- CALENDARIO -->

            <v-col cols="12">
              <v-sheet height="64">
                <v-toolbar flat>
                  <v-btn
                    outlined
                    class="mr-4"
                    color="grey darken-2"
                    @click="setToday"
                  >
                    Today
                  </v-btn>
                  <v-btn fab text small color="grey darken-2">
                    <v-icon small @click="prev"> mdi-chevron-left </v-icon>
                  </v-btn>
                  <v-btn fab text small color="grey darken-2">
                    <v-icon small @click="next"> mdi-chevron-right </v-icon>
                  </v-btn>
                  <v-toolbar-title v-if="$refs.calendar"> </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-menu bottom right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        outlined
                        color="grey darken-2"
                        v-bind="attrs"
                        v-on="on"
                      > <span>{{ typeToLabel[type] }}</span>
                        <v-icon right> mdi-menu-down </v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="type = 'day'">
                        <v-list-item-title>Day</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = 'week'">
                        <v-list-item-title>Week</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = 'month'">
                        <v-list-item-title>Month</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = '4day'">
                        <v-list-item-title>4 days</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-toolbar>
              </v-sheet>
              <v-sheet height="500">
                <v-calendar
                  ref="calendar"
                  v-model="focus"
                  color="primary"
                  :events="events"
                  :event-color="getEventColor"
                  :type="type"
                  @click:event="showEvent"
                  @click:more="viewDay"
                  @click:date="viewDay"
                  @change="updateRange"
                ></v-calendar>
                <v-menu
                  v-model="selectedOpen"
                  :close-on-content-click="false"
                  :activator="selectedElement"
                  offset-x
                >
                  <v-card color="grey lighten-4" min-width="350px" flat>
                    <v-toolbar :color="selectedEvent.color" dark>
                      <v-btn icon>
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-toolbar-title
                        v-html="selectedEvent.name"
                      ></v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-text>
                      <span v-html="selectedEvent.details"></span>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        text
                        color="secondary"
                        @click="selectedOpen = false"
                      >
                        Cancel
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </v-sheet>
            </v-col>
          </v-row>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Task, Tasks, User } from "~/gql/graphql";

const Auth = namespace("AuthModule");
const TaskModule = namespace("TaskModule");

@Component({
  layout(context) {
    return "dashboard";
  },
})
export default class Calendar extends Vue {
  public dialog4 = false;
  public menu1 = false;
  public column = null;
  public row = null;

  public focus = "";
  public type = "month";
  public typeToLabel = {
    month: "Month",
    week: "Week",
    day: "Day",
    "4day": "4 Days",
  };
  public selectedEvent: any = {}; // Se añade el tipo de dato "any"
  public selectedElement: HTMLElement | null = null; // Se añade el tipo de dato "HTMLElement | null"
  public selectedOpen = false;
  public events: any[] = []; // Se añade el tipo de dato "any[]"
  public colors = [
    "blue",
    "indigo",
    "deep-purple",
    "cyan",
    "green",
    "orange",
    "grey darken-1",
  ];

  @Auth.State("me")
  private me!: User;
  @Auth.Action
  private fetchMe!: () => Promise<void>;
  @TaskModule.State("tasks")
  public task!: Task[];
  @TaskModule.Action
  private fetchRecipes!: () => Promise<void>;
  @TaskModule.Action
  private fetchTasks!: () => Promise<void>;

  async created() {
    await this.fetchMe();
  }

  viewDay({ date }: { date: string }) {
    // Se añade el tipo de dato para el parámetro
    this.focus = date;
    this.type = "day";
  }

  getEventColor(event: any) {
    // Se añade el tipo de dato "any"
    return event.color;
  }

  setToday() {
    this.focus = "";
  }

  formatDate(dateString: any) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1); // Agregar un día a la fecha

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

  showEvent({ nativeEvent, event }: { nativeEvent: Event; event: any }) {
    // Se añade el tipo de dato para los parámetros
    const open = () => {
      this.selectedEvent = event;
      this.selectedElement = nativeEvent.target as HTMLElement; // Se especifica el tipo de dato "HTMLElement"
      requestAnimationFrame(() =>
        requestAnimationFrame(() => (this.selectedOpen = true))
      );
    };
    if (this.selectedOpen) {
      this.selectedOpen = false;
      requestAnimationFrame(() => requestAnimationFrame(() => open()));
    } else {
      open();
    }
    nativeEvent.stopPropagation();
  }

  updateRange({
    start,
    end,
  }: {
    start: { date: string };
    end: { date: string };
  }) {
    const events = [];

    const min = new Date(`${start.date}T00:00:00`);
    const max = new Date(`${end.date}T23:59:59`);
    const days = (max.getTime() - min.getTime()) / 86400000;

    const taskCount: any[] = this.me.tasks; //se obtienen las tareas
    console.log(taskCount[1])

    for (let i = 0; i < taskCount.length; i++) {
      const allDay = this.rnd(0, 3) === 0;

      const first = this.formatDate(taskCount[i].finishDate);
      const second = this.formatDate(taskCount[i].finishDate);
      console.log("first", first)
      console.log("2", second)

      events.push({
        name: taskCount[i].title,
        start: first,
        end: second,
        color: this.colors[this.rnd(0, this.colors.length - 1)],
        timed: !allDay,
      });
    }
    this.events = events;
  }
  
  rnd(a: number, b: number) {
    return Math.floor((b - a + 1) * Math.random()) + a;
  }

  $refs!: {
    calendar: any;
  };

  prev() {
    this.$refs.calendar.prev();
  }
  next() {
    this.$refs.calendar.next();
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
