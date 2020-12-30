import React, { useRef } from 'react';
import './NewTodo.css';

interface NewTodoPros {
    onAdd: (todoText: string) => void;
};

const NewTodo: React.FC<NewTodoPros> = (props) => {
    const textInputRef = useRef<HTMLInputElement>(null);
    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = textInputRef.current!.value;
        props.onAdd(enteredText);
    }

    return <form onSubmit={todoSubmitHandler}>
        <div>
            <label htmlFor="todoText"> Todo Text </label>
            <input type="text" id="todoText" ref={textInputRef}/>
            <button type="submit"> Add Todo </button>
        </div>
    </form>
}

export default NewTodo