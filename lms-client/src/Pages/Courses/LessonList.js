import React from 'react';

const LessonCard = ({ image, title, date, location }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        {/* Meta Data */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m0 0a5 5 0 1110 0m-5 0v4m-3 3h6m-6 4h6m-6 4h6"
              />
            </svg>
            {date}
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657a8 8 0 01-11.314 0m11.314-2.828a8 8 0 01-11.314 0m5.657-5.657a5.373 5.373 0 01-.632-.736"
              />
            </svg>
            {location}
          </div>
        </div>
        {/* Button */}
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
};

// Example usage
const LessonList = () => {
  return (
    <div className="container mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <LessonCard
        image="https://via.placeholder.com/300x200"
        title="Educational technology and mobile learning"
        date="6 April, 2022"
        location="London, UK"
      />
      <LessonCard
        image="https://via.placeholder.com/300x200"
        title="We are changing the way the world learns"
        date="6 April, 2022"
        location="London, UK"
      />
      <LessonCard
        image="https://via.placeholder.com/300x200"
        title="Guide to visas and funding to study in the UK"
        date="6 April, 2022"
        location="London, UK"
      />
    </div>
  );
};

export default LessonList;
