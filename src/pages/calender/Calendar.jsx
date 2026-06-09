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
        const dateString =`${value.getFullYear()}-
        ${String(value.getMonth()+1).padStart(2,"0")}-
        ${String(value.getDate()).padStart(2,"0")}`;
        setSelectedDate(dateString);
    }

    
return (
    <>
            <h1>カレンダー</h1>        
    <div className='calendar-container'> 
        <h2>選択日：{selectedDate}</h2><br />
        {/* 日付選択 */}
        <ReactCalendar 
        value={new Date(selectedDate)}
        onChange={handleDateChange}
        tileClassName={({date,view}) =>{
            if(view === "month"){
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
            }
            return null;
        }}
        />
        </div>
        </>
    );
}

export default Calendar