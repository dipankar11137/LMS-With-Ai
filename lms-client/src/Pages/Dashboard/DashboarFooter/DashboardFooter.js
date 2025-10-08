import React from 'react';

const DashboardFooter = () => {
  return (
    <div className="flex justify-between text-sm text-gray-500 pt-10 mx-28  items-center pb-32">
      <div>
        <h1>© 2025 Educrat. All Right Reserved.</h1>
      </div>
      <div className='flex gap-x-5 text-base'>
        <a href="/">Help</a>
        <a href="/">Privacy Policy</a>
        <a href="/">Cookie Notice</a>
        <a href="/">Security</a>
        <a href="/">Terms of Use</a>
      </div>
      <div>
        <a href="/">English</a>
      </div>
    </div>
  );
};

export default DashboardFooter;