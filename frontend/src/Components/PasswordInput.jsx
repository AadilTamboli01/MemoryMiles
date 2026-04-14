import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const PasswordInput = ({ value, onChange }) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    function toggleShowPassword() { setIsShowPassword(!isShowPassword) }
    return (
        <div className='flex items-center bg-cyan-600/5 px-5 rounded-sm mb-3 '>
            <input type={isShowPassword ? "text" : "password"} value={value} onChange={onChange} placeholder='Enter Your Password ' className='w-full text-sm bg-transparent py-3 mr-3 rounded-sm outline-hidden ' />
            {isShowPassword ? <FaEye size={22} className='text-slate-500 cursor-pointer' onClick={() => { toggleShowPassword() }} /> : <FaEyeSlash size={22} className='text-blue-500 cursor-pointer' onClick={() => { toggleShowPassword() }} />}
        </div>
    )
}

export default PasswordInput
