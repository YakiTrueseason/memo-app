//現在の選択中の日付一覧をまとめて保存

import React, { createContext, useEffect, useState } from 'react'

export const ScheduleContext = createContext();

export function ScheduleProvider({children}){
    //日付を初期化
    // const today = new Date().toISOString().split("T")[0];

    const[selectedDate,setSelectedDate] = useState(()=>{
        const savedDate = localStorage.getItem("selectedDate");
        if(savedDate){
            return savedDate;
        }
        return new Date()
            .toISOString()
            .split("T")[0];
    });

    const[schedules,setSchedules] = useState([]);

    const[todos,setTodos] = useState([]);

    useEffect(()=>{
        localStorage.setItem(
            "selectedDate",
            selectedDate
        );
    },[selectedDate])
return (
    <ScheduleContext.Provider
        value={{
            selectedDate,
            setSelectedDate,
            todos,
            setTodos,
            schedules,
            setSchedules,
        }}
        >
            {children}
    </ScheduleContext.Provider>
);
}
