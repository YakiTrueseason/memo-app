import { useContext, useEffect, useState } from 'react';
import './Todo.css';
import TodoList from './TodoList';
import { ScheduleContext } from '../../conponents/ScheduleContext';

function Todo() {

    const{
        todos,
        loadTodos,
        selectedDate
    }=useContext(ScheduleContext);

    //検索
    const [searchText,setSearchText] = useState("");
    //絞り込み用タグ
    const [filterTag,setFilterTag] = useState("すべて");
    //完了・未完了
    const [statusFilter,setStatusFilter] = useState("すべて");

    // Todo追加
    const addTodo = async(todo)=>{
        await fetch("http://localhost:3001/todos",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(todo)
        });
        loadTodos();
    };
    
    useEffect(()=>{
        loadTodos();
    });

    //Todo編集
    const updateTodo = async(todo)=>{
        await fetch(`http://localhost:3001/todos/${todo.id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(todo)
        });
        loadTodos();
    }
    // 切り替え
    const toggleTodo = async(id) => {
        const todo = todos.find(
        todo=>todo.id === id
    );
    await updateTodo({
        ...todo,
        completed:!todo.completed
    });
    };

    //Todo削除
    const deleteTodo = async(id)=>{
        await fetch(
            `http://localhost:3001/todos/${id}`,
            {
                method:"DELETE"
            }
        );
        loadTodos();
    }

    const handleClear = async() => {
        const completedTodos = todos.filter(todo=>todo.completed);
        for(const todo of completedTodos){
            await deleteTodo(todo.id)
        }
    };

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
    // 今日の日付
    const today = new Date().toISOString().split("T")[0];
    // 優先度順番
    const priorityOrder = {
        高:1,
        中:2,
        低:3
    };
    // ソート（順番に並べ替える）
    const sortedTodos = [...filteredTodos].sort(
        (a,b) => {
            const aExpired = !a.completed && a.date < today;
            const bExpired = !b.completed && b.date < today;

            if(aExpired && !bExpired) return -1;
            if(!aExpired && bExpired) return 1;

            return(
                priorityOrder[a.priority || "中"] -
                priorityOrder[b.priority || "中"]
            )
        }
    );
    //新規モーダル
    const [modalMode,setModalMode] = useState("add");
    const [currentTodo,setCurrentTodo] = useState({
        name:"",
        tag:"その他",
        priority:"中"
    });
    const [isModalOpen,setIsModalOpen] = useState(false);
    //追加ボタン
    const handleOpenAddModal = () =>{
        setCurrentTodo({
            name:"",
            tag:"その他",
            priority:"中"
        })
        setModalMode("add")
        setIsModalOpen(true);
    }
    // 編集ボタン
    const handleOpenModal = (todo) =>{
        setCurrentTodo(todo);
        setModalMode("edit");
        setIsModalOpen(true);
    }
    // 保存、追加、編集
    const handleModalSave = async() =>{
        if(modalMode === "add"){
                const newTodo= {
                    ...currentTodo,
                    date:selectedDate,
                    completed:false
                };

            await addTodo(newTodo);
        }else{
            await updateTodo(currentTodo);
        }
        setIsModalOpen(false);
    };
    return (
        <div className="App">
            <h1>やるべきこと</h1>
            <h3>選択日：{selectedDate}</h3><br />
            <div className='rest'>
                残りのタスク:{todos.filter((todo) =>
                    todo.date === selectedDate &&
                    !todo.completed
                    ).length
                    }
            </div>
    {/* タグ選択欄 */}
            <div className='tag-filter'>
                <h5>タグ選択</h5>
                <select
                    value={filterTag}
                    onChange={(e)=>setFilterTag(e.target.value)}
                    >
                        <option value="すべて">すべて</option>
                        <option value="勉強">勉強</option>
                        <option value="仕事">仕事</option>
                        <option value="買い物">買い物</option>
                    </select>
    {/* セレクトボックス */}
            <h5>完了</h5>
            <select 
                    value={statusFilter}
                    onChange={(e)=>
                        setStatusFilter(e.target.value)
                    }>
                        <option value="すべて">すべて</option>
                        <option value="未完了">未完了</option>
                        <option value="完了済み">完了済み</option>
                    </select><br />
                </div>
    {isModalOpen && (
        <div className='modal-overlay'>
            <div className='modal'>
                <h3>
                    {modalMode === "add"
                            ? "新規タスク"
                            : "タスク編集"}
                </h3>
                <input value={currentTodo.name}
                        onChange={(e)=>
                            setCurrentTodo({
                                ...currentTodo,
                                name:e.target.value
                            })
                        }/>
                <div className='form-group'>
                    <label>タグ</label>
                            <select value={currentTodo.tag}
                                    onChange={(e)=>
                                        setCurrentTodo({
                                            ...currentTodo,
                                            tag:e.target.value
                                        })
                                    }
                            >
                    <option value="勉強">勉強</option>
                    <option value="仕事">仕事</option>
                    <option value="買い物">買い物</option>
                    <option value="その他">その他</option>
                            </select>
                </div>
    {/* 優先度選択欄 */}
        <div className='form-group'>
            <label>優先度</label>
                    <select value={currentTodo.priority}
                        onChange={(e)=>
                            setCurrentTodo({
                            ...currentTodo,
                            priority:e.target.value
                        })
                        }    
                    >
                            <option value="高">高</option>
                            <option value="中">中</option>
                            <option value="低">低</option>
                    </select>
        </div>
                <button onClick={handleModalSave}>
                    保存
                </button>
                <button onClick={()=>
                    setIsModalOpen(false)
                }>
                    閉じる
                </button>
            </div>
        </div>
    )}
    {/* 検索 */}
            <input 
                    className='search'
                    type="text"
                    placeholder='タスク検索'
                    value={searchText}
                    onChange={(e)=>
                        setSearchText(e.target.value)
                    }
                /> <br />    
    {/* 検索該当なし */}
            <div className='todo-list-wrapper'>
                {filteredTodos.length === 0 ?(
                    <p>該当するタスクはありません</p>
                ) : (
                <TodoList
                    todos={sortedTodos}
                    toggleTodo={toggleTodo}
                    handleOpenModal={handleOpenModal}
                />
                )}
            </div>
            <div className='todo-action'>
                <button className='Button' onClick={handleOpenAddModal}>＋タスク追加</button>
                <button className='Button' onClick={handleClear}>完了したタスクの削除</button><br />
            </div>
        </div>
    );
}

export default Todo
