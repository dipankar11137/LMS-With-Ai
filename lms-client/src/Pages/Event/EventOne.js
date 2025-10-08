import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import img1 from '../../Images/category/1.png';
import img2 from '../../Images/category/2.png';
import img3 from '../../Images/category/3.png';
import img4 from '../../Images/category/4.png';
import img5 from '../../Images/category/5.png';
import img6 from '../../Images/category/6.png';
import Footer from '../Share/Footer';
const events = [
  {
    id: 1,
    title: 'Educational technology and mobile learning',
    date: '6 April, 2022',
    location: 'London, UK',
    image: img1, // Replace with real image URL
  },
  {
    id: 2,
    title: 'We are changing the way the world learns',
    date: '6 April, 2022',
    location: 'London, UK',
    image: img2, // Replace with real image URL
  },
  {
    id: 3,
    title: 'Guide to visas and funding to study in the UK',
    date: '6 April, 2022',
    location: 'London, UK',
    image: img3, // Replace with real image URL
  },
  {
    id: 4,
    title: 'Guide to visas and funding to study in the UK',
    date: '6 April, 2022',
    location: 'London, UK',
    image: img4, // Replace with real image URL
  },
  {
    id: 5,
    title: 'Guide to visas and funding to study in the UK',
    date: '6 April, 2022',
    location: 'London, UK',
    image: img5, // Replace with real image URL
  },
  {
    id: 6,
    title: 'Guide to visas and funding to study in the UK',
    date: '6 April, 2022',
    location: 'London, UK',
    image: img6, // Replace with real image URL
  },
  {
    id: 2,
    title: 'We are changing the way the world learns',
    date: '6 April, 2022',
    location: 'London, UK',
    image: img2, // Replace with real image URL
  },
  {
    id: 4,
    title: 'Guide to visas and funding to study in the UK',
    date: '6 April, 2022',
    location: 'London, UK',
    image: img4, // Replace with real image URL
  },
  {
    id: 3,
    title: 'Guide to visas and funding to study in the UK',
    date: '6 April, 2022',
    location: 'London, UK',
    image: img3, // Replace with real image URL
  },
];

const EventOne = () => {
  const [category, setCategory] = useState('All Category');
   const { pathname } = useLocation();  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
  return (
    <div className="pt-20">
      <div className="bg-slate-200 py-3">
        <div className="container mx-auto px-4">
          <h1 className="text-sm text-gray-600 font-medium">
            <a href="/" className="hover:underline text-blue-500">
              Home
            </a>{' '}
            &gt;
            <a href="/courses" className="hover:underline text-blue-500 ml-2">
               All courses
            </a>{' '}
            &gt; User Experience &gt; Design User &gt; Interface
          </h1>
        </div>
      </div>
      <div className="text-center py-20">
        <h1 className="text-5xl font-semibold pb-2">Event</h1>
        <p>
          We’re on a mission to deliver engaging, curated courses at a
          reasonable price.
        </p>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className="flex justify-center items-center gap-4 my-10"
      >
        <button
          className="hover:bg-slate-300 rounded-2xl px-4 py-2 rounded"
          onClick={() => setCategory('All Category')}
        >
          All Category
        </button>
        <button
          onClick={() => setCategory('Animation')}
          className={`px-4 py-2 rounded ${
            category === 'Animation'
              ? 'text-primary font-semibold bg-slate-300 rounded-2xl'
              : 'text-gray-700 hover:bg-slate-300 rounded-2xl'
          }`}
        >
          Animation
        </button>
        <button
          onClick={() => setCategory('Design')}
          className={`px-4 py-2 rounded ${
            category === 'Design'
              ? 'text-primary font-semibold bg-slate-300 rounded-2xl'
              : 'text-gray-700 hover:bg-slate-300 rounded-2xl'
          }`}
        >
          Design
        </button>
        <button
          onClick={() => setCategory('Photography')}
          className={`px-4 py-2 rounded ${
            category === 'Photography'
              ? 'text-primary font-semibold bg-slate-300 rounded-2xl'
              : 'text-gray-700 hover:bg-slate-300 rounded-2xl'
          }`}
        >
          Photography
        </button>
        <button
          onClick={() => setCategory('Art')}
          className={`px-4 py-2 rounded ${
            category === 'Art'
              ? 'text-primary font-semibold bg-slate-300 rounded-2xl'
              : 'text-gray-700 hover:bg-slate-300 rounded-2xl'
          }`}
        >
          Art
        </button>
        <button
          onClick={() => setCategory('Programming')}
          className={`px-4 py-2 rounded ${
            category === 'Programming'
              ? 'text-primary font-semibold bg-slate-300 rounded-2xl'
              : 'text-gray-700 hover:bg-slate-300 rounded-2xl'
          }`}
        >
          Programming
        </button>
        <button
          onClick={() => setCategory('Writing')}
          className={`px-4 py-2 rounded ${
            category === 'Writing'
              ? 'text-primary font-semibold bg-slate-300 rounded-2xl'
              : 'text-gray-700 hover:bg-slate-300 rounded-2xl'
          }`}
        >
          Writing
        </button>
      </div>
      <section className="bg-white py-12 pt-0 pb-40">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Grid of Event Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-32">
            {events.map(event => (
              <div key={event.id} className=" ">
                {/* Event Image */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-62 object-cover"
                />
                {/* Event Content */}
                <div className="m-4 bg-white absolute w-3/12 ml-7 p-2 -mt-16 rounded-xl z-20">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <div className="text-gray-500 text-sm flex items-center mb-4">
                    <span className="mr-4">📅 {event.date}</span>
                    <span>📍 {event.location}</span>
                  </div>
                  {/* Buy Button */}
                  <button className="bg-white text-purple-600 border border-purple-600 rounded-full px-4 py-2 text-sm font-medium hover:bg-purple-600 hover:text-white transition">
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default EventOne;