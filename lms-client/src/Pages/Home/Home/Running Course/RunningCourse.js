import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CiHospital1 } from 'react-icons/ci';
import { FaBook, FaStar } from 'react-icons/fa';
import { MdOutlineWatchLater } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import auth from '../../../../firebase.init';

import img2 from '../../../../Images/category/2.png';
import img3 from '../../../../Images/category/3.png';
import img1 from '../../../../Images/category/4.png';
import icon from '../../../../Images/category/icon.png';

const RunningCourse = ({ search }) => {
  const [users] = useAuthState(auth);
  const [user, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigator = useNavigate();

  useEffect(() => {
    if (users?.email) {
      fetch(`http://localhost:5000/user/${users.email}`)
        .then(res => res.json())
        .then(data => setUsers(data));
    }
  }, [users]);

  const courses = [
    {
      id: 'web',
      title: 'Learn Web Development',
      img: img1,
      lessons: 9,
      duration: '22h',
      price: 8100,
      category: 'technology',
      originalPrice: 19900,
      paymentHandler: id => navigator(`/webPayment/${id}`),
    },
    {
      id: 'data',
      title: 'Data Science',
      img: img2,
      lessons: 6,
      duration: '24h',
      category: 'technology',
      price: 8900,
      originalPrice: 19900,
      paymentHandler: id => navigator(`/dataPayment/${id}`),
    },
    {
      id: 'graphic',
      title: 'Graphic Design',
      img: img3,
      lessons: 12,
      duration: '44h',
      category: 'design',
      price: 9900,
      originalPrice: 19900,
      paymentHandler: id => navigator(`/graphicPayment/${id}`),
    },
    {
      id: 'mobile',
      title: 'Mobile App Development',
      img: 'https://static.vecteezy.com/system/resources/thumbnails/005/877/546/small_2x/app-development-modern-flat-concept-for-web-banner-design-male-designer-works-on-laptop-develops-usability-program-interface-and-places-menu-buttons-illustration-with-isolated-people-scene-vector.jpg',
      lessons: 18,
      duration: '56h',
      category: 'technology',
      price: 26900,
      originalPrice: 29900,
      paymentHandler: id => navigator(`/mobilePayment/${id}`),
    },
    {
      id: 'Digital Marketing',
      title: 'Digital Marketing',
      img: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/What_is_digital_marketing.jpg',
      lessons: 17,
      duration: '64h',
      category: 'marketing',
      price: 19900,
      originalPrice: 21900,
      paymentHandler: id => navigator(`/digitalPayment/${id}`),
    },
    {
      id: 'finance',
      title: 'Finance & Accounting',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4PtLKo4qRWiXiBqGwgkz2o4X-2KpzJZvbvg&s',
      lessons: 20,
      duration: '66h',
      category: 'marketing',
      price: 11900,
      originalPrice: 20000,
      paymentHandler: id => navigator(`/financePayment/${id}`),
    },
  ];

  // 🔍 Filter by category and search term
  const filteredCourses = courses.filter(course => {
    const matchCategory =
      selectedCategory === 'all' || course.category === selectedCategory;
    const matchSearch = course.title
      .toLowerCase()
      .includes(search?.toLowerCase() || '');
    return matchCategory && matchSearch;
  });

  // All available unique categories
  const categories = ['all', ...new Set(courses.map(c => c.category))];

  return (
    <div className="w-full md:mx-10 lg:mx-18">
      {/* 🧭 Category Filter */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-indigo-50'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* 🏫 Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <div key={course.id} className="bg-white p-4 rounded-md shadow-md">
              <div>
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-52 rounded-lg object-cover"
                />
              </div>
              <div>
                <p className="flex items-center gap-2 mt-2">
                  4.3{' '}
                  <span className="text-yellow-600 text-xs flex items-center gap-1">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar />
                  </span>
                  (1990)
                </p>
                <h2 className="text-lg font-semibold text-slate-600">
                  {course.title}
                </h2>
              </div>
              <div className="flex gap-2 items-center text-xs my-3">
                <div className="flex items-center gap-2">
                  <FaBook />
                  <p>{course.lessons} lessons</p>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineWatchLater />
                  <p>{course.duration}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CiHospital1 />
                  <p>Beginner</p>
                </div>
              </div>
              <hr className="my-1" />
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  <img src={icon} alt="Instructor" />
                  <h1>Jane Cooper</h1>
                </div>
                <div>
                  <h1>
                    <span className="line-through">
                      ৳{course.originalPrice}
                    </span>{' '}
                    ৳{course.price}
                  </h1>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                {users ? (
                  <button
                    onClick={() => course.paymentHandler(user[0]?._id)}
                    className="btn btn-secondary btn-sm"
                  >
                    Buy Now
                  </button>
                ) : (
                  <button
                    disabled
                    className="btn btn-secondary btn-sm hover:cursor-not-allowed relative group"
                  >
                    Buy Now
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">
                      Login first
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500 text-xl">No courses found</p>
        )}
      </div>
    </div>
  );
};

export default RunningCourse;








// import React, { useEffect, useState } from 'react';
// import { FaStar } from 'react-icons/fa';
// import {
//   default as img2
// } from '../../../../Images/category/2.png';
// import img3 from '../../../../Images/category/3.png';
// import {
//   default as img1
// } from '../../../../Images/category/4.png';
// import icon from '../../../../Images/category/icon.png';

// import { useAuthState } from 'react-firebase-hooks/auth';
// import { CiHospital1 } from 'react-icons/ci';
// import { FaBook } from 'react-icons/fa';
// import { MdOutlineWatchLater } from 'react-icons/md';
// import { useNavigate } from 'react-router-dom';
// import auth from '../../../../firebase.init';

// const RunningCourse = () => {
//   const [users] = useAuthState(auth);
//   const [user, setUsers] = useState([]);
//   const navigator = useNavigate()
//   console.log(users)

//    useEffect(() => {
//      fetch(`http://localhost:5000/user/৳{users?.email}`)
//        .then(res => res.json())
//        .then(data => setUsers(data));
//    }, [users, users?.email]);
//   // console.log(user[0]?._id)

//   const handleWebPayment = (id) => {

//     navigator(`/webPayment/${id}`);
//   }
//   const handleDataPayment = (id) => {

//     navigator(`/dataPayment/${id}`);
//   }
//   const handleGraphicPayment = (id) => {

//     navigator(`/graphicPayment/${id}`);
//   }
//   return (
//     <div className="grid grid-cols-4 gap-10  w-full md:mx-20 lg:mx-24">
//       {/* 1 */}

//       <div>
//         <div>
//           <img src={img1} alt="" />
//         </div>
//         <div>
//           <div>
//             <p className="flex items-center gap-2 mt-2 pl-1">
//               4.3{' '}
//               <span className="text-yellow-600 text-xs flex items-center gap-1">
//                 <FaStar /> <FaStar />
//                 <FaStar /> <FaStar />
//               </span>
//               (1990){' '}
//             </p>
//             <h2 className="text-lg font-semibold text-slate-600 cursor-pointer hover:text-primary">
//               Learn Web Development
//             </h2>
//           </div>
//           <div className="flex gap-2 items-center text-xs my-3">
//             <div className="flex items-center gap-2">
//               <FaBook />
//               <p>9 lesson</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <MdOutlineWatchLater />
//               <p>22h Om</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <CiHospital1 />
//               <p>Beginner</p>
//             </div>
//           </div>
//           <hr className="my-1" />
//           <div className="flex justify-between items-center mt-2">
//             <div className="flex items-center gap-2">
//               <img src={icon} alt="" />
//               <h1>Jane Cooper</h1>
//             </div>
//             <div>
//               <h1>
//                 <span className="line-through">$199</span> $79
//               </h1>
//             </div>
//           </div>
//         </div>
//         <div className="mt-2 flex justify-end">
//           {users ? (
//             <button
//               onClick={() => handleWebPayment(user[0]?._id)}
//               className="btn btn-secondary btn-sm"
//             >
//               Buy Now
//             </button>
//           ) : (
//             <button
//               disabled
//               className="btn btn-secondary btn-sm hover:cursor-not-allowed relative group"
//             >
//               Buy Now
//               <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">
//                 Login first
//               </span>
//             </button>
//           )}
//         </div>
//       </div>
//       {/* 2 */}
//       <div>
//         <div>
//           <img src={img2} alt="" />
//         </div>
//         <div>
//           <div>
//             <p className="flex items-center gap-2 mt-2 pl-1">
//               4.3{' '}
//               <span className="text-yellow-600 text-xs flex items-center gap-1">
//                 <FaStar /> <FaStar />
//                 <FaStar /> <FaStar />
//               </span>
//               (1991){' '}
//             </p>
//             <h2 className="text-lg font-semibold cursor-pointer hover:text-primary">
//               Data Science
//             </h2>
//           </div>
//           <div className="flex gap-2 items-center text-xs my-3">
//             <div className="flex items-center gap-2">
//               <FaBook />
//               <p>6 lesson</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <MdOutlineWatchLater />
//               <p>24h Om</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <CiHospital1 />
//               <p>Beginner</p>
//             </div>
//           </div>
//           <hr className="my-1" />
//           <div className="flex justify-between items-center mt-2">
//             <div className="flex items-center gap-2">
//               <img src={icon} alt="" />
//               <h1>Jane Cooper</h1>
//             </div>
//             <div>
//               <h1>
//                 <span className="line-through">$199</span> $89
//               </h1>
//             </div>
//           </div>
//         </div>
//         <div className="mt-2 flex justify-end">
//           <div className="mt-2 flex justify-end">
//             {users ? (
//               <button
//                 onClick={() => handleDataPayment(user[0]?._id)}
//                 className="btn btn-secondary btn-sm"
//               >
//                 Buy Now
//               </button>
//             ) : (
//               <button
//                 disabled
//                 className="btn btn-secondary btn-sm hover:cursor-not-allowed relative group"
//               >
//                 Buy Now
//                 <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">
//                   Login first
//                 </span>
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* 3 */}
//       <div>
//         <div>
//           <img src={img3} alt="" />
//         </div>
//         <div>
//           <div>
//             <p className="flex items-center gap-2 mt-2 pl-1">
//               4.3{' '}
//               <span className="text-yellow-600 text-xs flex items-center gap-1">
//                 <FaStar /> <FaStar />
//                 <FaStar /> <FaStar />
//               </span>
//               (1991){' '}
//             </p>
//             <h2 className="text-lg font-semibold cursor-pointer hover:text-primary">
//               Graphic Design
//             </h2>
//           </div>
//           <div className="flex gap-2 items-center text-xs my-3">
//             <div className="flex items-center gap-2">
//               <FaBook />
//               <p>7 lesson</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <MdOutlineWatchLater />
//               <p>44h Om</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <CiHospital1 />
//               <p>Beginner</p>
//             </div>
//           </div>
//           <hr className="my-1" />
//           <div className="flex justify-between items-center mt-2">
//             <div className="flex items-center gap-2">
//               <img src={icon} alt="" />
//               <h1>Jane Cooper</h1>
//             </div>
//             <div>
//               <h1>
//                 <span className="line-through">$199</span> $99
//               </h1>
//             </div>
//           </div>
//         </div>
//         <div className="mt-2 flex justify-end">
//           <div className="mt-2 flex justify-end">
//             {users ? (
//               <button
//                 onClick={() => handleGraphicPayment(user[0]?._id)}
//                 className="btn btn-secondary btn-sm"
//               >
//                 Buy Now
//               </button>
//             ) : (
//               <button
//                 disabled
//                 className="btn btn-secondary btn-sm hover:cursor-not-allowed relative group"
//               >
//                 Buy Now
//                 <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">
//                   Login first
//                 </span>
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RunningCourse;
