import Loading from "./Loading";
import TodoItem from "./TodoItem";

import styles from './TodoList.module.css'

const TodoList = ({ todos, onDelete, loading }) => {
  if (loading) {
    return <Loading />;
  }

  if (todos.length === 0) {
    return <p className={styles.msgList}>Não há tarefas!</p>;
  }

  return (
    <>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
