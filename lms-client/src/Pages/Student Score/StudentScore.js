import { useState } from 'react';

const StudentScore = ({
  result,
  index,
  user,
  handleRemove,
  handleQuestion,
  handleUpdate,
  handleRecheck,
  handleRequest,
}) => {
  const [marks, setMarks] = useState(result.totalMarks || 0);

  const percent = result.totalQuestionMark
    ? ((marks / result.totalQuestionMark) * 100).toFixed(2)
    : 0;

  console.log(result);

  return (
    <tr className="border border-slate-500 text- font-semibold bg-slate-800 ">
      <th>{index}</th>
      <td>{result.name}</td>
      <td>{result.totalQuestionMark}</td>

      <td>
        <div className="flex items-center gap-2 justify-center">
          <h1>{result.totalMarks}</h1>
        </div>
      </td>

      <td>{percent}%</td>

      <>
        <td>
          {result.requested ? (
            result.reCheck ? (
              <h1>Done</h1>
            ) : (
              <h1 className="btn btn-primary btn-xs">Processing...</h1>
            )
          ) : result.reCheck ? (
            <h1>Done</h1>
          ) : (
            <button
              onClick={() => handleRequest(result._id)}
              className="btn btn-xs btn-primary"
            >
              Requested
            </button>
          )}
        </td>
        {user.email === 'abc@def.com' && (
          <td>
            <button
              onClick={() => handleRemove(result._id)}
              className="btn btn-xs btn-accent"
            >
              Remove
            </button>
          </td>
        )}
      </>
    </tr>
  );
};

export default StudentScore;
