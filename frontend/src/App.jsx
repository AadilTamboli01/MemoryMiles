import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import PrivateRoute from './Components/PrivateRoute'

const App = () => {
  return (
    <div className=''>      <Routes>

        <Route  element={<PrivateRoute/>}><Route path='/' element={<Home />} /></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
