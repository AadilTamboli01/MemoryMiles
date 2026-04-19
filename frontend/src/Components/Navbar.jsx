import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import Profile from './Profile'
import axiosInstance from '../utils/axiosInstance'
import { useDispatch } from 'react-redux'
import { signOutSuccess } from '../redux/slice/userSlice'
import SearchBar from './SearchBar'

const Navbar = ({ searchQuery, setSearchQuery, onSearchNote, handleClearSearch }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const onLogout = async () => {
        try {
            const response = await axiosInstance.post("/user/logout")
            if (response.data) {
                dispatch(signOutSuccess())
                navigate("/login")
            }
        } catch (error) {
            console.log("", error)
        }
    }

    const handleSearch = () => {
        if (searchQuery) {
            onSearchNote(searchQuery)
        }
    }
    const onClearSearch = () => {
        handleClearSearch()
        setSearchQuery("")
    }



    return (
        <div className='bg-white sticky top-0 z-10 shadow-sm'>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>

                {/* Logo */}
                <Link to={"/"}>
                    <h1 className='font-bold text-xl sm:text-2xl flex'>
                        <span className='text-blue-400'>Memory</span>
                        <span className='text-blue-800'>Miles</span>
                    </h1>
                </Link>

                {/* Search Bar */}
                <div className='w-full sm:flex-1 sm:px-4'>
                    <SearchBar
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value) }}
                        handleSearch={handleSearch}
                        onClearSearch={onClearSearch}
                    />
                </div>

                {/* Profile */}
                <div className='flex justify-end sm:justify-normal z-10'>
                    <Profile onLogout={onLogout} />
                </div>

            </div>
        </div>
    )
}

export default Navbar
