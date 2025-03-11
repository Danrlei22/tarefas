import { useState } from "react";
import Loading from "./Loading";

import styles from "./TodoList.module.css";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

const TodoList = ({ todos, onDelete, onUpdate, loading }) => {
  const [editing, setEditing] = useState({ id: null, field: null, value: "" });

  const handleDoubleClick = (todo, field) => {
    setEditing({ id: todo.id, field, value: todo[field] });
  };

  const handleBlur = async (id, field, index) => {
    if (editing.value.trim() !== "") {
      await onUpdate(id, { [field]: editing.value }, index);
    }else{
      toast.error("O campo não pode ser vazio!");
    }
    setEditing({ id: null, field: null, value: "" });
  };

  const handleChange = (e) => {
    setEditing((prev) => ({ ...prev, value: e.target.value }));
  };

  if (loading) {
    return <Loading />;
  }

  if (todos.length === 0) {
    return <p className={styles.msgList}>Não há tarefas!</p>;
  }

  return (
    <>
      <table className={styles.tableList}>
        <thead>
          <tr>
            <th>Nº</th>
            <th>Descrição</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id}>
              <td>{index + 1}</td>
              <td onDoubleClick={() => handleDoubleClick(todo, "title")}>
                {editing.id === todo.id && editing.field === "title" ? (
                  <input
                    value={editing.value}
                    onChange={handleChange}
                    onBlur={() => handleBlur(todo.id, "title", index)}
                    autoFocus
                  />
                ) : (
                  todo.title
                )}
              </td>
              <td onDoubleClick={() => handleDoubleClick(todo, "startTime")}>
                {editing.id === todo.id && editing.field === "startTime" ? (
                  <input
                    type="time"
                    value={editing.value}
                    onChange={handleChange}
                    onBlur={() => handleBlur(todo.id, "startTime", index)}
                    autoFocus
                  />
                ) : (
                  `${todo.startTime} h`
                )}
              </td>
              <td onDoubleClick={() => handleDoubleClick(todo, "endTime")}>
                {editing.id === todo.id && editing.field === "endTime" ? (
                  <input
                    type="time"
                    value={editing.value}
                    onChange={handleChange}
                    onBlur={() => handleBlur(todo.id, "endTime", index)}
                    autoFocus
                  />
                ) : (
                  `${todo.endTime} h`
                )}
              </td>
              <td>
                <button
                  className={styles.iconDeleteTable}
                  onClick={() => onDelete(todo.id, todo.title)}
                >
                  <BsTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TodoList;
