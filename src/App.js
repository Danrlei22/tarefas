import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "http://localhost:5000";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    setLoading(true);
    const response = await fetch(API + "/todos");
    const data = await response.json();
    setTodos(data);
    setLoading(false);
  };

  const handleSubmit = async ({ title, startTime, endTime }) => {
    const newTodo = {
      title,
      startTime,
      endTime,
      done: false,
    };

    const response = await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setTodos((prevTodos) => [...prevTodos, data]);
      toast.success(`Tarefa "${data.title}" adicionada com sucesso!`);
      setTitle("");
      setStartTime("");
      setEndTime("");
    } else {
      toast.error("Erro ao adicionar tarefa.");
    }
  };

  const handleDelete = async (id, title) => {
    const response = await fetch(`${API}/todos/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      toast.error(`Tarefa "${title}" deletada!`);
    } else {
      toast.error("Erro ao deletar todo:", response.statusText);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <TodoForm
        onSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
      <h2 className="titleList">Lista de tarefas</h2>
      <TodoList todos={todos} onDelete={handleDelete} loading={loading} />
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  );
}

export default App;
