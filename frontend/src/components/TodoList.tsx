import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import {
  deleteTodoAsync,
  getTodosAsync,
  Task,
  toggleCompleteAsync,
} from '../redux/todoSlice';

export default function TodoList() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: any) => state.todos);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);
  const handleCheckboxClick = (task: Task) => {
    dispatch(toggleCompleteAsync({ id: task.id, completed: !task.completed }));
  };

  const handleDeleteClick = (task: Task) => {
    dispatch(deleteTodoAsync({ id: task.id }));
  };
  return (
    <ul className="todoList">
      {todos.map((item: Task, index: number) => (
        <li
          className={`todoList__item ${
            item.completed && 'todoList__item--completed'
          }`}
          key={index}
        >
          <div className="todoList__container">
            <span className="todoList__input">
              <input
                type="checkbox"
                checked={item.completed}
                onClick={() => handleCheckboxClick(item)}
              />
              {item.title}
            </span>
            <button
              onClick={() => handleDeleteClick(item)}
              className="todoList__button"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
