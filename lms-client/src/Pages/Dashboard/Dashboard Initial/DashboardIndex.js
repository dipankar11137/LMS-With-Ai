import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardFooter from '../DashboarFooter/DashboardFooter';

const DashboardIndex = () => {
  const { pathname } = useLocation();
  const [users, setUsers] = useState([]);

  // ✅ Payment keys and prices
  const paymentKeys = [
    'webPayment',
    'dataPayment',
    'graphicPayment',
    'mobilePayment',
    'digitalPayment',
    'financePayment',
  ];

  const coursePrices = {
    webPayment: 8100,
    dataPayment: 8900,
    graphicPayment: 9900,
    mobilePayment: 26900,
    digitalPayment: 19900,
    financePayment: 11900,
  };

  // Fetch users from backend
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  // Calculate course totals
  const courseTotals = paymentKeys.reduce((totals, key) => {
    totals[key] = users.reduce(
      (sum, user) => (user[key] ? sum + coursePrices[key] : sum),
      0
    );
    return totals;
  }, {});

  const totalRevenue = Object.values(courseTotals).reduce(
    (sum, val) => sum + val,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Scrollable notifications
  const notifications = [
    'Your resume updated!',
    'You changed password.',
    'Your account has been created successfully.',
    'Payment of ৳2000 was successful.',
    'New course “Advanced JavaScript” published.',
    'Instructor John Doe uploaded new content.',
    'Your subscription will expire in 3 days.',
    'New message from Admin.',
    'Discount offer: 50% off on selected courses.',
    'Profile picture updated.',
    'Course “UI/UX Fundamentals” completed.',
    'Feedback received from instructor.',
    'Weekly report generated successfully.',
    'Security alert: New login from Chrome Browser.',
    'Assignment 2 results are now available.',
    'You joined “React Masterclass” discussion group.',
    'New follower: Emily Watson.',
    'Payment refunded successfully.',
    'System maintenance scheduled for tonight.',
    'Live class starting in 10 minutes.',
    'New student registered under your course.',
    'Daily backup completed successfully.',
    'Certificate generated for “Python Bootcamp”.',
  ];

  // Recent courses
  const recentCourses = [
    'Web Development',
    'Data Science',
    'Graphic Design',
    'Mobile App Development',
    'Digital Marketing',
    'Finance & Accounting',
    'UI/UX Design',
    'Cybersecurity Fundamentals',
    'Machine Learning',
    'Photography Basics',
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="m-10 rounded-lg p-6 pt-3  ">
        <div className=' text-4xl text-center font-semibold text-sky-700 pb-14'>
          <h1>Dashboard</h1>
        </div>
        {/* ===== Top Statistics ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="p-6 bg-white shadow rounded-lg flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-800">{users.length}</h3>
            <p className="mt-2 text-sm text-gray-400">All Users</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-800">6</h3>
            <p className="mt-2 text-sm text-gray-400">Total Courses</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-800">
              {users.reduce((sum, u) => {
                return (
                  sum + paymentKeys.reduce((s, k) => s + (u[k] ? 1 : 0), 0)
                );
              }, 0)}
            </h3>
            <p className="mt-2 text-sm text-gray-400">Total Sell Courses</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-800">
              ৳{totalRevenue.toLocaleString()}
            </h3>
            <p className="mt-2 text-sm text-gray-400">Total Revenue</p>
          </div>
        </div>

        {/* ===== Course Payment Cards ===== */}
        <h4 className="font-semibold text-gray-700 mb-4 text-lg">
          Course Payments
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {Object.entries(courseTotals).map(([key, amount]) => (
            <div
              key={key}
              className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-gray-500 text-sm">
                    {key.replace('Payment', ' Course')}
                  </h5>
                  <h3 className="text-xl font-bold text-gray-800">
                    ৳{amount.toLocaleString()}
                  </h3>
                </div>
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-blue-600 font-bold text-lg">
                  {users.reduce((count, u) => (u[key] ? count + 1 : 0), 0)}
                </div>
              </div>
              <p className="mt-2 text-gray-400 text-sm">
                {users.reduce((count, u) => (u[key] ? count + 1 : 0), 0)}{' '}
                students purchased
              </p>
            </div>
          ))}

          {/* Total Revenue Card */}
          <div className="p-6 bg-green-100 shadow-lg rounded-xl flex flex-col justify-center items-center hover:shadow-2xl transition-shadow duration-300">
            <h5 className="text-green-700 text-sm font-semibold">
              Total Revenue
            </h5>
            <h3 className="text-2xl font-bold text-green-900 mt-2">
              ৳{totalRevenue.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* ===== Lower Section: Recent Courses & Notifications ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Recent Courses */}
          <div className="p-6 bg-white shadow rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-4">Recent Courses</h4>
            <ul className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {recentCourses.map((course, idx) => (
                <li
                  key={idx}
                  className="flex items-center space-x-4 text-gray-600 border-b border-gray-100 pb-2"
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
            <h4 className="font-semibold text-gray-700 mb-4">
              All Notifications
            </h4>
            <ul className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {notifications.map((notif, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between text-gray-600 border-b border-gray-100 pb-2"
                >
                  <p className="text-sm">{notif}</p>
                  <span className="text-gray-400 text-xs">1h ago</span>
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

// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import DashboardFooter from '../DashboarFooter/DashboardFooter';

// const DashboardIndex = () => {
//   const { pathname } = useLocation();
//   const [user, setUsers] = useState([]);
//   const paymentKeys = [
//     'webPayment',
//     'dataPayment',
//     'graphicPayment',
//     'mobilePayment',
//     'digitalPayment',
//     'financePayment',
//   ];
//   const coursePrices = {
//     webPayment: 8100,
//     dataPayment: 8900,
//     graphicPayment: 9900,
//     mobilePayment: 26900,
//     digitalPayment: 19900,
//     financePayment: 11900,
//   };
//   let totalRevenue = 0;
//   let courseTotals = {
//     webPayment: 0,
//     dataPayment: 0,
//     graphicPayment: 0,
//     mobilePayment: 0,
//     digitalPayment: 0,
//     financePayment: 0,
//   };
//   user.forEach(user => {
//     for (let course in coursePrices) {
//       if (user[course]) {
//         totalRevenue += coursePrices[course];
//         courseTotals[course] += coursePrices[course];
//       }
//     }
//   });
//   console.log('💰 Total Revenue (BDT):', totalRevenue);
//   console.log('📊 Revenue Breakdown:', courseTotals);
//    useEffect(() => {

//        fetch(`http://localhost:5000/users`)
//          .then(res => res.json())
//          .then(data => setUsers(data))
//          .catch(err => console.error(err));

//    }, [user]);

//   const totalPayments = user.reduce((sum, user) => {
//     paymentKeys.forEach(key => {
//       if (user[key]) sum += 1;
//     });
//     return sum;
//   }, 0);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   // ✅ All Notifications (static list for now, can be dynamic later)
//   const notifications = [
//     'Your resume updated!',
//     'You changed password.',
//     'Your account has been created successfully.',
//     'Payment of ৳2000 was successful.',
//     'New course “Advanced JavaScript” published.',
//     'Instructor John Doe uploaded new content.',
//     'Your subscription will expire in 3 days.',
//     'New message from Admin.',
//     'Discount offer: 50% off on selected courses.',
//     'Profile picture updated.',
//     'Course “UI/UX Fundamentals” completed.',
//     'Feedback received from instructor.',
//     'Weekly report generated successfully.',
//     'Security alert: New login from Chrome Browser.',
//     'Assignment 2 results are now available.',
//     'You joined “React Masterclass” discussion group.',
//     'New follower: Emily Watson.',
//     'Payment refunded successfully.',
//     'System maintenance scheduled for tonight.',
//     'Live class starting in 10 minutes.',
//     'New student registered under your course.',
//     'Daily backup completed successfully.',
//     'Certificate generated for “Python Bootcamp”.',
//   ];

//   return (
//     <div>
//       <div className="bg-gray-100 m-10 rounded-lg p-6 pt-20">
//         {/* Top Statistics */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//           {[
//             {
//               label: 'All Users',
//               value: user.length,
//             },
//             {
//               label: 'Total Courses',
//               value: 6,

//             },
//             {
//               label: 'Total Sell Courses',
//               value: totalPayments,

//             },
//             {
//               label: 'Total Instructors',
//               value: '৳22786',

//             },
//           ].map((stat, idx) => (
//             <div
//               key={idx}
//               className="p-6 bg-white shadow rounded-lg flex flex-col items-center"
//             >
//               <h3 className="text-xl font-bold text-gray-800">{stat.value}</h3>
//               <p className="text-gray-500">{stat.subValue}</p>
//               <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
//           {/* Earnings Statistics */}
//           <div className="p-6 bg-white shadow rounded-lg">
//             <h4 className="font-semibold text-gray-700 mb-4">
//               Earning Statistics
//             </h4>
//             <div className="h-52 bg-blue-50 rounded-lg flex items-center justify-center">
//               <img
//                 className="h-48 w-full"
//                 src="https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A347ece48-0f69-11e9-a3aa-118c761d2745?source=ig"
//                 alt="Earning Chart"
//               />
//             </div>
//           </div>

//           {/* Traffic */}
//           <div className="p-6 bg-white shadow rounded-lg">
//             <h4 className="font-semibold text-gray-700 mb-4">Traffic</h4>
//             <div className="h-52 bg-indigo-50 rounded-lg flex items-center justify-center">
//               <img
//                 className="h-48 w-full"
//                 src="https://cdn1.byjus.com/wp-content/uploads/2021/11/Pie-Chart-3.png"
//                 alt="Traffic Chart"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Lower Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Popular Instructors */}
//           <div className="p-6 bg-white shadow rounded-lg">
//             <h4 className="font-semibold text-gray-700 mb-4">
//               Popular Instructor
//             </h4>
//             <ul className="space-y-4">
//               {['Floyd Miles', 'Cameron Williamson', 'Brooklyn Simmons'].map(
//                 (name, idx) => (
//                   <li
//                     key={idx}
//                     className="flex items-center justify-between text-gray-600"
//                   >
//                     <p>
//                       {name}{' '}
//                       <span className="text-xs text-gray-400">
//                         (3545 Reviews)
//                       </span>
//                     </p>
//                     <span className="text-gray-400 text-sm">15 Courses</span>
//                   </li>
//                 )
//               )}
//             </ul>
//           </div>

//           {/* Recent Courses */}
//           <div className="p-6 bg-white shadow rounded-lg">
//             <h4 className="font-semibold text-gray-700 mb-4">Recent Courses</h4>
//             {/* Scrollable area */}
//             <ul className="space-y-4 max-h-64 overflow-y-auto pr-2">
//               {[
//                 'Web Development',
//                 'Data Science',
//                 'Graphic Design',
//                 'Mobile App Development',
//                 'Digital Marketing',
//                 'Finance & Accounting',
//                 'UI/UX Design',
//                 'Cybersecurity Fundamentals',
//                 'Machine Learning',
//                 'Photography Basics',
//               ].map((course, idx) => (
//                 <li
//                   key={idx}
//                   className="flex items-center space-x-4 text-gray-600 border-b border-gray-100 pb-2"
//                 >
//                   <div className="w-12 h-12 bg-blue-100 rounded-lg flex-shrink-0"></div>
//                   <div>
//                     <h5 className="font-semibold">{course}</h5>
//                     <p className="text-sm text-gray-400">6 Lessons, 3h 56m</p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* ✅ All Notifications (Full List) */}
//           <div className="p-6 bg-white shadow rounded-lg">
//             <h4 className="font-semibold text-gray-700 mb-4">
//               All Notifications
//             </h4>
//             <ul className="space-y-4 max-h-64 overflow-y-auto pr-2">
//               {notifications.map((notif, idx) => (
//                 <li
//                   key={idx}
//                   className="flex items-center justify-between text-gray-600 border-b border-gray-100 pb-2"
//                 >
//                   <p className="text-sm">{notif}</p>
//                   <span className="text-gray-400 text-xs">1h ago</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <DashboardFooter />
//     </div>
//   );
// };

// export default DashboardIndex;

// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import DashboardFooter from '../DashboarFooter/DashboardFooter';

// const DashboardIndex = () => {
//    const { pathname } = useLocation();
//       useEffect(() => {
//         window.scrollTo(0, 0);
//       }, [pathname]);
//   return (
//     <div>
//       <div className=" bg-gray-100 m-10 rounded-lg p-6 pt-20">
//         {/* Top Statistics */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//           {[
//             {
//               label: 'Total Sales',
//               value: '৳10800',
//               subValue: '৳50 New Sales',
//             },
//             {
//               label: 'Total Courses',
//               value: '৳3759',
//               subValue: '৳40 New Sales',
//             },
//             {
//               label: 'Total Students',
//               value: '129786',
//               subValue: '৳90 New Sales',
//             },
//             {
//               label: 'Total Instructors',
//               value: '৳22786',
//               subValue: '৳290 New Sales',
//             },
//           ].map((stat, idx) => (
//             <div
//               key={idx}
//               className="p-6 bg-white shadow rounded-lg flex flex-col items-center"
//             >
//               <h3 className="text-xl font-bold text-gray-800">{stat.value}</h3>
//               <p className="text-gray-500">{stat.subValue}</p>
//               <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
//           {/* Earnings Statistics */}
//           <div className=" p-6 bg-white shadow rounded-lg">
//             <h4 className="font-semibold text-gray-700 mb-4">
//               Earning Statistics
//             </h4>
//             {/* Replace below with chart integration */}
//             <div className="h-52 bg-blue-50 rounded-lg flex items-center justify-center">
//               {/* <p className="text-blue-400">Chart Placeholder</p>*/}
//               <img
//                 className="h-48 w-full"
//                 src="https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A347ece48-0f69-11e9-a3aa-118c761d2745?source=ig"
//                 alt=""
//               />
//             </div>
//           </div>

//           {/* Traffic */}
//           <div className="p-6 bg-white shadow rounded-lg">
//             <h4 className="font-semibold text-gray-700 mb-4">Traffic</h4>
//             {/* Replace below with pie chart integration */}
//             <div className="h-52 bg-indigo-50 rounded-lg flex items-center justify-center">
//               {/* <p className="text-indigo-400">Pie Chart Placeholder</p> */}
//               <img className='h-48 w-full'
//                 src="https://cdn1.byjus.com/wp-content/uploads/2021/11/Pie-Chart-3.png"
//                 alt=""
//               />
//             </div>
//           </div>
//         </div>

//         {/* Lower Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Popular Instructors */}
//           <div className="p-6 bg-white shadow rounded-lg">
//             <h4 className="font-semibold text-gray-700 mb-4">
//               Popular Instructor
//             </h4>
//             <ul className="space-y-4">
//               {['Floyd Miles', 'Cameron Williamson', 'Brooklyn Simmons'].map(
//                 (name, idx) => (
//                   <li
//                     key={idx}
//                     className="flex items-center justify-between text-gray-600"
//                   >
//                     <p>
//                       {name}{' '}
//                       <span className="text-xs text-gray-400">
//                         (3545 Reviews)
//                       </span>
//                     </p>
//                     <span className="text-gray-400 text-sm">15 Courses</span>
//                   </li>
//                 )
//               )}
//             </ul>
//           </div>

//           {/* Recent Courses */}
//           <div className="p-6 bg-white shadow rounded-lg">
//             <h4 className="font-semibold text-gray-700 mb-4">Recent Courses</h4>
//             <ul className="space-y-4">
//               {[
//                 'Complete Python Bootcamp',
//                 'The Ultimate Drawing Course',
//                 'Instagram Marketing 2021',
//               ].map((course, idx) => (
//                 <li
//                   key={idx}
//                   className="flex items-center space-x-4 text-gray-600"
//                 >
//                   <div className="w-12 h-12 bg-blue-100 rounded-lg flex-shrink-0"></div>
//                   <div>
//                     <h5 className="font-semibold">{course}</h5>
//                     <p className="text-sm text-gray-400">6 Lessons, 3h 56m</p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Notifications */}
//           <div className="p-6 bg-white shadow rounded-lg">
//             <h4 className="font-semibold text-gray-700 mb-4">Notifications</h4>
//             <ul className="space-y-4">
//               {[
//                 'Your resume updated!',
//                 'You changed password',
//                 'Your account has been created successfully',
//               ].map((notif, idx) => (
//                 <li
//                   key={idx}
//                   className="flex items-center justify-between text-gray-600"
//                 >
//                   <p>{notif}</p>
//                   <span className="text-gray-400 text-sm">1h ago</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//       <DashboardFooter />
//     </div>
//   );
// };

// export default DashboardIndex;
