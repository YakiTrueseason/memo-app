//データ共有
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ScheduleProvider } from './conponents/ScheduleContext'

function Main() {
return (
    <BrowserRouter>
    <ScheduleProvider>
    <App />
    </ScheduleProvider>
    </BrowserRouter>
)
}

export default Main