import React from 'react'
import './Todo.css';

function Task({ todo, toggleTodo,handleEditTodo,handleOpenModal }) {
    const handleTodoClick = () => {
        toggleTodo(todo.id);
    }
    // 今日の日付取得
    const today = new Date().toISOString().split("T")[0];
    
    return (
        <div className='todo-item'>
            <label>
                <input type='checkbox' 
                checked={todo.completed} 
                readOnly 
                onChange={handleTodoClick} />
            </label>
    {/* やるべきこと */}
        <div className='todo-info'>
            <span 
                className={
                todo.tag === "勉強" ? "tag-study"
                : todo.tag === "仕事" ? "tag-work"
                : todo.tag === "買い物" ? "tag-shopping"
                : "tag-other"
            }
        >
                [{todo.tag}]
    {/* 優先度 */}
                {todo.priority === "高" && "🔴"}
                {todo.priority === "中" && "🟡"}
                {todo.priority === "低" && "🟢"}
                {todo.name}
                ({todo.date})
            </span>
        </div>
    {/* 編集 */}
            <button 
                className='edit'
                onClick={()=>handleOpenModal(todo)}>
                編集
            </button> 
    {/* 期限切れ */}
                {todo.date < today &&
                !todo.completed &&(
                    <span className='expired'>期限切れ</span>
                )}
        </div>
    )
}

export default Task
