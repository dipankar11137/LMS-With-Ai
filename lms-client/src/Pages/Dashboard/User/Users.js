import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';
import auth from '../../../firebase.init';
import DashboardFooter from '../DashboarFooter/DashboardFooter';
import User from './User';

const Users = () => {
  const [users, setUsers] = useState([]);
   const [user] = useAuthState(auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  // console.log(user.email);
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [users]);

  const handleAdmin = (id, admin) => {
    const updateAdmin = { admin: admin };
    fetch(`http://localhost:5000/admin/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updateAdmin),
    })
      .then(res => res.json())
      .then(data => {
        Swal.fire({
          title: 'Custom animation with Animate.css',
          icon: 'success',
          title: 'Add Admin',
          showConfirmButton: false,
          timer: 1500,
          showClass: {
            popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
          },
          hideClass: {
            popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
          },
        });
      });
  };

  const handleSearch = () => {
    const filtered = users.filter(user =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleClear = () => {
    setSearchQuery('');
    setFilteredUsers([]);
  };
  const handleDelete = id => {
    const proceed = window.confirm('Are You Sure ?');
    if (proceed) {
      fetch(`http://localhost:5000/userDelete/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => {
          Swal.fire({
            title: 'Custom animation with Animate.css',
            icon: 'success',
            title: 'User Deleted',
            showConfirmButton: false,
            timer: 1500,
            showClass: {
              popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
            },
            hideClass: {
              popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
            },
          });
        });
    }
  }
    return (
    <div>
      <div className=" pt-10 w-full bg-gray-100 m-10  rounded-lg pb-10">
        <div>
          <div className="flex justify-center mb-4 ">
            <input
              type="text"
              placeholder="Search by email"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-lg mr-2"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Search
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="overflow-x-auto mx-7 overflow-y-scroll h-[450px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
          <table className="table table-xs text-center w-full ">
            <thead>
              <tr className="border-[1px] border-slate-500 ">
                <th></th>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Add Teacher</th>
                <th>Remove Teacher</th>
                <th>Delete</th>

                {/* {user?.email === 'abc@def.com' && <th>Remove</th>} */}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <>
                  {users
                    .slice()
                    .reverse()
                    .map((user, index) => (
                      <User
                        key={user._id}
                        user={user}
                        index={index + 1}
                        handleAdmin={handleAdmin}
                        handleDelete={handleDelete}
                      />
                    ))}
                </>
              ) : (
                <>
                  {filteredUsers
                    .slice()
                    .reverse()
                    .map((user, index) => (
                      <User
                        key={user._id}
                        user={user}
                        index={index + 1}
                        handleAdmin={handleAdmin}
                        handleDelete={handleDelete}
                      />
                    ))}
                </>
              )}
            </tbody>
          </table>
        </div>
        {/* <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 gap-10  rounded-lg mx-16">
          {filteredUsers.length === 0 ? (
            <>
              {users
                .slice()
                .reverse()
                .map((user, index) => (
                  <User
                    key={user._id}
                    user={user}
                    index={index + 1}
                    handleAdmin={handleAdmin}
                  />
                ))}
            </>
          ) : (
            <>
              {filteredUsers
                .slice()
                .reverse()
                .map((user, index) => (
                  <User
                    key={user._id}
                    user={user}
                    index={index + 1}
                    handleAdmin={handleAdmin}
                  />
                ))}
            </>
          )}
        </div> */}
      </div>
      <DashboardFooter />
    </div>
  );
};

export default Users;
