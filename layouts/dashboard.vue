<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>HabituDo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logOut()">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";

const Auth = namespace("AuthModule");
@Component
export default class Dashboard extends Vue {
  public drawer = false;
  public dialog2 = false;
  public group = false;

  @Auth.Action
  private logOut!: () => void;
}
</script>
<style></style>
