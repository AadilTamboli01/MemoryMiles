
import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { MdDelete, MdUpdate } from 'react-icons/md'
import moment from "moment"
import { FaLocationDot } from 'react-icons/fa6'

const ViewTravelStory = ({ onClose, storyInfo, onEditClick, onDeleteClick }) => {
    return (
        <div className='relative'>

            {/* ACTION BUTTONS */}
            <div className='flex justify-end'>
                <div className='flex flex-wrap items-center gap-2 sm:gap-3 bg-cyan-50/50 rounded-lg p-2'>

                    <button
                        className='btn-small cursor-pointer flex items-center gap-1'
                        onClick={() => { onEditClick() }}
                    >
                        <MdUpdate className='text-base sm:text-lg' />
                        <span className='hidden sm:inline'>Update</span>
                    </button>

                    <button
                        className='btn-small cursor-pointer btn-delete flex items-center gap-1'
                        onClick={() => { onDeleteClick() }}
                    >
                        <MdDelete className='text-base sm:text-lg' />
                        <span className='hidden sm:inline'>Delete</span>
                    </button>

                    <button
                        className='btn-small flex items-center justify-center'
                        onClick={() => { onClose() }}
                    >
                        <IoMdClose className='text-lg' />
                    </button>

                </div>
            </div>

            {/* CONTENT */}
            <div>
                <div className='flex flex-col gap-2 py-4'>

                    <h1 className='text-xl sm:text-2xl text-slate-950 leading-tight'>
                        {storyInfo && storyInfo.title}
                    </h1>

                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>

                        <span className='text-xs sm:text-sm text-slate-950'>
                            {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
                        </span>

                        <div className='flex flex-wrap items-center gap-2 text-[12px] sm:text-[13px] text-cyan-600 bg-cyan-200/40 rounded-sm px-2 py-1'>
                            <FaLocationDot />
                            {storyInfo && storyInfo.visitedLocation.map((item, index) => {
                                return storyInfo.visitedLocation.length === index + 1
                                    ? `${item}`
                                    : `${item}, `
                            })}
                        </div>
                    </div>
                </div>

                {/* IMAGE */}
                <img
                    src={storyInfo && storyInfo.imageURL}
                    alt="story image"
                    className='w-full h-[200px] sm:h-[260px] md:h-[300px] object-cover rounded-lg'
                />

                {/* Story Text */}
                <div className="mt-4">
                    <p className="text-sm sm:text-base text-slate-950 leading-6 text-justify whitespace-pre-line">
                        {storyInfo && storyInfo.story}
                    </p>
                </div>

            </div>

        </div>
    )
}

export default ViewTravelStory