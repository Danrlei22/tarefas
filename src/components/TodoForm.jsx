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
        <h1 className={styles.titleH1}>Tarefas</h1>
      </div>
      <div className={styles.formTodo}>
        <h2 className={styles.titleH2}>Insira sua próxima tarefa:</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formControl}>
          <label className={styles.labelTask} htmlFor="title">Tarefa:</label>
          <input
          className={styles.inputTask}
            type="text"
            id="title"
            placeholder="Descrição da tarefa"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
            required
          />
        </div>

        <div className={styles.formControl}>
          <label className={styles.labelTask} htmlFor="time">Duração:</label>
          <input
           className={styles.inputTime}
            type="number"
            id="time"
            placeholder="Tempo estimado (em horas)"
            onChange={(e) => setTime(e.target.value)}
            value={time || ""}
            required
          />
        </div>

        <button className={styles.btnSubmit} type="submit">Criar</button>
      </form>
    </>
  );
};

export default TodoForm;
