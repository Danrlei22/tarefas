import React, { useState } from "react";

import styles from "./TodoForm.module.css";

const TodoForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, time });

    setTitle("");
    setTime("");
  };

  return (
    <>
      <div className={styles.todoHeader}>
        <h1>Tarefas</h1>
      </div>
      <div className={styles.formTodo}>
        <h2>Insira sua próxima tarefa:</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formControl}>
          <label htmlFor="title">Tarefa:</label>
          <input
            type="text"
            id="title"
            placeholder="Título da tarefa"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
            required
          />
        </div>

        <div className={styles.formControl}>
          <label htmlFor="time">Duração:</label>
          <input
            type="text"
            id="time"
            placeholder="Tempo estimado (em horas)"
            onChange={(e) => setTime(e.target.value)}
            value={time || ""}
            required
          />
        </div>

        <input className={styles.btnSubmit} type="submit" value="Criar tarefa" />
      </form>
    </>
  );
};

export default TodoForm;
