

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import PrivateRoute from './Components/PrivateRoute'

const App = () => {
  return (
    <div className='min-h-screen w-full bg-slate-50 px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16'>
      <Routes>

        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

      </Routes>
    </div>
  )
}

export default App