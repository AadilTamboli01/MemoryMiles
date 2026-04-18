import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import axiosInstance from '../../utils/axiosInstance'
import TravelStoryCard from '../../Components/TravelStoryCard'
import { ToastContainer, toast } from 'react-toastify';
import { FaPlus } from "react-icons/fa";
import Modal from 'react-modal';
import AddEditStory from '../../Components/AddEditStory';
import ViewTravelStory from './ViewTravelStory';
import EmptyCard from '../../Components/EmptyCard';
import { DayPicker } from "react-day-picker";
import moment from "moment"
import FilterInfoTitle from '../../Components/FilterInfoTitle';
import { getEmptyCardMessage } from '../../utils/helper';

const Home = () => {
  const [allStories, setAllStory] = useState([])
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  })

  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const [searchQuery, setSearchQuery] = useState("")

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null
  })

  const [filterType, setFilterType] = useState("")



  const getAllStory = async () => {
    try {
      const response = await axiosInstance.get("/story/allstory");

      if (response.data?.stories) {
        setAllStory(response.data.stories);
      }
    } catch (error) {
      console.log("Something went wrong. please try again.", error);
    }
  };
  const handleEdit = async (data) => {
    setOpenAddEditModal({

      isShown: true,
      type: "edit",
      data: data
    })
  }



  const handleViewStory = (data) => {
    setOpenViewModal({
      isShown: true, data: data
    })
  }
  const updateIsFavouriteItem = async (data) => {
    try {
      const response = await axiosInstance.patch(`/story/likeStory/${data._id}`, {
        isFavourite: !data.isFavourite
      })

      if (response.data && response.data.story) {
        toast.success("Story Updated Succcessfully")
        getAllStory()
      }

    } catch (error) {
      console.log("Something went wrong. please try again.", error);
    }
  }


  //delete Story 
  // const deleteTravelStory = async (data) => {
  //   try {
  //     const storyId = data._id;

  //   } catch (error) {

  //   }
  // }

  const deleteTravelStory = async (data) => {
    const storyId = data._id;

    try {
      //  1. Delete image from cloudinary (backend route)
      if (data.imageURL) {
        await axiosInstance.delete("/story/image", {
          data: { imageURL: data.imageURL } // ⚠️ body me bhejna

        });
      }

      console.log("Image deleted Successfully")

      //  2. Delete story from DB
      const response = await axiosInstance.delete(`/story/story/${storyId}`);

      if (response.data) {
        toast.success("Story deleted successfully");

        // modal close
        setOpenViewModal({ isShown: false, data: null });

        // refresh list
        getAllStory();
      }

    } catch (error) {
      console.log("Delete error:", error);
      toast.error("Delete failed");
    }
  };

  const onSearchStory = async (query) => {

    try {
      const response = await axiosInstance.get("/story/search", {
        params: {
          query: query
        }
      })
      if (response.data && response.data.stories) {
        setFilterType("search")
        setAllStory(response.data.stories);
      }
    } catch (error) {
      console.log("Error occured in the onsearch Story ", error.message)
    }
  }

  const handleClearSearch = () => {
    setFilterType("")
    getAllStory()
  }

  // filter story by date range 
  const filterStoriesByDate = async (day) => {
    try {
      const startDate = day.from ? moment(day.from).valueOf() : null
      const endDate = day.to ? moment(day.to).valueOf() : null

      if (startDate && endDate) {
        const response = await axiosInstance.get("/story/filter", {
          params: { startDate, endDate },
        })

        if (response.data && response.data.stories) {
          setFilterType("date")
          setAllStory(response.data.stories)
        }
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error)
    }
  }

  const handleDayClick = (day) => {
    setDateRange(day);
    filterStoriesByDate(day)

  }

  const resetFilter = () => {
   
    setDateRange({ from: null, to: null })
    setFilterType("")
    getAllStory()
  }



  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axiosInstance.get("/story/allstory");

        if (response.data?.stories) {
          setAllStory(response.data.stories);
        }
      } catch (error) {
        console.log("Something went wrong. please try again.", error);
      }
    };

    fetchStories();
  }, []);
  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearchNote={onSearchStory} handleClearSearch={handleClearSearch} />
      <div className='container mx-auto py-10 '>

        <FilterInfoTitle filterType={filterType} filterDate={dateRange} onClear={() => { resetFilter() }} />
        <div className="flex gap-7 ">
          <div className=' flex-1'>
            {allStories.length > 0 ? (
              <div className='grid grid-cols-2 gap-4'>
                {allStories.map((item) => {
                  return (<TravelStoryCard
                    key={item._id}
                    imageURL={item.imageURL}
                    title={item.title}
                    story={item.story}
                    date={item.visitedDate}
                    isFavourite={item.isFavourite}
                    location={item.visitedLocation}
                    onEdit={() => { handleEdit(item) }}
                    onClick={() => { handleViewStory(item) }}
                    onFavouriteClick={() => { updateIsFavouriteItem(item) }}
                  />)
                })}
              </div>
            ) : (<EmptyCard imageSource={"/images/pexels-karola-g-5706021.jpg"} message={getEmptyCardMessage(filterType)} createNewStory={() => { setOpenAddEditModal({ isShown: true, type: "add", data: null }) }} />)}
          </div>

          <div className='w-[320px]'>

            <div className='bg-white border border-slate-200 shadow-lg shadow-slate-200/50 rounded-lg '>
              <div className='p-3'>

                <DayPicker captionLayout='dropdown' mode="range" selected={dateRange} onSelect={handleDayClick} pagedNavigation />

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* add edit modal */}
      <Modal isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        appElement={document.getElementById("root")}
        className="w-[80vw] md:w-[40%] h-[80vh] bg-slate-50 rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"

      > <AddEditStory storyInfo={openAddEditModal.data} type={openAddEditModal.type} onClose={() => { setOpenAddEditModal({ data: null, type: "add", isShown: false }) }} getAllTravelStory={getAllStory} /> </Modal>


      {/* view travel story  */}
      <Modal isOpen={openViewModal.isShown} onRequestClose={() => { }} className="w-[80vw] md:w-[40%] h-[80vh] bg-slate-50 rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
        appElement={document.getElementById("root")}
      >
        <ViewTravelStory onClose={() => { setOpenViewModal((prevState) => ({ ...prevState, isShown: false })) }} storyInfo={openViewModal.data || null} onEditClick={() => {
          setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))

          handleEdit(openViewModal.data || null)
        }} onDeleteClick={() => { deleteTravelStory(openViewModal.data || null) }} />

      </Modal>
      <button className='w-16 h-16 flex items-center justify-center rounded-full bg-blue-400 hover:bg-cyan-400 fixed right-10 bottom-10 cursor-pointer' onClick={() => { setOpenAddEditModal({ isShown: true, type: "add", data: null }) }}><FaPlus className='text-lg text-white' /> </button>
      <ToastContainer />
    </>
  )
}

export default Home
