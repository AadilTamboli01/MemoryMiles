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
    // const [visitedDate, setVisitedDate] = useState(null)
    // const [title, setTitle] = useState("")
    // const [storyImg, setStoryImg] = useState(null)
    // const [story, setStory] = useState("")
    // const [visitedLocation, setVisitedLocation] = useState([])

    const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null)
    const [title, setTitle] = useState(storyInfo?.title || "")
    const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null)
    const [story, setStory] = useState(storyInfo?.story || "")
    const [visitedLocation, setVisitedLocation] = useState(
        storyInfo?.visitedLocation || []
    )

    const [error, setError] = useState("")

    const updateTravelStory = async () => {
        const storyId = storyInfo._id;

        try {
            let imageUrl = ""

            let postData = {
                title,
                story,
                imageURL: storyInfo.imageURL || "",
                visitedLocation,
                visitedDate: visitedDate
                    ? moment(visitedDate).valueOf()
                    : moment().valueOf(),
            }

            if (typeof storyImg === "object") {
                // Upload new image
                const imageUploadRes = await uploadImage(storyImg)

                imageUrl = imageUploadRes.imageURL || ""

                postData = {
                    ...postData,
                    imageURL: imageUrl,
                }

            }

            const response = await axiosInstance.put(
                "/story/story/" + storyId,
                postData
            )

            if (response.data && response.data.story) {
                toast.success("Story updated successfully!")

                getAllTravelStory()

                onClose()
            }

        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
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
            }

            const response = await axiosInstance.post("/story/story", {
                title,
                story,
                visitedLocation,
                visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
                imageURL: imageURL || ""
            })

            if (response.data && response.data.story) {
                toast.success("Story Created Successfully")

                getAllTravelStory()
                onClose()
            }

        } catch (error) {
            console.log("Errir in the addneTravelstory ", error)
        }
    }
    const handleAddOrUpdateClick = () => {
        if (!title) {
            setError("Please enter the title")
            return
        }

        if (!story) {
            setError("Please enter the story")
            return
        }
        if (visitedLocation.length < 1) {
            setError("Please enter the locations")
            return
        }

        setError("")

        if (type === "edit") {
            updateTravelStory()
        } else {
            addNewTravelStory()
        }

    }
    const handleDeletedStoryImage = () => { }

    return (
        <div className='relative'>
            <div className='flex items-center justify-between '>
                <h5 className='text-xl font-medium text-slate-700'>{type === "add" ? "Add Story" : "Update Story"}</h5>

                <div className='flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg '>



                    {type === "add" ? (<button className='cursor-pointer flex items-center gap-1 text-xs font-medium  bg-cyan-50 text-[#05b6d3] shadow-cyan-100 border border-cyan-100 hover:bg-[#05b6d3]  hover:text-white rounded-sm px-2 py-0.5' onClick={handleAddOrUpdateClick}> <FaPlus className='' />Add Story</button>) : (
                        <>
                            <button className='cursor-pointer flex items-center gap-1 text-xs font-medium  bg-cyan-50 text-[#05b6d3] shadow-cyan-100 border border-cyan-100 hover:bg-[#05b6d3]  hover:text-white rounded-sm px-2 py-0.5' onClick={handleAddOrUpdateClick}><MdUpdate className='text-lg' /> Update Story</button>
                            <button className='cursor-pointer flex items-center gap-1 text-xs font-medium  bg-rose-50 text-rose-500 shadow-cyan-100 border border-cyan-100 hover:bg-rose-500  hover:text-rose-50 rounded-sm px-2 py-0.5' onClick={handleAddOrUpdateClick}><MdDelete className='text-lg' /> Delete Story</button>
                        </>)}




                    <button className='text-xl text-slate-400 cursor-pointer mx-1 my-1' onClick={onClose}><IoMdClose /></button>

                </div>
            </div>




            <div>
                {error && (
                    <p className="text-red-500 text-xs pt-2 text-right">{error}</p>
                )}
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
