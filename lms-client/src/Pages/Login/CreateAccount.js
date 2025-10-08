
import React from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

import bg from '../../Images/Bg/login bg.png';

const CreateAccount = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

    const createDBUser = (name, email) => {
      fetch(`http://localhost:5000/create-user/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    };

  const onSubmit = async data => {
    try {
      await createUserWithEmailAndPassword(data.email, data.password);
      await updateProfile({ displayName: data.name });
      await createDBUser(data.name, data.email);
      toast.success('Account successfully created!');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '600px',
        width: '100%',
      }}
     
     className="flex justify-center items-center min-h-screen  pt-24 bg-neutral">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        {/* Sign-Up Header */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Sign Up
        </h2>
        <p className="text-sm text-center text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 underline">
            Log in
          </Link>
        </p>

        {/* Input Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div>
            <label className="block text-sm text-gray-700">Name *</label>
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('name', { required: 'Username is required' })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Invalid email format',
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-700">Password *</label>
            <input
              type="password"
              placeholder="Your Password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 mt-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        {/* Divider and Alternative Login */}
        {/* <div className="divider my-6">OR</div>
        <button
          onClick={() => signInWithGoogle()}
          className="flex items-center justify-center w-full px-4 py-2 text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
        >
          Continue with Google
        </button> */}
      </div>
    </div>
  );
};

export default CreateAccount;





























// import React from "react";
// import {
//   useCreateUserWithEmailAndPassword,
//   useSignInWithGoogle,
//   useUpdateProfile,
// } from "react-firebase-hooks/auth";
// import { useForm } from "react-hook-form";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import auth from "../../firebase.init";

// const CreateAccount = () => {
//   const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm();

//   const [createUserWithEmailAndPassword, user, loading, error] =
//     useCreateUserWithEmailAndPassword(auth);

//   const [updateProfile, updating, updateError] = useUpdateProfile(auth);
//   const navigate = useNavigate();
//   const location = useLocation();

//   let from = location.state?.from?.pathname || "/";

//   let signInError;
//   if (gUser) {
//     navigate("/");
//   }

//   const createDBUser = (name, email) => {
//     // fetch(`https://boxberry.onrender.com/create-user/${email}`, {
//     //   method: "PUT",
//     //   headers: {
//     //     "content-type": "application/json",
//     //   },
//     //   body: JSON.stringify({ name, email }),
//     // })
//     //   .then((res) => res.json())
//     //   .then((data) => {
//     //     console.log(data);
//     //   });
//   };

//   const onSubmit = (data) => {
//     // console.log(data.email, data.password, data.name);
//     createUserWithEmailAndPassword(data.email, data.password);
//     updateProfile({ displayName: data.name });
//     createDBUser(data.name, data.email);
//     toast.success("Updated profile");
//     navigate("/");
//   };
//   return (
//     <div className="flex justify-center h-screen pt-16">
//       <div className="flex h-screen justify-center items-center  ">
//         <div className="card w-96 shadow-xl bg-violet-50">
//           <div className="card-body">
//             <div>
//               <h2 className="text-center text-2xl font-bold">SignUp</h2>
//               <p>
//                 <small>
//                   Already Have an Account ?{' '}
//                   <Link to="/login" className="text-orange-600 font-bold mt-2">
//                     Please Login
//                   </Link>
//                 </small>
//               </p>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="form-control w-full max-w-xs">
//                 <label className="label">
//                   <span className="label-text">Name</span>
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Your name"
//                   className="input input-bordered bg-white w-full max-w-xs"
//                   {...register('name', {
//                     required: {
//                       value: true,
//                       message: 'Name is Required',
//                     },
//                   })}
//                 />
//                 <label className="label">
//                   {errors.name?.type === 'required' && (
//                     <span className="label-text-alt text-red-500">
//                       {errors.name.message}
//                     </span>
//                   )}
//                 </label>
//               </div>
//               <div className="form-control w-full max-w-xs">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="Your Email"
//                   className="input input-bordered bg-white w-full max-w-xs"
//                   {...register('email', {
//                     required: {
//                       value: true,
//                       message: 'Email is Required',
//                     },
//                     pattern: {
//                       value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
//                       message: 'Provide a valid Email',
//                     },
//                   })}
//                 />
//                 <label className="label">
//                   {errors.email?.type === 'required' && (
//                     <span className="label-text-alt text-red-500">
//                       {errors.email.message}
//                     </span>
//                   )}
//                   {errors.email?.type === 'pattern' && (
//                     <span className="label-text-alt text-red-500">
//                       {errors.email.message}
//                     </span>
//                   )}
//                 </label>
//               </div>
//               <div className="form-control w-full max-w-xs">
//                 <label className="label">
//                   <span className="label-text">Password</span>
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="input input-bordered bg-white w-full max-w-xs"
//                   {...register('password', {
//                     required: {
//                       value: true,
//                       message: 'Password is Required',
//                     },
//                     minLength: {
//                       value: 6,
//                       message: 'Must be 6 characters or longer',
//                     },
//                   })}
//                 />
//                 <label className="label">
//                   {errors.password?.type === 'required' && (
//                     <span className="label-text-alt text-red-500">
//                       {errors.password.message}
//                     </span>
//                   )}
//                   {errors.password?.type === 'minLength' && (
//                     <span className="label-text-alt text-red-500">
//                       {errors.password.message}
//                     </span>
//                   )}
//                 </label>
//               </div>
//               {signInError}
//               <input
//                 className="btn w-full text-white"
//                 type="submit"
//                 value="Sign Up"
//               />
//             </form>

//             {/* <div className="divider">OR</div>
//             <button
//               onClick={() => signInWithGoogle()}
//               className="btn btn-outline font-black bg-orange-600 text-white"
//             >
//               Continue With Google
//             </button> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateAccount;
