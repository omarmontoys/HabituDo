import { apolloClient } from "@/provider/apolloprovider";
import { CreateTaskInput, CreateTask } from "~/gql/graphql";

class taskService {
  async createTask(data: CreateTaskInput) {
    return (
      await apolloClient.mutate({
        mutation: CreateTask,
        variables: {
          create: data,
        },
      })
    ).data.createTask;
  }
}
export default new taskService();
