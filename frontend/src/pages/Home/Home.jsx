import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import axiosInstance from '../../utils/axiosInstance'

const Home = () => {
  const [allStories, setAllStory] = useState([])
  console.log(allStories)

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
      <div className='container mx-auto py-10'>
        <div className="flex gap-7 ">
          <div className=' flex-1'></div>

          <div className='w-[320px]'></div>
        </div>
      </div>
    </>
  )
}

export default Home
