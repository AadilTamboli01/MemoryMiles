import React from 'react'

const EmptyCard = ({ imageSource, message, createNewStory }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 sm:mt-16 mx-auto p-6 sm:p-8 bg-gray-100 rounded-xl shadow-md border border-gray-200 max-w-xs sm:max-w-sm w-full">

      {/* Image */}
      <div className="bg-white p-3 sm:p-4 rounded-full shadow">
        <img
          src={imageSource}
          alt="image"
          className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
        />
      </div>

      {/* Message */}
      <p className="text-sm sm:text-base font-semibold text-gray-800 text-center mt-5 sm:mt-6 leading-snug">
        {message}
      </p>

      {/* Button */}
      <button
        className="mt-4 px-4 sm:px-5 py-2 text-white text-xs sm:text-sm font-medium bg-blue-500 rounded-full shadow hover:bg-blue-600 transition-all"
        onClick={() => {
          createNewStory()
        }}
      >
        Create New
      </button>

    </div>
  )
}

export default EmptyCard




