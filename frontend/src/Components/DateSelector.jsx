import React, { useState } from 'react'
import { FaMonument } from 'react-icons/fa';
import { MdDateRange } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { DayPicker } from "react-day-picker";

import moment from "moment"

const DateSelector = ({ date, setDate }) => {
    const [openDatePicker, setOpenDatePicker] = useState(false)

    return (
        <div>
            <button className='inline-flex items-center text-[13px] items-center font-medium  text-blue-900 bg-sky-200/40  hover:bg-sky-200/70 rounded-sm px-2  py-1 cursor-pointer' onClick={() => { setOpenDatePicker(true) }}><MdDateRange />

                {date ? (moment(date).format("Do MMM YYYY")) : (moment().format("Do MMM YYYY"))}
            </button>

            <div className="overflow-y-scroll p-5 bg-sky-50/80 rounded-lg relative  pt-9 ">

                <button className='w-10 h-10 rounded-full cursor-pointer flex items-center justify-center  bg-sky-100 hover:bg-sky-100  absolute top-2 right-2 ' onClick={() => { setOpenDatePicker(false) }}><IoClose className='text-xl text-blue-900' /></button>


                {openDatePicker && <DayPicker
                    captionLayout='dropdown'
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    pagedNavigation
                // footer={
                //     selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
                // }
                />}


            </div>
        </div>
    )
}

export default DateSelector
