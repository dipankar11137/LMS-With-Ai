import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import StudentScore from './StudentScore';


const StudentScores = () => {
  const [results, setResults] = useState([]);
  const [user] = useAuthState(auth);
  const [subject, setSubject] = useState('Web Development');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/questionAnswersCourse/${subject}`)
      .then(res => res.json())
      .then(data => {
        const sortedResults = data.sort((a, b) => b.percent - a.percent);
        setResults(sortedResults);
      });
  }, [subject]);

  const handleQuestion = id => navigate(`/showQuestion/${id}`);

  const handleUpdate = async (id, newMarks) => {
    if (!newMarks && newMarks !== 0) return toast.error('Please enter a mark.');

    try {
      const res = await fetch(`http://localhost:5000/updateMark/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalMarks: newMarks }),
      });
      const data = await res.json();
      if (data.modifiedCount > 0) {
        toast.success('Marks updated successfully!');
        // Refresh list
        setResults(prev =>
          prev.map(r => (r._id === id ? { ...r, totalMarks: newMarks } : r))
        );
      } else toast.warn('No changes made.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update marks.');
    }
  };

  const handleRemove = async id => {
    const proceed = window.confirm('Are you sure?');
    if (!proceed) return;
    try {
      const res = await fetch(
        `http://localhost:5000/questionAnswersCourses/${id}`,
        {
          method: 'DELETE',
        }
      );
      await res.json();
      setResults(prev => prev.filter(item => item._id !== id));
      toast.success('Removed successfully!');
    } catch (err) {
      toast.error('Error deleting record.');
    }
  };

  const handleRecheck = id => {
    const reCheck = { reCheck: true };
    fetch(`http://localhost:5000/reCheck/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(reCheck),
    })
      .then(res => res.json())
      .then(data => {
        toast.success('ReCheck Successfully');
      });
  };

  // Request handler
  const handleRequest = id => {
     const requested = { requested: true };
     fetch(`http://localhost:5000/requested/${id}`, {
       method: 'PUT',
       headers: {
         'content-type': 'application/json',
       },
       body: JSON.stringify(requested),
     })
       .then(res => res.json())
       .then(data => {
         toast.success('Requested Successfully');
       });
   }

  return (
    <div className="m-7 pb-10 bg-slate-100 rounded-xl pt-16">
      <h1 className="mb-5 text-4xl text-center font-bold uppercase text-green-400">
        Ranking
      </h1>

      {/* Subject Filter */}
      <div className="pb-2 flex justify-end gap-x-4 mr-10">
        {[
          'Web Development',
          'Data Science',
          'Graphic Design',
          'Mobile App Development',
          'Digital Marketing',
          'Finance & Accounting',
        ].map(sub => (
          <button
            key={sub}
            onClick={() => setSubject(sub)}
            className={`btn btn-xs ${
              subject === sub ? 'btn-primary text-white' : 'btn-outline'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto mx-7 overflow-y-scroll h-[450px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
        <table className="table table-xs text-center w-full">
          <thead>
            <tr className="border border-slate-500">
              <th>#</th>
              <th>Name</th>
              <th>Full Marks</th>
              <th>Marks Given</th>
              <th>Percent</th>
              {/* <th>Question</th> */}
              {user?.email === 'abc@def.com' && <th>ReCheck</th>}
              {user?.email === 'abc@def.com' && <th>Remove</th>}
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <StudentScore
                key={result._id}
                result={result}
                index={index + 1}
                user={user}
                handleRemove={handleRemove}
                handleQuestion={handleQuestion}
                handleUpdate={handleUpdate}
                handleRecheck={handleRecheck}
                handleRequest={handleRequest}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentScores;
