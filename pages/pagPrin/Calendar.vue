<template>
  <v-container v-if="me">
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center imagen">
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
                      >
                        <span>{{ typeToLabel[type] }}</span>
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
                  <v-card
                    color="grey lighten-4"
                    min-width="350px"
                    flat
                    v-if="selectedEvent.type === 'habit'"
                  >
                    <v-toolbar :color="selectedEvent.color" dark>
                      <v-toolbar-title>{{
                        selectedEvent.name
                      }}</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn
                        v-if="selectedEvent.done === false"
                        :color="selectedEvent.color"
                        elevation="0"
                        @click="handleUpdateDoneHabit()"
                      >
                        <v-icon>mdi-check-bold</v-icon>
                      </v-btn>

                      <v-btn
                        v-else-if="selectedEvent.done === true"
                        :color="selectedEvent.color"
                        elevation="0"
                        @click="handleUpdateUndoneHabit()"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-text> {{ selectedEvent.description }} </v-card-text>
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

                  <v-card color="grey lighten-4" min-width="350px" flat v-else>
                    <v-toolbar :color="selectedEvent.color" dark>
                      <v-toolbar-title>{{
                        selectedEvent.name
                      }}</v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text> {{ selectedEvent.description }} </v-card-text>
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
import {
  Task,
  Tasks,
  User,
  Habit,
  Habits,
  UpdateHabitInput,
} from "~/gql/graphql";

const Auth = namespace("AuthModule");
const TaskModule = namespace("TaskModule");
const HabitModule = namespace("HabitModule");

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
    "pink",
    "violet",
    "purple",
    "brown",
  ];
  public colorHabitPriority = ["red", "orange", "yellow", "green"];

  public colorHabit = "";

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
  @HabitModule.State("habits")
  public habit!: Habit[];
  @HabitModule.Action
  private fetchHabits!: () => Promise<void>;
  @HabitModule.Action
  private updateDoneHabit!: (data: UpdateHabitInput) => Promise<void>;
  async handleUpdateDoneHabit() {
    console.log(this.selectedEvent);
    await this.updateDoneHabit({
      id: this.selectedEvent.id,
      doneIndex: this.selectedEvent.indexDone,
    });
    await this.fetchMe();
  }
  @HabitModule.Action
  private updateUndoneHabit!: (data: UpdateHabitInput) => Promise<void>;
  async handleUpdateUndoneHabit() {
    console.log("lo que trae del selected event x", this.selectedEvent);
    await this.updateUndoneHabit({
      id: this.selectedEvent.id,
      doneIndex: this.selectedEvent.indexDone,
    });
    await this.fetchMe();
  }

  async created() {
    await this.fetchMe();
    console.log(this.me);
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

  formatDateHabits(dateString: any) {
    const date = new Date(dateString);
    date.setDate(date.getDate()); // Agregar un día a la fecha

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
      console.log(this.selectedEvent);
    };
    if (this.selectedOpen) {
      this.selectedOpen = false;
      requestAnimationFrame(() => requestAnimationFrame(() => open()));
    } else {
      open();
    }
    nativeEvent.stopPropagation();
  }

  @Watch("me", { immediate: false, deep: true })
  onChildChanged(val: string, oldVal: string) {
    console.log("entro watch");
    if (val) {
      console.log("entro watchaaa");
      this.updateRange({
        start: { date: this.startClone },
        end: { date: this.endClone },
      });
    }
  }

  public startClone = "";
  public endClone = "";
  updateRange({
    start,
    end,
  }: {
    start: { date: string };
    end: { date: string };
  }) {
    console.log(start);
    console.log(end);
    const events = [];
    this.startClone = start.date;
    this.endClone = end.date;
    const min = new Date(`${start.date}T00:00:00`);
    const max = new Date(`${end.date}T23:59:59`);
    const days = (max.getTime() - min.getTime()) / 86400000;

    const taskCount: any[] = this.me.tasks; //se obtienen las tareas

    console.log(taskCount[1]);

    for (let i = 0; i < taskCount.length; i++) {
      const allDay = this.rnd(0, 3) === 0;

      const first = this.formatDate(taskCount[i].finishDate);
      const second = this.formatDate(taskCount[i].finishDate);

      console.log("first", first);
      console.log("2", second);

      events.push({
        name: taskCount[i].title,
        start: first,
        end: second,
        color: this.colors[this.rnd(0, this.colors.length - 1)],
        timed: !allDay,
        description: taskCount[i].description,
        type: "task",
      });
    }
    this.events = events;
    console.log("aasdasdasdasdasdasdas", this.me);

    const habitCount: any[] = this.me.habits; //se obtienen las tareas

    for (let i = 0; i < habitCount.length; i++) {
      for (let j = 0; j < habitCount[i].dates.length; j++) {
        const allDay = this.rnd(0, 3) === 0;

        const first = this.formatDateHabits(habitCount[i].dates[j]);
        const second = this.formatDateHabits(habitCount[i].dates[j]);

        if (habitCount[i].priority == 1 && habitCount[i].done[j] == false) {
          this.colorHabit = this.colorHabitPriority[2];
        } else if (
          habitCount[i].priority == 2 &&
          habitCount[i].done[j] == false
        ) {
          this.colorHabit = this.colorHabitPriority[1];
        } else if (
          habitCount[i].priority == 3 &&
          habitCount[i].done[j] == false
        ) {
          this.colorHabit = this.colorHabitPriority[0];
        } else if (habitCount[i].done[j] == true) {
          this.colorHabit = this.colorHabitPriority[3];
        }

        events.push({
          name: habitCount[i].title,
          start: first,
          end: second,
          color: this.colorHabit,
          timed: !allDay,
          description: habitCount[i].description,
          type: "habit",
          indexDone: j,
          id: habitCount[i].id,
          done: habitCount[i].done[j],
        });
      }
      this.events = events;
    }
  }

  /* ============================= */

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
img {
  max-height: 20%;
  max-width: 20%;
}
</style>
