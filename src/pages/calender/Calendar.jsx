//カレンダー　全ページ共通
import  { useContext} from 'react'
import {ScheduleContext} from '../../conponents/ScheduleContext';
import './Calendar.css';
// import Calendar from 'react-calendar';

function Calendar() {
    const{selectedDate,setSelectedDate} = useContext(ScheduleContext);
    // const [date,setDate] = useState(new Date());

return (
    <>
            <h1>カレンダー</h1>        
    <div className='calendar-container'> 
        {/* 日付選択 */}
        <input 
        className='calendar-input'
        type="date"
        value={selectedDate}
        onChange={(e)=>
            setSelectedDate(e.target.value)
        }
        />
        </div>
    </>
);
}

export default Calendar