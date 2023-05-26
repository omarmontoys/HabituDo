<template>
  <v-container fill-height>
    <v-row>
      <!-- <v-col class="col-md-10 offset-md-1"> -->
      <v-col class="pt-0 pb-2" xl="4" md="6" lg="6" sm="10" xs="12">
        <v-card class="elevation-2 pa-4" rounded="lg">
          <v-row align="center" justify="center">
            <v-col cols="10">
              <v-card-subtitle class="v-card-subtitle">
                <v-img
                  max-height="250"
                  max-width="400"
                  src="login1.png"
                ></v-img>
                <h6
                  class="text-h6 text text-center"
                  style="color: rgba(166, 45, 45, 1)"
                >
                  Iniciar Sesión
                </h6>
              </v-card-subtitle>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    :rules="[rules.required, rules.email]"
                    outlined
                    v-model="datalogin.email"
                    label="Correo eléctronico"
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                  <v-text-field
                    v-model="datalogin.password"
                    :rules="[rules.required, rules.min]"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Contraseña"
                    outlined
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-row justify="center" no-gutters>
                    <v-col cols="12">
                      <!--Mensaje de error-->
                    </v-col>
                  </v-row>
                  <v-row justify="center" no-gutters>
                    <v-col cols="12">
                      <v-alert v-if="errorMessage" outlined dense type="error">
                        {{ errorMessage }}
                      </v-alert>
                    </v-col>
                  </v-row>
                  <v-row no-gutters justify="center" align="center">
                    <v-col cols="12">
                      <v-btn
                        class="mx-auto col-md-11 text text--darken-2"
                        color="primary"
                        dense
                        block
                        @click="handleLogin()"
                      >
                        Iniciar Sesión
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row class="mx-auto" align="center" justify="center">
                    <span>
                      <NuxtLink
                        class="text-subtitle-1 primary--text text--darken-2"
                        style="
                          text-decoration: none;
                          color: rgba(166, 45, 45, 1);
                        "
                        to="/Register"
                      >
                        <h1 class="text-subtitle-1">Crear cuenta</h1>
                      </NuxtLink>
                    </span>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <!--  </v-col> -->
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { data } from "browserslist";
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { LoginInput } from "~/gql/graphql";

const Auth = namespace("AuthModule");
@Component({
  layout(context) {
    return "default";
  },
})
export default class Login extends Vue {
  public show1 = false;
  public rules = {
    required: (value: string) => !!value || "Required.",
    min: (v: string) => v.length >= 8 || "Min 8 characters",
    email: (v: string): string | boolean =>
      /.+@.+\..+/.test(v) || "El email no es válido. Vuelve a intentalo.",
  };
  public datalogin: LoginInput = {
    email: "",
    password: "",
  };
  @Auth.State("errorMessage")
  public errorMessage?: string;
  @Auth.State("loadingLoginStatus")
  public loadingLoginStatus?: boolean;
  @Auth.Action
  private login!: (data: LoginInput) => Promise<void>;
  async handleLogin() {
    await this.login(this.datalogin);
  }
}
</script>

<style scoped>
.v-card {
  background: rgba(255, 255, 255, 0.468) !important;
}
.v-card-title {
  display: block !important;
}
.img {
  height: 22px;
  max-width: 15px;
}
.img-f {
  height: 18px;
  max-width: 15px;
}
</style>
