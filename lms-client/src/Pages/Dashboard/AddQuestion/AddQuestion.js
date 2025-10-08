import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import DashboardFooter from "../DashboarFooter/DashboardFooter";

const AddQuestion = () => {
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
  
     fetch(`http://localhost:5000/question`, {
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
          <h1 className="text-2xl font-semibold text-gray-600">Add Question</h1>
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
                  className="select select-primary w-full "
                >
                  <option>Web Development</option>
                  <option>Data Science</option>
                  <option>Graphic Design</option>
                  <option>Mobile App Development</option>
                  <option>Digital Marketing</option>
                  <option>Finance & Accounting</option>
                </select>
              </div>

              {/* Question */}
              <div className="form-control  ">
                <label className="label">
                  <span className="label-text">Question</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Your question"
                  className="input input-bordered bg-white w-[600px]  pt-2"
                  {...register('question', {
                    required: {
                      value: true,
                      message: 'Question is Required',
                    },
                  })}
                />
                <label className="label">
                  {errors.question?.type === 'required' && (
                    <span className="label-text-alt text-red-500">
                      {errors.question.message}
                    </span>
                  )}
                </label>
              </div>
              {/* Answer */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Answer</span>
                </label>
                <textarea
                  type="text"
                  placeholder=" Answer"
                  className="input input-bordered bg-white w-full  pt-2"
                  {...register('answer', {
                    required: {
                      value: true,
                      message: 'Answer is Required',
                    },
                  })}
                />
                <label className="label">
                  {errors.answer?.type === 'required' && (
                    <span className="label-text-alt text-red-500">
                      {errors.answer.message}
                    </span>
                  )}
                </label>
              </div>
              {/* marks */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Marks</span>
                </label>
                <input
                  type="number"
                  placeholder=" Marks"
                  className="input input-bordered bg-white w-full "
                  {...register('marks', {
                    required: {
                      value: true,
                      message: 'Marks is Required',
                    },
                  })}
                />
                <label className="label">
                  {errors.marks?.type === 'required' && (
                    <span className="label-text-alt text-red-500">
                      {errors.marks.message}
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

export default AddQuestion;