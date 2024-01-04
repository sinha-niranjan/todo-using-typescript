import { createContext, useContext } from "react";

interface TodoDataType {
  id: number;
  todo: string;
  completed: boolean;
}

interface TodoContextType {
  todos: TodoDataType[];
  addTodo: (todo: TodoDataType) => void;
  updateTodo: (id: number, Todo: TodoDataType) => void;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType>({
  todos: [
    {
      id: Date.now(),
      todo: "Todo Msg",
      completed: false,
    },
  ],
  addTodo: (Todo: TodoDataType) => {},
  updateTodo: (id: number, Todo: TodoDataType) => {},
  deleteTodo: (id: number) => {},
  toggleComplete: (id: number) => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
