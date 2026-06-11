import React from 'react'
import './Todo.css';

function Task({ todo, toggleTodo,handleEditTodo }) {
    const handleTodoClick = () => {
        toggleTodo(todo.id);
    }
    // 今日の日付取得
    const today = new Date().toISOString().split("T")[0];
    
    return (
        <div>
            <label>
                <input type='checkbox' 
                checked={todo.completed} readOnly 
                onChange={handleTodoClick} />
            </label>
    {/* やるべきこと */}
            <span>
                [{todo.tag}]
                {todo.name}
                ({todo.date})
            </span>
    {/* 編集 */}
            <button onClick={()=>handleEditTodo(todo.id)}>編集</button>
    {/* 期限切れ */}
            <span>
                {todo.date < today &&
                !todo.completed &&(
                    <span className='expired'>期限切れ</span>
                )}
            </span>
        </div>
    )
}

export default Task
