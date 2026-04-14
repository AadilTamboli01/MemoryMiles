import React, { useState } from 'react'
import PasswordInput from '../../Components/PasswordInput'
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper.js';

import axiosInstance from '../../utils/axiosInstance.js';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { loading } = useSelector((state) => { return state.user })

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!username) {
      setError("Please enter your name")
      return
    }
    if (!password) {
      setError("Please enter your password")
      return
    }
    setError(null)

    // signup Api call 
    try {

      const respose = await axiosInstance.post("/auth/signup", { username, email, password })

      if (respose.data) {

        navigate("/login")
      }
    } catch (error) {
      // setError(error.message)
      if (error.response) {
        setError(error.response.data.message || error.response.data)
      } else {
        setError("Something went wrong please try again")
      }
    }
  }


  return (
    <div className='h-scree bg-cyan-50 overflow-hidden relative '>
      <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
        <div className="w-2/4 h-[90vh] flex items-end bg-[url('/images/login_logo.avif')] bg-contain bg-cover bg-no-repeat bg-center p-10 z-50 bg-red-50">
          <div>
            <h4 className='text-5xl text-white font-semibold    leading-[58px]'>Create Your <br /> Travel Stories</h4>
            <p className='text-[15px] text-white font-semibold leading-[58px]'>Record Your travel experience and Memories in your travel journal </p>
          </div>
        </div>

        <div className='w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

            <h4 className='text-2xl text-black font-semibold mb-4'>Create Account</h4>

    <input
              type="text"
              value={username}
              placeholder='Enter Username'
              className='input-box'
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
            <input
              type="email"
              value={email}
              placeholder='Email'
              className='input-box'
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />


            <PasswordInput value={password} onChange={(e) => { setPassword(e.target.value) }} />

            {error && <p className='text-red-500'>{error}</p>}

            {loading ? (<span className='animate-pulse w-full text-center'>Loading ....</span>) : <button
              type='submit'
              className='btn-primary'
            >
              SignUp
            </button>}


            <p className='text-xs text-slate-500 text-center my-4'>Or</p>

            <button
              type='button'
              onClick={() => { navigate("/login") }}
              className='btn-primary btn-light'
            >
              Already have account
            </button>

          </form>
        </div>
      </div>


    </div>
  )
}

export default Signup
