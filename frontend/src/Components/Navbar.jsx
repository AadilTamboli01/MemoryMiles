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

        <div className='bg-white flex items-center justify-between drop-shadow sticky top-0  z-10  py-2 px-10'>
            <Link to={"/"}>
                <h1 className='font-bold text-2xl flex flex-wrap'>
                    <span className='text-blue-400'>Memory</span ><span className='text-blue-800'>Miles</span>
                </h1>
            </Link>

            <SearchBar value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} handleSearch={handleSearch} onClearSearch={onClearSearch} />
            <Profile onLogout={onLogout} />
        </div>
    )
}

export default Navbar
