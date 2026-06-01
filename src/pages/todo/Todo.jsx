import { useRef, useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

function Todo() {
    const [todos, setTodos] = useState([]);
    const todoNameRef = useRef();
    const handleAddTodo = () => {
        // タスク追加
        // console.log(todoNameRef.current.value);
        const name = todoNameRef.current.value;
        if (name === "") return;
        setTodos((prevTodos) => {
            return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
        });
        todoNameRef.current.value = null;
    };
    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos)
    };
    const handleClear = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    };
    return (
        <div className="App">
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <h1>やるべきこと</h1>
            <input type='text' className='inputText' ref={todoNameRef} />
            <button className='Button' onClick={handleAddTodo}>タスクを追加</button>
            <button className='Button' onClick={handleClear}>完了したタスクの削除</button>
            <div>
                残りのタスク:{todos.filter((todo) => !todo.completed).length}
            </div>
        </div>
    );
}

export default Todo
