import React from 'react';
import { BsDot } from 'react-icons/bs';
import { IoIosCheckmark } from 'react-icons/io';

const WhatYouWillLearn = () => {
  return (
    <div className="text-slate-500">
      <div>
        <h1 className="text-xl font-semibold text-slate-700">
          What you'll learn
        </h1>
      </div>
      <div className="text-slate-500 mt-5 grid grid-cols-1 md:grid-cols-2 gap-10 p-2">
        <div className="space-y-5">
          <h2 className="flex gap-3 items-center">
            <IoIosCheckmark className="text-black border-slate-400 border rounded-full" />{' '}
            Become a UX designer.
          </h2>
          <h2 className="flex gap-3 items-center mt-5">
            <IoIosCheckmark className="text-black border-slate-400 border rounded-full" />{' '}
            You will be able to add UX <br /> designer to your CV
          </h2>
          <h2 className="flex gap-3 items-center mt-5">
            <IoIosCheckmark className="text-black border-slate-400 border rounded-full" />{' '}
            Become a UI designer.
          </h2>
          <h2 className="flex gap-3 items-center mt-5">
            <IoIosCheckmark className="text-black border-slate-400 border rounded-full" />{' '}
            Build & test a full website design.
          </h2>
          <h2 className="flex gap-3 items-center mt-5">
            <IoIosCheckmark className="text-black border-slate-400 border rounded-full" />{' '}
            Create your first UX brief & persona.
          </h2>
          <h2 className="flex gap-3 items-center mt-5">
            <IoIosCheckmark className="text-black border-slate-400 border rounded-full" />{' '}
            How to use premade UI kits.
          </h2>
        </div>
        <div className="space-y-5">
          <h2 className="flex gap-3 items-center">
            <IoIosCheckmark className="text-black border-slate-400 border rounded-full" />{' '}
            Create quick wireframes.
          </h2>
          <h2 className="flex gap-3 items-center mt-5">
            <IoIosCheckmark className="text-black border-slate-400 border rounded-full" />{' '}
            Downloadable exercise files
          </h2>
          <h2 className="flex gap-3 items-center mt-5">
            <IoIosCheckmark className="text-black border-slate-400 border rounded-full" />{' '}
            Build a UX project from <br /> beginning to end.
          </h2>
          <h2 className="flex gap-3 items-center mt-5">
            <IoIosCheckmark className="text-black border-slate-400 border rounded-full" />{' '}
            Learn to design websites <br /> & mobile phone apps.
          </h2>
          <h2 className="flex gap-3 items-center mt-5">
            <IoIosCheckmark className="text-black border-slate-400 border rounded-full" />{' '}
            All the techniques used by <br /> UX professionals
          </h2>
          <h2 className="flex gap-3 items-center mt-5">
            <IoIosCheckmark className="text-black border-slate-400 border rounded-full" />{' '}
            You will be able to talk <br /> correctly with other UX design.
          </h2>
        </div>
      </div>
      {/*Requirements  */}
      <div>
        <h1 className=" text-slate-700 font-semibold text-xl">Requirements</h1>
        <h2 className="flex gap-3 mt-5 items-center">
          <BsDot className="text-xl text-black" />
          You will need a copy of Adobe XD 2019 or above. A free trial can be
          downloaded from Adobe.
        </h2>
        <h2 className="flex gap-3 mt-5 items-center">
          <BsDot className="text-xl text-black" />
          No previous design experience is needed.
        </h2>
        <h2 className="flex gap-3 mt-5 items-center">
          <BsDot className="text-xl text-black" />
          No previous Adobe XD skills are needed.
        </h2>
        <h2 className="flex gap-3 mt-5 items-center">
          <BsDot className="text-xl text-black" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
          molestiae?
        </h2>
      </div>
    </div>
  );
};

export default WhatYouWillLearn;