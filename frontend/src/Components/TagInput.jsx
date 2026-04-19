import React, { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { FaLocationDot } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const TagInput = ({ tags, setTags }) => {

    const [inputValue, setInputValue] = useState("")

    const addNewLocation = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()])
            setInputValue("")

        }
    }
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    const handleKeyDown = (e) => {
        if (e.Key === "Enter") {
            addNewLocation()
        }
    }
    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }
    return (
        <div>

            {/* Tags */}
            {tags.length > 0 && (
                <div className='flex flex-wrap items-center gap-2 mt-2'>
                    {tags.map((tag, index) => {
                        return (
                            <span
                                key={index}
                                className='flex items-center gap-1.5 text-xs sm:text-sm text-cyan-600 bg-cyan-200/40 px-2 sm:px-3 py-1 rounded-md'
                            >
                                <FaLocationDot className='text-xs sm:text-sm' />
                                {tag}
                                <button
                                    className='cursor-pointer'
                                    onClick={() => { handleRemoveTag(tag) }}
                                >
                                    <IoMdClose className='text-sm' />
                                </button>
                            </span>
                        )
                    })}
                </div>
            )}

            {/* Input */}
            <div className='flex items-center gap-2 sm:gap-4 mt-3'>

                <input
                    type="text"
                    value={inputValue}
                    className='flex-1 text-sm sm:text-base bg-transparent border border-slate-200 px-3 py-2 rounded-md outline-none'
                    placeholder='Add Locations'
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />

                <button
                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md border border-cyan-500 hover:bg-cyan-500 transition"
                    onClick={addNewLocation}
                >
                    <IoMdAdd className="text-xl sm:text-2xl cursor cursor-pointer text-cyan-500 hover:text-white" />
                </button>

            </div>

        </div>
    )
}

export default TagInput
