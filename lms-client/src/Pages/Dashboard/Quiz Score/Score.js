// second version


import { useState } from 'react';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';


const Score = ({
  result,
  index,
  user,
  handleRemove,
  handleQuestion,
  handleUpdate,
  handleRecheck,
}) => {
  const [marks, setMarks] = useState(result.totalMarks || 0);


  const percent = result.totalQuestionMark
    ? ((marks / result.totalQuestionMark) * 100).toFixed(2)
    : 0;

  return (
    <tr
      className="border border-slate-500 text- font-semibold bg-slate-800 ">
      <th>{index}</th>
      <td>{result.name}</td>
      <td>{result.totalQuestionMark}</td>

      <td>
        <div className="flex items-center gap-2 justify-center">
          {result.reCheck ? (
            <h1>{result.totalMarks}</h1>
          ) : (
            <>
              <input
                type="number"
                value={marks}
                min={0}
                max={result.totalQuestionMark}
                onChange={e => setMarks(Number(e.target.value))}
                className="border p-1 w-16 text-center rounded"
              />

              <button
                onClick={() => handleUpdate(result._id, marks)}
                className=""
              >
                <IoCheckmarkDoneCircleSharp className="text-2xl" />
              </button>

              <span>/ {result.totalQuestionMark}</span>
            </>
          )}
        </div>
      </td>

      <td>{percent}%</td>

      <td>
        <button
          onClick={() => handleQuestion(result._id)}
          className="btn btn-xs btn-primary"
        >
          Question
        </button>
      </td>

      {user?.email === 'abc@def.com' && (
        <>
          <td>
            {result.reCheck ? (
              <h1>Done</h1>
            ) : (
              <button
                onClick={() => handleRecheck(result._id)}
                  className="btn btn-xs btn-secondary "
                  disabled={!result.requested}
              >
                Recheck
              </button>
            )}
          </td>
          <td>
            <button
              onClick={() => handleRemove(result._id)}
              className="btn btn-xs btn-accent"
            >
              Remove
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default Score;


