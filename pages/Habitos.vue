<template>
  <v-app>
    <!-- 
<v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="deep-purple" dark app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>
     -->

    <main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="d-flex justify-center">
              <img src="../../HabituDo/static/login.png" />
            </div>
            <v-row class="pt-7">
              <v-card class="mx-4 my-4 rounded-xl" max-width="380" outlined>
                <v-list-item>
                  <v-list-item-content>
                    <div class="d-flex justify-center">
                      <v-checkbox class="ml-3" v-model="checkbox"></v-checkbox>

                      <v-list-item-title class="text-h7">
                        Titulo
                      </v-list-item-title>
                    </div>
                    <v-list-item-subtitle class="ml-3">
                      Descripcion
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <div class="d-flex justify-center">
                  <v-card-actions>
                    <div class="text-center">
                      <v-dialog v-model="dialog" width="500">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            class="ma-2"
                            color="primary"
                            dark
                            rounded
                            v-model="dialog"
                          >
                            <v-icon dark> mdi-file-edit </v-icon>
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="text-h5 green lighten-9">
                            El Titulo de la Tarea </v-card-title
                          ><br />

                          <v-card-text>
                            <v-text-field
                              label="Titulo"
                              outlined
                            ></v-text-field>

                            <v-text-field
                              name="input-10-2"
                              label="Descripcion"
                              outlined
                            ></v-text-field>
                          </v-card-text>
                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red" text @click="dialog = false">
                              Cancelar
                            </v-btn>
                            <v-btn color="primary" text @click="dialog = false">
                              Guardar
                            </v-btn>
                          </v-card-actions>
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
                            rounded
                            v-model="dialog2"
                          >
                            <v-icon white> mdi-delete-empty </v-icon>
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="text-h5 red lighten-9">
                            Titulo de la Tarea </v-card-title
                          ><br />

                          <v-card-text>
                            <h2>¿Esta seguro que quiere eliminar la tarea?</h2>
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              text
                              @click="dialog2 = false"
                            >
                              Cancelar
                            </v-btn>
                            <v-btn color="red" text @click="dialog2 = false">
                              Confirmar
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
                            rounded
                            v-model="dialog3"
                          >
                            <v-icon white> mdi-eye </v-icon>
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="text-h5 purple lighten-9">
                            Titulo de la Tarea
                            <v-spacer></v-spacer>
                            <v-btn icon @click="dialog3 = false">
                              <v-icon>mdi-alpha-x-circle-outline</v-icon>
                            </v-btn>
                          </v-card-title>
                          <br />

                          <v-card-text>
                            <h4>Descripcion</h4>
                            Secondary line text Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                          </v-card-text>
                          <v-divider></v-divider>
                          <v-card-text>
                            <h4>Estado</h4>
                            Secondary line text Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                          </v-card-text>

                          <v-divider></v-divider>
                        </v-card>
                      </v-dialog>
                    </div>
                  </v-card-actions>
                </div>
              </v-card>

              <v-card class="mx-4 my-4 rounded-xl" max-width="380" outlined>
                <v-list-item>
                  <v-list-item-content>
                    <div class="d-flex justify-center">
                      <v-checkbox
                        class="ml-3"
                        v-model="checkbox2"
                        :label="``"
                      ></v-checkbox>

                      <v-list-item-title class="text-h7">
                        Titulo
                      </v-list-item-title>
                    </div>
                    <v-list-item-subtitle class="ml-3">
                      Descripcion
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <div class="d-flex justify-center">
                  <v-card-actions>
                    <!-- 
                                           -->
                    <div class="text-center">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        class="ma-2"
                        color="primary"
                        dark
                        rounded
                        @click="dialog = true"
                      >
                        <v-icon dark> mdi-file-edit </v-icon>
                      </v-btn>
                    </div>
                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        v-bind="attrs"
                        v-on="on"
                        color="red"
                        dark
                        rounded
                        @click="dialog2 = true"
                      >
                        <v-icon white> mdi-delete-empty </v-icon>
                      </v-btn>
                    </div>
                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        v-bind="attrs"
                        v-on="on"
                        color="purple"
                        dark
                        rounded
                        @click="dialog3 = true"
                      >
                        <v-icon white> mdi-eye </v-icon>
                      </v-btn>
                    </div>
                  </v-card-actions>
                </div>
              </v-card>
              <v-card class="mx-4 my-4 rounded-xl" max-width="380" outlined>
                <v-list-item>
                  <v-list-item-content>
                    <div class="d-flex justify-center">
                      <v-checkbox
                        class="ml-3"
                        v-model="checkbox2"
                        :label="``"
                      ></v-checkbox>

                      <v-list-item-title class="text-h7">
                        Titulo
                      </v-list-item-title>
                    </div>
                    <v-list-item-subtitle class="ml-3">
                      Descripcion
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <div class="d-flex justify-center">
                  <v-card-actions>
                    <!-- 
                                           -->
                    <div class="text-center">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        class="ma-2"
                        color="primary"
                        dark
                        rounded
                        @click="dialog = true"
                      >
                        <v-icon dark> mdi-file-edit </v-icon>
                      </v-btn>
                    </div>
                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        v-bind="attrs"
                        v-on="on"
                        color="red"
                        dark
                        rounded
                        @click="dialog2 = true"
                      >
                        <v-icon white> mdi-delete-empty </v-icon>
                      </v-btn>
                    </div>
                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        v-bind="attrs"
                        v-on="on"
                        color="purple"
                        dark
                        rounded
                        @click="dialog3 = true"
                      >
                        <v-icon white> mdi-eye </v-icon>
                      </v-btn>
                    </div>
                  </v-card-actions>
                </div>
              </v-card>
              <v-card class="mx-4 my-4 rounded-xl" max-width="380" outlined>
                <v-list-item>
                  <v-list-item-content>
                    <div class="d-flex justify-center">
                      <v-checkbox
                        class="ml-3"
                        v-model="checkbox2"
                        :label="``"
                      ></v-checkbox>

                      <v-list-item-title class="text-h7">
                        Titulo
                      </v-list-item-title>
                    </div>
                    <v-list-item-subtitle class="ml-3">
                      Descripcion
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <div class="d-flex justify-center">
                  <v-card-actions>
                    <!-- 
                                           -->
                    <div class="text-center">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        class="ma-2"
                        color="primary"
                        dark
                        rounded
                        @click="dialog = true"
                      >
                        <v-icon dark> mdi-file-edit </v-icon>
                      </v-btn>
                    </div>
                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        v-bind="attrs"
                        v-on="on"
                        color="red"
                        dark
                        rounded
                        @click="dialog2 = true"
                      >
                        <v-icon white> mdi-delete-empty </v-icon>
                      </v-btn>
                    </div>
                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        v-bind="attrs"
                        v-on="on"
                        color="purple"
                        dark
                        rounded
                        @click="dialog3 = true"
                      >
                        <v-icon white> mdi-eye </v-icon>
                      </v-btn>
                    </div>
                  </v-card-actions>
                </div>
              </v-card>
              <v-card class="mx-4 my-4 rounded-xl" max-width="380" outlined>
                <v-list-item>
                  <v-list-item-content>
                    <div class="d-flex justify-center">
                      <v-checkbox
                        class="ml-3"
                        v-model="checkbox2"
                        :label="``"
                      ></v-checkbox>

                      <v-list-item-title class="text-h7">
                        Titulo
                      </v-list-item-title>
                    </div>
                    <v-list-item-subtitle class="ml-3">
                      Descripcion
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <div class="d-flex justify-center">
                  <v-card-actions>
                    <!-- 
                                           -->
                    <div class="text-center">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        class="ma-2"
                        color="primary"
                        dark
                        rounded
                        @click="dialog = true"
                      >
                        <v-icon dark> mdi-file-edit </v-icon>
                      </v-btn>
                    </div>
                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        v-bind="attrs"
                        v-on="on"
                        color="red"
                        dark
                        rounded
                        @click="dialog2 = true"
                      >
                        <v-icon white> mdi-delete-empty </v-icon>
                      </v-btn>
                    </div>
                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        v-bind="attrs"
                        v-on="on"
                        color="purple"
                        dark
                        rounded
                        @click="dialog3 = true"
                      >
                        <v-icon white> mdi-eye </v-icon>
                      </v-btn>
                    </div>
                  </v-card-actions>
                </div>
              </v-card>
              <v-card class="mx-4 my-4 rounded-xl" max-width="380" outlined>
                <v-list-item>
                  <v-list-item-content>
                    <div class="d-flex justify-center">
                      <v-checkbox
                        class="ml-3"
                        v-model="checkbox2"
                        :label="``"
                      ></v-checkbox>

                      <v-list-item-title class="text-h7">
                        Titulo
                      </v-list-item-title>
                    </div>
                    <v-list-item-subtitle class="ml-3">
                      Descripcion
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <div class="d-flex justify-center">
                  <v-card-actions>
                    <!-- 
                                           -->
                    <div class="text-center">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        class="ma-2"
                        color="primary"
                        dark
                        rounded
                        @click="dialog = true"
                      >
                        <v-icon dark> mdi-file-edit </v-icon>
                      </v-btn>
                    </div>
                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        v-bind="attrs"
                        v-on="on"
                        color="red"
                        dark
                        rounded
                        @click="dialog2 = true"
                      >
                        <v-icon white> mdi-delete-empty </v-icon>
                      </v-btn>
                    </div>
                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        v-bind="attrs"
                        v-on="on"
                        color="purple"
                        dark
                        rounded
                        @click="dialog3 = true"
                      >
                        <v-icon white> mdi-eye </v-icon>
                      </v-btn>
                    </div>
                  </v-card-actions>
                </div>
              </v-card>
              <v-card class="mx-4 my-4 rounded-xl" max-width="380" outlined>
                <v-list-item>
                  <v-list-item-content>
                    <div class="d-flex justify-center">
                      <v-checkbox
                        class="ml-3"
                        v-model="checkbox2"
                        :label="``"
                      ></v-checkbox>

                      <v-list-item-title class="text-h7">
                        Titulo
                      </v-list-item-title>
                    </div>
                    <v-list-item-subtitle class="ml-3">
                      Descripcion
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <div class="d-flex justify-center">
                  <v-card-actions>
                    <!-- 
                                           -->
                    <div class="text-center">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        class="ma-2"
                        color="primary"
                        dark
                        rounded
                        @click="dialog = true"
                      >
                        <v-icon dark> mdi-file-edit </v-icon>
                      </v-btn>
                    </div>
                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        v-bind="attrs"
                        v-on="on"
                        color="red"
                        dark
                        rounded
                        @click="dialog2 = true"
                      >
                        <v-icon white> mdi-delete-empty </v-icon>
                      </v-btn>
                    </div>
                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        v-bind="attrs"
                        v-on="on"
                        color="purple"
                        dark
                        rounded
                        @click="dialog3 = true"
                      >
                        <v-icon white> mdi-eye </v-icon>
                      </v-btn>
                    </div>
                  </v-card-actions>
                </div>
              </v-card>
              <v-card class="mx-4 my-4 rounded-xl" max-width="380" outlined>
                <v-list-item>
                  <v-list-item-content>
                    <div class="d-flex justify-center">
                      <v-checkbox
                        class="ml-3"
                        v-model="checkbox2"
                        :label="``"
                      ></v-checkbox>

                      <v-list-item-title class="text-h7">
                        Titulo
                      </v-list-item-title>
                    </div>
                    <v-list-item-subtitle class="ml-3">
                      Descripcion
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <div class="d-flex justify-center">
                  <v-card-actions>
                    <!-- 
                                           -->
                    <div class="text-center">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        class="ma-2"
                        color="primary"
                        dark
                        rounded
                        @click="dialog = true"
                      >
                        <v-icon dark> mdi-file-edit </v-icon>
                      </v-btn>
                    </div>
                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        v-bind="attrs"
                        v-on="on"
                        color="red"
                        dark
                        rounded
                        @click="dialog2 = true"
                      >
                        <v-icon white> mdi-delete-empty </v-icon>
                      </v-btn>
                    </div>
                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        v-bind="attrs"
                        v-on="on"
                        color="purple"
                        dark
                        rounded
                        @click="dialog3 = true"
                      >
                        <v-icon white> mdi-eye </v-icon>
                      </v-btn>
                    </div>
                  </v-card-actions>
                </div>
              </v-card>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </main>

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
              El Titulo de la Tarea
            </v-card-title>
            <v-card-text>
              <v-text-field label="Titulo" outlined></v-text-field>
              <v-text-field
                label="Descripcion"
                single-line
                outlined
              ></v-text-field>
            </v-card-text>
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
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  layout(context) {
    return "dashboard";
  },
})
export default class Habits extends Vue {
  /*  data() {
    return {
      checkbox2: true,
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      drawer: false,
      group: null,
    };
  }, */
  /*   watch: {
    group() {
      this.drawer = false;
    },
  }, */
  /*   methods: {
    Login() {
      this.$router.push("../");
    },
  }, */
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
