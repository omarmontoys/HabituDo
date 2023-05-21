import { ApolloError } from "@apollo/client";
import Vue from "vue";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Auth, CreateUserInput, LoginInput } from "~/gql/graphql";

import AuthService from "~/services/auth.service";

@Module({ namespaced: true })
class AuthModule extends VuexModule {
  public loadingLoginStatus = false;
  public loadingRegisterStatus = false;
  public errorMessage?: string = undefined;

  @Mutation
  public loginFaile(error: any) {
    if (error.message === "Tus datos son incorrectos") {
      this.errorMessage = "Tus datos son incorrectos";
    } else if (error.message === "No Used found") {
      this.errorMessage = "Usuario no encontrado";
    } else if (error.message === "Argument Validation Error") {
      this.errorMessage = "Argumentos Invalidos";
    } else {
      this.errorMessage = "A ocurrido un error";
    }
  }

  @Mutation
  public resetErrorMessage() {
    this.errorMessage = undefined;
  }

  @Mutation
  public removeCookies() {
    window.$nuxt.$cookies.remove("token");
    window.$nuxt.$router.push("/");
  }

  @Action({ rawError: true })
  logOut(): void {
    this.context.commit("removeCookies");
  }
  @Action
  async login(data: LoginInput) {
    this.context.commit("loadingLogin", true);
    this.context.commit("resetErrorMessage");
    return await AuthService.login(data)
      .then((auth: Auth) => {
        console.log(auth);
        //this.context.commit("loginSuccess", auth);
        this.context.commit("loadingLogin", false);
        window.$nuxt.$cookies.set("token", auth.token, {
          path: "/",
        });
        window.$nuxt.$router.push("./pagPrin/Tasks");
      })
      .catch((error) => {
        console.log(error.message);
        this.context.commit("loginFaile", error);
        this.context.commit("loadingLogin", false);
      });
  }

  @Action
  async registerUser(data: CreateUserInput) {
    this.context.commit("loadingRegister", true);
    return await AuthService.registerUser(data)
      .then(async () => {
        return await AuthService.login({
          email: data.email,
          password: data.password,
        })
          .then((auth: Auth) => {
            console.log(auth);
            this.context.commit("loginSuccess", auth);
            this.context.commit("loadingRegister", false);
          })
          .catch((error) => {
            this.context.commit("loadingRegister", false);

            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        this.context.commit("loadingRegister", false);

        /* window.$nuxt.$router.push("/"); */
      });
  }
  @Mutation
  public loginSuccess(auth: Auth): void {
    // console.log(auth);
    window.$nuxt.$cookies.set("token", auth.token, {
      path: "/",
    });
    window.$nuxt.$router.push("/");
  }

  @Mutation
  public loadingLogin(status: boolean) {
    this.loadingLoginStatus = status;
  }

  @Mutation
  public loadingRegister(status: boolean) {
    this.loadingRegisterStatus = status;
  }

  get isLoadingLogin(): boolean {
    return this.loadingLoginStatus;
  }

  get isLoadingRegister(): boolean {
    return this.loadingRegisterStatus;
  }
}
export default AuthModule;
