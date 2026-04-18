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

    const handleRemoveImage = () => {
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
            <input
                type="file"
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />

            {!image ? (
                <button
                    className='w-full h-[180px] sm:h-[220px] flex flex-col items-center justify-center gap-3 sm:gap-4 bg-slate-50 rounded-md border border-slate-200 hover:bg-slate-100 transition'
                    onClick={onChooseFile}
                >
                    <div className='w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-cyan-100 rounded-full border border-cyan-100'>
                        <LuUpload className='text-2xl sm:text-3xl text-cyan-500' />
                    </div>

                    <p className='text-xs sm:text-sm text-slate-500 text-center px-2'>
                        Browse image file to upload
                    </p>
                </button>
            ) : (
                <div className='w-full relative'>
                    <img
                        src={previewURL}
                        alt="Selected Image"
                        className='w-full h-[200px] sm:h-[260px] md:h-[300px] object-cover rounded-lg'
                    />

                    <button
                        className='btn-small btn-delete absolute top-2 right-2 flex items-center justify-center'
                        onClick={handleRemoveImage}
                    >
                        <MdDelete className='text-lg sm:text-xl' />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ImageSelector
