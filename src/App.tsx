import React, { useState, useEffect } from "react";
import "./App.css";

//Represents a single todo item
interface Todo {
  description: string;
  key: number;
}

//Props for the TodoItem function
interface TodoProps {
  todo: Todo;
  onDelete(): void;
}

//TodoItem functional component
function TodoItem(props: TodoProps) {
  const { todo, onDelete} = props;

  return (
    <tr className="bg-transparent ">
      <td className="task-desc text-gray-700 text-base w-2/3  ">
        {" "}
        {todo.description}{" "}
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

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]").map((todo:Todo) =>{
      return {
        description: todo.description,
        key: todo.key,
      }
    });
    updateTodos(savedTodos);
  }, []);

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
  

  const handleTodos = () => {
    updateTodos(
      todos.concat([
        {
          description: textInInput,
          key: todos.length,
        },
      ])
    );
  };
  const loadTodos = () =>{
    fetch("https://todo-lsit.p.rapidapi.com/todoList", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "todo-lsit.p.rapidapi.com",
		"x-rapidapi-key": "c1ba9c9feemsh5475fb079d808efp1f316fjsn1f3a1bb1cde7"
	}
})
  .then((todos:any) => {
	updateTodos([].concat(todos));
  })
  .catch(err => {
	console.error(err);
});
  }
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
         
          <button
            type="button"
            className="bg-blue-500 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-blue-600 transition duration-200 each-in-out"
            onClick={handleTodos}
          >
            Add Todo{" "}
          </button>

          <button
            type="button"
            className="bg-green-500 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-green-600 transition duration-200 each-in-out"
            onClick={loadTodos}
          >
            Load Todos{" "}
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
          {todos.map((todo) => (
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
