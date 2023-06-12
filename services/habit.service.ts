import { apolloClient } from "@/provider/apolloprovider";
import { CreateHabitInput, CreateHabit, Habit, Habits, DeleteHabit, UpdateHabitInput, UpdateHabit, UpdateDoneHabit } from "~/gql/graphql";

class habitService {
  async createHabit(data: CreateHabitInput) {
    return (
      await apolloClient.mutate({
        mutation: CreateHabit,
        fetchPolicy: "network-only",
        variables: {
          create: data,
        },
      })
    ).data.createHabit;
  }
  async getHabit(id: string) {
    return (
      await apolloClient.query({
        query: Habit,
        fetchPolicy: "network-only",
        variables: {
          id,
        },
      })
    ).data.Habit;
  }
  async getHabits() {
    return (
      await apolloClient.query({
        query: Habits,
        fetchPolicy: "network-only",
      })
    ).data.habits;
  }
  async deleteHabit(habitId: string): Promise<Habit> {
    console.log(habitId);
    return (
      await apolloClient.mutate({
        mutation: DeleteHabit,
        variables: {
          id: habitId,
        },
      })
    ).data?.deleteHabit;
  }
  async updateHabit(data: UpdateHabitInput) {
    return (
      await apolloClient.mutate({
        mutation: UpdateHabit,
        fetchPolicy: "network-only",
        variables: {
          update: data,
        },
      })
    ).data.updateHabit;
  }
  async updateDoneHabit(data: UpdateHabitInput) {
    return (
      await apolloClient.mutate({
        mutation: UpdateDoneHabit,
        fetchPolicy: "network-only",
        variables: {
          update: data,
        },
      })
    ).data.updateDoneHabit;
  }
}
export default new habitService();
