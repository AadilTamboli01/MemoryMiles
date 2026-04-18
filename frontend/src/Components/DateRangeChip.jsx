import React from 'react'
import moment from "moment"
import { IoMdClose } from 'react-icons/io'

const DateRangeChip = ({ date, onClear }) => {
    const startDate = date?.from
        ? moment(date?.from).format("Do MMM YYYY")
        : "N/A"

    const endDate = date?.to ? moment(date?.to).format("Do MMM YYYY") : "N/A"

    return (
        <div className="flex items-center justify-between gap-2 bg-slate-100 px-3 py-2 rounded-md w-full sm:w-auto">

            <p className="text-[11px] sm:text-xs font-medium text-slate-700 break-words">
                {startDate} - {endDate}
            </p>

            <button
                onClick={onClear}
                className="cursor-pointer text-slate-500 hover:text-slate-700 flex-shrink-0"
            >
                <IoMdClose className="text-base" />
            </button>

        </div>
    )
}

export default DateRangeChip

