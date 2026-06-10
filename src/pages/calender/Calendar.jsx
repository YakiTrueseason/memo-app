//カレンダー　全ページ共通
import  { useContext} from 'react'
import {ScheduleContext} from '../../conponents/ScheduleContext';
import './Calendar.css';
import ReactCalendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';

function Calendar() {
    const{selectedDate,setSelectedDate} = useContext(ScheduleContext);
    // やること
    const todos = JSON.parse(localStorage.getItem("todos"))||[];
    // メモ
    const notes = JSON.parse(localStorage.getItem("notes"))||[];
    // 今日の日付取得
    const today = new Date().toISOString().split("T")[0];
    // 移動
    const navigate = useNavigate();
    // タイムゾーン
    const handleDateChange = (value)=>{
        const dateString =`${value.getFullYear()}-${String(
            value.getMonth()+1
        ).padStart(2,"0")}-${String(
            value.getDate()
        ).padStart(2,"0")}`;
        setSelectedDate(dateString);
        navigate("/");
    }
return (
    <>
        <h1>カレンダー</h1>        

        <h2>選択日：{selectedDate}</h2><br />

    {/* 凡例 */}
        <div className='calendar-legend'>
        <span className='legend-todo'>Todo</span>
        <span className='legend-memo'>Memo</span>
        <span className='legend-both'>両方</span>
        <span className='legend-expired'>期限切れ</span>
        </div>

        <div className='calendar-container'> 
    {/* 日付選択 */}
        <ReactCalendar 
        value={new Date(selectedDate)}
        onChange={handleDateChange}

        tileClassName={({date,view}) =>{
            if(view !== "month")return null;
    //タイムゾーン修正
                const dateString = `${date.getFullYear()}-${
                    String(date.getMonth()+1).padStart(2,"0")
                }-${String(date.getDate()).padStart(2,"0")}`;

                const hasTodo = todos.some(
                    todo => todo.date === dateString);

                const hasMemo = notes.some(
                    note=>note.date === dateString);
                
                const hasExpiredTodo = todos.some(
                    todo => todo.date === dateString &&
                    !todo.completed && 
                    todo.date < today
                )
    // 色変え
                if(hasExpiredTodo){
                    return"has-expired";
                }
    
                if(hasTodo && hasMemo){
                    return "has-both";
                }

                if(hasTodo){
                    return "has-todo";
                }

                if(hasMemo){
                    return "has-memo";
                }
                return null;
        }}
    // カレンダーの日付マスの中に要素を追加
        tileContent={({date,view})=>{
            if(view !== "month"){
                return null;
            }
                const dateString = `${date.getFullYear()}-${String(
                    date.getMonth()+1
                ).padStart(2,"0")}-${String(
                    date.getDate()
                ).padStart(2,"0")}`;

                const todoCount = todos.filter(
                    todo => todo.date === dateString).length;

                const memoCount = notes.filter(
                    note=>note.date === dateString).length;

                const hasExpiredTodo = todos.some(
                    todo => todo.date === dateString &&
                    !todo.completed &&
                    todo.date < today
                )
    // カレンダーに件数表示
                return(
                    <div className='tile-info'>
                        {todoCount > 0 &&(
                    <div>✓{todoCount}</div>
                    )}
                        {memoCount > 0 &&(
                    <div>📝{memoCount}</div>
                    )}
                        {hasExpiredTodo &&(
                            <div>🔥</div>
                        )}
                    </div>
                );
                    }}
        />
        </div>
        </>
    );
}

export default Calendar