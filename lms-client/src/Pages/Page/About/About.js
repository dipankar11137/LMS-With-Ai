import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import aboutImage from '../../../Images/category/3.png'; // Replace with your image path
import Footer from '../../Share/Footer';

const About = () => {
   const { pathname } = useLocation();  
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
  return (
    <div className="bg-gray-50  pt-20">
      {/* Hero Section */}
      <div className="relative bg-blue-100 pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:flex lg:items-center">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800 leading-snug mb-6">
              Welcome to <span className="text-blue-600">EduCenter</span>
            </h1>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              At EduCenter, we provide high-quality education with a focus on
              creating a better and brighter future for our students. Our
              mission is to make learning accessible to everyone through
              exceptional online and in-person courses.
            </p>
            <button className="px-8 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
              Learn More
            </button>
          </div>
          {/* Right Image */}
          <div className="lg:w-full mt-10 lg:mt-0">
            <img
              src={aboutImage}
              alt="About Us"
              className="rounded-lg shadow-lg mx-auto h-96 ml-32"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Experienced Instructors
            </h3>
            <p className="text-gray-600">
              Our instructors are highly qualified and have real-world
              experience to ensure students receive the best possible guidance.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Flexible Learning
            </h3>
            <p className="text-gray-600">
              Enjoy flexible learning schedules tailored to your pace and
              convenience with our online and hybrid classes.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Industry-Relevant Curriculum
            </h3>
            <p className="text-gray-600">
              Our courses are designed to meet the current demands of the
              industry, ensuring you stay ahead in your career.
            </p>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="bg-blue-50 mt-16 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:flex lg:items-center">
          {/* Vision */}
          <div className="lg:w-1/2 p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Vision
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              To empower individuals through accessible education that inspires
              lifelong learning and career success.
            </p>
          </div>
          {/* Mission */}
          <div className="lg:w-1/2 p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To deliver comprehensive and practical courses that focus on
              nurturing skills, creativity, and innovation for global
              challenges.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
