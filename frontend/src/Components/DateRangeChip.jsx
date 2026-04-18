import React from 'react'
import moment from "moment"
import { IoMdClose } from 'react-icons/io'

const DateRangeChip = ({ date, onClear }) => {
    const startDate = date?.from
        ? moment(date?.from).format("Do MMM YYYY")
        : "N/A"

    const endDate = date?.to ? moment(date?.to).format("Do MMM YYYY") : "N/A"

    return (
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-sm">
            <p className="text-xs font-medium">
                {startDate} - {endDate}
            </p>

            <button onClick={onClear} className="cursor-pointer">
                <IoMdClose />
            </button>
        </div>
    )
}

export default DateRangeChip

