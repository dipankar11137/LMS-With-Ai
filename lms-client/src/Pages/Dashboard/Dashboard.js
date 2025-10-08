import React, { useEffect, useState } from 'react';
import { RiDashboard3Line } from 'react-icons/ri';

import { useAuthState } from 'react-firebase-hooks/auth';
import { FaBookReader } from 'react-icons/fa';
import { FaFileCircleQuestion, FaUserGroup } from 'react-icons/fa6';
import { IoMdTrophy } from 'react-icons/io';
import { MdOndemandVideo } from 'react-icons/md';
import { Link, Outlet, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';


const Dashboard = () => {
  const [user] = useAuthState(auth);
  const { pathname } = useLocation();

  // const [open, setOpen] = useState(true);
  const [selectedButton, setSelectedButton] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className=" pt-16 bg-white">
      <div className="">
        <div className="drawer drawer-mobile ">
          <input
            id="dashboard-sidebar"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content ">
            <Outlet></Outlet>
          </div>
          <div className="drawer-side navigation ">
            <label
              htmlFor="dashboard-sidebar"
              className="drawer-overlay "
            ></label>
            <section className="flex ">
              <div
                className={` w-62  h-screen p-5  text-black pt-8 relative duration-300`}
              >
                <div className="mt-4 flex flex-col gap-4 relative pt-10 ">
                  {/* Dashboard */}
                  <div
                    onClick={() => setSelectedButton('Button 10')}
                    className={
                      selectedButton === 'Button 10'
                        ? 'bg-neutral w-44 text-white  rounded-lg tab-rounded-lg'
                        : ''
                    }
                  >
                    {' '}
                    <Link
                      to="/dashboard"
                      className={`  group flex items-center text-xl  gap-3.5 font-medium p-2 hover:bg-neutral hover:text-white rounded-md`}
                    >
                      <div>
                        {React.createElement(RiDashboard3Line, {
                          size: '20',
                        })}
                      </div>
                      <h2>Dashboard</h2>
                    </Link>
                  </div>
                  {/* Add course video */}
                  <div
                    onClick={() => setSelectedButton('course')}
                    className={
                      selectedButton === 'course'
                        ? 'bg-neutral text-white 2 rounded-lg tab-rounded-lg'
                        : ''
                    }
                  >
                    {' '}
                    <Link
                      to="/dashboard/addClass"
                      className={`  group flex items-center text-xl  gap-3.5 font-medium p-2 hover:bg-neutral hover:text-white rounded-md`}
                    >
                      <div>
                        {React.createElement(MdOndemandVideo, {
                          size: '20',
                        })}
                      </div>
                      <h2>Add Class</h2>
                    </Link>
                  </div>
                  {/* Add course video */}
                  <div
                    onClick={() => setSelectedButton('question')}
                    className={
                      selectedButton === 'question'
                        ? 'bg-neutral text-white 2 rounded-lg tab-rounded-lg'
                        : ''
                    }
                  >
                    {' '}
                    <Link
                      to="/dashboard/addQuestion"
                      className={`  group flex items-center text-xl  gap-3.5 font-medium p-2 hover:bg-neutral hover:text-white rounded-md`}
                    >
                      <div>
                        {React.createElement(FaFileCircleQuestion, {
                          size: '20',
                        })}
                      </div>
                      <h2>Add Question</h2>
                    </Link>
                  </div>
                  {/* trophy */}
                  <div
                    onClick={() => setSelectedButton('score')}
                    className={
                      selectedButton === 'score'
                        ? 'bg-neutral text-white 2 rounded-lg tab-rounded-lg'
                        : ''
                    }
                  >
                    {' '}
                    <Link
                      to="/dashboard/score"
                      className={`  group flex items-center text-xl  gap-3.5 font-medium p-2 hover:bg-neutral hover:text-white rounded-md`}
                    >
                      <div>
                        {React.createElement(IoMdTrophy, {
                          size: '20',
                        })}
                      </div>
                      <h2>Quiz Score</h2>
                    </Link>
                  </div>
                  {/* class */}
                  {user?.email === 'abc@def.com' && (
                    <div
                      onClick={() => setSelectedButton('class')}
                      className={
                        selectedButton === 'class'
                          ? 'bg-neutral text-white 2 rounded-lg tab-rounded-lg'
                          : ''
                      }
                    >
                      {' '}
                      <Link
                        to="/dashboard/class"
                        className={`  group flex items-center text-xl  gap-3.5 font-medium p-2 hover:bg-neutral hover:text-white rounded-md`}
                      >
                        <div>
                          {React.createElement(FaBookReader, {
                            size: '20',
                          })}
                        </div>
                        <h2>All Class</h2>
                      </Link>
                    </div>
                  )}
                  {/* User */}
                  {user?.email === 'abc@def.com' && (
                    <div
                      onClick={() => setSelectedButton('user')}
                      className={
                        selectedButton === 'user'
                          ? 'bg-neutral text-white 2 rounded-lg tab-rounded-lg'
                          : ''
                      }
                    >
                      {' '}
                      <Link
                        to="/dashboard/user"
                        className={`  group flex items-center text-xl  gap-3.5 font-medium p-2 hover:bg-neutral hover:text-white rounded-md`}
                      >
                        <div>
                          {React.createElement(FaUserGroup, {
                            size: '20',
                          })}
                        </div>
                        <h2>User</h2>
                      </Link>
                    </div>
                  )}
                  {/* <div
                    onClick={() => setSelectedButton('user')}
                    className={
                      selectedButton === 'user'
                        ? 'bg-neutral text-white 2 rounded-lg tab-rounded-lg'
                        : ''
                    }
                  >
                    {' '}
                    <Link
                      to="/dashboard/user"
                      className={`  group flex items-center text-xl  gap-3.5 font-medium p-2 hover:bg-neutral hover:text-white rounded-md`}
                    >
                      <div>
                        {React.createElement(FaUserGroup, {
                          size: '20',
                        })}
                      </div>
                      <h2>User</h2>
                    </Link>
                  </div> */}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
