import { TiEdit } from "react-icons/ti";
import Loading from "./Loading";

import styles from "./TodoList.module.css";
import { BsTrash } from "react-icons/bs";

const TodoList = ({ todos, onDelete, loading }) => {
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
            <th>Tempo</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id}>
              <td>{index + 1}</td>
              <td>{todo.title}</td>
              <td>{todo.time} horas</td>
              <td>
                <button className={styles.iconEditTable}>
                  <TiEdit />
                </button>
              </td>
              <td>
                <button
                  className={styles.iconDeleteTable}
                  onClick={() => onDelete(todo.id)}
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
