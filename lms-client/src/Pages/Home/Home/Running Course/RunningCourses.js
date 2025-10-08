import React from 'react';
import RunningCourse from './RunningCourse';

const RunningCourses = ({search}) => {
  return (
    <div className="my-20 mx-32">
      <div
        data-aos="fade-left"
        data-aos-duration="3000"
        className="text-center my-10 text-slate-500"
      >
        <h1 className="text-4xl font-semibold text-slate-700 font-serif mb-2">
          Our Running Course
        </h1>
        <p>10,000+ unique online course list designs</p>
      </div>
      <RunningCourse search={search} />
    </div>
  );
};

export default RunningCourses;