import { apolloClient } from "@/provider/apolloprovider";
import { CreateHabitInput, CreateHabit, Habit, Habits } from "~/gql/graphql";

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
}
export default new habitService();
