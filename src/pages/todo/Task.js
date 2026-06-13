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
            <span className={
                todo.tag === "勉強" ? "tag-study"
                : todo.tag === "仕事" ? "tag-work"
                : todo.tag === "買い物" ? "tag-shopping"
                : "tag-other"
            }>
                [{todo.tag}]
    {/* 優先度 */}
                {todo.priority === "高" && "🔴"}
                {todo.priority === "中" && "🟡"}
                {todo.priority === "低" && "🟢"}
                <span>
                    {todo.name}
                    ({todo.date})
                </span>
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
