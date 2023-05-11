
declare module '*/currentUser.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CurrentUser: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/login.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Login: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/registerUser.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const RegisterUser: DocumentNode;

  export default defaultDocument;
}
    