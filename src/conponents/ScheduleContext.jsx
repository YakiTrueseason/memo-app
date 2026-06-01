//現在の選択中の日付一覧をまとめて保存

import React, { createContext, useState } from 'react'

export const ScheduleContext = createContext();

export function ScheduleProvider({children}){

    const[selectedDate,setSelectedDate] = useState("2026-06-01");

    const[schedules,setSchedules] = useState([]);

return (
    <ScheduleContext.Provider
        value={{
            selectedDate,
            setSelectedDate,
            schedules,
            setSchedules
        }}
        >
            {children}
    </ScheduleContext.Provider>
);
}
