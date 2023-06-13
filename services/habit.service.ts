import { apolloClient } from "@/provider/apolloprovider";
import { CreateHabitInput, CreateHabit, Habit, Habits, DeleteHabit } from "~/gql/graphql";

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
}
export default new habitService();
