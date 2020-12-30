import React, { useState } from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { Todo } from './todo.model';

function App() {
  const [ todos, setTodos ] = useState<Todo[]>([]);
  const todoAddHandler = (text: string) => {
    setTodos([...todos, {id: Math.random().toString(), text}])
  }

  const todoDeleteHandler = (id: string) => {
    setTodos(prevTodos=> {
      return prevTodos.filter((todo)=>todo.id !== id);
    })
  }

  return (
    <div className="App">
      <NewTodo onAdd={todoAddHandler} />
      <TodoList items={todos} onDelete={todoDeleteHandler}/>
    </div>
  );
}

export default App;
