import  { useContext } from 'react'
import { ScheduleContext } from '../../conponents/ScheduleContext';
// import { Link } from 'react-router-dom'

function Home() {
    const{selectedDate}= useContext(ScheduleContext);
    const todos = JSON.parse(
        localStorage.getItem("todos")
    ) || [];
    return (
        <div>
            <h1>Home</h1>
            <h2>今日のやること</h2>
            {/* 今日やることから選択された日付だけ残し画面表示 */}
            <ul>
                {todos.filter(
                    todo => todo.date === selectedDate &&
                    !todo.completed
                ).map(todo =>(
                    <li key={todo.id}>
                        {todo.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
