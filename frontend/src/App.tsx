import * as React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.scss';
const App = () => {
  return (
    <div className="app">
      <h1 className="app__header">My Todo List</h1>
      <div className="app__body">
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
};

export default App;
