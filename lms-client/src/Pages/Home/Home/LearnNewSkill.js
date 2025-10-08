

import { useState } from 'react';
import { FaBookReader, FaIdCardAlt, FaStar } from 'react-icons/fa';
import { FiYoutube } from 'react-icons/fi';
import { GiBlackBelt } from 'react-icons/gi';
import { PiGraduationCapLight } from 'react-icons/pi';
import img1 from '../../../Images/Home/about/1.png';
import img2 from '../../../Images/Home/about/2.png';
import img3 from '../../../Images/Home/about/3.png';
import bg from '../../../Images/Home/background/bg.png';
import head from '../../../Images/Home/New/4.png';

const LearnNewSkill = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize the position
    const normalizedX = (x / rect.width - 0.5) * 20;
    const normalizedY = (y / rect.height - 0.5) * 20;

    setPosition({ x: normalizedX, y: normalizedY });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '700px',
        width: '100%',
      }}
    >
      {/* <hr className="mx-4 border-slate-500" /> */}
      <div className="grid grid-cols-12 text-white">
        {/* 1st part */}

        <div className="col-span-7 pt-32 pl-10">
          <div>
            <h1 className="text-6xl mb-5 font-bold">
              Learn New Skills Online{' '}
            </h1>
            <h1 className="text-6xl mb-5 font-bold">
              with Top{' '}
              <span className="text-secondary underline">HandiLearn</span>
            </h1>
            <p className="text-lg mt-2">
              Build skills with courses, certificates, and degrees online from
            </p>
            <p className="text-lg mt-2">
              {' '}
              world-class universities and companies.
            </p>
          </div>
          <div className="">
            <button className="btn btn-primary mr-7 mt-8 text-white px-10">
              Join For Free
            </button>
            <button className="btn btn-secondary btn-outline px-10">
              Find Courses
            </button>
          </div>
          <div className="grid grid-cols-2 mt-32">
            <div className="flex items-center gap-2">
              <PiGraduationCapLight className="text-xl" />
              <p>Over 12 million students</p>
            </div>
            <div className="flex items-center gap-2">
              <FiYoutube className="text-xl" />
              <p>More than 60,000 courses</p>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <FaBookReader className="text-xl" />
              <p>More than 60,000 courses</p>
            </div>
          </div>
        </div>

        {/* 2nd part */}
        <div
          className="col-span-5 flex gap-10 pr-5 mt-20 relative"
          onMouseMove={handleMouseMove}
        >
          <div
            className="flex items-center transform transition-transform"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
            }}
          >
            <img src={img1} alt="Image 1" />
          </div>

          <div>
            <img
              className="mb-8 transform transition-transform h-[260px]"
              src={img2}
              alt="Image 2"
              style={{
                transform: `translate(${-position.x}px, ${-position.y}px)`,
              }}
            />
            <img
              className="transform transition-transform h-[260px]"
              src={img3}
              alt="Image 3"
              style={{
                transform: `translate(${position.y}px, ${-position.x}px)`,
              }}
            />
          </div>

          {/* Card Sections */}
          <div className="absolute right-28 top-40">
            <div className="transform transition-transform hover:scale-105 bg-white h-20 text-black px-5 py-2 rounded-lg shadow-lg">
              <div className="flex items-center gap-5">
                <img
                  className="h-14 w-14 rounded-full"
                  src={head}
                  alt="Ali Tufan"
                />
                <div>
                  <h2 className="text-lg font-semibold">Ali Tufan</h2>
                  <p className="text-sm text-gray-500">UX/UI Designer</p>
                  <p className="flex gap-1 text-yellow-600 text-sm">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute right-[450px] top-96">
            <div className="transform transition-transform hover:scale-105 bg-white h-20 w-60 text-black px-5 py-2 rounded-lg shadow-lg">
              <div className="flex items-center gap-5">
                <div className="bg-red-300 p-2 rounded-full mt-2">
                  <FaIdCardAlt className="text-2xl text-red-700 " />
                </div>
                <div>
                  <h2 className="text-lg text-yellow-700">3.000 +</h2>
                  <p className="text-sm text-gray-500">Free Courses</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute right-[50px] top-[500px]">
            <div className="transform transition-transform hover:scale-105 bg-white h-20 w-64 text-black px-5 py-2 rounded-lg shadow-lg">
              <div className="flex items-center gap-5">
                <div className="bg-primary text-2xl p-2 rounded-full mt-2 text-white absolute -left-4 -top-8">
                  <GiBlackBelt />
                </div>
                <div>
                  <h2 className="text-lg text-primary">Congrats!</h2>
                  <p className="text-sm text-gray-500">
                    our Admission Completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnNewSkill;










// import React, { useState } from 'react';
// import { FaBookReader, FaIdCardAlt, FaStar } from 'react-icons/fa';
// import { FiYoutube } from 'react-icons/fi';
// import { GiBlackBelt } from 'react-icons/gi';
// import { PiGraduationCapLight } from 'react-icons/pi';
// import img1 from '../../../Images/Home/about/1.png';
// import img2 from '../../../Images/Home/about/2.png';
// import img3 from '../../../Images/Home/about/3.png';
// import bg from '../../../Images/Home/background/bg.png';
// import head from '../../../Images/Home/Home Icon/2.png';


