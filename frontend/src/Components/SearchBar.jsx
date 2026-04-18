import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
    <div className="w-full flex items-center px-3 sm:px-4 bg-slate-100 rounded-md border border-transparent focus-within:border-cyan-400">

      <input
        type="text"
        placeholder="Search Notes..."
        className="w-full text-xs sm:text-sm bg-transparent py-2.5 sm:py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="text-lg sm:text-xl text-slate-500 cursor-pointer hover:text-black mr-2 sm:mr-3 flex-shrink-0"
          onClick={onClearSearch}
        />
      )}

      <FaSearch
        className="text-sm sm:text-base text-slate-400 cursor-pointer hover:text-black flex-shrink-0"
        onClick={handleSearch}
      />
    </div>
  )
}

export default SearchBar

