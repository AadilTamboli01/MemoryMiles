// import React from 'react'
// import { useSelector } from 'react-redux';
// import { getInitials } from '../utils/helper';

// const Profile = ({ onLogout }) => {

//     const { currentUser } = useSelector((state) => { return state.user })
//     return (
//         <div className='flex items-center gap-2 sm:gap-3'>

//             {/* Avatar */}
//             <div className='w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-sm sm:text-base text-slate-900 font-medium bg-slate-100'>
//                 {getInitials(currentUser?.username)}
//             </div>

//             {/* User Info */}
//             <div className='hidden sm:block'>
//                 <p className='text-sm sm:text-lg font-medium text-slate-800 truncate max-w-[120px] lg:max-w-[180px]'>
//                     {currentUser.username || ""}
//                 </p>

//                 <button
//                     className='text-xs sm:text-sm text-red-600 underline cursor-pointer'
//                     onClick={onLogout}
//                 >
//                     Logout
//                 </button>
//             </div>

//         </div>
//     )
// }

// export default Profile



import React from 'react'
import { useSelector } from 'react-redux';
import { getInitials } from '../utils/helper';

const Profile = ({ onLogout }) => {

    const { currentUser } = useSelector((state) => { return state.user })
    return (
        <div className='flex items-center gap-2 sm:gap-3'>

            {/* Avatar */}
            <div className='w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-sm sm:text-base text-slate-900 font-medium bg-slate-100'>
                {getInitials(currentUser?.username)}
            </div>

            {/* User Info */}
            <div className='block'>
                <p className='hidden sm:block text-sm sm:text-lg font-medium text-slate-800 truncate max-w-[120px] lg:max-w-[180px]'>
                    {currentUser.username || ""}
                </p>

                <button
                    className='text-xs sm:text-sm text-red-600 underline cursor-pointer'
                    onClick={onLogout}
                >
                    Logout
                </button>
            </div>

        </div>
    )
}

export default Profile