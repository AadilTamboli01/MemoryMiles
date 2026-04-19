// import React, { useState } from 'react'
// import PasswordInput from '../../Components/PasswordInput'
// import { useNavigate } from 'react-router-dom';
// import { validateEmail } from '../../utils/helper.js';

// import axiosInstance from '../../utils/axiosInstance.js';
// import { useDispatch, useSelector } from 'react-redux';
// import { signInFailure, signInStart, signInSuccess } from '../../redux/slice/userSlice.js';
// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch()
//   const { loading } = useSelector((state) => { return state.user })
//   const [email, setEmail] = useState("");

//   const [password, setPassword] = useState("");

//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address")
//       return
//     }
//     if (!password) {
//       setError("Please enter your password")
//       return
//     }
//     setError(null)

//     // login api call 
//     try {
//       dispatch(signInStart())
//       const respose = await axiosInstance.post("/auth/login", { email, password })

//       if (respose.data) {
//         dispatch(signInSuccess(respose.data))
//         navigate("/")
//       }else{
//          dispatch(signInFailure("An unexpected error occure"))
//       }
//     } catch (error) {
//        dispatch(signInFailure("An unexpected error occure"))
//       // setError(error.message)
//       if (error.response) {
//         setError(error.response.data.message || error.response.data)
//       } else {
//         setError(error.message)
//       }
//     }
//   }


//   return (
//     <div className='h-scree bg-cyan-50 overflow-hidden relative '>
//       <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
//         <div className="w-2/4 h-[90vh] flex items-end bg-[url('/images/login_logo.avif')] bg-contain bg-cover bg-no-repeat bg-center p-10 z-50 bg-red-50">
//           <div>
//             <h4 className='text-5xl text-white font-semibold    leading-[58px]'>Create Your <br /> Travel Stories</h4>
//             <p className='text-[15px] text-white font-semibold leading-[58px]'>Record Your travel experience and Memories in your travel journal </p>
//           </div>
//         </div>

//         <div className='w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20'>
//           <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

//             <h4 className='text-2xl text-black font-semibold mb-4'>Login</h4>

//             <input
//               type="email"
//               value={email}
//               placeholder='Email'
//               className='input-box'
//               onChange={(e) => {
//                 setEmail(e.target.value)
//               }}
//             />


//             <PasswordInput value={password} onChange={(e) => { setPassword(e.target.value) }} />

//             {error && <p className='text-red-500'>{error}</p>}

//             {loading ? (<span className='animate-pulse w-full text-center'>Loading ....</span>) : <button
//               type='submit'
//               className='btn-primary'
//             >
//               Login
//             </button>}


//             <p className='text-xs text-slate-500 text-center my-4'>Or</p>

//             <button
//               type='button'
//               onClick={() => { navigate("/signup") }}
//               className='btn-primary btn-light'
//             >
//               Create Account
//             </button>

//           </form>
//         </div>
//       </div>


//     </div>
//   )
// }

// export default Login





import React, { useState } from 'react'
import PasswordInput from '../../Components/PasswordInput'
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper.js';

import axiosInstance from '../../utils/axiosInstance.js';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../../redux/slice/userSlice.js';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => { return state.user })
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }
    if (!password) {
      setError("Please enter your password")
      return
    }
    setError(null)

    try {
      dispatch(signInStart())
      const respose = await axiosInstance.post("/auth/login", { email, password })

      if (respose.data) {
        dispatch(signInSuccess(respose.data))
        navigate("/")
      } else {
        dispatch(signInFailure("An unexpected error occure"))
      }
    } catch (error) {
      dispatch(signInFailure("An unexpected error occure"))
      if (error.response) {
        setError(error.response.data.message || error.response.data)
      } else {
        setError(error.message)
      }
    }
  }

  return (
    <div className='min-h-screen bg-cyan-50 overflow-hidden relative'>
      <div className='container min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 lg:px-20 mx-auto py-8 lg:py-0'>

        {/* LEFT — image panel */}
        <div className="w-full lg:w-2/4 h-48 sm:h-64 md:h-80 lg:h-[90vh] flex items-end bg-[url('/images/login_logo.avif')] bg-contain bg-cover bg-no-repeat bg-center p-4 sm:p-6 lg:p-10 z-50 bg-red-50 rounded-t-lg lg:rounded-t-none lg:rounded-l-lg">
          <div>
            <h4 className='text-2xl sm:text-3xl lg:text-5xl text-white font-semibold leading-tight lg:leading-[58px]'>
              Create Your <br /> Travel Stories
            </h4>
            <p className='text-xs sm:text-sm lg:text-[15px] text-white font-semibold mt-1 lg:leading-[58px]'>
              Record Your travel experience and Memories in your travel journal
            </p>
          </div>
        </div>

        {/* RIGHT — form panel */}
        <div className='w-full lg:w-2/4 min-h-[auto] lg:h-[75vh] bg-white rounded-b-lg lg:rounded-b-none lg:rounded-r-lg relative p-6 sm:p-10 lg:p-16 shadow-lg shadow-cyan-200/20'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

            <h4 className='text-xl sm:text-2xl text-black font-semibold mb-2 sm:mb-4'>Login</h4>

            <input
              type="email"
              value={email}
              placeholder='Email'
              className='input-box'
              onChange={(e) => { setEmail(e.target.value) }}
            />

            <PasswordInput value={password} onChange={(e) => { setPassword(e.target.value) }} />

            {error && <p className='text-red-500 text-sm'>{error}</p>}

            {loading
              ? <span className='animate-pulse w-full text-center text-sm'>Loading ....</span>
              : <button type='submit' className='btn-primary'>Login</button>
            }

            <p className='text-xs text-slate-500 text-center my-2 sm:my-4'>Or</p>

            <button
              type='button'
              onClick={() => { navigate("/signup") }}
              className='btn-primary btn-light'
            >
              Create Account
            </button>

          </form>
        </div>

      </div>
    </div>
  )
}

export default Login