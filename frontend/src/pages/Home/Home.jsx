import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import axiosInstance from '../../utils/axiosInstance'
import TravelStoryCard from '../../Components/TravelStoryCard'
import { ToastContainer, toast } from 'react-toastify';
import { FaPlus } from "react-icons/fa";
import Modal from 'react-modal';
import AddEditStory from '../../Components/AddEditStory';
import ViewTravelStory from './ViewTravelStory';


const Home = () => {
  const [allStories, setAllStory] = useState([])
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  })

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null
  })


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
      <Navbar />
      <div className='container mx-auto py-10 '>
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
            ) : (<div>Empty Card here </div>)}
          </div>

          <div className='w-[320px]'></div>
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
        }} onDeleteClick={() => { }} />

      </Modal>
      <button className='w-16 h-16 flex items-center justify-center rounded-full bg-blue-400 hover:bg-cyan-400 fixed right-10 bottom-10 cursor-pointer' onClick={() => { setOpenAddEditModal({ isShown: true, type: "add", data: null }) }}><FaPlus className='text-lg text-white' /> </button>
      <ToastContainer />
    </>
  )
}

export default Home
