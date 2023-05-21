import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type CreateTaskMutationVariables = Exact<{
  create: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, title: string, description?: string | null, status: boolean, finishDate: any, authorId: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, names: string, lastNames: string, email: string, tasks: Array<{ __typename?: 'Task', id: string, title: string, description?: string | null, cratedAt: any, status: boolean, finishDate: any, authorId: string }> } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', token: string, tokenType: string } };

export type RegisterUserMutationVariables = Exact<{
  create: CreateUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'User', id: string, names: string, lastNames: string, email: string, tasks: Array<{ __typename?: 'Task', id: string, title: string, description?: string | null, cratedAt: any, status: boolean, finishDate: any, authorId: string }> } };


export const CreateTask = gql`
    mutation CreateTask($create: CreateTaskInput!) {
  createTask(create: $create) {
    id
    title
    description
    status
    finishDate
    authorId
  }
}
    `;
export const CurrentUser = gql`
    query CurrentUser {
  currentUser {
    id
    names
    lastNames
    email
    tasks {
      id
      title
      description
      cratedAt
      status
      finishDate
      authorId
    }
  }
}
    `;
export const Login = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    tokenType
  }
}
    `;
export const RegisterUser = gql`
    mutation RegisterUser($create: CreateUserInput!) {
  registerUser(create: $create) {
    id
    names
    lastNames
    email
    tasks {
      id
      title
      description
      cratedAt
      status
      finishDate
      authorId
    }
  }
}
    `;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

/**  Resultado de autorizacion del usuario */
export type Auth = {
  __typename?: 'Auth';
  /** Identificador del token */
  token: Scalars['String'];
  /** Tipo del token */
  tokenType: Scalars['String'];
};

/** Entradas para el registro de una tarea. */
export type CreateTaskInput = {
  /** Descripción de la tarea. */
  description?: InputMaybe<Scalars['String']>;
  /** Fecha limite de la tarea. */
  finishDate: Scalars['DateTime'];
  /** Estado de la tarea. */
  status: Scalars['Boolean'];
  /** Titulo de la tarea. */
  title: Scalars['String'];
};

/** Entradas para el registro de un usuario. */
export type CreateUserInput = {
  /** Correo electrónico del usuario. */
  email: Scalars['String'];
  /** Apellido(s) del usuario. */
  lastNames: Scalars['String'];
  /** Nombre(s) del usuario. */
  names: Scalars['String'];
  /** Contraseña del usuario, se necesitan minimo 6 caracteres, 1 mayuscula y 1 número. */
  password: Scalars['String'];
};

/** Entradas para la autenticación de un usuario. */
export type LoginInput = {
  /** Correo electrónico del usuario. */
  email: Scalars['String'];
  /** Contraseña del usuario, se necesitan minimo 6 caracteres, 1 mayuscula y 1 número. */
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Mutación para crear una tarea. */
  createTask: Task;
  /** Mutación para eliminar una tarea. */
  deleteTask: Task;
  /** Mutación para elminar un usuario */
  deleteUser: User;
  /** Mutación de login. */
  login: Auth;
  /** Mutación para crear un nuevo ususario. */
  registerUser: User;
  /** Mutación para actualizar un usuario */
  updateUser: User;
};


export type MutationCreateTaskArgs = {
  create: CreateTaskInput;
};


export type MutationDeleteTaskArgs = {
  delete: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  delete: Scalars['ID'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterUserArgs = {
  create: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  update: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  /** Query para ver una tarea. */
  task: Task;
  tasks: Array<Task>;
  user: User;
  users: Array<User>;
};


export type QueryTaskArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

/** Campos de una tarea. */
export type Task = {
  __typename?: 'Task';
  /** Id del autor de la tarea. */
  authorId: Scalars['ID'];
  /** Fecha de creación de la tarea. */
  cratedAt: Scalars['DateTime'];
  /** Descripción de la tarea. */
  description?: Maybe<Scalars['String']>;
  /** Fecha limite de la tarea. */
  finishDate: Scalars['DateTime'];
  /** Id de la tarea. */
  id: Scalars['ID'];
  /** Estado de la tarea. */
  status: Scalars['Boolean'];
  /** Titulo de la tarea. */
  title: Scalars['String'];
};

/** Entradas para el registro de un usuario. */
export type UpdateUserInput = {
  /** Correo electrónico del usuario. */
  email?: InputMaybe<Scalars['String']>;
  /** Apellido(s) del usuario. */
  lastNames?: InputMaybe<Scalars['String']>;
  /** Nombre(s) del usuario. */
  names?: InputMaybe<Scalars['String']>;
  /** Contraseña del usuario, se necesitan minimo 6 caracteres, 1 mayuscula y 1 número. */
  password?: InputMaybe<Scalars['String']>;
};

/** Credenciales del usuario. */
export type User = {
  __typename?: 'User';
  /** Email del usuario. */
  email: Scalars['String'];
  /** Id del usuario. */
  id: Scalars['ID'];
  /** Apellidos del usuario. */
  lastNames: Scalars['String'];
  /** Nombre del usuario. */
  names: Scalars['String'];
  /** FieldResolver para obtener las tareas de un usuario. */
  tasks: Array<Task>;
};
