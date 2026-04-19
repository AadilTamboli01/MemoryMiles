

import React, { useState } from 'react'
import moment from "moment"
import { FaPlus } from 'react-icons/fa'
import { IoMdClose } from "react-icons/io";
import { MdUpdate } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DateSelector from './DateSelector';
import ImageSelector from './ImageSelector';
import TagInput from './TagInput';
import axiosInstance from '../utils/axiosInstance';
import { toast } from "react-toastify"
import uploadImage from '../utils/uploadImage';

const AddEditStory = ({ storyInfo, type, onClose, getAllTravelStory }) => {

    const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null)
    const [title, setTitle] = useState(storyInfo?.title || "")
    const [storyImg, setStoryImg] = useState(storyInfo?.imageURL || null)
    const [story, setStory] = useState(storyInfo?.story || "")
    const [visitedLocation, setVisitedLocation] = useState(
        storyInfo?.visitedLocation || []
    )
    const [error, setError] = useState("")

    const updateTravelStory = async () => {
        const storyId = storyInfo._id;
        if (!storyImg) { setError("Please upload image file"); return; }

        try {
            let imageUrl = ""
            let postData = {
                title, story,
                imageURL: storyInfo.imageURL || "",
                visitedLocation,
                visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
            }

            if (typeof storyImg === "object") {
                const imageUploadRes = await uploadImage(storyImg)
                imageUrl = imageUploadRes.imageURL || ""
                postData = { ...postData, imageURL: imageUrl }
            }

            const response = await axiosInstance.put("/story/story/" + storyId, postData)

            if (response.data && response.data.story) {
                toast.success("Story updated successfully!")
                getAllTravelStory()
                onClose()
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            } else {
                setError("Something went wrong! Please try again.")
            }
        }
    }

    const addNewTravelStory = async () => {
        try {
            let imageURL = ""

            if (storyImg) {
                const imageUploadResponse = await uploadImage(storyImg)
                imageURL = imageUploadResponse.imageURL || ""
            } else {
                setError("Please upload the image file")
                return
            }

            const response = await axiosInstance.post("/story/story", {
                title, story, visitedLocation,
                visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
                imageURL: imageURL || ""
            })

            if (response.data && response.data.story) {
                toast.success("Story Created Successfully")
                getAllTravelStory()
                onClose()
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }

    const handleAddOrUpdateClick = () => {
        if (!title) { setError("Please enter the title"); return }
        if (!story) { setError("Please enter the story"); return }
        if (visitedLocation.length < 1) { setError("Please enter the locations"); return }
        setError("")
        if (type === "edit") { updateTravelStory() } else { addNewTravelStory() }
    }

    const handleDeletedStoryImage = async () => { setStoryImg(null) }

    return (
        <div className='flex flex-col h-full'>

            {/* HEADER — fixed, never scrolls */}
            <div className='flex items-center justify-between gap-2 px-4 sm:px-5 py-3 border-b border-slate-200 bg-slate-50 shrink-0'>

                <h5 className='text-sm sm:text-lg font-semibold text-slate-700 truncate max-w-[140px] sm:max-w-none'>
                    {type === "add" ? "Add Story" : "Update Story"}
                </h5>

                <div className='flex items-center gap-2 shrink-0'>

                    {type === "add" ? (
                        <button
                            className='flex  cursor-pointer items-center gap-1 text-xs sm:text-sm font-medium bg-cyan-50 text-[#05b6d3] border border-cyan-100 hover:bg-[#05b6d3] hover:text-white rounded-md px-3 py-1.5'
                            onClick={handleAddOrUpdateClick}
                        >
                            <FaPlus className='text-xs' />
                            <span>Add</span>
                        </button>
                    ) : (
                        <>
                            <button
                                className='flex  cursor-pointer items-center gap-1 text-xs sm:text-sm font-medium bg-cyan-50 text-[#05b6d3] border border-cyan-100 hover:bg-[#05b6d3] hover:text-white rounded-md px-3 py-1.5'
                                onClick={handleAddOrUpdateClick}
                            >
                                <MdUpdate className='text-sm' />
                                <span>Update</span>
                            </button>

                            <button
                                className='flex cursor-pointer  items-center gap-1 text-xs sm:text-sm font-medium bg-rose-50 text-rose-500 border border-rose-100 hover:bg-rose-500 hover:text-white rounded-md px-3 py-1.5'
                                onClick={handleAddOrUpdateClick}
                            >
                                <MdDelete className='text-sm' />
                                <span>Delete</span>
                            </button>
                        </>
                    )}

                    <button
                        className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer'
                        onClick={onClose}
                    >
                        <IoMdClose className='text-xl' />
                    </button>
                </div>
            </div>

            {/* SCROLLABLE BODY */}
            <div className='flex-1 overflow-y-auto px-4 sm:px-5 py-4'>

                {error && (
                    <p className="text-red-500 text-xs mb-3 text-right">{error}</p>
                )}

                <div className="flex flex-col gap-4">

                    {/* Title */}
                    <div className="flex flex-col gap-1">
                        <label className='input-label'>Title</label>
                        <input
                            type="text"
                            className='text-lg sm:text-2xl text-slate-900 outline-none w-full'
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                            placeholder='Once Upon A Time...'
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <DateSelector date={visitedDate} setDate={setVisitedDate} />
                    </div>

                    {/* Image */}
                    <ImageSelector
                        image={storyImg}
                        setImage={setStoryImg}
                        handleDeleteImage={handleDeletedStoryImage}
                    />

                    {/* Story */}
                    <div className='flex flex-col gap-2'>
                        <label className="input-label">Story</label>
                        <textarea
                            className='text-sm sm:text-base text-slate-950 outline-none bg-slate-100 p-3 rounded-md w-full'
                            placeholder='Your Story'
                            rows={8}
                            value={story}
                            onChange={(e) => { setStory(e.target.value) }}
                        />
                    </div>

                    {/* Location */}
                    <div className="pb-4">
                        <label className="input-label ">VISITED LOCATION</label>
                        <TagInput  tags={visitedLocation} setTags={setVisitedLocation} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddEditStory