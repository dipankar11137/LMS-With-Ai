import React, { useState } from 'react';
import Animation from './Animation';
import Design from './Design';
import OurMostPopular from './OurMostPopular';

const OurMostPopulars = () => {
    const [category, setCategory] = useState('All Category');
 
  return (
    <div className="my-20 mx-32">
      <div
        data-aos="fade-right"
        data-aos-duration="3000"
        className="text-center my-10 text-slate-500"
      >
        <h1 className="text-4xl font-semibold text-slate-700 font-serif mb-2">
          Our Most Popular Courses
        </h1>
        <p>10,000+ unique online course list designs</p>
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className="flex justify-center items-center gap-4 my-10"
      >
        <button onClick={() => setCategory('All Category')}>
          All Category
        </button>
        <button
          onClick={() => setCategory('Animation')}
          className={`px-4 py-2 rounded ${
            category === 'Animation'
              ? 'text-primary font-semibold'
              : 'text-gray-700'
          }`}
        >
          Animation
        </button>
        <button
          onClick={() => setCategory('Design')}
          className={`px-4 py-2 rounded ${
            category === 'Design'
              ? 'text-primary font-semibold'
              : 'text-gray-700'
          }`}
        >
          Design
        </button>
        <button
          onClick={() => setCategory('Photography')}
          className={`px-4 py-2 rounded ${
            category === 'Photography'
              ? 'text-primary font-semibold'
              : 'text-gray-700'
          }`}
        >
          Photography
        </button>
        <button
          onClick={() => setCategory('Art')}
          className={`px-4 py-2 rounded ${
            category === 'Art' ? 'text-primary font-semibold' : 'text-gray-700'
          }`}
        >
          Art
        </button>
        <button
          onClick={() => setCategory('Programming')}
          className={`px-4 py-2 rounded ${
            category === 'Programming'
              ? 'text-primary font-semibold'
              : 'text-gray-700'
          }`}
        >
          Programming
        </button>
        <button
          onClick={() => setCategory('Writing')}
          className={`px-4 py-2 rounded ${
            category === 'Writing'
              ? 'text-primary font-semibold'
              : 'text-gray-700'
          }`}
        >
          Writing
        </button>
      </div>

      <div data-aos="fade-up" data-aos-duration="3000" className="mt-10">
        {category === 'All Category' && <OurMostPopular />}
        {category === 'Animation' && <Animation />}
        {category === 'Design' && <Design />}
        {category === 'Photography' && <Animation />}
        {category === 'Art' && <Design />}
        {category === 'Programming' && <Animation />}
        {category === 'Writing' && <Design />}
      </div>
    </div>
  );
};

export default OurMostPopulars;