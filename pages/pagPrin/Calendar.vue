<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center">
          <img src="../../static/login.png" class="habitudo" />
        </div>
        <v-row class="pt-7">
          <v-row class="fill-height">
            <!-- VISTA DE DIA DE HOY -->

            <v-col cols="3">
              <v-sheet height="564">
                <v-calendar color="primary" type="day">
                  <template v-slot:day-header="{ present }">
                    <template v-if="present" class="text-center">
                      Today
                    </template>
                  </template>

                  <template v-slot:interval="{ hour }">
                    <div class="text-center">{{ hour }} o'clock</div>
                  </template>
                </v-calendar>
              </v-sheet>
            </v-col>

            <!-- CALENDARIO -->

            <v-col cols="9">
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
                    <v-icon small> mdi-chevron-left </v-icon>
                  </v-btn>
                  <v-btn fab text small color="grey darken-2">
                    <v-icon small> mdi-chevron-right </v-icon>
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

    <!-- CREAR TAREA BOTON Y MODAL -->
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
  public names = [
    "Reunion",
    "Festivo",
    "PTO",
    "Viaje",
    "Evento",
    "Cumpleaños",
    "Conferencia",
    "Fiesta",
  ];

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
    const eventCount = this.rnd(days, days + 20);

    for (let i = 0; i < eventCount; i++) {
      const allDay = this.rnd(0, 3) === 0;
      const firstTimestamp = this.rnd(min.getTime(), max.getTime());
      const first = new Date(firstTimestamp - (firstTimestamp % 900000));
      const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
      const second = new Date(first.getTime() + secondTimestamp);

      events.push({
        name: this.names[this.rnd(0, this.names.length - 1)],
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
