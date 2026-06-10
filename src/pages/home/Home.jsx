import  { useContext } from 'react'
import { ScheduleContext } from '../../conponents/ScheduleContext';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const{selectedDate,setSelectedDate}= useContext(ScheduleContext);
    //todo 今日のやること
    const todos = JSON.parse(
        localStorage.getItem("todos")
    ) || [];
    //note
    const notes = JSON.parse(
        localStorage.getItem("notes")
    ) || [];
    // 件数
    const todayTodos = todos.filter(todo => todo.date === selectedDate);
    const activeTodos = todayTodos.filter(todo => !todo.completed);
    const completedtodos = todayTodos.filter(todo => todo.completed);
    const todayNotes = notes.filter(note => note.date === selectedDate);
    // 今日の日付取得
    const today = new Date().toISOString().split("T")[0];
    // 期限切れtodo取得
    const expiredTodos = todos.filter(
        todo => !todo.completed &&
        todo.date < today
    )
    
    const navigate = useNavigate();

    const handleExpiredTodoClick = (todo) =>{
        setSelectedDate(todo.date);
        navigate("/todo");
    };
    return (
        <div>
            <h1>Home</h1><br />
            <h2>選択日：{selectedDate}</h2><br />
            
    {/*　サマリー表示　 */}
            <div className='dashboard-summary'>
                <div className='card'>
                    <h3>Todo</h3>
                    <p>{activeTodos.length}件</p>
                </div>
                <div className='card'>
                    <h3>完了</h3>
                    <p>{completedtodos.length}件</p>
                </div>
                <div className='card'>
                    <h3>メモ</h3>
                    <p>{todayNotes.length}件</p>
                </div>
                <div className='card'>
                    <h3>期限切れ</h3>
                    <p>{expiredTodos.length}件</p>
                </div>
            </div>
    {/* 今日やることから選択された日付だけ残し画面表示 */}
                <h2>今日のやること</h2>
            <ul>
                {todos.filter(
                    todo => todo.date === selectedDate &&
                    !todo.completed
                ).map(todo =>(
                    <li key={todo.id}>
                        {todo.name}
                    </li>
                ))}
                <h2>今日のメモ</h2>
                <ul>
                    {notes.filter(
                        note => note.date === selectedDate
                    ).map(note =>(
                        <li key={note.id}>
                            {note.text}
                        </li>
                    ))}
                </ul>
            </ul>
            <h2>期限切れタスク</h2>
            <div className='expired-list'>
                <ul>
                    {expiredTodos.map(todo =>(
                        <li key={todo.id}
                            onClick={()=>handleExpiredTodoClick(todo)}
                        >🔥{todo.name}({todo.date})</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;
