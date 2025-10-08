import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import DashboardFooter from '../DashboarFooter/DashboardFooter';

const AddClass = () => {
const [loading,setLoading]=useState(false)
  const [course, setCourse] = useState('Web Development');
  const [content, setContent] = useState('Course Content');
   const {
      register,
      formState: { errors },
     handleSubmit,
      reset,
  } = useForm();
  
  const onSubmit = (data) => {
    setLoading(true)
    const updateData = {
  ...data,course,content
}

   fetch(`http://localhost:5000/class`, {
     method: 'POST',
     headers: {
       'content-type': 'application/json',
     },
     body: JSON.stringify(updateData),
   })
     .then(res => res.json())
     .then(data => {
       setLoading(false)
       reset()
         toast.success('success');
     });
  }
  return (
    <div>
      <div className="pt-10 m-10 bg-gray-100 rounded-lg p-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-600">Add Classes</h1>
        </div>
        <div className=" w-full flex justify-center ">
          <div className="p-5 bg-white rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* course */}
              <div>
                <label className="label">
                  <span className="label-text">Choose Your Course</span>
                </label>

                <select
                  onClick={e => setCourse(e.target.value)}
                  className="select select-primary w-full max-w-xs"
                >
                  <option>Web Development</option>
                  <option>Data Science</option>
                  <option>Graphic Design</option>
                  <option>Mobile App Development</option>
                  <option>Digital Marketing</option>
                  <option>Finance & Accounting</option>
                </select>
              </div>
              {/* course */}
              <div>
                <label className="label">
                  <span className="label-text">Choose Your Course Content</span>
                </label>

                <select
                  onClick={e => setContent(e.target.value)}
                  className="select select-primary w-full max-w-xs"
                >
                  <option>Course Content</option>
                  <option>Brief</option>
                  <option>TCI</option>
                  <option>Prototyping</option>
                  <option>Wireframe</option>
                </select>
              </div>
              {/* Name */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Class Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Class Name"
                  className="input input-bordered bg-white w-72 max-w-xs"
                  {...register('classNames', {
                    required: {
                      value: true,
                      message: 'Class Name is Required',
                    },
                  })}
                />
                <label className="label">
                  {errors.classNames?.type === 'required' && (
                    <span className="label-text-alt text-red-500">
                      {errors.classNames.message}
                    </span>
                  )}
                </label>
              </div>
              {/* video url */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Video Url</span>
                </label>
                <input
                  type="text"
                  placeholder=" Video Url"
                  className="input input-bordered bg-white w-full max-w-xs"
                  {...register('videoUrl', {
                    required: {
                      value: true,
                      message: 'Video Url is Required',
                    },
                  })}
                />
                <label className="label">
                  {errors.videoUrl?.type === 'required' && (
                    <span className="label-text-alt text-red-500">
                      {errors.videoUrl.message}
                    </span>
                  )}
                </label>
              </div>

              {loading ? (
                <h1 className="btn btn-neutral w-full text-white cursor-not-allowed">
                  Loading ...
                </h1>
              ) : (
                <input
                  className="btn btn-neutral w-full text-white"
                  type="submit"
                  value="ADD"
                />
              )}
            </form>
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
};

export default AddClass;