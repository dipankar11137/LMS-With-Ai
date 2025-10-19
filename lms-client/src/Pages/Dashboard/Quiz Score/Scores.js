// second version
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Score from './Score';

const Scores = () => {
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
              <th>Question</th>
              {user?.email === 'abc@def.com' && <th>ReCheck</th>}
              {user?.email === 'abc@def.com' && <th>Remove</th>}
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <Score
                key={result._id}
                result={result}
                index={index + 1}
                user={user}
                handleRemove={handleRemove}
                handleQuestion={handleQuestion}
                handleUpdate={handleUpdate}
                handleRecheck={handleRecheck}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scores;









//  first version

// import { useEffect, useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { toast } from 'react-toastify';

// import { useNavigate } from 'react-router-dom';
// import auth from '../../../firebase.init';
// import Score from './Score';

// const Scores = () => {
//   const [results, setResult] = useState([]);
//   const [user] = useAuthState(auth);
//   const [subject, setClick] = useState('Web Development');
//   const navigator = useNavigate()
//     const [marks, setMarks] = useState(results.marksGiven);



//   useEffect(() => {
//     fetch(`http://localhost:5000/questionAnswersCourse/${subject}`)
//       .then(res => res.json())
//       .then(data => {
//         const sortedResults = data.sort((a, b) => b.percent - a.percent);
//         setResult(sortedResults);
//       });
//   }, [subject]);

//   const handleQuestion = id => {
//     navigator(`/showQuestion/${id}`)
//    };
//   const handleCheck = id => { };
// // const handleMarksChange = async (studentId, questionId, newMarks) => {
// //   try {
// //     // Send update to backend
// //     const res = await fetch(
// //       `http://localhost:3000/updateQuestionMarks/${studentId}`,
// //       {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ questionId, marks: newMarks }),
// //       }
// //     );

// //     const data = await res.json();
// //     if (!res.ok) throw new Error(data.error || 'Update failed');

// //     console.log('Updated total marks:', data.totalMarks);

// //     // Optionally, update local state if needed
// //     setResult(prev =>
// //       prev.map(student => {
// //         if (student._id === studentId) {
// //           return {
// //             ...student,
// //             totalMarks: data.totalMarks,
// //             results: student.results.map(q =>
// //               q.questionId === questionId ? { ...q, marksGiven: newMarks } : q
// //             ),
// //           };
// //         }
// //         return student;
// //       })
// //     );
// //   } catch (err) {
// //     console.error(err);
// //     alert('Error updating marks');
// //   }
// // };

//   const handleMarksChange = async (studentId, questionId, newMarks) => {
//     try {
//       const res = await fetch(
//         `http://localhost:3000/updateQuestionMarks/${studentId}`,
//         {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ questionId, marks: newMarks }),
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || 'Update failed');

//       console.log('Updated total marks:', data.totalMarks);

//       // Update local state
//       setResult(prev =>
//         prev.map(student => {
//           if (student._id === studentId) {
//             return {
//               ...student,
//               totalMarks: data.totalMarks,
//               results: student.results.map(q =>
//                 q.questionId === questionId ? { ...q, marksGiven: newMarks } : q
//               ),
//             };
//           }
//           return student;
//         })
//       );
//     } catch (err) {
//       console.error(err);
//       alert('Error updating marks');
//     }
//   };

//   const handleRemove = id => {
//     const proceed = window.confirm('Are You Sure ?');
//     if (proceed) {
//       const url = `http://localhost:5000/questionAnswersCourses/${id}`;
//       fetch(url, {
//         method: 'DELETE',
//       })
//         .then(res => res.json())
//         .then(data => {
//           const remaining = results.filter(product => product._id !== id);
//           setResult(remaining);
//           toast.success('Remove Successfully ');
//         });
//     }
//   };
//   return (
//     <div className="m-7  pb-10 bg-slate-100 rounded-xl pt-16">
//       <div>
//         <div>
//           <h1 className="mb-5 pt-2 text-4xl text-center font-bold uppercase text-green-400">
//             Ranking
//           </h1>
//         </div>
//         <div className="pb-2 flex justify-end gap-x-4 mr-10">
//           <button
//             onClick={() => setClick('Web Development')}
//             className={`btn btn-xs  btn-neutral ${
//               subject === 'Web Development'
//                 ? 'btn-primary text-white'
//                 : 'btn-outline'
//             }`}
//           >
//             Web Development
//           </button>
//           <button
//             onClick={() => setClick('Data Science')}
//             className={`btn btn-xs  btn-neutral ${
//               subject === 'Data Science'
//                 ? 'btn-primary text-white'
//                 : 'btn-outline'
//             }`}
//           >
//             Data Science
//           </button>
//           <button
//             onClick={() => setClick('Graphic Design')}
//             className={`btn btn-xs  btn-neutral ${
//               subject === 'Graphic Design'
//                 ? 'btn-primary text-white'
//                 : 'btn-outline'
//             }`}
//           >
//             Graphic Design
//           </button>
//           <button
//             onClick={() => setClick('Mobile App Development')}
//             className={`btn btn-xs  btn-neutral ${
//               subject === 'Mobile App Development'
//                 ? 'btn-primary text-white'
//                 : 'btn-outline'
//             }`}
//           >
//             Mobile App Development
//           </button>
//           <button
//             onClick={() => setClick('Digital Marketing')}
//             className={`btn btn-xs  btn-neutral ${
//               subject === 'Digital Marketing'
//                 ? 'btn-primary text-white'
//                 : 'btn-outline'
//             }`}
//           >
//             Digital Marketing
//           </button>
//           <button
//             onClick={() => setClick('Finance & Accounting')}
//             className={`btn btn-xs  btn-neutral ${
//               subject === 'Finance & Accounting'
//                 ? 'btn-primary text-white'
//                 : 'btn-outline'
//             }`}
//           >
//             Finance & Accounting
//           </button>
//         </div>
//         <div className="overflow-x-auto mx-7 overflow-y-scroll h-[450px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
//           <table className="table table-xs text-center w-full">
//             <thead>
//               <tr className="border-[1px] border-slate-500 ">
//                 <th></th>
//                 <th>Name</th>
//                 <th>Full Marks</th>
//                 <th>Marks Given</th>
//                 <th>Percent</th>
//                 <th>Question</th>
//                 {user?.email === 'abc@def.com' && <th>ReCheck</th>}
//                 {user?.email === 'abc@def.com' && <th>Remove</th>}
//               </tr>
//             </thead>
//             <tbody>
//               {results.map((result, index) => (
//                 <Score
//                   key={result?._id}
//                   result={result}
//                   index={index + 1}
//                   user={user}
//                   handleRemove={handleRemove}
//                     handleQuestion={handleQuestion}
//                   handleCheck={handleCheck}
//                   handleMarksChange={handleMarksChange}
//                   marks={marks}
//                    setMarks={setMarks}
//                 />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Scores;
