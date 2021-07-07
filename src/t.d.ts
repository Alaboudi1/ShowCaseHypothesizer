
//Represents a single todo item
export interface Todo {
  description: string;
  key: number;
  timeStarted: number;
}

//Props for the TodoItem function
export interface TodoProps {
  todo: Todo;
  onDelete(): void;
  onUp(): void;
  onDown(): void;
}