// const LearnNewSkill = () => {
//    const [position, setPosition] = useState({ x: 0, y: 0 });

//    const handleMouseMove = e => {
//      const rect = e.currentTarget.getBoundingClientRect();
//      const x = e.clientX - rect.left; // Mouse X relative to container
//      const y = e.clientY - rect.top; // Mouse Y relative to container

//      // Normalize the position (optional adjustment factor)
//      const normalizedX = (x / rect.width - 0.5) * 20; // Scale position
//      const normalizedY = (y / rect.height - 0.5) * 20;

//      setPosition({ x: normalizedX, y: normalizedY });
//    };
//   return (
//     <div
//       style={{
//         backgroundImage: `url(${bg})`,
//         backgroundSize: 'cover', // Optional: To cover the entire div
//         backgroundRepeat: 'no-repeat', // Optional: Prevent image repetition
//         height: '700px', // Example: Set height
//         width: '100%', // Example: Full-width
//       }}
//     >
//       <hr className="mx-4 border-slate-500" />
//       <div className="grid grid-cols-12 text-white">
//         {/* 1st part */}
//         <div className="col-span-7 pt-32 pl-10">
//           <div>
//             <h1 className="text-6xl mb-5 font-bold">
//               Learn New Skills Online{' '}
//             </h1>
//             <h1 className="text-6xl mb-5 font-bold">
//               with Top{' '}
//               <span className="text-secondary underline">Educators</span>
//             </h1>
//             <p className="text-lg mt-2">
//               Build skills with courses, certificates, and degrees online from
//             </p>
//             <p className="text-lg mt-2">
//               {' '}
//               world-class universities and companies.
//             </p>
//           </div>
//           {/* 1-> second */}
//           <div className="">
//             <button className="btn btn-primary mr-7 mt-8 text-white px-10">
//               Join For Free
//             </button>
//             <button className="btn btn-secondary  btn-outline px-10">
//               Find Courses
//             </button>
//           </div>

//           {/* last part  */}
//           <div className="grid grid-cols-2 mt-32">
//             <div className="flex items-center gap-2">
//               <PiGraduationCapLight className="text-xl" />
//               <p>Over 12 million students</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <FiYoutube className="text-xl" />
//               <p>More than 60,000 courses</p>
//             </div>
//             <div className="flex items-center gap-2 mt-3">
//               <FaBookReader className="text-xl" />
//               <p>More than 60,000 courses</p>
//             </div>
//           </div>
//         </div>

//         {/* second part */}

//         <div
//           className="col-span-5 flex gap-10 pr-5 mt-20 relative"
//           onMouseMove={handleMouseMove}
//         >
//           {/* First Image */}
//           <div
//             className="flex items-center transform transition-transform"
//             style={{
//               transform: `translate(${position.x}px, ${position.y}px)`,
//             }}
//           >
//             <img src={img1} alt="Image 1" />
//           </div>

//           {/* Second Column of Images */}
//           <div>
//             {/* Top Image */}
//             <img
//               className="mb-8 transform transition-transform h-[260px]"
//               src={img2}
//               alt="Image 2"
//               style={{
//                 transform: `translate(${-position.x}px, ${-position.y}px)`,
//               }}
//             />
//             {/* Bottom Image */}
//             <img
//               className="transform transition-transform h-[260px]"
//               src={img3}
//               alt="Image 3"
//               style={{
//                 transform: `translate(${position.y}px, ${-position.x}px)`,
//               }}
//             />
//           </div>
//           {/* ai tufan */}
//           <div className="transform transition-transform bg-white h-20 text-black absolute right-28 top-40 z-50 w-64 px-5 py-2 rounded-lg shadow-lg">
//             <div className="flex items-center gap-5">
//               <img
//                 className="h-14 w-14 rounded-full"
//                 src={head}
//                 alt="Ali Tufan"
//               />
//               <div>
//                 <h2 className="text-lg font-semibold">Ali Tufan</h2>
//                 <p className="text-sm text-gray-500">UX/UI Designer</p>
//                 <p className="flex gap-1 text-yellow-600 text-sm">
//                   <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
//                 </p>
//               </div>
//             </div>
//           </div>
//           {/* free course */}
//           <div className="transform transition-transform bg-white h-20 text-black absolute right-[450px] top-96 z-50 w-64 px-5 py-2 rounded-lg shadow-lg">
//             <div className="flex items-center gap-5">
//               <div className="bg-red-300 p-2 rounded-full mt-2">
//                 <FaIdCardAlt className="text-2xl text-red-700 " />
//               </div>
//               <div>
//                 <h2 className="text-lg text-yellow-700">3.000 +</h2>
//                 <p className="text-sm text-gray-500">Free Courses</p>
//               </div>
//             </div>
//           </div>
//           {/* congrats */}
//           <div className="transform transition-transform bg-white h-20 text-black absolute right-[50px] top-[500px] z-30 w-64 px-5 py-2 rounded-lg shadow-lg">
//             <div className="flex items-center gap-5">
//               <div className='bg-primary text-2xl p-2 rounded-full mt-2 text-white absolute -left-4 -top-8'>
//                 <GiBlackBelt />
//               </div>
//               <div>
//                 <h2 className="text-lg text-primary">Congrats!</h2>
//                 <p className="text-sm text-gray-500">our Admission Completed</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LearnNewSkill;