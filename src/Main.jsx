//データ共有
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ScheduleProvider } from './conponents/ScheduleContext'
import { ThemeProvider } from './components/ThemeContext';

function Main() {
return (
    <BrowserRouter>
    <ThemeProvider>
    <ScheduleProvider>
    <App />
    </ScheduleProvider>
    </ThemeProvider>
    </BrowserRouter>
    );
}

export default Main