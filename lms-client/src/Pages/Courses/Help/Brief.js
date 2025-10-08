import React, { useEffect, useState } from 'react';
import { FaPlayCircle, FaTimes } from 'react-icons/fa';

const Brief = ({ course, onDown }) => {
  const [activeLesson, setActiveLesson] = useState(null);
  const [courseContent, setCourseContent] = useState([]);
  const [isModalOpen1, setModalOpen1] = useState(false);
  const [uIdData, setIdData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/classCourse/${course}`)
      .then(res => res.json())
      .then(data => setCourseContent(data));
  }, [courseContent, course]);

  const handleModal = id => {
    onDown();
    fetch(`http://localhost:5000/classId/${id}`)
      .then(res => res.json())
      .then(data => {
        setIdData(data);
        setModalOpen1(true);
      });
  };
  const filteredCourses = courseContent.filter(
    course => course.content === 'Brief'
  );
  return (
    <div className="p-4">
      <ul className="space-y-4">
        {filteredCourses.map((lesson, index) => (
          <li
            key={index}
            className={`flex flex-col p-3 rounded-lg border ${
              activeLesson === index
                ? 'bg-blue-100 border-blue-500'
                : 'bg-gray-50 border-gray-300'
            }`}
            onClick={() => setActiveLesson(index)}
          >
            <div className="grid grid-cols-12 gap-3  w-100% ">
              <div className="col-span-1  text-xl text-slate-400 ">
                <FaPlayCircle />
              </div>
              <div className="col-span-11">
                <div className="flex items-center justify-between text-sm font-medium text-gray-800">
                  <h1>
                    {index + 1}.
                    <span className="ml-1">{lesson?.classNames}</span>
                  </h1>

                  {/* <span className="text-blue-500">{lesson.time}</span> */}
                  <span className="text-blue-500">03:65</span>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      handleModal(lesson?._id);
                    }}
                    className="text-xs text-blue-500 text-center hover:underline mt-2"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for Video */}
      {isModalOpen1 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg m-4 pt-0 w-full max-w-3xl">
            <div className="flex justify-end  -mt-9 -mr-[25px] ">
              <button
                onClick={() => setModalOpen1(false)}
                className="text-red-500  font-bold text-xl pt-[8px] bg-white z-10 rounded-full p-2  hover:bg-gray-100 transition-colors duration-300 "
              >
                <FaTimes />
              </button>
            </div>

            <iframe
              className="w-full h-64 md:h-96"
              src={uIdData?.videoUrl}
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

export default Brief;
