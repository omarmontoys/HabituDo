import { apolloClient } from "@/provider/apolloprovider";
import {
  CreateUserInput,
  CurrentUser,
  Login,
  LoginInput,
  RegisterUser,
  User,
  Users,
} from "~/gql/graphql";

class AuthService {
  async login(data: LoginInput) {
    return (
      await apolloClient.mutate({
        mutation: Login,
        variables: {
          input: data,
        },
      })
    ).data.login;
  }
  async registerUser(data: CreateUserInput) {
    return (
      await apolloClient.mutate({
        mutation: RegisterUser,
        variables: {
          create: data,
        },
      })
    ).data;
  }
  async currentUser() {
    return (
      await apolloClient.query({
        query: CurrentUser,
        fetchPolicy: "network-only",
      })
    ).data.currentUser;
  }
  async getUsers() {
    return (
      await apolloClient.query({
        query: Users,
        fetchPolicy: "network-only",
      })
    ).data.users;
  }
  async consulttUser(data: string) {
    return (
      await apolloClient.query({
        query: User,
        fetchPolicy: "network-only",
        variables: {
          id: data,
        },
      })
    ).data.user;
  }
}
export default new AuthService();
