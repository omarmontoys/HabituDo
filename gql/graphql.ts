import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type CreateHabitMutationVariables = Exact<{
  create: CreateHabitInput;
}>;


export type CreateHabitMutation = { __typename?: 'Mutation', createHabito: { __typename?: 'Habit', id: string, title: string, description?: string | null, updatedAt: any, days: Array<number>, priority: number, finishDate: any, authorId: string } };

export type CreateTaskMutationVariables = Exact<{
  create: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, title: string, description?: string | null, status: boolean, finishDate: any, authorId: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, names: string, lastNames: string, email: string, tasks: Array<{ __typename?: 'Task', id: string, title: string, description?: string | null, status: boolean, finishDate: any, authorId: string }>, habits: Array<{ __typename?: 'Habit', id: string, title: string, description?: string | null, createdAt: any, updatedAt: any, days: Array<number>, dates: Array<any>, priority: number, finishDate: any, authorId: string }> } };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: { __typename?: 'Task', id: string, title: string, description?: string | null, status: boolean, finishDate: any, authorId: string } };

export type HabitQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type HabitQuery = { __typename?: 'Query', habit: { __typename?: 'Habit', id: string, title: string, description?: string | null, createdAt: any, updatedAt: any, days: Array<number>, dates: Array<any>, priority: number, finishDate: any, authorId: string } };

export type HabitsQueryVariables = Exact<{ [key: string]: never; }>;


export type HabitsQuery = { __typename?: 'Query', habits: Array<{ __typename?: 'Habit', id: string, title: string, description?: string | null, createdAt: any, updatedAt: any, days: Array<number>, dates: Array<any>, priority: number, finishDate: any, authorId: string }> };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', token: string, tokenType: string } };

export type RegisterUserMutationVariables = Exact<{
  create: CreateUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'User', id: string, names: string, lastNames: string, email: string, tasks: Array<{ __typename?: 'Task', id: string, title: string, description?: string | null, cratedAt: any, status: boolean, finishDate: any, authorId: string }> } };

export type TaskQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TaskQuery = { __typename?: 'Query', task: { __typename?: 'Task', id: string, title: string, description?: string | null, status: boolean, finishDate: any, authorId: string } };

export type TasksQueryVariables = Exact<{ [key: string]: never; }>;


export type TasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id: string, title: string, description?: string | null, status: boolean, finishDate: any, authorId: string }> };


export const CreateHabit = gql`
    mutation CreateHabit($create: CreateHabitInput!) {
  createHabito(create: $create) {
    id
    title
    description
    updatedAt
    days
    priority
    finishDate
    authorId
  }
}
    `;
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
      status
      finishDate
      authorId
    }
    habits {
      id
      title
      description
      createdAt
      updatedAt
      days
      dates
      priority
      finishDate
      authorId
    }
  }
}
    `;
export const DeleteTask = gql`
    mutation DeleteTask($id: ID!) {
  deleteTask(delete: $id) {
    id
    title
    description
    status
    finishDate
    authorId
  }
}
    `;
export const Habit = gql`
    query Habit($id: ID!) {
  habit(id: $id) {
    id
    title
    description
    createdAt
    updatedAt
    days
    dates
    priority
    finishDate
    authorId
  }
}
    `;
export const Habits = gql`
    query Habits {
  habits {
    id
    title
    description
    createdAt
    updatedAt
    days
    dates
    priority
    finishDate
    authorId
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
export const Task = gql`
    query Task($id: ID!) {
  task(id: $id) {
    id
    title
    description
    status
    finishDate
    authorId
  }
}
    `;
export const Tasks = gql`
    query Tasks {
  tasks {
    id
    title
    description
    status
    finishDate
    authorId
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

/** Entradas para crear un Habito */
export type CreateHabitInput = {
  /** Dias de la Semana en que se debe realizar el Habito */
  days: Array<Scalars['Int']>;
  /** Descripcion del Habito */
  description?: InputMaybe<Scalars['String']>;
  /** Fecha de Termino del Habito */
  finishDate: Scalars['DateTime'];
  /** Prioridad del Habito */
  priority: Scalars['Int'];
  /** Titulo del Habito */
  title: Scalars['String'];
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

/** Campos de un Habito */
export type Habit = {
  __typename?: 'Habit';
  /** Id del Autor del Habito */
  authorId: Scalars['ID'];
  /** Fecha de Creacion del Habito */
  createdAt: Scalars['DateTime'];
  /** Fechas en que se debe realizar el Habito */
  dates: Array<Scalars['DateTime']>;
  /** Dias de la Semana en que se debe realizar el Habito */
  days: Array<Scalars['Int']>;
  /** Descripcion del Habito */
  description?: Maybe<Scalars['String']>;
  /** Fecha de Termino del Habito */
  finishDate: Scalars['DateTime'];
  /** Id del Habito */
  id: Scalars['ID'];
  /** Prioridad del Habito */
  priority: Scalars['Int'];
  /** Titulo del Habito */
  title: Scalars['String'];
  /** Fecha de Actualizacion del Habito */
  updatedAt: Scalars['DateTime'];
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
  createHabito: Habit;
  /** Mutación para crear una tarea. */
  createTask: Task;
  /** Eliminar un Habito por su Id */
  deleteHabit: Habit;
  /** Mutación para eliminar una tarea. */
  deleteTask: Task;
  /** Mutación para elminar un usuario */
  deleteUser: User;
  /** Mutación de login. */
  login: Auth;
  /** Mutación para crear un nuevo ususario. */
  registerUser: User;
  /** Mutación para actualizar una tarea. */
  updateTask: Task;
  /** Mutación para actualizar un usuario */
  updateUser: User;
};


export type MutationCreateHabitoArgs = {
  create: CreateHabitInput;
};


export type MutationCreateTaskArgs = {
  create: CreateTaskInput;
};


export type MutationDeleteHabitArgs = {
  id: Scalars['ID'];
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


export type MutationUpdateTaskArgs = {
  update: UpdateTaskInput;
};


export type MutationUpdateUserArgs = {
  update: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  /** Obtener un Habito por su Id */
  habit: Habit;
  /** Obtener todos los Habitos */
  habits: Array<Habit>;
  /** Query para ver una tarea. */
  task: Task;
  tasks: Array<Task>;
  user: User;
  users: Array<User>;
};


export type QueryHabitArgs = {
  id: Scalars['ID'];
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

/** Entradas para actualizar una tarea. */
export type UpdateTaskInput = {
  /** Descripción de la tarea. */
  description?: InputMaybe<Scalars['String']>;
  /** Fecha limite de la tarea. */
  finishDate?: InputMaybe<Scalars['DateTime']>;
  /** Id de la tarea. */
  id: Scalars['ID'];
  /** Estado de la tarea. */
  status?: InputMaybe<Scalars['Boolean']>;
  /** Titulo de la tarea. */
  title?: InputMaybe<Scalars['String']>;
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
  /** FieldResolver para obtener los habitos de un usuario. */
  habits: Array<Habit>;
  /** Id del usuario. */
  id: Scalars['ID'];
  /** Apellidos del usuario. */
  lastNames: Scalars['String'];
  /** Nombre del usuario. */
  names: Scalars['String'];
  /** FieldResolver para obtener las tareas de un usuario. */
  tasks: Array<Task>;
};
