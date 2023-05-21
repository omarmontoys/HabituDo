import { isApolloError } from "@apollo/client/errors";
import Vue from "vue";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { CreateTaskInput, Task } from "~/gql/graphql";
import TasksService from "~/services/task.service";

@Module({ namespaced: true })
class TaskModule extends VuexModule {
  public loadingTaskStatus = false;
  public loadingTasksStatus = false;
  public snackbarSucessCreateTask = false;
  public snackbarSucessMessageCreateTask = "";
  public loadingdelete = false;
  public successdelete = false;
  public tasks?: Task[] = undefined;
  public task?: Task = undefined;
  @Mutation
  public setLoadingDelete(status: boolean) {
    this.loadingdelete = status;
  }
  @Mutation
  public setSuccessDelete(status: boolean) {
    this.successdelete = status;
  }
  @Action
  async CreateTask(data: CreateTaskInput) {
    this.context.commit("loadingCreate", true);
    return await TasksService.createTask(data)
      .then((tasks: Task) => {
        //console.log(recipes);
        this.context.commit("CreateSuccess", tasks);
        this.context.commit("loadingCreate", false);
        this.context.commit("setsnackbarSucessMessageCreateTask");
        this.context.commit("setsnackbarSucessCreateTask");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  @Action
  public changeStatusSnackbarCreateTask() {
    this.context.commit("setsnackbarSucessCreateTask");
  }
  @Mutation
  public setsnackbarSucessMessageCreateTask() {
    this.snackbarSucessMessageCreateTask = "Tarea creada correctamente";
  }
  @Mutation
  public setsnackbarSucessCreateTask() {
    this.snackbarSucessCreateTask = !this.snackbarSucessCreateTask;
  }
  @Mutation
  public recipesSuccess(tasks: Task[]): void {
    this.tasks = tasks;
  }
  @Mutation
  public loadingTask(status: boolean) {
    this.loadingTaskStatus = status;
  }
  @Mutation
  public CreateSuccess(tasks: Task): void {
    if (this.tasks) {
      this.tasks = [tasks, ...this.tasks];
    }
  }
  @Mutation
  public loadingCreate(status: boolean) {
    this.loadingTaskStatus = status;
  }
  get isLoadingCreate(): boolean {
    return this.loadingTaskStatus;
  }
  get isLoadingTasks(): boolean {
    return this.loadingTasksStatus;
  }
  get isLoadingTask(): boolean {
    return this.loadingTasksStatus;
  }
}
export default TaskModule;
