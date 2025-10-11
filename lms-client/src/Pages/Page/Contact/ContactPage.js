import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../Share/Footer';

const ContactPage = () => {
   const { pathname } = useLocation();  
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
  return (
    <div className="bg-gray-50 pt-16">
      {/* Header Section */}
      <div className="relative bg-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:flex lg:items-center">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800 leading-snug mb-6">
              Get in Touch with{' '}
              <span className="text-blue-600">HandiLearn</span>
            </h1>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Have questions or need more information about our courses? Fill
              out the form below or reach out via the provided contact details.
            </p>
          </div>
          {/* Decorative Image */}
          <div className="lg:w-1/2 mt-10 lg:mt-0 ">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/contact-us-illustration-download-in-svg-png-gif-file-formats--call-logo-customer-service-support-onboarding-pack-business-illustrations-4849052.png?f=webp"
              alt="Contact Us"
              className="rounded-lg shadow-lg mx-auto bg-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-16 max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">
          Send Us a Message
        </h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="flex flex-col">
              <label htmlFor="name" className="font-medium text-gray-600 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            {/* Email Input */}
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium text-gray-600 mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            {/* Subject Input */}
            <div className="col-span-1 md:col-span-2 flex flex-col">
              <label
                htmlFor="subject"
                className="font-medium text-gray-600 mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Enter the subject"
                className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            {/* Message TextArea */}
            <div className="col-span-1 md:col-span-2 flex flex-col">
              <label
                htmlFor="message"
                className="font-medium text-gray-600 mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows="6"
                placeholder="Write your message..."
                className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></textarea>
            </div>
            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-8">
          {/* Address */}
          <div className="flex flex-col items-center text-center">
            <div className="text-blue-600 text-3xl mb-4">📍</div>
            <h4 className="text-xl font-medium text-gray-800 mb-2">
              Our Address
            </h4>
            <p className="text-gray-600">
              123 EduCenter Street, Knowledge City, Learnland
            </p>
          </div>
          {/* Phone */}
          <div className="flex flex-col items-center text-center">
            <div className="text-blue-600 text-3xl mb-4">📞</div>
            <h4 className="text-xl font-medium text-gray-800 mb-2">Phone</h4>
            <p className="text-gray-600">+1 (123) 456-7890</p>
          </div>
          {/* Email */}
          <div className="flex flex-col items-center text-center">
            <div className="text-blue-600 text-3xl mb-4">✉️</div>
            <h4 className="text-xl font-medium text-gray-800 mb-2">Email</h4>
            <p className="text-gray-600">contact@educenter.com</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
