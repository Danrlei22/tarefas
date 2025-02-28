import { BsTrash } from 'react-icons/bs';

const TodoItem = ({ todo, onDelete}) => {
  return (
    <li key={todo.id}>
      {todo.title} - {todo.time} horas
      <button onClick={() => onDelete(todo.id)}>
        <BsTrash />
      </button>
    </li>
  );
};

export default TodoItem;
