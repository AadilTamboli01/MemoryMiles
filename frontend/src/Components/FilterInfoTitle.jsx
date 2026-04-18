import React from 'react'
import DateRangeChip from './DateRangeChip'

const FilterInfoTitle = ({ filterType, filterDate, onClear }) => {
    return (
        filterType && (
            <div className="mb-5">
                {filterType === "search" ? (
                    <h3 className="text-lg font-medium">Search Results</h3>
                ) : (
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">Travel Stories from</h3>

                        <DateRangeChip date={filterDate} onClear={onClear}/>
                    </div>
                )}
            </div>
        )
    )
}

export default FilterInfoTitle
