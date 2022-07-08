import { Todo } from "./t";
import TodoItem from "./Todo";

const UnfinishedTodoList = ({
  todos,
  todoOperations,
}: {
  todos: Todo[];
  todoOperations: Function;
}): JSX.Element => {
  return (
    <table className="table-fixed shadow-md rounded-lg mx-auto w-1/2">
      <thead>
        <tr className=" bg-white">
          <th className="text-gray-700 text-base w-2/3"> Task </th>
          <th className="text-gray-700 text-base w-1/6"> Delete </th>
        </tr>
      </thead>
      <tbody>
        {todos.map(
          (todo: Todo): JSX.Element => (
            <TodoItem
              key={todo.id}
              todoOperations={todoOperations}
              todo={todo}
            />
          )
        )}
      </tbody>
    </table>
  );
};
export default UnfinishedTodoList;
