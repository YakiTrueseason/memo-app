import  { useContext } from 'react'
import { ScheduleContext } from '../../conponents/ScheduleContext';
import './Home.css';
// import { Link } from 'react-router-dom'

function Home() {
    const{selectedDate}= useContext(ScheduleContext);
    //todo 今日のやること
    const todos = JSON.parse(
        localStorage.getItem("todos")
    ) || [];
    //note
    const notes = JSON.parse(
        localStorage.getItem("notes")
    ) || [];
    return (
        <div>
            <h1>Home</h1><br />
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
        </div>
    );
}

export default Home;
