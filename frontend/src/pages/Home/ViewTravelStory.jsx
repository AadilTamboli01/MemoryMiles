import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { MdDelete, MdUpdate } from 'react-icons/md'
import moment from "moment"
import { FaLocationDot } from 'react-icons/fa6'

const ViewTravelStory = ({ onClose, storyInfo, onEditClick, onDeleteClick }) => {
    return (
        <div className='relative'>

            <div className='flex items-center justify-end'>
                <div>
                    <div className='flex items-center gap-3 bg-cyan-50/50 rounded-l-lg'>
                        <button className='btn-small' onClick={() => { onEditClick() }}><MdUpdate className='text-lg' /> Update Story</button>
                        <button className='btn-small cursor-pointer btn-delete' onClick={() => { onDeleteClick() }}><MdDelete className='text-lg' /> Delete Story</button>

                        <button className='btn-small' onClick={() => { onClose() }}><IoMdClose /></button>

                    </div>
                </div>
            </div>

            <div>
                <div className='flex-1 flex flex-col gap-2 py-4 '>
                    <h1 className='text-2xl text-slate-950'>

                        {storyInfo && storyInfo.title}
                    </h1>

                    <div className='flex items-center justify-between gap-3 '>

                        <span className='text-xs  text-slate-950'>
                            {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
                        </span>

                        <div className='inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded-sm px-2 py-1 '>
                            <FaLocationDot />

                            {storyInfo && storyInfo.visitedLocation.map((item,index)=>{
                          return  storyInfo.visitedLocation.length ===  index+1 ? `${item}` : `${item},`
                            })}
                        </div>
                    </div>
                </div>

                <img src={storyInfo && storyInfo.imageURL} alt="story image"  className='w-full h-[300px] object-cover rounded-lg'/>

                <div className="mt-4">
                    <p className="text-sm text-slate-950 leading-6 text-justify whitespace-pre-line">{ storyInfo && storyInfo.story}</p>
                </div>

            </div>

        </div>
    )
}

export default ViewTravelStory
