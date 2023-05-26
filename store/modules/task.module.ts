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
  public id?: Task | undefined = undefined;
  @Mutation
  public setLoadingDelete(status: boolean) {
    this.loadingdelete = status;
  }
  @Mutation
  public setSuccessDelete(status: boolean) {
    this.successdelete = status;
  }
  @Action
  async fetchTasks() {
    this.context.commit("loadingTask", true);
    return await TasksService.getTasks()
      .then((tasks: Task[]) => {
        console.log(tasks);
        this.context.commit("taskSuccess", tasks);
        this.context.commit("loadingTask", false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  @Mutation
  public taskSuccess(tasks: Task[]): void {
    this.tasks = tasks;
  }
  @Mutation
  public loadingTask(status: boolean) {
    this.loadingTaskStatus = status;
  }
  @Action
  async CreateTask(data: CreateTaskInput) {
    this.context.commit("loadingCreate", true);
    return await TasksService.createTask(data)
      .then((tasks: Task) => {
        this.context.commit("AuthModule/setCreateTask", data, {
          root: true,
        });
        this.context.commit("CreateSuccess", tasks);
        this.context.commit("loadingCreate", false);
        this.context.commit("setsnackbarSucessMessageCreateTask");
        this.context.commit("setsnackbarSucessCreateTask");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  @Action({ rawError: true })
  async deleteTask(taskId: string): Promise<void> {
    this.context.commit("setLoadingDelete", true);
    this.context.commit("setSuccessDelete", false);
    return await TasksService.deleteTask(taskId)
      .then((data) => {
        console.log("Llego");
        console.log(data);

        /*  this.context.commit("setDelete", data); */
        this.context.commit("AuthModule/setDeleteTask", data, {
          root: true,
        });
        this.context.commit("setLoadingDelete", false);
        this.context.commit("setSuccessDelete", false);
      })
      .catch((error) => {
        this.context.commit("setLoadingDelete", false);
        console.log(error);
        //console.log(JSON.stringify(error, null, 2));
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
