import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaSearch } from 'react-icons/fa';
import { IoIosArrowDown, IoMdNotifications } from 'react-icons/io';
import { MdCastForEducation, MdOutlineDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';


const Navbar = ({ searchButton, setSearchButton, setSearch }) => {
  const [users] = useAuthState(auth);
  const [user, setUsers] = useState([]); // Replace with actual booking state fetching logic
  const logout = () => signOut(auth);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/user/${users?.email}`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [users, users?.email]);
  console.log(user);


  useEffect(() => {
    let newCount = 0;

    if (user[0]?.webPayment) newCount += 1;
    if (user[0]?.dataPayment) newCount += 1;
    if (user[0]?.graphicPayment) newCount += 1;
    if (user[0]?.digitalPayment) newCount += 1;
    if (user[0]?.mobilePayment) newCount += 1;
    if (user[0]?.financePayment) newCount += 1;

    setCount(newCount);
  }, [users, user]);

  const dropdownContent = links => (
    <ul className="absolute hidden group-hover:block bg-white text-black shadow-xl rounded-lg py-2 w-52 z-10  ">
      <div
        className="absolute -top-1 left-4 w-3 h-3 bg-white rotate-45 "
        style={{
          zIndex: 1,
        }}
      ></div>
      {links.map(({ name, path }, index) => (
        <li key={index} className=" px-4 py-2">
          <Link to={path}>{name}</Link>
        </li>
      ))}
    </ul>
  );


  const CourseDropdown = () => (
    <ul className="absolute hidden group-hover:block bg-white text-black shadow-xl rounded-lg py-2 w-[500px] z-10">
      <div
        className="absolute -top-1 left-4 w-3 h-3 bg-white rotate-45 flex"
        style={{
          zIndex: 1,
        }}
      ></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border-r-2 border-gray-300">
          <li className="px-4 ml-3 text-xl font-semibold text-primary underline py-1">
            Course
          </li>

          {user[0]?.webPayment && (
            <li className="px-4 py-1">
              <Link to="/course/webDevelopment">Web Development</Link>
            </li>
          )}

          {user[0]?.dataPayment && (
            <li className="px-4 py-1">
              <Link to="/course/dataScience">Data Science</Link>
            </li>
          )}

          {user[0]?.graphicPayment && (
            <li className="px-4 py-1">
              <Link to="/course/graphicDesign">Graphic Design</Link>
            </li>
          )}
          {user[0]?.mobilePayment && (
            <li className="px-4 py-1">
              <Link to="/course/mobile">Mobile App Developer</Link>
            </li>
          )}
          {user[0]?.digitalPayment && (
            <li className="px-4 py-1">
              <Link to="/course/digital">Digital Marketing</Link>
            </li>
          )}
          {user[0]?.financePayment && (
            <li className="px-4 py-1">
              <Link to="/course/finance">Finance & Accounting</Link>
            </li>
          )}
        </div>

        <div>
          <li className="px-4 ml-3 text-xl font-semibold text-accent underline py-1">
            Exam Question
          </li>
          {user[0]?.webPayment && (
            <li className="px-4 py-1">
              <Link to="/course/webQuiz">Web Development </Link>
            </li>
          )}

          {user[0]?.dataPayment && (
            <li className="px-4 py-1">
              <Link to="/course/webQuiz">Data Science</Link>
            </li>
          )}
          {user[0]?.graphicPayment && (
            <li className="px-4 py-1">
              <Link to="/course/webQuiz">Graphic Design </Link>
            </li>
          )}
          {user[0]?.mobilePayment && (
            <li className="px-4 py-1">
              <Link to="/course/webQuiz">Mobile App Developer</Link>
            </li>
          )}
          {user[0]?.digitalPayment && (
            <li className="px-4 py-1">
              <Link to="/course/webQuiz">Digital Marketing</Link>
            </li>
          )}
          {user[0]?.financePayment && (
            <li className="px-4 py-1">
              <Link to="/course/webQuiz">Finance & Accounting</Link>
            </li>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <li className="px-4 my-2 text-center font-bold  btn btn-outline btn-primary w-36 text-white">
          <Link to="/course/quizScore">Quiz Score</Link>
        </li>
      </div>
    </ul>
  );



  return (
    <div className="navbar bg-neutral text-white shadow-lg px-6 lg:px-16">
      {/* Logo and Explore */}
      <div className="navbar-start flex items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-white"
        >
        
          <MdCastForEducation className="h-14 p-2  w-full rounded-full" />
          HandiLearn
        </Link>
        <button className="text-green-400 text-lg font-semibold ml-4 hover:text-green-600">
          Explore
        </button>
      </div>

      {/* Center Menu Items */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0   text-md">
          <li className="relative group">
            <Link
              to="/"
              className="hover:text-secondary flex items-center hover:bg-slate-700 rounded-2xl"
            >
              Home
            </Link>
          </li>
          {users && (
            <li className="relative group">
              <button className="hover:text-secondary flex items-center hover:bg-slate-700 rounded-2xl">
                Courses <IoIosArrowDown className="mt-1" />
              </button>
              <CourseDropdown />
            </li>
          )}

          {/* <li className="relative group">
            <button className="hover:text-secondary flex items-center hover:bg-slate-700 rounded-2xl">
              Events <IoIosArrowDown className="mt-1" />
            </button>
            {dropdownContent([
              { name: 'Webinars', path: '/event' },
              { name: 'Workshops', path: '/event' },
              { name: 'Meetups', path: '/event' },
            ])}
          </li> */}
          {/* <li className="relative group">
            <button className="hover:text-secondary hover:bg-slate-700 rounded-2xl  flex items-center">
              Blog <IoIosArrowDown className="mt-1" />
            </button>
            {dropdownContent([
              { name: 'Blog List 1', path: '/blockOne' },
              { name: 'Blog List 2', path: '/blockOne' },
              { name: 'Blog List 3', path: '/blockOne' },
              { name: 'Blog Single', path: '/blockOne' },
            ])}
          </li> */}
          <li className="relative group">
            <button className="hover:text-secondary flex items-center rounded-2xl hover:bg-slate-700">
              Pages <IoIosArrowDown className="mt-1" />
            </button>
            {dropdownContent([
              { name: 'About Us', path: '/about' },
              { name: 'FAQ', path: '/faq' },
              { name: 'Contact', path: '/contact' },
            ])}
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-green-400 hover:bg-slate-700 rounded-2xl"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Actions on the Right */}
      <div className="navbar-end flex items-center space-x-4">
        {/* search input */}
        {searchButton && (
          <div className="flex gap-2 text-black  bg-white pr-2 rounded-md">
            <input
              onChange={e => setSearch(e.target.value)}
              type="text"
              className="w-28 rounded-md pl-1"
            />
            <button onClick={() => setSearchButton(false)}>X</button>
          </div>
        )}
        {/* Search Icon */}
        {!searchButton && (
          <FaSearch
            onClick={() => setSearchButton(true)}
            className="text-xl cursor-pointer hover:text-green-400"
          />
        )}

        {/* Cart Icon with Notification */}
        <div className="indicator">
          <IoMdNotifications className="text-xl cursor-pointer hover:text-green-400" />
          <span className="badge badge-sm -mt-2 -ml-1 bg-red-500 text-white">
            {count}
          </span>
        </div>

        {(users?.email === 'abc@def.com' || user[0]?.admin) && (
          <div className="indicator">
            <Link to="/dashboard">
              <MdOutlineDashboard className="text-xl cursor-pointer hover:text-green-400" />
            </Link>
          </div>
        )}

        {/* Auth Buttons */}
        {!users ? (
          <>
            <Link to="/login" className="hover:text-green-400  text-white">
              Log in
            </Link>
            <Link
              to="/createAccount"
              className="bg-white text-purple-900  px-6 py-2 rounded-xl font-semibold hover:bg-green-400 hover:text-white"
            >
              Sign up
            </Link>
          </>
        ) : (
          <button onClick={logout} className="hover:text-red-500  text-white">
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
