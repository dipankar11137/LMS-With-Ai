

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Brief from '../Help/Brief';
import Prototyping from '../Help/Prototyping';
import ReviewsSection from '../Help/ReviewsSection';
import TCI from '../Help/TCI';
import VideoSUpportCourse from '../Help/VideoSUpportCourse';
import WhatYouWillLearn from '../Help/WhatYouWillLearn';

const WebDevelopment = () => {
   const [isModalOpen, setModalOpen] = useState(false);
  const [course, setCourse] = useState('')

  const navigate = useNavigate();
  const handleCertificate = () => { 
    navigate('/certificate')
  }

  const onDown = () => {
     window.scrollBy({
       top: 600, // Amount to scroll downward
       behavior: 'smooth', // Smooth scrolling effect
      });

  }
  return (
    <div className="flex md:bg-gray-200 lg:bg-gray-200  pt-16 ">
      {/* Left Sidebar */}
      <div className="w-full md:1/3 lg:w-1/3 ">
        <div className="w-full  md:w-1/3 lg:1/3 h-screen overflow-y-auto ml-3 rounded-xl  fixed pb-20">
          <div className="m-4 p-3 mt-5 ">
            <div>
              <h1 className="text-2xl font-semibold mb-5 ml-1 text-slate-700">
                Web Development
              </h1>
            </div>
            <div className="pb-5">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-3 bg-white w-full  border-b text-gray-800 font-medium  rounded-lg"
              />
            </div>
            {/* course */}
            <div>
              {/* Course Content */}
              <div>
                {course === 'Course Content' ? (
                  <button
                    onClick={() => setCourse('')}
                    className="p-4 bg-gray-50 w-full flex items-center gap-6  text-gray-800 font-medium cursor-pointer"
                  >
                    <IoChevronUp /> Course Content
                  </button>
                ) : (
                  <button
                    onClick={() => setCourse('Course Content')}
                    className="px-4 py-4  bg-gray-50 w-full flex items-center gap-6 border-b text-gray-800 font-medium rounded-lg cursor-pointer"
                  >
                    <IoChevronDown /> Course Content
                  </button>
                )}
                <div className="bg-white ">
                  {course === 'Course Content' && (
                    <VideoSUpportCourse
                      course={'Web Development'}
                      onDown={onDown}
                    />
                  )}
                </div>
              </div>
              {/* The Brief */}
              <div className="mt-3">
                {course === 'The Brief' ? (
                  <button
                    onClick={() => setCourse('')}
                    className="p-4 bg-gray-50 w-full flex items-center gap-6  text-gray-800 font-medium cursor-pointer "
                  >
                    <IoChevronUp /> The Brief
                  </button>
                ) : (
                  <button
                    onClick={() => setCourse('The Brief')}
                    className="px-4 py-4 bg-gray-50 w-full flex items-center gap-6 border-b text-gray-800 font-medium cursor-pointer rounded-lg"
                  >
                    <IoChevronDown /> The Brief
                  </button>
                )}
                <div className="bg-white">
                  {course === 'The Brief' && (
                    <Brief
                      course={'Web Development'}
                      onDown={onDown}
                    />
                  )}
                </div>
              </div>
              {/* Type, Color & Icon Introduction */}
              <div className="mt-3">
                {course === 'Type, Color & Icon Introduction' ? (
                  <button
                    onClick={() => setCourse('')}
                    className="p-4 bg-gray-50 w-full flex items-center gap-6  text-gray-800 font-medium cursor-pointer "
                  >
                    <IoChevronUp /> Type, Color & Icon Introduction
                  </button>
                ) : (
                  <button
                    onClick={() => setCourse('Type, Color & Icon Introduction')}
                    className="px-4 py-4 bg-gray-50 w-full flex items-center gap-6 border-b text-gray-800 font-medium cursor-pointer rounded-lg"
                  >
                    <IoChevronDown /> Type, Color & Icon Introduction
                  </button>
                )}
                <div className="bg-white">
                  {course === 'Type, Color & Icon Introduction' && (
                    <TCI
                      course={'Web Development'}
                      onDown={onDown}
                    />
                  )}
                </div>
              </div>
              {/* Prototyping a App - Introduction */}
              <div className="mt-3">
                {course === 'Prototyping a App - Introduction' ? (
                  <button
                    onClick={() => setCourse('')}
                    className="p-4 bg-gray-50 w-full flex items-center gap-6  text-gray-800 font-medium cursor-pointer "
                  >
                    <IoChevronUp /> Prototyping a App - Introduction
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      setCourse('Prototyping a App - Introduction')
                    }
                    className="px-4 py-4 bg-gray-50 w-full flex items-center gap-6 border-b text-gray-800 font-medium cursor-pointer rounded-lg"
                  >
                    <IoChevronDown /> Prototyping a App - Introduction
                  </button>
                )}
                <div className="bg-white">
                  {course === 'Prototyping a App - Introduction' && (
                    <Prototyping
                      course={'Web Development'}
                      onDown={onDown}
                    />
                  )}
                </div>
              </div>
              {/* Wireframe Feedback */}
              <div className="mt-3">
                {course === 'Wireframe Feedback' ? (
                  <button
                    onClick={() => setCourse('')}
                    className="p-4 bg-gray-50 w-full flex items-center gap-6  text-gray-800 font-medium cursor-pointer "
                  >
                    <IoChevronUp /> Wireframe Feedback
                  </button>
                ) : (
                  <button
                    onClick={() => setCourse('Wireframe Feedback')}
                    className="px-4 py-4 bg-gray-50 w-full flex items-center gap-6 border-b text-gray-800 font-medium cursor-pointer rounded-lg"
                  >
                    <IoChevronDown /> Wireframe Feedback
                  </button>
                )}
                <div className="bg-white">
                  {course === 'Wireframe Feedback' && (
                    <VideoSUpportCourse
                      course={'Web Development'}
                      onDown={onDown}
                    />
                  )}
                </div>
              </div>
              {/* Certificate */}
              <div className="mt-3 flex justify-end">
                <button
                  onClick={handleCertificate}
                  className="btn btn-sm btn-primary"
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-0 md:p-8 lg:p-8 mt-[620px] mg:mt-0 lg:mt-0 bg-white">
        {/* Video Section */}
        <div className="bg-white  rounded-lg p-6 pl-32 pr-20 pb-20">
          <div
            onClick={() => setModalOpen(true)}
            className=" shadow-black shadow-lg rounded-md overflow-hidden "
          >
            {/* Thumbnail */}

            <iframe
              onClick={() => setModalOpen(true)}
              className="w-full h-48 md:h-72"
              src="https://www.youtube.com/embed/NWnBxQjssvQ?si=KtYAcF-HNlYaAMrb"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center ml-[510px] mb-[138px] cursor-pointer"></div>
          </div>

          {/* Video Description */}
          <div className="mt-14">
            <h1 className="text-xl font-semibold text-gray-600">Description</h1>
            <p className="mt-7 text-slate-500">
              Phasellus enim magna, varius et commodo ut, ultricies vitae velit.
              Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel
              justo. In libero urna, venenatis sit amet ornare non, suscipit nec
              risus. Sed consequat justo non mauris pretium at tempor justo
              sodales. Quisque tincidunt laoreet malesuada. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur.
            </p>
            <p className="mt-7 text-slate-500">
              This course is aimed at people interested in UI/UX Design. We’ll
              start from the very beginning and work all the way through, step
              by step. If you already have some UI/UX Design experience but want
              to get up to speed using Adobe XD then this course is perfect for
              you too!
            </p>
            <p className="mt-7 text-slate-500">
              First, we will go over the differences between UX and UI Design.
              We will look at what our brief for this real-world project is,
              then we will learn about low-fidelity wireframes and how to make
              use of existing UI design kits.
            </p>
          </div>

          {/* why You learn */}
          <div className="mt-14">
            <WhatYouWillLearn />
          </div>
          {/* review */}
          <div className="mt-14">
            <ReviewsSection course={'Web Development'} />
          </div>
        </div>
      </div>

      {/* Modal for Video */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg m-4 pt-0 w-full max-w-3xl">
            <div className="flex justify-end  -mt-9 -mr-[25px] ">
              <button
                onClick={() => setModalOpen(false)}
                className="text-red-500  font-bold text-xl bg-white z-10 pt-[8px] rounded-full p-2  hover:bg-gray-100 transition-colors duration-300 "
              >
                <FaTimes />
              </button>
            </div>

            <iframe
              className="w-full h-64 md:h-96"
              src="https://www.youtube.com/embed/NWnBxQjssvQ?si=KtYAcF-HNlYaAMrb"
              // src="https://www.youtube.com/embed/GxmfcnU3feo?si=_x-11bTZ-Ey_UFbx"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebDevelopment;
