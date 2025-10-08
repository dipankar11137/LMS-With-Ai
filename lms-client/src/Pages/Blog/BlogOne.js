import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../Share/Footer';

const BlockOne = () => {
   const { pathname } = useLocation();  
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
  return (
    <div>
      <section className="bg-gray-50 py-12 pt-28">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Block Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight mb-6">
                Empower Your Learning Journey with <br />
                <span className="text-blue-600">Educrat Platform</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Unlock unlimited learning resources, expert guidance, and tools
                designed to advance your education and career. Start your
                journey with industry-focused content tailored to help you
                succeed.
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition">
                Get Started Now
              </button>
            </div>
            {/* Right Content */}
            <div className="relative">
              <img
                src="https://media.istockphoto.com/id/154250758/photo/wooden-building-blocks.jpg?s=612x612&w=0&k=20&c=Bnav4IHkO-Ft9ef820klIuX0rRYZu8bXQvyZBbtfSd0=" // Replace with your image
                alt="Learning Journey"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-orange-400 shadow-lg">
                <h4 className="text-orange-800 font-semibold text-lg">
                  10,000+ Courses
                </h4>
                <p className="text-gray-500 text-sm">Designed for all levels</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default BlockOne;
