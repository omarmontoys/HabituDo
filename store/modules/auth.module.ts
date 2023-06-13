import { ApolloError } from "@apollo/client";
import Vue from "vue";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
  Auth,
  CreateUserInput,
  Habit, 
  LoginInput,
  Task,
  User,
  Users,
  UsersQuery,
} from "~/gql/graphql";
import Tasks from "~/pages/pagPrin/Tasks.vue";

import AuthService from "~/services/auth.service";

@Module({ namespaced: true })
class AuthModule extends VuexModule {
  public me?: User = undefined;
  public users?: UsersQuery[] = undefined;
  public userShared?: User[] = [];
  public loadingUsersStatus = false;
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
  async fetchMe() {
    this.context.commit("loadingUser", true);
    return await AuthService.currentUser()
      .then((user: User) => {
        console.log(user);

        this.context.commit("userSuccess", user);
        this.context.commit("loadingUser", false);
      })
      .catch((error) => {
        console.log(error.message);
        this.context.commit("loadingUser", false);
      });
  }
  @Action
  async login(data: LoginInput) {
    this.context.commit("loadingLogin", true);
    this.context.commit("resetErrorMessage");
    return await AuthService.login(data)
      .then((auth: Auth) => {
        //this.context.commit("loginSuccess", auth);
        this.context.commit("loadingLogin", false);
        window.$nuxt.$cookies.set("token", auth.token, {
          path: "/",
        });
        window.$nuxt.$router.push("./pagPrin/Calendar");
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
      });
  }
  @Action
  async fetchUsers() {
    this.context.commit("loadingUsers", true);
    return await AuthService.getUsers()
      .then((users: UsersQuery[]) => {
        console.log("hola");

        console.log(users);
        this.context.commit("setUsers", users);
        this.context.commit("loadingUsers", false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*   @Action({ rawError: true })
  async consultUser(authorId: string): Promise<User> {
    this.context.commit("setLoadingConsult", true);
    return await AuthService.consulttUser(authorId)
      .then((data:User) => {
        console.log("Llego");
        console.log(data);
        this.context.commit("setLoadingConsult", false);
        this.context.commit("setSuccessConsult", data);
        return data;
      })
      .catch((error) => {
        this.context.commit("setLoadingConsult", false);
        console.log(error);
       
      });
  } */

  @Action({ rawError: true })
  async consultUser(authorId: string) {
    try {
      const user = AuthService.consulttUser(authorId);
      return user;
    } catch (error) {
      this.context.commit("setLoadingConsult", false);
    }
  }

  @Mutation
  public updateTaskSuccess(updateTask: Task): void {
    if (this.me) {
      const index = this.me.tasks.findIndex((task) => {
        return task.id === updateTask.id;
      });
      if (index !== -1) {
        const copyUser = { ...this.me };
        copyUser.tasks = [...copyUser.tasks];
        copyUser.tasks[index] = updateTask;

        this.me = copyUser;
        console.log(this.me);
      }
    }
  }

  @Mutation
  public setSuccessConsult(data: User) {
    if (this.userShared) {
      console.log();

      this.userShared.push(data);
    }
  }

  @Mutation
  public usersSuccess(): void {
    this.usersSuccess != this.usersSuccess;
  }
  @Mutation
  public loadingUsers(status: boolean) {
    this.loadingUsersStatus = status;
  }
  @Mutation
  setUsers(users: UsersQuery[]): void {
    this.users = users;
  }
  @Mutation
  public setDeleteTask(data: { id: string }) {
    console.log("LLego setDelete");
    if (this.me) {
      const index = this.me.tasks.findIndex((tasks) => {
        return tasks.id === data.id;
      });
      if (index !== -1) {
        const copyUser = { ...this.me };
        copyUser.tasks = [...copyUser.tasks];

        Vue.delete(copyUser.tasks, index);
        this.me = copyUser;
      }
    }
  }
  @Mutation
  public setCreateTask(data: Task) {
    console.log("LLego setCreate");
    if (this.me) {
      const copyUser = { ...this.me };
      copyUser.tasks = [...copyUser.tasks];
      copyUser.tasks.push(data);
      this.me = copyUser;
    }
  }

  @Mutation
  public setCreateHabit(data: Habit) {
      if (this.me) {
      const copyUser = { ...this.me };
      copyUser.habits = [...copyUser.habits];
      copyUser.habits.push(data);
      this.me = copyUser;
      }
  }
  @Mutation
  public setDeleteHabit(data: { id: string }) {
    console.log("LLego setDelete");
    if (this.me) {
      const index = this.me.habits.findIndex((habits) => {
        return habits.id === data.id;
      });
      if (index !== -1) {
        const copyUser = { ...this.me };
        copyUser.habits = [...copyUser.habits];

        Vue.delete(copyUser.habits, index);
        this.me = copyUser;
      }
    }
  }
    

  @Mutation
  public userSuccess(user: User): void {
    //console.log(user);
    this.me = user;
  }
  @Mutation
  public loadingUser(status: boolean) {
    this.loadingLoginStatus = status;
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
