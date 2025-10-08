import React from 'react';
import { FaStar } from 'react-icons/fa';
import img4 from '../../../../Images/category/1.png';
import {
  default as img1
} from '../../../../Images/category/4.png';
import img5 from '../../../../Images/category/5.png';
import img6 from '../../../../Images/category/6.png';
import icon from '../../../../Images/category/icon.png';

import { CiHospital1 } from 'react-icons/ci';
import { FaBook } from 'react-icons/fa';
import { MdOutlineWatchLater } from 'react-icons/md';

const Design = () => {
  return    <div className="grid grid-cols-4 gap-10">
        {/* 1 */}
        <div>
          <div>
            <img src={img1} alt="" />
          </div>
          <div>
            <div>
              <p className="flex items-center gap-2 mt-2 pl-1">
                4.3{' '}
                <span className="text-yellow-600 text-xs flex items-center gap-1">
                  <FaStar /> <FaStar />
                  <FaStar /> <FaStar />
                </span>
                (1991){' '}
              </p>
              <h2 className="text-lg font-semibold text-slate-600 cursor-pointer hover:text-primary">
                Learn Figma - UI/UX Design Essential Training
              </h2>
            </div>
            <div className="flex gap-2 items-center text-sm my-3">
              <div className="flex items-center gap-2">
                <FaBook />
                <p>6 lesson</p>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineWatchLater />
                <p>22h Om</p>
              </div>
              <div className="flex items-center gap-2">
                <CiHospital1 />
                <p>Beginner</p>
              </div>
            </div>
            <hr className="my-1" />
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <img src={icon} alt="" />
                <h1>Jane Cooper</h1>
              </div>
              <div>
                <h1>
                  <span className="line-through">$199</span> $79
                </h1>
              </div>
            </div>
          </div>
        </div>
      
    
        {/* 4 */}
        <div>
          <div>
            <img src={img4} alt="" />
          </div>
          <div>
            <div>
              <p className="flex items-center gap-2 mt-2 pl-1">
                4.3{' '}
                <span className="text-yellow-600 text-xs flex items-center gap-1">
                  <FaStar /> <FaStar />
                  <FaStar /> <FaStar />
                </span>
                (1991){' '}
              </p>
              <h2 className="text-lg font-semibold cursor-pointer hover:text-primary">
                The Ultimate Drawing Course Beginner to Advanced
              </h2>
            </div>
            <div className="flex gap-2 items-center text-sm my-3">
              <div className="flex items-center gap-2">
                <FaBook />
                <p>6 lesson</p>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineWatchLater />
                <p>22h Om</p>
              </div>
              <div className="flex items-center gap-2">
                <CiHospital1 />
                <p>Beginner</p>
              </div>
            </div>
            <hr className="my-1" />
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <img src={icon} alt="" />
                <h1>Jane Cooper</h1>
              </div>
              <div>
                <h1>
                  <span className="line-through">$199</span> $79
                </h1>
              </div>
            </div>
          </div>
        </div>
        {/* 5 */}
        <div>
          <div>
            <img src={img5} alt="" />
          </div>
          <div>
            <div>
              <p className="flex items-center gap-2 mt-2 pl-1">
                4.3{' '}
                <span className="text-yellow-600 text-xs flex items-center gap-1">
                  <FaStar /> <FaStar />
                  <FaStar /> <FaStar />
                </span>
                (1991){' '}
              </p>
              <h2 className="text-lg font-semibold cursor-pointer hover:text-primary">
                Photography Masterclass: A Complete Guide to Photography
              </h2>
            </div>
            <div className="flex gap-2 items-center text-sm my-3">
              <div className="flex items-center gap-2">
                <FaBook />
                <p>6 lesson</p>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineWatchLater />
                <p>22h Om</p>
              </div>
              <div className="flex items-center gap-2">
                <CiHospital1 />
                <p>Beginner</p>
              </div>
            </div>
            <hr className="my-1" />
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <img src={icon} alt="" />
                <h1>Jane Cooper</h1>
              </div>
              <div>
                <h1>
                  <span className="line-through">$199</span> $79
                </h1>
              </div>
            </div>
          </div>
        </div>
   
     
        {/* 6 */}
            <div>
              <div>
                <img src={img6} alt="" />
              </div>
              <div>
                <div>
                  <p className="flex items-center gap-2 mt-2 pl-1">
                    4.3{' '}
                    <span className="text-yellow-600 text-xs flex items-center gap-1">
                      <FaStar /> <FaStar />
                      <FaStar /> <FaStar />
                    </span>
                    (1991){' '}
                  </p>
                  <h2 className="text-lg font-semibold cursor-pointer hover:text-primary">
                    Complete Blender Creator: Learn 3D Modelling for Beginners
                  </h2>
                </div>
                <div className="flex gap-2 items-center text-sm my-3">
                  <div className="flex items-center gap-2">
                    <FaBook />
                    <p>6 lesson</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdOutlineWatchLater />
                    <p>22h Om</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CiHospital1 />
                    <p>Beginner</p>
                  </div>
                </div>
                <hr className="my-1" />
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <img src={icon} alt="" />
                    <h1>Jane Cooper</h1>
                  </div>
                  <div>
                    <h1>
                      <span className="line-through">$199</span> $79
                    </h1>
                  </div>
                </div>
              </div>
            </div>
      </div>;
};

export default Design;
