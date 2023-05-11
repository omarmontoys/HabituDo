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
                <!-- <img src="login1.png" /> -->
                <h6
                  class="text-h6 text text-center"
                  style="color: rgba(198, 125, 77, 1)"
                >
                  Registro
                </h6>
              </v-card-subtitle>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    v-model="dataRegister.names"
                    outlined
                    label="Nombre"
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>

                  <v-text-field
                    v-model="dataRegister.lastNames"
                    outlined
                    label="Apellidos"
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>

                  <v-text-field
                    v-model="dataRegister.email"
                    :rules="[rules.required, rules.email]"
                    outlined
                    label="Correo Electronico"
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                  <v-text-field
                    v-model="dataRegister.password"
                    :rules="[rules.required, rules.regex]"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Contraseña"
                    filled
                    outlined
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-text-field
                    v-model="repeatpassword"
                    :rules="[
                      rules.required,
                      rules.regex,
                      rules.confirmPassword,
                    ]"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Confirmar Contraseña"
                    filled
                    outlined
                    @click:append="show2 = !show2"
                  ></v-text-field>
                  <v-row justify="center" no-gutters>
                    <v-col cols="12">
                      <!--Mensaje de error-->
                    </v-col>
                  </v-row>

                  <v-row no-gutters justify="center" align="center">
                    <v-col cols="12">
                      <v-btn
                        class="mx-auto col-md-11"
                        color="primary"
                        dense
                        block
                        :loading="loadingRegisterStatus"
                        @click="handleRegister()"
                      >
                        Registarme
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row class="mx-auto" align="center" justify="center">
                    <span>
                      <NuxtLink
                        class="text-subtitle-1 primary--text text--darken-2"
                        style="
                          text-decoration: none;
                          color: rgba(18, 51, 255, 1);
                        "
                        to="/"
                      >
                        <h1 class="text-subtitle-1">Ya tengo una cuenta</h1>
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
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { CreateUserInput } from "~/gql/graphql";

const Auth = namespace("AuthModule");
@Component
export default class Register extends Vue {
  public show1 = false;
  public show2 = false;
  public repeatpassword = "";
  public rules = {
    required: (value: string) => !!value || "Required.",
    regex: (v: string): string | boolean =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{8,}$/.test(v) ||
      "La contraseña debe contener al menos un número y una mayúscula. Vuelve a intentarlo. Minimo 8 caracteres",
    confirmPassword: (v: string): string | boolean =>
      v === this.dataRegister.password || "Las contraseñas no coinciden",
    email: (v: string): string | boolean =>
      /.+@.+\..+/.test(v) || "El email no es válido. Vuelve a intentalo.",
  };
  public dataRegister: CreateUserInput = {
    names: "",
    lastNames: "",
    email: "",
    password: "",
  };
  @Auth.Action
  private registerUser!: (data: CreateUserInput) => Promise<void>;

  @Auth.State("loadingRegisterStatus")
  private loadingRegisterStatus!: boolean;

  async handleRegister() {
    await this.registerUser(this.dataRegister);
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
