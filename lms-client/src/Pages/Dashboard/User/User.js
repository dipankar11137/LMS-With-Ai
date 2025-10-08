import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';


const User = ({ user, index, handleAdmin, handleDelete }) => {
  const [users] = useAuthState(auth);

  const profile =
    'https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png';
  return (
    // <div className="shadow-lg p-4 rounded-lg bg-white">
    //   <div className="flex gap-x-2 text-start font-normal items-end">
    //     <img className="w-28 h-28" src={profile} alt="" />

    //     <div>
    //       <h1 className="text-xl font-semibold">{user?.name}</h1>
    //       <h1>{user?.email}</h1>
    //     </div>
    //   </div>
    //   <div className="flex justify-between mt-3">
    //     <div>
    //       {user.admin ? (
    //         <button
    //           disabled
    //           onClick={() => handleAdmin(user._id, true)}
    //           className="btn btn-sm btn-primary "
    //         >
    //           Add Admin
    //         </button>
    //       ) : (
    //         <button
    //           disabled={user?.email === users?.email}
    //           onClick={() => handleAdmin(user._id, true)}
    //           className="text-[10px] btn btn-sm text-white btn-primary font-normal "
    //         >
    //           Add Admin
    //         </button>
    //       )}
    //     </div>
    //     <div>
    //       {user.admin ? (
    //         <button
    //           disabled={user?.email === users?.email}
    //           onClick={() => handleAdmin(user._id, false)}
    //           className="btn btn-sm btn-accent text-white"
    //         >
    //           Remove Admin
    //         </button>
    //       ) : (
    //         <button
    //           disabled
    //           onClick={() => handleAdmin(user._id, false)}
    //           className="btn btn-sm btn-accent text-white"
    //         >
    //           Remove Admin
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <tr>
      <th>{index}</th>
      <td>
        <img className="w-8 h-7" src={profile} alt="" />{' '}
      </td>
      <td>{user?.name}</td>
      <td>{user?.email}</td>
      <td className="flex justify-center">
        {user.admin ? (
          <button
            disabled
            onClick={() => handleAdmin(user._id, true)}
            className="btn btn-sm btn-primary "
          >
            Add Teacher
          </button>
        ) : (
          <h6
            onClick={() => handleAdmin(user._id, true)}
            className="text-[10px] btn btn-sm text-white bg-orange-700 font-normal border-yellow-200"
          >
            Add Teacher
          </h6>
        )}
      </td>
      <td>
        {user.admin ? (
          <button
            onClick={() => handleAdmin(user._id, false)}
            className="btn btn-sm btn-primary text-white"
          >
            Remove Teacher
          </button>
        ) : (
          <button
            disabled
            onClick={() => handleAdmin(user._id, false)}
            className="btn btn-sm btn-primary text-white"
          >
            Remove Teacher
          </button>
        )}
      </td>
      <td>
        <button
          onClick={() => handleDelete(user._id, false)}
          className="btn btn-sm btn-accent text-white"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
