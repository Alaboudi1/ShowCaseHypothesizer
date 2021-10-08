import React, { useState, useEffect } from "react";
import "./App.css";

//Represents a single todo item
interface Todo {
  description: string;
  key: number;
  dueDate: Date;
}

//Props for the TodoItem function
interface TodoProps {
  todo: Todo;
  onDelete(): void;
}

function upHandler(
  todo: Todo,
  todos: { description: string; key: number; dueDate: string }[],
  updateTodos: {
    (
      value: React.SetStateAction<
        { description: string; key: number; dueDate: string }[]
      >
    ): void;
    (arg0: (array: Todo[]) => Todo[]): void;
  }
) {
  let index = 0;

  for (const element of todos) {
    if (element.key === todo.key) {
      break;
    }

    index++;
  }

  if (index !== 0) {
    updateTodos((array: Array<Todo>) => {
      let data = [...array];
      let temp = data[index];
      data[index] = data[index - 1];
      data[index - 1] = temp;
      return data;
    });
  }
}

function downHandler(
  todo: Todo,
  todos: { description: string; key: number; dueDate: string }[],
  updateTodos: {
    (
      value: React.SetStateAction<
        { description: string; key: number; dueDate: string }[]
      >
    ): void;
    (arg0: (array: Todo[]) => Todo[]): void;
  }
) {
  let index = 0;

  for (const element of todos) {
    if (element.key === todo.key) {
      break;
    }

    index++;
  }

  if (index !== todos.length - 1) {
    updateTodos((array: Array<Todo>) => {
      let data = [...array];
      let temp = data[index];
      data[index] = data[index + 1];
      data[index + 1] = temp;
      return data;
    });
  }
}

//TodoItem functional component
function TodoItem(props: TodoProps) {
  const { todo, onDelete} = props;

  return (
    <tr className="bg-transparent ">
      <td className="task-desc text-gray-700 text-base w-2/3  ">
        {" "}
        {todo.key}{" "}
      </td>
      <td className="task-desc text-gray-700 text-base w-2/3  ">
        {" "}
        {todo.description}{" "}
      </td>
      <td className="task-time text-gray-700 text-base w-1/6 ">
        {" "}
        {todo.dueDate.toLocaleDateString()}{" "}
      </td>
      <td className="w-1/6">
        <button onClick={onDelete} className="  text-lg ">
          ❌
        </button>
      </td>
    </tr>
  );
}

function App() {
  const [todos, updateTodos] = useState<Todo[]>([]);
  const [textInInput, updateText] = useState("");
  //get today's date
  const [dueDate, updateDueDate] = useState(new Date());

  // React.useEffect(() => {
  //   const intervalID = setInterval(() => {
  //     const date = new Date();
  //     const [month, day, year] = [
  //       date.getMonth(),
  //       date.getDate(),
  //       date.getFullYear(),
  //     ];
  //     const [hour, minutes, seconds] = [
  //       date.getHours(),
  //       date.getMinutes(),
  //       date.getSeconds(),
  //     ];
  //     updateTime(
  //       `Time: ${hour}:${minutes}:${seconds}, Date: ${month}/${day}/${year}`
  //     );
  //   }, 1000);
  //   return () => {
  //     clearInterval(intervalID);
  //   };
  // }, [time]); // bug it should be []
  const handleTodos = () => {
    updateTodos(
      todos.concat([
        {
          description: textInInput,
          key: todos.length,
          dueDate: dueDate,
        },
      ])
    );
  };
  return (
    <div className="app">
      <header className="title-header">
        <h1> Todos </h1>
      </header>

      <div className="todo-creator">
        <div className="form">
          <input
            className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={textInInput}
            onChange={(e) => {
              updateText(e.target.value);
            }}
          />
          <span style={{ marginLeft: "10px", color:"black" }}>
             <input type="date" value={dueDate.toLocaleDateString("en-UK").split("/").reverse().join("-")} onChange={(e) => {
            updateDueDate(new Date(e.target.value));
            console.log(new Date(e.target.value).toLocaleDateString("en-UK").split("/").reverse().join("-"));
          }} />
          </span>


          <button
            type="button"
            className="bg-blue-500 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-blue-600 transition duration-200 each-in-out"
            onClick={handleTodos}
          >
            Add Todo{" "}
          </button>
        </div>
      </div>
      <table className="table-fixed shadow-md rounded-lg mx-auto w-1/2">
        <thead>
          <tr className=" bg-white">
            <th className="text-gray-700 text-base w-1/6"> Id </th>
            <th className="text-gray-700 text-base w-2/3"> Task </th>
            <th className="text-gray-700 text-base w-1/6"> Time Started </th>
            <th className="text-gray-700 text-base w-1/6"> Options </th>
          </tr>
        </thead>
        <tbody>
          {todos.sort((todo1,todo2) => todo1.dueDate.getTime()- todo2.dueDate.getTime()).map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.key}
              onDelete={() =>
                updateTodos(todos.filter((curTodo) => curTodo.key !== todo.key))
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
