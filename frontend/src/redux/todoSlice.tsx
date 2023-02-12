import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
export const URL = 'http://localhost:3001/api/v1';
export interface Task {
  id?: number;
  title?: string;
  completed?: boolean;
}
export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const resp = await fetch(`${URL}/tasks`);
    if (resp.ok) {
      const todos = await resp.json();
      return { todos };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (payload: Task) => {
    const resp = await fetch(`${URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: payload?.title }),
    });

    if (resp.ok) {
      const todo = await resp.json();
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  'todos/toggleCompleteAsync',
  async (payload: Task) => {
    console.log('call toggleCompleteAsync asyncthunk', payload);
    const resp = await fetch(`${URL}/tasks/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: payload.completed }),
    });
    console.log('toggleCompleteAsync resp ', resp, resp.ok);
    if (resp.ok) {
      const todo = await resp.json();
      console.log('toggleCompleteAsync todo ', todo);
      return { todo };
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (payload: Task) => {
    const resp = await fetch(`${URL}/tasks/${payload.id}`, {
      method: 'DELETE',
    });

    if (resp.ok) {
      return { id: payload.id };
    }
  }
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    // addTodo: (state, action) => {
    //   console.log('vao addtodoslice ', state);
    //   const todo = {
    //     title: action.payload.title,
    //     completed: false,
    //   };
    //   state.push(todo);
    // },
    // toggleComplete: (state, action) => {
    //   const index = state.findIndex((todo) => todo.id === action.payload.id);
    //   state[index].completed = action.payload.completed;
    // },
    // deleteTodo: (state, action) => {
    //   return state.filter((todo) => todo.id !== action.payload.id);
    // },
  },
  extraReducers: {
    [getTodosAsync.fulfilled.toString()]: (state, action) => {
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled.toString()]: (state, action) => {
      console.log('addTodoAsync state', state);
      state.push(action.payload.todo);
    },
    [toggleCompleteAsync.pending.toString()]: (state, action) => {
      console.log('toggleCompleteAsync pending', state);
    },
    [toggleCompleteAsync.fulfilled.toString()]: (state, action) => {
      console.log('toggleCompleteAsync fulfilled', state);
      const index = state.findIndex(
        (todo) => todo.id === action.payload.todo.id
      );
      state[index].completed = action.payload.todo.completed;
    },
    [toggleCompleteAsync.rejected.toString()]: (state, action) => {
      console.log('toggleCompleteAsync rejected', state, action);
    },
    [deleteTodoAsync.fulfilled.toString()]: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

// export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
