import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

import auth from '../../../firebase.init';
import Score from './Score';

const Scores = () => {
  const [results, setResult] = useState([]);
  const [user] = useAuthState(auth);
  const [click,setClick]=useState('Web Development')

  useEffect(() => {
    fetch(`http://localhost:5000/solveQuiz/${click}`)
      .then(res => res.json())
      .then(data => {
        const sortedResults = data.sort((a, b) => b.percent - a.percent);
        setResult(sortedResults);
      });
  }, [click]);

  const handleRemove = id => {
    const proceed = window.confirm('Are You Sure ?');
    if (proceed) {
      const url = `http://localhost:5000/solveDelete/${id}`;
      fetch(url, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => {
          const remaining = results.filter(product => product._id !== id);
          setResult(remaining);
          toast.success('Remove Successfully ');
        });
    }
  };
  return (
    <div className="m-7  pb-10 bg-slate-100 rounded-xl pt-16">
      <div>
        <div>
          <h1 className="mb-5 pt-2 text-4xl text-center font-bold uppercase text-green-400">
            Ranking
          </h1>
        </div>
        <div className="pb-2 flex justify-end gap-x-4 mr-10">
          <button
            onClick={() => setClick('Web Development')}
            className={`btn btn-xs  btn-neutral ${
              click === 'Web Development'
                ? 'btn-primary text-white'
                : 'btn-outline'
            }`}
          >
            Web Development
          </button>
          <button
            onClick={() => setClick('Data Science')}
            className={`btn btn-xs  btn-neutral ${
              click === 'Data Science'
                ? 'btn-primary text-white'
                : 'btn-outline'
            }`}
          >
            Data Science
          </button>
          <button
            onClick={() => setClick('Graphic Design')}
            className={`btn btn-xs  btn-neutral ${
              click === 'Graphic Design'
                ? 'btn-primary text-white'
                : 'btn-outline'
            }`}
          >
            Graphic Design
          </button>
          <button
            onClick={() => setClick('Mobile App Development')}
            className={`btn btn-xs  btn-neutral ${
              click === 'Mobile App Development'
                ? 'btn-primary text-white'
                : 'btn-outline'
            }`}
          >
            Mobile App Development
          </button>
          <button
            onClick={() => setClick('Digital Marketing')}
            className={`btn btn-xs  btn-neutral ${
              click === 'Digital Marketing'
                ? 'btn-primary text-white'
                : 'btn-outline'
            }`}
          >
            Digital Marketing
          </button>
          <button
            onClick={() => setClick('Finance & Accounting')}
            className={`btn btn-xs  btn-neutral ${
              click === 'Finance & Accounting'
                ? 'btn-primary text-white'
                : 'btn-outline'
            }`}
          >
            Finance & Accounting
          </button>
        </div>
        <div className="overflow-x-auto mx-7 overflow-y-scroll h-[450px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
          <table className="table table-xs text-center w-full">
            <thead>
              <tr className="border-[1px] border-slate-500 ">
                <th></th>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Question</th>
                <th>High Score</th>
                <th>Percent</th>
                {user?.email === 'abc@def.com' && <th>Remove</th>}
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <Score
                  key={result?._id}
                  result={result}
                  index={index + 1}
                  user={user}
                  handleRemove={handleRemove}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Scores;
