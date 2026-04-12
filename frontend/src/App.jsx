import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'

const App = () => {
  return (
    <div className='text-red-400'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login'element={<Login/>} />
       <Route path='/sign-up' element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App
