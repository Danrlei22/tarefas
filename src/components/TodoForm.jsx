import styles from "./TodoForm.module.css";

const TodoForm = ({
  onSubmit,
  title,
  setTitle,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, startTime, endTime });

    setTitle("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <>
      <div className={styles.todoHeader}>
        <h1 className={styles.titleH1}>Planejamento Diário</h1>
      </div>
      <div className={styles.formTodo}>
        <h2 className={styles.titleH2}>Insira sua próxima tarefa:</h2>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.formControl}>
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

        <div className={styles.containerTime}>
          <div className={styles.formControl}>
            <label className={styles.labelTask} htmlFor="startTime">
              Início:
            </label>
            <input
              className={styles.inputTime}
              type="time"
              id="startTime"
              onChange={(e) => setStartTime(e.target.value)}
              value={startTime || ""}
              required
            />
          </div>

          <div className={styles.formControl}>
            <label className={styles.labelTask} htmlFor="endTime">
              Fim:
            </label>
            <input
              className={styles.inputTime}
              type="time"
              id="endTime"
              onChange={(e) => setEndTime(e.target.value)}
              value={endTime || ""}
              required
            />
          </div>
        </div>

        <button className={styles.btnSubmit} type="submit">
          Criar
        </button>
      </form>
    </>
  );
};

export default TodoForm;
