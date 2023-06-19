import Vuex, { Store } from "vuex";
import AuthModule from "./modules/auth.module";
import TaskModule from "./modules/task.module";
import HabitModule from "./modules/habit.module";

export interface RootState {}
export const store = new Vuex.Store<RootState>({
  actions: {
    nuxtServerInit: () => {},
  },
  modules: {
    AuthModule,
    TaskModule,
    HabitModule,
  },
});
const createStore = (): Store<RootState> => {
  return store;
};
export default createStore;
