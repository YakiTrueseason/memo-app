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
    // 今日の件数
    const todayTodos = todos.filter(todo => todo.date === selectedDate);
    const activeTodos = todayTodos.filter(todo => !todo.completed);
    const completedtodos = todayTodos.filter(todo => todo.completed);
    const todayNotes = notes.filter(note => note.date === selectedDate);
    // タグ自動集計件数
    const tagCounts = todos.reduce((acc,todo)=>{
        acc[todo.tag]=(acc[todo.tag] || 0)+ 1;
        return acc;
    },[]);
    //全体のtodo・未完了 件数
    const totalTodos = todos.length;
    const activeCount = todos.filter(
        todo => !todo.completed
    ).length;
    // 優先度集計(未完了)
    const highPriorityCount = todos.filter(
        todo => !todo.completed && todo.priority === "高"
    ).length;
    const mediumPriorityCount = todos.filter(
        todo => !todo.completed && todo.priority === "中"
    ).length;
    const lowPriorityCount = todos.filter(
        todo => !todo.completed && todo.priority === "低"
    ).length;
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
    {/* 完了・未完了 */}
            <div className='dashboard-summary'>
                <div className='card'>
                    <h3>今日のTodo</h3>
                    <p>{activeTodos.length}件</p>
                </div>
                <div className='card'>
                    <h3>完了</h3>
                    <p>{completedtodos.length}件</p>
                </div>
                <div className='card'>
                    <h3>未完了</h3>
                    <p>{activeCount}件</p>
                </div>
                <div className='card'>
                    <h3>メモ</h3>
                    <p>{todayNotes.length}件</p>
                </div>
                <div className='card'>
                    <h3>期限切れ</h3>
                    <p>{expiredTodos.length}件</p>
                </div>
                <div className='card'>
                    <h3>全体のtodo</h3>
                    <p>{totalTodos}件</p>
                </div>
            </div>
    {/* 優先度 */}
        <h2>優先度別集計</h2>
        <div className='priority-summary'>
            <div className='card'>
                <h3>高</h3>
                <p>{highPriorityCount}件</p>
            </div>
            <div className='card'>
                <h3>中</h3>
                <p>{mediumPriorityCount}件</p>
            </div>
            <div className='card'>
                <h3>低</h3>
                <p>{lowPriorityCount}件</p>
            </div>
        </div>
    {/* タグ件数 */}
        <h2>タグ集計</h2>
        <div>
            <div className='tag-summary'>
                {Object.entries(tagCounts).map(
                    ([tag,count]) => (
                        <div key={tag} className='card'>
                            <h3>{tag}</h3>
                            <p>{count}件</p>
                        </div>
                    )
                )}
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
