import React from 'react'
import Task from './Task';

const TodoList = ({ todos, toggleTodo,handleEditTodo,handleOpenModal }) => {
    return todos.map((todo) => 
    <Task 
    todo={todo} 
    key={todo.id} 
    toggleTodo={toggleTodo}
    handleOpenModal={handleOpenModal}
    />);
    
};

export default TodoList
