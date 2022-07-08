import {Todo } from "./t";


//TodoItem functional component
const TodoItem = ({todo, todoOperations}:{todo:Todo, todoOperations:Function}): JSX.Element => {
    return (
      <tr className="bg-transparent ">
        <td className="task-desc text-gray-700 text-base w-2/3  ">
          {" "}
          {todo.title}{" "}
        </td>
        <td className="w-1/6">
          <button onClick={()=> todoOperations(
            "delete",
            todo
            )} 
            className="bg-white-500 text-white px-4 py-2 rounded mx-2 hover:bg-red-600 transition duration-200 each-in-out">
            ❌
          </button>
        </td>
      </tr>
    );
  }
  
export default TodoItem;