import React from 'react';
import './TodoList.css';

interface TodoListPros {
    items: {id: string, text: string}[]
    onDelete: (id: string) => void;
};

// Functional component
const TodoList: React.FC<TodoListPros> = props => {
    return <ul>
        {props.items.map((todo) => (
        <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={props.onDelete.bind(this, todo.id)} > DELETE </button>
        </li>
        ))}
    </ul>
}

export default TodoList