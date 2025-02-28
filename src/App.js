import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import "./App.css";

const API = "http://localhost:5000";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    const response = await fetch(API + "/todos");
    const data = await response.json();
    setTodos(data);
    setLoading(false);
  };

  const handleSubmit = async (newTodo) => {
    const todo = {
      id: Date.now(),
      ...newTodo,
      done: false,
    };

    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "content-type": "application/json",
      },
    });

    fetchTodos();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/todos/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <TodoForm onSubmit={handleSubmit} />
      <h2 className="titleList">Lista de tarefas</h2>
      <TodoList todos={todos} onDelete={handleDelete} loading={loading} />
    </div>
  );
}

export default App;
