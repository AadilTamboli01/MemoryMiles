import React from 'react'
import moment from "moment"
import { IoLocation } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

const TravelStoryCard = ({
  imageURL,
  title,
  story,
  date,
  isFavourite,
  location,
  onEdit,
  onClick,
  onFavouriteClick
}) => {
    return (
    <div className='border border-slate-200 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300 ease-in-out relative cursor-pointer'>

      {/* Image */}
      <img
        src={imageURL}
        alt={title}
        className='w-full h-40 sm:h-48 md:h-56 object-cover'
        onClick={onClick}
      />

      {/* Fav Button */}
      <button
        onClick={onFavouriteClick}
        className='w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 absolute top-3 right-3'
      >
        <FaHeart
          className={`${isFavourite ? "text-red-500" : "text-white"} text-sm sm:text-base hover:text-red-500`}
        />
      </button>

      {/* Contend */}
      <div className='p-3 sm:p-4'>

        {/* Title Date */}
        <div className='flex items-start gap-2'>
          <div className='flex-1'>
            <h6 className='text-sm sm:text-base font-medium text-slate-900 line-clamp-1'>
              {title}
            </h6>

            <span className='text-[11px] sm:text-xs text-slate-500'>
              {date ? moment(date).format("Do MMM YYYY") : "-"}
            </span>
          </div>
        </div>

        {/* Story */}
        <p className='text-xs sm:text-sm text-slate-700 mt-2 line-clamp-2'>
          {story?.slice(0, 80)}
        </p>

        {/* Location */}
        <div className='flex flex-wrap items-center gap-1.5 text-[11px] sm:text-[13px] text-cyan-600 bg-cyan-200/40 rounded mt-3 px-2 py-1'>
          <IoLocation className='text-xs sm:text-sm' />

          {location.map((item, index) => {
            return location.length === index + 1
              ? `${item}`
              : `${item}, `
          })}
        </div>

      </div>
    </div>
  )
}

export default TravelStoryCard

