import React, { useState } from 'react';
import Icon1 from '../../../Images/Top category/1.svg';
import Icon2 from '../../../Images/Top category/2.svg';
import Icon3 from '../../../Images/Top category/3.svg';
import Icon4 from '../../../Images/Top category/4.svg';
import Icon5 from '../../../Images/Top category/5.svg';
import Icon6 from '../../../Images/Top category/6.svg';
const categories = [
  {
    title: 'Design Creative',
    courses: '573+ Courses',
    icon: Icon1, // Replace with actual image/icon URL
  },
  {
    title: 'Sales Marketing',
    courses: '565+ Courses',
    icon: Icon2, // Replace with actual image/icon URL
  },
  {
    title: 'Development IT',
    courses: '126+ Courses',
    icon: Icon3, // Replace with actual image/icon URL
  },
  {
    title: 'Engineering Architecture',
    courses: '35+ Courses',
    icon: Icon4, // Replace with actual image/icon URL
  },
  {
    title: 'Personal Development',
    courses: '908+ Courses',
    icon: Icon5, // Replace with actual image/icon URL
  },
  {
    title: 'Finance Accounting',
    courses: '129+ Courses',
    icon: Icon6, // Replace with actual image/icon URL
  },
  {
    title: 'Sales Marketing',
    courses: '565+ Courses',
    icon: Icon2, // Replace with actual image/icon URL
  },
  {
    title: 'Design Creative',
    courses: '573+ Courses',
    icon: Icon1, // Replace with actual image/icon URL
  },
  {
    title: 'Development IT',
    courses: '126+ Courses',
    icon: Icon3, // Replace with actual image/icon URL
  },
  {
    title: 'Engineering Architecture',
    courses: '35+ Courses',
    icon: Icon4, // Replace with actual image/icon URL
  },
];

const TopCategories = () => {

 const [currentIndex, setCurrentIndex] = useState(0);

 // Helper functions for navigation
 const prevSlide = () => {
   setCurrentIndex(prev => (prev === 0 ? categories.length - 1 : prev - 1));
 };
    const nextSlide = () => {
      setCurrentIndex(prev => (prev === categories.length - 1 ? 0 : prev + 1));
    };
  return (
    <div data-aos="fade-left" data-aos-duration="3000" className="mx-28">
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold text-slate-700 mb-3">
          Top Categories
        </h1>
        <h1 className="text-slate-400">
          Lorem ipsum dolor sit amet, consectetur.
        </h1>
      </div>
      <div>
        <div className="max-w-screen-xl mx-auto py-10">
          <div className="relative flex items-center">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-purple-200 hover:bg-purple-300 text-purple-800 rounded-full p-2 shadow-lg"
            >
              &#8592;
            </button>

            {/* Carousel Wrapper */}
            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex-none w-full sm:w-1/3 md:w-1/6 px-4"
                  >
                    <div className="bg-gray-200 hover:bg-neutral hover:text-slate-50 cursor-pointer rounded-lg shadow-lg p-6 text-center">
                      <img
                        src={category?.icon}
                        alt={category.title}
                        className="w-24 h-24 mx-auto mb-4 bg-white p-6 rounded-full"
                      />
                      <h3 className="text-xl font-semibold ">
                        {category.title}
                      </h3>
                      <div className="flex justify-center mt-1 text-sm">
                        <p className=" mt-2 w-12 ">{category.courses}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-200 hover:bg-purple-300 text-purple-800 rounded-full p-2 shadow-lg"
            >
              &#8594;
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-4">
            {categories.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${
                  index === currentIndex
                    ? 'bg-purple-500'
                    : 'bg-purple-200 hover:bg-purple-300'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
