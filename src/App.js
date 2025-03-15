import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "https://96ae-177-204-154-90.ngrok-free.app/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    setLoading(true);

    try {
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error(
          `Erro na requisição: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setTodos(data);
    } catch (e) {
      //console.error("Erro ao buscar tarefa:", e);
      //toast.error("Erro ao buscar tarefa. Verifique a API.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async ({ title, startTime, endTime }) => {
    const newTodo = {
      title,
      startTime,
      endTime,
      done: false,
    };

    const response = await fetch(API, {
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
    const response = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      toast.error(`Tarefa "${title}" deletada!`);
    } else {
      toast.error("Erro ao deletar todo:", response.statusText);
    }
  };

  const fieldNames = {
    title: "Descrição",
    startTime: "Início",
    endTime: "Fim",
  };

  const handleUpdate = async (id, updateFields, index) => {
    const response = await fetch(`${API}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateFields),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.ok) {
      const updateTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updateTodo : todo))
      );
      const updateField = Object.keys(updateFields)[0]; // Campo que atualizou
      const fieldName = fieldNames[updateField];
      toast.success(
        `Tarefa "N°${index + 1}" atualizado o campo "${fieldName}"!`
      );
    } else {
      toast.error("Erro ao atualizar");
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
      <p className="instruction">
        Dê 2 cliques para atualizar o campo desejado.
      </p>
      <TodoList
        todos={todos}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        loading={loading}
      />
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  );
}

export default App;
