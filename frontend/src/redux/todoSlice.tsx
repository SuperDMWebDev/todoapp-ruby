import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { FETCH_TASK_FULFILLED } from './actions';
export interface Task {
  id?: number;
  title?: string;
  completed?: boolean;
}

export const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
});

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const resp = await api.get(`/tasks`);
    if (resp.status !== 400) {
      const todos = resp.data;
      return { todos };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (payload: Task) => {
    const resp = await api.post(`/tasks`, {
      title: payload?.title,
    });
    if (resp.status !== 400) {
      const todo = await resp.data;
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  'todos/toggleCompleteAsync',
  async (payload: Task) => {
    const resp = await api.put(`/tasks/${payload.id}`, {
      completed: payload.completed,
    });

    if (resp.status !== 400) {
      const todo = await resp.data;
      return { todo };
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (payload: Task) => {
    const resp = await api.delete(`/tasks/${payload.id}`);

    if (resp.status !== 400) {
      return { id: payload.id };
    }
  }
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    FETCH_TASK_FULFILLED: (state: any, action: PayloadAction<[]>) => {
      state.push(...action.payload);
    },
  },
  extraReducers: {
    [getTodosAsync.fulfilled.toString()]: (state, action) => {
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled.toString()]: (state, action) => {
      state.push(action.payload.todo);
    },
    [toggleCompleteAsync.fulfilled.toString()]: (state, action) => {
      const index = state.findIndex(
        (todo) => todo.id === action.payload.todo.id
      );
      state[index].completed = action.payload.todo.completed;
    },
    [deleteTodoAsync.fulfilled.toString()]: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export default todoSlice.reducer;
