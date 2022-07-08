
//Represents a single todo item
export interface Todo {
  title: string;
  id: number;
  timeStarted: Date;
  finished: boolean;
  favorite: boolean;
}


export interface TodoList {
  unfinishedTodos: Todo[];
  finishedTodos: Todo[];
}

