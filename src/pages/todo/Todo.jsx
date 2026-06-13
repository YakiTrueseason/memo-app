import { useContext, useEffect, useRef, useState } from 'react';
import './Todo.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import { ScheduleContext } from '../../conponents/ScheduleContext';

function Todo() {
    const {selectedDate} = useContext(ScheduleContext);
    //検索
    const [searchText,setSearchText] = useState("");
    //登録用タグ
    const [selectedTag,setSelectedTag] = useState("勉強");
    //絞り込み用タグ
    const [filterTag,setFilterTag] = useState("すべて");
    //完了・未完了
    const [statusFilter,setStatusFilter] = useState("すべて");
    //読み込み　起動
    const [todos, setTodos] = useState(()=>{
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });
    //優先度
    const [priority,setPriority] = useState("中");
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
                tag:selectedTag,
                priority:priority,
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
    //全日付検索機能
    const filteredTodos = todos.filter(todo => {
        const matchesSearch =
            todo.name
                .toLowerCase()
                .includes(searchText.toLowerCase()
    );
    // タグ
    const matchTag =
        filterTag === "すべて" ||
        todo.tag === filterTag;
    // 完了・未完了
    const matchStatus = 
        statusFilter === "すべて" ||
        (statusFilter === "未完了" &&
            !todo.completed) ||
        (statusFilter === "完了済み" &&
            todo.completed);
    //検索中は全日付選択
    if(searchText.trim() !== ""){
        return(
            matchesSearch &&
            matchTag &&
            matchStatus
        );
    }
    // 選択日だけ表示
    return(
        todo.date === selectedDate &&
        matchTag &&
        matchStatus
    );
});

    return (
        <div className="App">
            <h3>選択中の日付：{selectedDate}</h3>
            <h1>やるべきこと</h1><br />
            <input type="text"
                    placeholder='タスク検索'
                    value={searchText}
                    onChange={(e)=>
                        setSearchText(e.target.value)
                    }
                />
            <input type='text' className='inputText' ref={todoNameRef} />
            <button className='Button' onClick={handleAddTodo}>タスクを追加</button>
            <button className='Button' onClick={handleClear}>完了したタスクの削除</button><br />
    {/* タグ選択欄 */}
            <select 
                value={filterTag}
                onChange={(e)=>setFilterTag(e.target.value)}
                >
                    <option value="すべて">すべて</option>
                    <option value="勉強">勉強</option>
                    <option value="仕事">仕事</option>
                    <option value="買い物">買い物</option>
                </select>
            <select 
                    value={selectedTag}
                    onChange={(e)=>setSelectedTag(e.target.value)}
            >
                <option value="勉強">勉強</option>
                <option value="仕事">仕事</option>
                <option value="買い物">買い物</option>
                <option value="その他">その他</option>
            </select>
    {/* セレクトボックス */}
            <select value={statusFilter}
                    onChange={(e)=>
                        setStatusFilter(e.target.value)
                    }>
                        <option value="すべて">すべて</option>
                        <option value="未完了">未完了</option>
                        <option value="完了済み">完了済み</option>
                    </select>
    {/* 優先度選択欄 */}
            <select value={priority}
                    onChange={(e)=>setPriority(e.target.value)}
            >
                <option value="高">高</option>
                <option value="中">中</option>
                <option value="低">低</option>
            </select>
    {/* 検索該当なし */}
            {filteredTodos.length === 0 ?(
                <p>該当するタスクはありません</p>
            ) : (
            <TodoList 
                todos={filteredTodos}
                toggleTodo={toggleTodo}
                handleEditTodo={handleEditTodo}
            />
            )}
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
