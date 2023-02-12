import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addTodoAsync } from '../redux/todoSlice';
import { Task } from '../redux/todoSlice';
export default function TodoForm() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (value) {
      const todo: Task = {
        title: value,
      };
      dispatch(addTodoAsync(todo));
      setValue('');
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <label className="form__label">Todo</label>
      <input
        type="text"
        className="form__input"
        placeholder="Add todo..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />

      <button type="submit" className="form__button">
        Submit
      </button>
    </form>
  );
}
