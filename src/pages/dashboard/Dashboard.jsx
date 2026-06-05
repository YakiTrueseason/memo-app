import React, { useContext } from 'react'
import { ScheduleContext } from '../../conponents/ScheduleContext'

function Dashboard() {
    const {
        todos,selectDate
    }= useContext(ScheduleContext);

    const todayTodos = todos.filter(
        todo => todo.date === selectDate &&
        !todo.completed
    );
return (
    <div>
    Dashboard
    <h1>やること一覧</h1>
    <ul>
        {todayTodos.map(todo =>(
            <li key={todo.id}>
                {todo.name}
            </li>
        ))}
    </ul>
    </div>
)
}

export default Dashboard