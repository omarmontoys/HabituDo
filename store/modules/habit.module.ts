import { isApolloError } from "@apollo/client/errors";
import Vue from "vue";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { CreateHabitInput, Habit } from "~/gql/graphql";
import HabitService from "~/services/habit.service";
import AuthModule from "./auth.module";

@Module({ namespaced: true })
class HabitModule extends VuexModule {
    public loadingHabitStatus = false;
    public snackbarSucessCreateHabit = false;
    public snackbarSucessMessageCreateHabit = "";
    public loadingdelete = false;
    public successdelete = false;
    public habits?: Habit[] = undefined;
    public habit?: Habit = undefined;
    public id?: Habit | undefined = undefined;

    @Action
    public changeStatusSnackbarCreateHabit() {
        this.context.commit("setSnackbarSucessCreateHabit");
    }
    @Mutation
    public setSnackbarSucessCreateHabit(status: boolean) {
        this.snackbarSucessCreateHabit = !this.snackbarSucessCreateHabit;
    }
    @Mutation
    public setSnackbarSucessMessageCreateHabit(message: string) {
        this.snackbarSucessMessageCreateHabit = "Habito creado correctamente";
    }
    @Mutation
    public setLoadingDelete(status: boolean) {
        this.loadingdelete = status;
    }
    @Mutation
    public setSuccessDelete(status: boolean) {
        this.successdelete = status;
    }
    @Mutation
    public setHabit(habit: Habit) {
        this.habit = habit;
    }
    @Mutation
    public setHabits(habits: Habit[]) {
        this.habits = habits;
    }
    @Mutation
    public setLoadingHabit(status: boolean) {
        this.loadingHabitStatus = status;
    }
    @Action
    async fetchHabits() {
        this.context.commit("loadingHabit", true);
        return await HabitService.getHabits()
        .then((habits: Habit[]) => {
            console.log(habits);
            this.context.commit("habitSuccess", habits);
            this.context.commit("loadingHabit", false);
        })
        .catch((error) => {
            console.log(error);
        });
    } 
    @Mutation
    public habitSuccess(habits: Habit[]): void {
        this.habits = habits;
    }
    @Mutation
    public loadingHabit(status: boolean) {
        this.loadingHabitStatus = status;
    }
    @Action
    async CreateHabit(data: CreateHabitInput) {
        this.context.commit("loadingCreate", true);
        return await HabitService.createHabit(data)
        .then((habits: Habit) => {
            this.context.commit("AuthModule/setCreateHabit", data, {
            root: true,
            });
            this.context.commit("CreateSuccess", habits);
            this.context.commit("loadingCreate", false);
            this.context.commit("setsnackbarSucessMessageCreateHabit");
            this.context.commit("setsnackbarSucessCreateHabit");
        })
        .catch((error) => {
            console.log(error);
        });
    }
    @Action({ rawError: true })
    async deleteHabit(habitId: string): Promise<void> {
        this.context.commit("setLoadingDelete", true);
        this.context.commit("setSuccessDelete", false);
        return await HabitService.deleteHabit(habitId)
        .then((data) => {
            this.context.commit("AuthModule/setDeleteHabit", data, {
                root: true,
            });
            this.context.commit("setLoadingDelete", false);
            this.context.commit("setSuccessDelete", false);
        })
        .catch((error) => {
            this.context.commit("setLoadingDelete", false);
            console.log(error);
        });
    }
    
    @Mutation
    public CreateSuccess(habits: Habit): void {
        if (this.habits) {
            this.habits = [habits, ...this.habits];
        }
    }
}
export default HabitModule;