//React-router
import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import './index.css';
import { ThemeContext } from './components/ThemeContext'


import Memo from './pages/memo/Memo'
import Todo from './pages/todo/Todo'
import Home from './pages/home/Home'
import Navbar from './components/Navbar'
import Calendar from './pages/calender/Calendar'

function App() {
  const {darkMode} = useContext(ThemeContext);
  return (
    <>
  {/* ダークモード */}
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar />
  {/* 移動 */}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/memo' element={<Memo />}></Route>
        <Route path='/todo' element={<Todo />}></Route>
        <Route path='/calendar' element={<Calendar />}></Route>
      </Routes>
      </div>
    </>
  );
}

export default App
