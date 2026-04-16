import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoMdClose } from "react-icons/io";
import { MdUpdate } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DateSelector from './DateSelector';
import ImageSelector from './ImageSelector';
import TagInput from './TagInput';

const AddEditStory = ({ storyInfo, type, onClose, getAllTravelStory }) => {
    const [visitedDate, setVisitedDate] = useState(null)
    const [title, setTitle] = useState("")
    const [storyImg, setStoryImg] = useState(null)
    const [story, setStory] = useState("")
    const [visitedLocation, setVisitedLocation] = useState([])

    const handleAddOrUpdateClick = () => { }
    const handleDeletedStoryImage = () => { }

    return (
        <div>
            <div className='flex items-center justify-between '>
                <h5 className='text-xl font-medium text-slate-700'>{type === "add" ? "Add Story" : "Update Story"}</h5>

                <div className='flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg '>



                    {type === "edit" ? (<button className='cursor-pointer flex items-center gap-1 text-xs font-medium  bg-cyan-50 text-[#05b6d3] shadow-cyan-100 border border-cyan-100 hover:bg-[#05b6d3]  hover:text-white rounded-sm px-2 py-0.5' onClick={handleAddOrUpdateClick}> <FaPlus className='' />Add Story</button>) : (
                        <>
                            <button className='cursor-pointer flex items-center gap-1 text-xs font-medium  bg-cyan-50 text-[#05b6d3] shadow-cyan-100 border border-cyan-100 hover:bg-[#05b6d3]  hover:text-white rounded-sm px-2 py-0.5' onClick={handleAddOrUpdateClick}><MdUpdate className='text-lg' /> Update Story</button>
                            <button className='cursor-pointer flex items-center gap-1 text-xs font-medium  bg-rose-50 text-rose-500 shadow-cyan-100 border border-cyan-100 hover:bg-rose-500  hover:text-rose-50 rounded-sm px-2 py-0.5' onClick={handleAddOrUpdateClick}><MdDelete className='text-lg' /> Delete Story</button>
                        </>)}




                    <button className='text-xl text-slate-400 cursor-pointer mx-1 my-1' onClick={onClose}><IoMdClose /></button>
                </div>
            </div>

            <div>
                <div className="flex flex-1 flex-col gap-2 pt-4">
                    <label className='input-label'>Title</label>
                    <input type="text" className='text-2xl text-slate-900 outline-none' value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Once Opon A Time...' />

                    <div>
                        <DateSelector date={visitedDate} setDate={setVisitedDate} className="text-lg " />
                    </div>
                    <ImageSelector image={storyImg} setImage={setStoryImg} handleDeleteImage={handleDeletedStoryImage} />
                    <div className='flex flex-col gap-2 mt-4 '>

                        <label className="input-label">Story</label>
                        <textarea type="text" className='text-sm text-slate-950  outline-none bg-slate-100 p-2  rounded-sm' placeholder='Your Story' rows={10} value={story} onChange={(e) => { setStory(e.target.value) }} />
                    </div>
                    <div className="pt-3 ">
                        <label className="input-label">VISITED LOCATION</label>

                        <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEditStory
