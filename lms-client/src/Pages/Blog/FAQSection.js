import React, { useEffect, useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import Footer from '../Share/Footer';

const FAQSection = () => {
   const { pathname } = useLocation();  
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What is Educrat?',
      answer:
        'Educrat is an online platform offering educational courses designed to enhance your skills in various fields.',
    },
    {
      question: 'How do I enroll in a course?',
      answer:
        'You can enroll in a course by signing up on the platform, selecting the course, and proceeding to payment.',
    },
    {
      question: 'Are the courses self-paced?',
      answer:
        'Yes, the courses are self-paced, allowing you to learn at your own convenience.',
    },
    {
      question: 'Do you provide certification?',
      answer:
        'Yes, we provide certificates of completion for all our courses to help you showcase your new skills.',
    },
  ];

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
              All question
            </a>{' '}
            &gt; User Experience &gt; Design User &gt; FAQs
          </h1>
        </div>
      </div>
      <div className="py-20 text-center">
        <h1 className="text-5xl font-semibold mb-3">Terms & Conditions</h1>
        <p>
          {' '}
          We’re on a mission to deliver engaging, curated courses at a
          reasonable price.
        </p>
      </div>
      <div className="w-7/12 mx-auto">
        <h1 className="text-xl font-semibold py-5">Using our services</h1>
        <p className="text-slate-500">
          You must follow any policies made available to you within the
          Services. Don't misuse our Services. For example, don't interfere with
          our Services or try to access them using a method other than the
          interface and the instructions that we provide. You may use our
          Services only as permitted by law, including applicable export and
          re-export control laws and regulations. We may suspend or stop
          providing our Services to you if you do not comply with our terms or
          policies or if we are investigating suspected misconduct. Using our
          Services does not give you ownership of any intellectual property
          rights in our Services or the content you access. You may not use
          content from our Services unless you obtain permission from its owner
          or are otherwise permitted by law. These terms do not grant you the
          right to use any branding or logos used in our Services. Don't remove,
          obscure, or alter any legal notices displayed in or along with our
          Services.
        </p>
        <h1 className="text-xl font-semibold pb-5 pt-10">
          Your content in our services
        </h1>
        <p className="text-slate-500">
          When you upload, submit, store, send or receive content to or through
          our Services, you give Front (and those we work with) a worldwide
          license to use, host, store, reproduce, modify, create derivative
          works (such as those resulting from translations, adaptations or other
          changes we make so that your content works better with our Services),
          communicate, publish, publicly perform, publicly display and
          distribute such content. The rights you grant in this license are for
          the limited purpose of operating, promoting, and improving our
          Services, and to develop new ones. This license continues even if you
          stop using our Services (for example, for a business listing you have
          added to Front Maps). Some Services may offer you ways to access and
          remove content that has been provided to that Service. Also, in some
          of our Services, there are terms or settings that narrow the scope of
          our use of the content submitted in those Services
        </p>
        <h1 className="text-xl font-semibold pb-5 pt-10">Pay Attention</h1>
        <p className="text-slate-500">
          Our Services are very diverse, so sometimes additional terms or
          product requirements (including age requirements) may apply.
          Additional terms will be available with the relevant Services, and
          those additional terms become part of your agreement with us if you
          use.
        </p>
      </div>
      <div className="max-w-3xl mx-auto mt-20  px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-4 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <h3 className="font-medium text-gray-800">{faq.question}</h3>
                {activeIndex === index ? (
                  <IoChevronUp className="text-gray-500 text-lg" />
                ) : (
                  <IoChevronDown className="text-gray-500 text-lg" />
                )}
              </button>
              {activeIndex === index && (
                <p className="mt-3 text-gray-600 transition-opacity">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default FAQSection;
