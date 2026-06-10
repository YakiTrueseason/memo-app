import { useContext, useEffect, useRef, useState } from 'react';
import './Todo.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import { ScheduleContext } from '../../conponents/ScheduleContext';

function Todo() {
    const {selectedDate} = useContext(ScheduleContext);
    //読み込み　起動
    const [todos, setTodos] = useState(()=>{
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });
    const todoNameRef = useRef();
    const handleAddTodo = () => {
    // タスク追加
        const name = todoNameRef.current.value;
        if (name === "") return;
        setTodos((prevTodos) => {
    //保存データ
            return [...prevTodos, { 
                id: uuidv4(),
                date:selectedDate,
                name: name,
                completed: false 
            }];
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
    // 編集
    const handleEditTodo = (id) =>{
        const targetTodo = todos.find(todo => todo.id === id);
        const newName = prompt("新しいタスクを追加",targetTodo.name);
        if(!newName)return;
        const updatedTodos = todos.map(todo =>{
            if(todo.id === id){
                return{
                ...todo,name:newName
            };
        }
        return todo;
        });
        setTodos(updatedTodos);
    };
    //保存処理
    useEffect(()=>{
        localStorage.setItem(
            "todos",
            JSON.stringify(todos)
        );
    },[todos]);
    
    return (
        <div className="App">
            <h3>選択中の日付：{selectedDate}</h3>
            <h1>やるべきこと</h1><br />
            <input type='text' className='inputText' ref={todoNameRef} />
            <button className='Button' onClick={handleAddTodo}>タスクを追加</button>
            <button className='Button' onClick={handleClear}>完了したタスクの削除</button><br />
            <TodoList todos={
                todos.filter(
                    (todo)=>
                        todo.date === selectedDate
                )
                }
                toggleTodo={toggleTodo}
                handleEditTodo={handleEditTodo}
            />
            
            <div>
                残りのタスク:{todos.filter((todo) =>
                    todo.date === selectedDate &&
                    !todo.completed
                    ).length
                    }
            </div>
        </div>
    );
}

export default Todo
