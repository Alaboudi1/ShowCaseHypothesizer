import React, { useState, useEffect } from "react";
import "./TodoApp.css";
import { Todo } from "./t";
import UnfinishedTodoList from "./UnfinishedTodoList";

const TodoApp: React.FC = (): JSX.Element => {
  const [unfinishedTodoList, updateunfinishedTodos] = useState<Todo[]>([]);
  const [finishedTodos, updatefinishedTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState<string>("");

  useEffect(() => {
    const unfinishedTodos = JSON.parse(
      localStorage.getItem("unfinishedTodoList") || "[]"
    );
    const finishedTodos = JSON.parse(
      localStorage.getItem("finishedTodoList") || "[]"
    );

    updateunfinishedTodos(unfinishedTodos);
    updatefinishedTodos(finishedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "unfinishedTodoList",
      JSON.stringify(unfinishedTodoList)
    );
    localStorage.setItem("finishedTodoList", JSON.stringify(finishedTodos));
  }, [unfinishedTodoList, finishedTodos]);
  const deleteUnfinishedTodos = (id: number) =>
    updateunfinishedTodos(unfinishedTodoList.filter((todo) => todo.id !== id));
  const deleteFinishedTodos = (id: number) =>
    updatefinishedTodos(finishedTodos.filter((todo) => todo.id !== id));

  const todoOperations = (action: string, todo: Todo) => {
    switch (action) {
      case "add":
        addTodo(todo.title);
        break;
      case "delete":
        if (!todo?.finished) {
          deleteUnfinishedTodos(todo.id);
        }
        if (todo?.finished) {
          deleteFinishedTodos(todo.id);
        }
        break;
      case "update":
        updateTodo(todo.id, todo);
        break;
      default:
        throw new Error("Invalid action");
    }
  };

  const addTodo = (todoTitle: string) => {
    const newTodo: Todo = {
      title: todoTitle,
      id: Date.now() + Math.random(),
      timeStarted: new Date(),
      finished: false,
      favorite: false,
    };

    const newTodos = [...unfinishedTodoList, newTodo];
    updateunfinishedTodos(newTodos);
  };

  const updateTodo = (id: number, todo: Todo) => {
    const newTodos = unfinishedTodoList.map((curTodo) => {
      if (curTodo.id === id) {
        return todo;
      }
      return curTodo;
    });
    updateunfinishedTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-creator">
        <div className="form">
          <input
            className="shadow appearance-none border rounded w-half py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            placeholder="Add a todo"
          />

          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded mx-2 hover:bg-green-600 transition duration-200 each-in-out"
            onClick={() => addTodo(todoTitle)}
          >
            ➕
          </button>
        </div>
      </div>
      <UnfinishedTodoList
        todos={unfinishedTodoList}
        todoOperations={todoOperations}
      />
    </div>
  );
};

export default TodoApp;
