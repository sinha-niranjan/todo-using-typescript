import { useEffect, useState } from "react";
import { TodoProvider } from "./context";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

interface TodoDataType {
  id: number;
  todo: string;
  completed: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<TodoDataType[]>([]);

  const addTodo = (todo: TodoDataType) => {
    setTodos((prev) => [{ ...todo }, ...prev]);
  };

  const updateTodo = (id: number, todo: TodoDataType) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    try {
      const todos = JSON.parse(localStorage.getItem("todos") || " ");

      if (todos && todos.length > 0) setTodos(todos);
    } catch (error) {
      console.log(error)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                {" "}
                <TodoItem todo={todo} />{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
