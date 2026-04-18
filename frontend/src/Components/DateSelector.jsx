import React, { useState } from 'react'
import { FaMonument } from 'react-icons/fa';
import { MdDateRange } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { DayPicker } from "react-day-picker";

import moment from "moment"

const DateSelector = ({ date, setDate }) => {
    const [openDatePicker, setOpenDatePicker] = useState(false)

       return (
        <div className="relative w-full">

            {/* Button */}
            <button
                className='w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-2 text-[12px] sm:text-[13px] font-medium text-blue-900 bg-sky-200/40 hover:bg-sky-200/70 rounded-md px-3 py-2 cursor-pointer'
                onClick={() => { setOpenDatePicker(true) }}
            >
                <MdDateRange />

                {date
                    ? moment(date).format("Do MMM YYYY")
                    : moment().format("Do MMM YYYY")}
            </button>

            {/* Date picker */}
            {openDatePicker && (
                <div className="absolute left-0 sm:left-auto sm:right-0 z-50 mt-2 w-full sm:w-auto p-4 sm:p-5 bg-sky-50 rounded-lg shadow-lg">

                    {/* Close button */}
                    <button
                        className='absolute top-2 right-2'
                        onClick={() => setOpenDatePicker(false)}
                    >
                        <IoClose className='text-lg sm:text-xl text-blue-900' />
                    </button>

                    {/* calendar */}
                    <div className="overflow-x-auto">
                        <DayPicker
                            captionLayout='dropdown'
                            mode="single"
                            selected={date}
                            onSelect={(selectedDate) => {
                                setDate(selectedDate);
                                setOpenDatePicker(false);
                            }}
                            pagedNavigation
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default DateSelector
