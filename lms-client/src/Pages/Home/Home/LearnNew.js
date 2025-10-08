import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import img from '../../../Images/Home/about/1.png';

const LearnNew = () => {
  return (
    <div className="mx-28 my-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mr-24">
            <h1 className="text-5xl font-bold mb-6">
              <span className="text-primary">Learn</span> new skills when and
              where you like
            </h1>
            <p>
              Use the list below to bring attention to your product’s key
              differentiator.
            </p>
          </div>
          <div>
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              className="flex items-center gap-3 mt-4"
            >
              <div className="bg-primary text-white p-1 rounded-full">
                <FaCheck />
              </div>
              <p> Hand-picked authors</p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              className="flex items-center gap-3 mt-4"
            >
              <div className="bg-primary text-white p-1 rounded-full">
                <FaCheck />
              </div>
              <p> Easy to follow curriculum</p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              className="flex items-center gap-3 mt-4"
            >
              <div className="bg-primary text-white p-1 rounded-full">
                <FaCheck />
              </div>
              <p> Free courses</p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              className="flex items-center gap-3 mt-4"
            >
              <div className="bg-primary text-white p-1 rounded-full">
                <FaCheck />
              </div>
              <p> Money-back guarantee</p>
            </div>

            <div >
              <button className="btn btn-neutral mb-5 mt-12 text-white px-10">
                Join Free
              </button>
            </div>
          </div>
        </div>

        {/* second div */}
        <div className='flex justify-center md:ml-20'>
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LearnNew;