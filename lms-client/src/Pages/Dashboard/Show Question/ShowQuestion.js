import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShowQuestion = () => {
  const { id } = useParams();
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/questionAnswersCourseId/${id}`)
      .then(res => res.json())
      .then(data => setQuestionData(data))
      .catch(err => console.error('Error fetching data:', err));
  }, [id]); // ✅ fixed dependency

  if (!questionData) {
    return <p className="mt-20 text-center text-gray-500">Loading...</p>;
  }

  const { name, email, subject, totalMarks, totalQuestionMark, results } =
    questionData;

  return (
    <div className="max-w-5xl mx-auto mt-16 bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-2 text-center text-blue-600">
        {subject} — Answer Review
      </h1>

      <div className="text-center mb-6">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm text-gray-600">{email}</p>
        <p className="text-md mt-2">
          <strong>Total Marks:</strong> {totalMarks} / {totalQuestionMark}
        </p>
      </div>

      <div className="space-y-6">
        {results?.map((q, index) => (
          <div
            key={q.questionId}
            className="p-4 border border-gray-300 rounded-lg bg-slate-50 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {index + 1}. {q.questionTitle}
            </h2>

            {/* Image Answer */}
            {q.imageUrl && (
              <div className="my-2">
                <img
                  src={q.imageUrl}
                  alt={`Answer ${index + 1}`}
                  className="max-w-sm rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Text Answer */}
            {q.answerText && (
              <p className="text-gray-700 mb-2">
                <strong>Answer:</strong> {q.answerText}
              </p>
            )}

            {/* Marks Input (for marking manually) */}
            <div className="flex items-center gap-3 mt-3">
              <label className="text-sm font-medium text-gray-700">
                Marks:
              </label>
              {q.marksGiven}
              
              <span className="text-sm text-gray-500">
                / {q.maxMarks || 10}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowQuestion;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const ShowQuestion = () => {
//   const { id } = useParams();
//   const [question, setQuestion] = useState({})

//   useEffect(() => {
//     fetch(`http://localhost:5000/questionAnswersCourseId/${id}`)
//       .then(res => res.json())
//       .then(data => setQuestion(data))
//       .catch(err => console.error(err));

//   }, [id,question])

//   console.log("dado aice",question);

//   return (
//     <div className="mt-20">
//       <h1>Dado {id}</h1>

//       <p>hello {question.totalMarks}</p>
//     </div>
//   );
// };

// export default ShowQuestion;
