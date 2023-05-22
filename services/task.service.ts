import { apolloClient } from "@/provider/apolloprovider";
import {
  CreateTaskInput,
  CreateTask,
  Tasks,
  Task,
  DeleteTask,
} from "~/gql/graphql";

class taskService {
  async createTask(data: CreateTaskInput) {
    return (
      await apolloClient.mutate({
        mutation: CreateTask,
        fetchPolicy: "network-only",
        variables: {
          create: data,
        },
      })
    ).data.createTask;
  }
  async getTask(id: string) {
    return (
      await apolloClient.query({
        query: Task,
        fetchPolicy: "network-only",
        variables: {
          id,
        },
      })
    ).data.Task;
  }
  async getTasks() {
    return (
      await apolloClient.query({
        query: Tasks,
        fetchPolicy: "network-only",
      })
    ).data.tasks;
  }
  async deleteTask(taskId: string): Promise<Task> {
    console.log("mutacion " + taskId);
    return (
      await apolloClient.mutate({
        mutation: DeleteTask,
        variables: {
          id: taskId,
        },
      })
    ).data?.deleteTask;
  }
}
export default new taskService();
