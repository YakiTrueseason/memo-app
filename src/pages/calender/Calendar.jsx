//カレンダー　全ページ共通
import  { useContext} from 'react'
import {ScheduleContext} from '../../conponents/ScheduleContext';
import './Calendar.css';
import ReactCalendar from 'react-calendar';
function Calendar() {
    const{selectedDate,setSelectedDate} = useContext(ScheduleContext);
    // 今日のやること
    const todos = JSON.parse(localStorage.getItem("todos"))||[];
    // メモ
    const notes = JSON.parse(localStorage.getItem("notes"))||[];

    const handleDateChange = (value)=>{
        const dateString =`${value.getFullYear()}-${String(
            value.getMonth()+1
        ).padStart(2,"0")}-${String(
            value.getDate()
        ).padStart(2,"0")}`;
        setSelectedDate(dateString);
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

                return(
                    <div className='tile-info'>
                        {todoCount > 0 &&(
                    <div>✓{todoCount}</div>
                    )}
                        {memoCount > 0 &&(
                    <div>📝{memoCount}</div>
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