import React, { useState } from 'react';
import { default as Icon1, default as Icon5 } from '../../../Images/Home/Icon/1.png';
import { default as Icon2, default as Icon6 } from '../../../Images/Home/Icon/2.png';
import Icon3 from '../../../Images/Home/Icon/3.png';
import Icon4 from '../../../Images/Home/Icon/4.png';



const categories = [
  {
    title: 'Design Creative',
    courses: 'Web Designer',
    icon: Icon1, // Replace with actual image/icon URL
  },
  {
    title: 'Sales Marketing',
    courses: 'President Of Sales',
    icon: Icon2, // Replace with actual image/icon URL
  },
  {
    title: 'Development IT',
    courses: 'Nursing Assistant',
    icon: Icon3, // Replace with actual image/icon URL
  },
  {
    title: 'Engineering Architecture',
    courses: 'Web Designer',
    icon: Icon4, // Replace with actual image/icon URL
  },
  {
    title: 'Personal Development',
    courses: 'Web Designer',
    icon: Icon5, // Replace with actual image/icon URL
  },
  {
    title: 'Finance Accounting',
    courses: 'Web Designer',
    icon: Icon6, // Replace with actual image/icon URL
  },
  {
    title: 'Sales Marketing',
    courses: 'Web Designer',
    icon: Icon2, // Replace with actual image/icon URL
  },
  {
    title: 'Design Creative',
    courses: 'Web Designer',
    icon: Icon1, // Replace with actual image/icon URL
  },
  {
    title: 'Development IT',
    courses: 'Web Designer',
    icon: Icon3, // Replace with actual image/icon URL
  },
  {
    title: 'Engineering Architecture',
    courses: 'Web Designer',
    icon: Icon4, // Replace with actual image/icon URL
  },
];

const WhatPeopleSay = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Helper functions for navigation
  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? categories.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrentIndex(prev => (prev === categories.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className=" bg-primary">
      <div className="">
        <div className="text-center py-10">
          <h1 className="text-3xl font-bold text-secondary mb-3">
            What People Say
          </h1>
          <h1 className="text-slate-200">
            Lorem ipsum dolor sit amet, consectetur.
          </h1>
        </div>
        <div>
          <div className="max-w-screen-xl mx-auto py-10">
            <div className="relative flex items-center">
              {/* Left Arrow */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-purple-200 hover:bg-purple-300 text-purple-800 rounded-full p-2 shadow-lg"
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
                      data-aos="zoom-in"
                      key={index}
                      className="flex-none w-full sm:w-1/3 md:w-1/4 px-4"
                    >
                      <div className="bg-white hover:bg-neutral hover:text-slate-50 cursor-pointer rounded-lg shadow-lg p-6 ">
                        <div>
                          <h1 className="my-2 text-primary text-xl">
                            Great Work
                          </h1>
                          <p>
                            I think Educrat is the best theme I ever seen this
                            year. Amazing design, eassy to customize and design
                            quality supelative account on its cloud platfrom for
                            the opatimized performance.
                          </p>
                        </div>
                        <hr className=" my-4 " />
                        <div className="flex  gap-3">
                          <img
                            src={category?.icon}
                            alt={category.title}
                            className="w-12 h-12 p-1  mb-4 bg-white  rounded-full"
                          />
                          <div>
                            <h3 className=" font-semibold ">
                              {category.title}
                            </h3>
                            <p className="text-sm"> {category.courses} </p>
                          </div>
                        </div>

                        <div className="flex justify-center mt-1 text-sm">
                          {/* <p className=" mt-2 w-12 ">{category.courses}</p> */}
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
          <div
            data-aos="fade-up"
            data-aos-duration="3000"
            className="flex justify-between gap-10 mt-10 mx-32 pt-28 pb-20 text-center"
          >
            <div>
              <h1 className="text-4xl font-semibold text-secondary">
                350,000+
              </h1>
              <p className="text-slate-200 text-center">Students worldwide</p>
            </div>
            <div>
              <h1 className="text-4xl font-semibold text-secondary">
                496,000+
              </h1>
              <p className="text-slate-200 text-center">Total course views</p>
            </div>
            <div>
              <h1 className="text-4xl font-semibold text-secondary">19,000+</h1>
              <p className="text-slate-200 text-center">
                Five-star course reviews
              </p>
            </div>
            <div>
              <h1 className="text-4xl font-semibold text-secondary">
                987,000+
              </h1>
              <p className="text-slate-200 text-center">Students community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatPeopleSay;
