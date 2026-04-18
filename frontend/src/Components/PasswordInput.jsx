import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const PasswordInput = ({ value, onChange }) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    function toggleShowPassword() { setIsShowPassword(!isShowPassword) }
    return (
        <div className='flex items-center bg-cyan-600/5 px-3 sm:px-5 rounded-md mb-3 border border-transparent focus-within:border-cyan-400'>

            <input
                type={isShowPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder='Enter Your Password'
                className='w-full text-sm sm:text-base bg-transparent py-2.5 sm:py-3 mr-2 sm:mr-3 outline-none'
            />

            {isShowPassword ? (
                <FaEye
                    className='text-slate-500 cursor-pointer text-lg sm:text-xl'
                    onClick={toggleShowPassword}
                />
            ) : (
                <FaEyeSlash
                    className='text-blue-500 cursor-pointer text-lg sm:text-xl'
                    onClick={toggleShowPassword}
                />
            )}

        </div>
    )
}

export default PasswordInput
