import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardFooter from '../DashboarFooter/DashboardFooter';

const DashboardIndex = () => {
   const { pathname } = useLocation();  
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
  return (
    <div>
      <div className=" bg-gray-100 m-10 rounded-lg p-6 pt-20">
        {/* Top Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              label: 'Total Sales',
              value: '$10800',
              subValue: '$50 New Sales',
            },
            {
              label: 'Total Courses',
              value: '$3759',
              subValue: '$40 New Sales',
            },
            {
              label: 'Total Students',
              value: '129786',
              subValue: '$90 New Sales',
            },
            {
              label: 'Total Instructors',
              value: '$22786',
              subValue: '$290 New Sales',
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-6 bg-white shadow rounded-lg flex flex-col items-center"
            >
              <h3 className="text-xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-gray-500">{stat.subValue}</p>
              <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Earnings Statistics */}
          <div className=" p-6 bg-white shadow rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-4">
              Earning Statistics
            </h4>
            {/* Replace below with chart integration */}
            <div className="h-52 bg-blue-50 rounded-lg flex items-center justify-center">
              {/* <p className="text-blue-400">Chart Placeholder</p>*/}
              <img
                className="h-48 w-full"
                src="https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A347ece48-0f69-11e9-a3aa-118c761d2745?source=ig"
                alt=""
              />
            </div>
          </div>

          {/* Traffic */}
          <div className="p-6 bg-white shadow rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-4">Traffic</h4>
            {/* Replace below with pie chart integration */}
            <div className="h-52 bg-indigo-50 rounded-lg flex items-center justify-center">
              {/* <p className="text-indigo-400">Pie Chart Placeholder</p> */}
              <img className='h-48 w-full'
                src="https://cdn1.byjus.com/wp-content/uploads/2021/11/Pie-Chart-3.png"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Lower Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Popular Instructors */}
          <div className="p-6 bg-white shadow rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-4">
              Popular Instructor
            </h4>
            <ul className="space-y-4">
              {['Floyd Miles', 'Cameron Williamson', 'Brooklyn Simmons'].map(
                (name, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between text-gray-600"
                  >
                    <p>
                      {name}{' '}
                      <span className="text-xs text-gray-400">
                        (3545 Reviews)
                      </span>
                    </p>
                    <span className="text-gray-400 text-sm">15 Courses</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Recent Courses */}
          <div className="p-6 bg-white shadow rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-4">Recent Courses</h4>
            <ul className="space-y-4">
              {[
                'Complete Python Bootcamp',
                'The Ultimate Drawing Course',
                'Instagram Marketing 2021',
              ].map((course, idx) => (
                <li
                  key={idx}
                  className="flex items-center space-x-4 text-gray-600"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex-shrink-0"></div>
                  <div>
                    <h5 className="font-semibold">{course}</h5>
                    <p className="text-sm text-gray-400">6 Lessons, 3h 56m</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Notifications */}
          <div className="p-6 bg-white shadow rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-4">Notifications</h4>
            <ul className="space-y-4">
              {[
                'Your resume updated!',
                'You changed password',
                'Your account has been created successfully',
              ].map((notif, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between text-gray-600"
                >
                  <p>{notif}</p>
                  <span className="text-gray-400 text-sm">1h ago</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
};

export default DashboardIndex;


