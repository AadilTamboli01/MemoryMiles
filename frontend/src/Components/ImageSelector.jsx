import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { LuUpload } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

const ImageSelector = ({ image, setImage, handleDeleteImage }) => {
    const inputRef = useRef(null)
    const [previewURL, setpreviewURL] = useState(null)

    const onChooseFile = () => {
        inputRef.current.click()
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0]

        if (file) {
            setImage(file)
            console.log(file)
        }
    }

    const  handleRemoveImage  = ()=>{
        setImage(null)
        handleDeleteImage()
    }
    useEffect(() => {
        let url = null;

        if (typeof image === "string") {
            setpreviewURL(image);
        
        } else if (image) {
            url = URL.createObjectURL(image);
            setpreviewURL(url);
        } else {
            setpreviewURL(null);
        }

        return () => {
            if (url) {
                URL.revokeObjectURL(url);
            }
        };
    }, [image]);

    return (
        <div>
            <input type="file" accept='image/*' ref={inputRef} onChange={handleImageChange} className='hidden' />


            {!image ? <button className='w-full h-[220px] flex  flex-col items-center justify-center gap-4 bg-slate-50 rounded-sm border border-slate-200/50' onClick={() => { onChooseFile() }}>
                <div className='w-14 h-14  flex items-center justify-center cursor-pointer bg-cyan-100  rounded-full border border-cyan-100 '><LuUpload className='text-3xl font-bold  text-cyan-500 ' /></div>
                <p className='text-sm text-slate-500 '>Browse image file to upload</p>
            </button> :
                (
                    <div className='w-full relative '>
                        <img src={previewURL} alt="Selected Image" className='w-full h-[300px] object-cover rounded-lg ' />
                        <button className='btn-small cursor-pointer btn-delete absolute top-2 right-2' onClick={()=>{handleRemoveImage()}}><MdDelete className='text-xl'/></button>
                    </div>
                )}

        </div>
    )
}

export default ImageSelector
