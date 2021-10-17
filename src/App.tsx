import React, { useState, useEffect } from "react";
import "./App.css";

//Represents a single todo item
interface Todo {
  title: string;
  id: number;
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
        {todo.title}{" "}
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
        title: todo.title,
        id: todo.id,
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
          title: textInInput,
          id: todos.length,
        },
      ])
    );
  };




  ////////////////////////////////////////////////////////
  const loadTodos = () =>{
    fetch("https://todo-lsit.p.rapidapi.com/todoList", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "todo-lsit.p.rapidapi.com",
		"x-rapidapi-key": "c1ba9c9feemsh5475fb079d808efp1f316fjsn1f3a1bb1cde7"
	}
})

  .then((data:any) => {
	updateTodos(todos.concat(data));
  })
  .catch(err => {
	console.error(err);
});
  }

/////////////////////////////////////////////////////////////


  return (
    <div className="app">
      <header className="title-header">
        <h1 style={{ display: "inline" }}>Todos </h1>
        <button
            type="button"
            onClick={loadTodos}
            style={{
              backgroundColor: "transparent",
              border: "none",
              display: "inline",
              fontSize: "2.5rem",
            }}
>
            🔃{" "}
          </button>
      </header>

      <div className="todo-creator">
        <div className="form">
          <input
            className="shadow appearance-none border rounded w-half py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={textInInput}
            onChange={(e) => {
              updateText(e.target.value);
            }}
            placeholder="Add a todo"
          />
         
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded mx-2 hover:bg-green-600 transition duration-200 each-in-out"
            onClick={handleTodos}
          >
            ➕{" "}
          </button>

         
        </div>
      </div>
      <br />
      <table className="table-fixed shadow-md rounded-lg mx-auto w-1/2">
        <thead>
          <tr className=" bg-white">
            <th className="text-gray-700 text-base w-2/3"> Task </th>
            <th className="text-gray-700 text-base w-1/6"> Delete </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              onDelete={() =>
                updateTodos(todos.filter((curTodo) => curTodo.id !== todo.id))
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
