import React from 'react'
import Task from './Task';

const TodoList = ({ todos, toggleTodo,handleEditTodo }) => {
    return todos.map((todo) => 
    <Task 
    todo={todo} 
    key={todo.id} 
    toggleTodo={toggleTodo}
    handleEditTodo={handleEditTodo}
    />);
};

export default TodoList
