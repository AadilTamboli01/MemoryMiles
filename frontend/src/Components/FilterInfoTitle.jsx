import React from 'react'
import DateRangeChip from './DateRangeChip'

const FilterInfoTitle = ({ filterType, filterDate, onClear }) => {
     return (
        filterType && (
            <div className="mb-4 sm:mb-5">

                {filterType === "search" ? (
                    <h3 className="text-base sm:text-lg font-medium text-slate-800">
                        Search Results
                    </h3>
                ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">

                        <h3 className="text-base sm:text-lg font-medium text-slate-800">
                            Travel Stories from
                        </h3>

                        <DateRangeChip
                            date={filterDate}
                            onClear={onClear}
                        />

                    </div>
                )}

            </div>
        )
    )
}

export default FilterInfoTitle
